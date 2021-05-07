import { SERVER_URL } from "@env";

export async function postNewWorryPost(postInfo) {
  const response = await fetch(`${SERVER_URL}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postInfo)
  });

  return await response.json();
}
