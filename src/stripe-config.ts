export interface Product {
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
}

export const products: Product[] = [
  {
    priceId: 'price_1RvL2S2Ni4rxWswrHkNcLetB',
    name: 'DIY Label Crowdfund',
    description: 'Crowdfund development of DIY Label, a platform that redirects online print-on-demand orders to local neighbourhood print shops. Suggested amount: typical cost of a print-on-demand T-shirt.',
    mode: 'payment',
  },
];

export const getProductByPriceId = (priceId: string): Product | undefined => {
  return products.find(product => product.priceId === priceId);
};