export type ItemStatus = 'inhand' | 'listed' | 'sold';

export type InventoryItem = {
  id: string;
  name: string;
  paid: number;
  target: number;
  status: ItemStatus;
  // how long it has been in whatever state it's in
  days: number;
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

export function money(n: number) {
  return `$${Math.round(n).toLocaleString('en-US')}`;
}

export function signedMoney(n: number) {
  return `${n < 0 ? '-' : '+'}${money(Math.abs(n))}`;
}

// same number, different wording per status
export function heldLabel(item: InventoryItem) {
  if (item.status === 'listed') return `${item.days}d listed`;
  if (item.status === 'sold') return `sold in ${item.days}d`;
  return `${item.days}d held`;
}

// totals cover everything owned, not just the segment on screen
export function totalsOf(items: InventoryItem[]) {
  const invested = items.reduce((sum, i) => sum + i.paid, 0);
  const estProfit = items.reduce((sum, i) => sum + (i.target - i.paid), 0);
  const roi = invested > 0 ? Math.round((estProfit / invested) * 100) : 0;
  return { invested, estProfit, roi };
}

// stand-in rows until the real table is wired up
export const SAMPLE_ITEMS: InventoryItem[] = [
  { id: '1', name: 'Velvet Armchair', paid: 120, target: 320, status: 'inhand', days: 3 },
  { id: '2', name: 'Trek Road Bike', paid: 140, target: 240, status: 'inhand', days: 11 },
  { id: '3', name: 'MacBook Air M1', paid: 470, target: 640, status: 'inhand', days: 2 },
  { id: '4', name: 'Herman Miller Aeron', paid: 310, target: 560, status: 'listed', days: 8 },
  { id: '5', name: 'Canon EOS 90D', paid: 540, target: 780, status: 'listed', days: 4 },
  { id: '6', name: 'PS5 Disc Edition', paid: 280, target: 390, status: 'sold', days: 21 },
  { id: '7', name: 'Dyson V11', paid: 160, target: 265, status: 'sold', days: 9 },
];
