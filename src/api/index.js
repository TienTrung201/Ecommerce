const domain = 'https://localhost:7044';

const api = {
  promotions: domain + '/api/promotions',
  categories: domain + '/api/categories',
  productOptions: domain + '/api/productoptions',
  products: domain + '/api/products',
  shoppingCarts: domain + '/api/shoppingcarts',
  shippingMethods: domain + '/api/shippingmethods',
  orderStatuses: domain + '/api/orderstatuses',
  paymentTypes: domain + '/api/paymenttypes',
  paymentMethods: domain + '/api/paymentmethods',
  address: domain + '/api/addresses',
  wishLists: domain + '/api/wishlists',
  shopOrders: domain + '/api/shoporders',
  providers: domain + '/api/providers',
};

export { api };
