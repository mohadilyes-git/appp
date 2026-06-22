export type ItemStatus = 'inhand' | 'listed' | 'sold';

export type InventoryItem = {
  id: string;
  name: string;
  paid: number;
  target: number;
  soldFor?: number;
  status: ItemStatus;
  boughtFrom: string;
  notes?: string;
  // storage paths, index 0 is the cover
  photos: string[];
  boughtAt: Date;
  listedAt?: Date;
  soldAt?: Date;
};

export type TimelineStep = {
  label: string;
  date: string;
  done: boolean;
};

export const SEGMENTS: { key: ItemStatus; label: string }[] = [
  { key: 'inhand', label: 'In hand' },
  { key: 'listed', label: 'Listed' },
  { key: 'sold', label: 'Sold' },
];

export const STATUS_LABEL: Record<ItemStatus, string> = {
  inhand: 'IN HAND',
  listed: 'LISTED',
  sold: 'SOLD',
};

export const MARKETPLACES = [
  'Facebook',
  'Gumtree',
  'Vinted',
  'OfferUp',
  'eBay',
  'Craigslist',
  'Kijiji',
  'Nextdoor',
];

const DAY_MS = 24 * 60 * 60 * 1000;

function daysBetween(from: Date, to: Date) {
  return Math.max(0, Math.round((to.getTime() - from.getTime()) / DAY_MS));
}

function shortDate(date: Date) {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

// recent days read better as words than as a date
export function formatBoughtDate(date: Date) {
  const midnight = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const offset = Math.round((midnight(new Date()) - midnight(date)) / DAY_MS);

  if (offset === 0) return 'Today';
  if (offset === 1) return 'Yesterday';
  return shortDate(date);
}

export type DateRange = { from?: Date; to?: Date };

export function rangeEmpty(range: DateRange) {
  return !range.from && !range.to;
}

// whole days on both ends, so "to 15 Jun" includes the 15th
export function inWindow(date: Date | undefined, range: DateRange) {
  if (rangeEmpty(range)) return true;
  if (!date) return false;
  if (range.from) {
    const start = new Date(range.from);
    start.setHours(0, 0, 0, 0);
    if (date.getTime() < start.getTime()) return false;
  }
  if (range.to) {
    const end = new Date(range.to);
    end.setHours(23, 59, 59, 999);
    if (date.getTime() > end.getTime()) return false;
  }
  return true;
}

export function rangeLabel(range: DateRange) {
  const f = (d: Date) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  if (rangeEmpty(range)) return 'Any time';
  if (range.from && range.to) return `${f(range.from)} – ${f(range.to)}`;
  if (range.from) return `From ${f(range.from)}`;
  return `Until ${f(range.to as Date)}`;
}

export function money(n: number) {
  return `$${Math.round(n).toLocaleString('en-US')}`;
}

export function signedMoney(n: number) {
  return `${n < 0 ? '-' : '+'}${money(Math.abs(n))}`;
}

// what it made, or what it should make if it hasn't sold
export function profitOf(item: InventoryItem) {
  return (item.soldFor ?? item.target) - item.paid;
}

// same number, different wording per status
export function heldLabel(item: InventoryItem) {
  const now = new Date();
  if (item.status === 'sold' && item.soldAt) {
    return `sold in ${daysBetween(item.boughtAt, item.soldAt)}d`;
  }
  if (item.status === 'listed' && item.listedAt) {
    return `${daysBetween(item.listedAt, now)}d listed`;
  }
  return `${daysBetween(item.boughtAt, now)}d held`;
}

export function timelineOf(item: InventoryItem): TimelineStep[] {
  return [
    { label: `Bought for ${money(item.paid)}`, date: shortDate(item.boughtAt), done: true },
    item.listedAt
      ? { label: `Listed for ${money(item.target)}`, date: shortDate(item.listedAt), done: true }
      : { label: 'Not listed yet', date: '—', done: false },
    item.soldAt
      ? {
          label: `Sold for ${money(item.soldFor ?? item.target)}`,
          date: shortDate(item.soldAt),
          done: true,
        }
      : { label: 'Not sold', date: '—', done: false },
  ];
}

export type Nudge = { kind: 'empty' } | { kind: 'unlisted'; count: number };

// one concrete reason to act today, quiet once everything is listed or sold
export function nudgeOf(items: InventoryItem[]): Nudge | null {
  if (items.length === 0) return { kind: 'empty' };
  const sitting = items.filter((item) => item.status === 'inhand').length;
  return sitting > 0 ? { kind: 'unlisted', count: sitting } : null;
}

export type ProfitPoint = {
  label: string;
  amount: number;
};

export type ProfitSummary = {
  invested: number;
  estValue: number;
  itemCount: number;
  // oldest first, the last one is the month we're in
  history: ProfitPoint[];
};

// the home card: monthly profit from sales, plus what the current stock is worth
export function profitSummaryOf(items: InventoryItem[], months = 7): ProfitSummary {
  const now = new Date();
  const history: ProfitPoint[] = [];

  for (let back = months - 1; back >= 0; back--) {
    const month = new Date(now.getFullYear(), now.getMonth() - back, 1);
    const amount = items.reduce((sum, item) => {
      if (
        item.soldAt &&
        item.soldAt.getFullYear() === month.getFullYear() &&
        item.soldAt.getMonth() === month.getMonth()
      ) {
        return sum + profitOf(item);
      }
      return sum;
    }, 0);
    history.push({ label: month.toLocaleDateString('en-US', { month: 'long' }), amount });
  }

  // sold items are money already made, the footer is about what's still in play
  const stock = items.filter((item) => item.status !== 'sold');
  return {
    invested: stock.reduce((sum, item) => sum + item.paid, 0),
    estValue: stock.reduce((sum, item) => sum + item.target, 0),
    itemCount: stock.length,
    history,
  };
}

// totals cover everything owned, not just the segment on screen
export function totalsOf(items: InventoryItem[]) {
  const invested = items.reduce((sum, i) => sum + i.paid, 0);
  const estProfit = items.reduce((sum, i) => sum + profitOf(i), 0);
  const roi = invested > 0 ? Math.round((estProfit / invested) * 100) : 0;
  return { invested, estProfit, roi };
}
