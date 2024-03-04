interface TBasketItem {
  id: number | string;
  image: string;
  priceOld?: number;
  price: number;
  name: string;
  count: number;
  inStock?: boolean;
}
