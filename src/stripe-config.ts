export interface Product {
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
}

export const products: Product[] = [
  {
    priceId: 'price_1RvKtn2Ni4rxWswrkI3Edrsf',
    name: 'DIY Label Crowdfund',
    description: 'Help crowdfund the development of DIY Label.',
    mode: 'payment',
  },
];

export const getProductByPriceId = (priceId: string): Product | undefined => {
  return products.find(product => product.priceId === priceId);
};