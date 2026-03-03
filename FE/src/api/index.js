// chung API wrapper (chưa kết nối backend thực)
// tất cả các service sẽ dùng fetch với BASE_URL tạm

const BASE_URL = process.env.REACT_APP_API_URL || "https://api.example.com";

function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  // thêm header common
  const opts = {
    headers: {
      "Content-Type": "application/json",
      // authorization: `Bearer ${token}` // placeholder
    },
    ...options,
  };
  return fetch(url, opts).then((res) => {
    if (!res.ok) {
      return res.json().then((err) => Promise.reject(err));
    }
    return res.json();
  });
}

export default { request };

// re-export các service để import từ một nơi
export * as ordersService from "./orders";
export * as prescriptionsService from "./prescriptions";
export * as productsService from "./products";
export * as configsService from "./configs";
export * as usersService from "./users";
export * as notificationsService from "./notifications";
