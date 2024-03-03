import { PriceType } from './PriceForm';
import type { Item, ResourceItem } from '../data/types';

export type ResultItem = { name: string };
export type ResultBlessingItem = { name: string, blessing: boolean };
export type ResultResourceItem = { name: string, resource: number };

export type Fluctuation = 'none' | 'cursed' | 'blessing';

const correctionPrice = (price: number, fluctuation: Fluctuation): number => {
  switch (fluctuation) {
    case 'cursed':
      return Math.floor(price * 0.87)
    case 'blessing':
      return price * 2;
    case 'none':
    default:
      return price;
  }
}

export const searchItems = (
  values: Item[],
  params: { type: PriceType, price: number },
  options: { fluctuation: Fluctuation } | undefined
) => {
  const fluctuation = options?.fluctuation || 'none';

  return values.reduce((acc, cur) => {
    const basePrice = params.type === 'buy' ? cur.buy_price : cur.sell_price;

    if (correctionPrice(basePrice, fluctuation) === params.price) {
      return [
        ...acc,
        { name: cur.name }
      ]
    }

    return acc;
  }, [] as ResultItem[])
}

export const searchBlessingItems = (
  values: Item[],
  params: { type: PriceType, price: number },
  options: { fluctuation: Fluctuation } | undefined
) => {
  const fluctuation = options?.fluctuation || 'none';

  return values.reduce((acc, cur) => {
    const basePrice = params.type === 'buy' ? cur.buy_price : cur.sell_price;

    if (correctionPrice(basePrice, fluctuation) === params.price) {
      return [
        ...acc,
        { name: cur.name, blessing: false }
      ]
    } else if (correctionPrice(basePrice, 'blessing') === params.price) {
      return [
        ...acc,
        { name: cur.name, blessing: true }
      ]
    }

    return acc;
  }, [] as ResultBlessingItem[])
}

export const searchResourceItems = (
  values: ResourceItem[],
  params: { type: PriceType, price: number },
  options: { fluctuation: Fluctuation, maxResource: number } | undefined
) => {
  const maxResource = options?.maxResource || 7
  const fluctuation = options?.fluctuation || 'none';

  return values.reduce((acc, cur) => {
    const basePrice = params.type === 'buy' ? cur.buy_price : cur.sell_price;
    const tick = params.type === 'buy' ? cur.tick_for_buy : cur.tick_for_sell;

    for (let i = 0; i < (maxResource + 1); i++) {
      if (correctionPrice((basePrice + tick * i), fluctuation) === params.price) {
        return [
          ...acc,
          { name: cur.name, resource: i }
        ]
      }
    }

    return acc;
  }, [] as ResultResourceItem[])
}