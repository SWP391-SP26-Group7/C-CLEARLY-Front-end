// seedProducts.js - seed sample eyeglass products into localStorage
const STORAGE_KEY = 'cc_products_v1';

const defaultProducts = [
  {
    id: 'P001',
    sku: 'KL-001',
    name: 'Kính Lily',
    type: 'Frame',
    price: 350000,
    cost: 200000,
    stock: 120,
    images: ['/images/glasses1.jpg'],
    description: 'Kính gọng nhẹ, phù hợp mặt tròn.',
    variants: []
  },
  {
    id: 'P002',
    sku: 'KR-002',
    name: 'Kính Tròn',
    type: 'Frame',
    price: 420000,
    cost: 240000,
    stock: 60,
    images: ['/images/glasses2.jpg'],
    description: 'Phong cách retro, gọng kim loại.',
    variants: []
  },
  {
    id: 'P003',
    sku: 'KC-003',
    name: 'Kính Cat-Eye',
    type: 'Frame',
    price: 480000,
    cost: 260000,
    stock: 35,
    images: ['/images/glasses3.jpg'],
    description: 'Phong cách nữ tính, viền nổi bật.',
    variants: []
  },
  {
    id: 'P004',
    sku: 'LA-004',
    name: 'Tròng AR 1.56',
    type: 'Lens',
    price: 220000,
    cost: 120000,
    stock: 200,
    images: [],
    description: 'Tròng chống phản quang cơ bản.',
    variants: []
  }
];

export default function seedProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
    }
  } catch (e) {
    /* ignore */
  }
  return defaultProducts;
}

export { defaultProducts, STORAGE_KEY };
