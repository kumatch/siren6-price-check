import { PriceType } from './PriceForm';
import type { Item, ResourceItem } from '../data/types';

export type ResultItem = { name: string };
export type ResultResourceItem = { name: string, resource: number };

export const searchItems = (values: Item[], params: { type: PriceType, price: number }) => {
  return values.reduce((acc, cur) => {
    const basePrice = params.type === 'buy' ? cur.buy_price : cur.sell_price;

    if (basePrice === params.price) {
      return [
        ...acc,
        { name: cur.name }
      ]
    }

    return acc;
  }, [] as ResultItem[])
}

export const searchResourceItems = (values: ResourceItem[], params: { type: PriceType, price: number }, maxResource: number) => {
  return values.reduce((acc, cur) => {
    const basePrice = params.type === 'buy' ? cur.buy_price : cur.sell_price;
    const tick = params.type === 'buy' ? cur.tick_for_buy : cur.tick_for_sell;

    for (let i = 0; i < (maxResource + 1); i++) {
      if ((basePrice + tick * i) === params.price) {
        return [
          ...acc,
          { name: cur.name, resource: i }
        ]
      }
    }

    return acc;
  }, [] as ResultResourceItem[])
}