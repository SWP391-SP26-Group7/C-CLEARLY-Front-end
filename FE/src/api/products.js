import api from "./index";

// BR-22: Quản lý sản phẩm, frame, lens, variant, hình ảnh.
// BR-23: Thiết lập giá bán, combo và khuyến mãi.

export function fetchProducts(params = {}) {
  return api.request(`/products?${new URLSearchParams(params)}`);
}

export function getProduct(id) {
  return api.request(`/products/${id}`);
}

export function createProduct(data) {
  return api.request(`/products`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateProduct(id, data) {
  return api.request(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteProduct(id) {
  return api.request(`/products/${id}`, { method: "DELETE" });
}

// variants
export function fetchVariants(productId) {
  return api.request(`/products/${productId}/variants`);
}

export function updateVariant(variantId, data) {
  return api.request(`/variants/${variantId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// images
export function uploadProductImage(productId, imageFile) {
  const form = new FormData();
  form.append("image", imageFile);
  return fetch(`${process.env.REACT_APP_API_URL || "https://api.example.com"}/products/${productId}/images`, {
    method: "POST",
    body: form,
  }).then((res) => res.json());
}

export function deleteProductImage(imageId) {
  return api.request(`/product-images/${imageId}`, { method: "DELETE" });
}

// promotions
export function fetchPromotions(params = {}) {
  return api.request(`/promotions?${new URLSearchParams(params)}`);
}

export function createPromotion(data) {
  return api.request(`/promotions`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updatePromotion(id, data) {
  return api.request(`/promotions/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deletePromotion(id) {
  return api.request(`/promotions/${id}`, { method: "DELETE" });
}
