import { SERVER_URL } from "@env";

export async function postSignup(userInfo) {
  const response = await fetch(`${SERVER_URL}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userInfo)
  });

  return await response.json();
}

export async function putLogin(userInfo) {
  const response = await fetch(`${SERVER_URL}/auth`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userInfo)
  });

  return await response.json();
}
