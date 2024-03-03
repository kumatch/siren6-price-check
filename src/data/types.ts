export type Item = {
  name: string,
  buy_price: number,
  sell_price: number,
}

export type ResourceItem = Item & {
  tick_for_buy: number,
  tick_for_sell: number,
}

export type Data = {
  bracelets: Item[],
  grass: Item[],
  pots: ResourceItem[],
  staves: ResourceItem[],
  scrolls: Item[],
}

