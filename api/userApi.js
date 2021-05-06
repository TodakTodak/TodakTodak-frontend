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
