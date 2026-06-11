export type ItemStatus = 'inhand' | 'listed' | 'sold';

export type InventoryItem = {
  id: string;
  name: string;
  paid: number;
  target: number;
  status: ItemStatus;
  boughtFrom: string;
  notes?: string;
  photo?: string;
  // day offsets stand in for real timestamps until the table exists
  boughtDaysAgo: number;
  listedDaysAgo?: number;
  soldDaysAgo?: number;
  soldFor?: number;
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

function daysAgo(n: number) {
  return new Date(Date.now() - n * DAY_MS);
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
  if (item.status === 'sold') return `sold in ${item.boughtDaysAgo - (item.soldDaysAgo ?? 0)}d`;
  if (item.status === 'listed') return `${item.listedDaysAgo ?? 0}d listed`;
  return `${item.boughtDaysAgo}d held`;
}

export function timelineOf(item: InventoryItem): TimelineStep[] {
  return [
    {
      label: `Bought for ${money(item.paid)}`,
      date: shortDate(daysAgo(item.boughtDaysAgo)),
      done: true,
    },
    item.listedDaysAgo != null
      ? {
          label: `Listed for ${money(item.target)}`,
          date: shortDate(daysAgo(item.listedDaysAgo)),
          done: true,
        }
      : { label: 'Not listed yet', date: '—', done: false },
    item.soldDaysAgo != null
      ? {
          label: `Sold for ${money(item.soldFor ?? item.target)}`,
          date: shortDate(daysAgo(item.soldDaysAgo)),
          done: true,
        }
      : { label: 'Not sold', date: '—', done: false },
  ];
}

// totals cover everything owned, not just the segment on screen
export function totalsOf(items: InventoryItem[]) {
  const invested = items.reduce((sum, i) => sum + i.paid, 0);
  const estProfit = items.reduce((sum, i) => sum + profitOf(i), 0);
  const roi = invested > 0 ? Math.round((estProfit / invested) * 100) : 0;
  return { invested, estProfit, roi };
}

// stand-in rows until the real table is wired up
export const SAMPLE_ITEMS: InventoryItem[] = [
  {
    id: '1',
    name: 'Velvet Armchair',
    paid: 120,
    target: 320,
    status: 'inhand',
    boughtFrom: 'Facebook',
    notes: 'Needs a steam clean, small tear on the back left. Seller said it came from an estate sale.',
    photo: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=900&q=80',
    boughtDaysAgo: 3,
  },
  {
    id: '2',
    name: 'Trek Road Bike',
    paid: 140,
    target: 240,
    status: 'inhand',
    boughtFrom: 'Gumtree',
    notes: 'Rear tyre needs replacing, everything else is solid.',
    boughtDaysAgo: 11,
  },
  {
    id: '3',
    name: 'MacBook Air M1',
    paid: 470,
    target: 640,
    status: 'inhand',
    boughtFrom: 'Facebook',
    boughtDaysAgo: 2,
  },
  {
    id: '4',
    name: 'Herman Miller Aeron',
    paid: 310,
    target: 560,
    status: 'listed',
    boughtFrom: 'eBay',
    notes: 'Size B, fully loaded. Two small scuffs on the base.',
    boughtDaysAgo: 19,
    listedDaysAgo: 8,
  },
  {
    id: '5',
    name: 'Canon EOS 90D',
    paid: 540,
    target: 780,
    status: 'listed',
    boughtFrom: 'Vinted',
    boughtDaysAgo: 12,
    listedDaysAgo: 4,
  },
  {
    id: '6',
    name: 'PS5 Disc Edition',
    paid: 280,
    target: 390,
    status: 'sold',
    boughtFrom: 'Facebook',
    notes: 'Went for slightly under asking, buyer collected same day.',
    boughtDaysAgo: 30,
    listedDaysAgo: 24,
    soldDaysAgo: 9,
    soldFor: 375,
  },
  {
    id: '7',
    name: 'Dyson V11',
    paid: 160,
    target: 265,
    status: 'sold',
    boughtFrom: 'Gumtree',
    boughtDaysAgo: 22,
    listedDaysAgo: 18,
    soldDaysAgo: 13,
    soldFor: 265,
  },
];

export function itemById(id: string) {
  return SAMPLE_ITEMS.find((i) => i.id === id);
}

// drops it for this session only, there's nothing to delete from yet
export function removeItem(id: string) {
  const at = SAMPLE_ITEMS.findIndex((i) => i.id === id);
  if (at >= 0) SAMPLE_ITEMS.splice(at, 1);
}
