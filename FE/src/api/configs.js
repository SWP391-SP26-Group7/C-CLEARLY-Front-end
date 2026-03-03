import api from "./index";

// BR-24: Quản lý chính sách đổi trả, bảo hành (System_Configs)

export function fetchConfigs(group) {
  // nếu group không được cung cấp, lấy tất cả
  const path = group ? `/configs?group=${group}` : "/configs";
  return api.request(path);
}

export function upsertConfig(key, value, group) {
  return api.request(`/configs/${key}`, {
    method: "PUT",
    body: JSON.stringify({ value, group }),
  });
}

export function deleteConfig(key) {
  return api.request(`/configs/${key}`, { method: "DELETE" });
}
