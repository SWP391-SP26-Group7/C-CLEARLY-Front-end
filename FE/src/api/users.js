import api from "./index";

// BR-25: Quản lý nhân sự và phân quyền.

export function fetchUsers(params = {}) {
  return api.request(`/users?${new URLSearchParams(params)}`);
}

export function getUser(id) {
  return api.request(`/users/${id}`);
}

export function createUser(data) {
  return api.request(`/users`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateUser(id, data) {
  return api.request(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteUser(id) {
  return api.request(`/users/${id}`, { method: "DELETE" });
}

// roles & permissions
export function fetchRoles() {
  return api.request(`/roles`);
}

export function fetchPermissions() {
  return api.request(`/permissions`);
}

export function assignRole(userId, roleId) {
  return api.request(`/users/${userId}/role`, {
    method: "PUT",
    body: JSON.stringify({ roleId }),
  });
}

export function updateRolePermissions(roleId, permissionIds) {
  return api.request(`/roles/${roleId}/permissions`, {
    method: "PUT",
    body: JSON.stringify({ permissionIds }),
  });
}
