const Product = require('../app/product/modal');

const products = [
  { productName: 'Aurora Lamp', rate: 120, unit: 'single' },
  { productName: 'Nebula Paint Set', rate: 170, unit: 'set' },
  { productName: 'Stellar Sound Speaker', rate: 220, unit: 'single' },
  { productName: 'Lunar Lens Camera', rate: 270, unit: 'single' },
  { productName: 'Galactic Gear Backpack', rate: 320, unit: 'single' },
];
const seedProducts = async () => {
  try {
    const existingProducts = await Product.countDocuments();

    if (existingProducts !== 0) {
      return;
    }

    const queries = products.map((product) => Product.create(product));
    await Promise.all(queries);
  } catch (error) {
    console.error('Failed to initialize products');
  }
};

module.exports = seedProducts;
