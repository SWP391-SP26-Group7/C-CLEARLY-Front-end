import api from "./index";

// BR-13: Kiểm tra và validate prescription (WAITING/APPROVED/REJECTED)
// BR-19: Gia công lắp tròng với đơn prescription (tham chiếu trong orders)

export function fetchPrescriptions(params = {}) {
  return api.request(`/prescriptions?${new URLSearchParams(params)}`);
}

export function getPrescription(id) {
  return api.request(`/prescriptions/${id}`);
}

export function updatePrescriptionStatus(id, status) {
  // status: WAITING, APPROVED, REJECTED
  return api.request(`/prescriptions/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
}

export function uploadPrescriptionImage(orderItemId, imageFile) {
  // placeholder for file upload
  const form = new FormData();
  form.append("image", imageFile);
  return fetch(`${process.env.REACT_APP_API_URL || "https://api.example.com"}/prescriptions/${orderItemId}/upload`, {
    method: "POST",
    body: form,
  }).then((res) => res.json());
}
