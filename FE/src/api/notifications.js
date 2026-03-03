import api from "./index";

// BR-17: Gửi email template và hỗ trợ khách hàng

export function fetchTemplates() {
  return api.request(`/notification-templates`);
}

export function sendTemplate(templateCode, to, data) {
  return api.request(`/notifications/send`, {
    method: "POST",
    body: JSON.stringify({ templateCode, to, data }),
  });
}
