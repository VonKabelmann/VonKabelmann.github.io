class Product {
  constructor(name, price, thumbnailImage, fullImage) {
    this.name = name;
    this.price = price;
    this.thumbnailImage = thumbnailImage;
    this.fullImage = fullImage;
  }
}
class CartItem {
  constructor(product, amount) {
    this.product = product;
    this.amount = amount;
  }
}
const products = [
  new Product(
    "PRODUCTNAME",
    13.37,
    "THUMBNAIL PATH",
    "FULL IMAGE PATH / ARRAY OF PATHS"
  ),
];
