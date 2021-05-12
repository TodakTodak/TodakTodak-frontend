import { SERVER_URL } from "@env";

export async function patchCommentLike(commentLikeInfo) {
  const response = await fetch(`${SERVER_URL}/comment`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(commentLikeInfo)
  });

  return await response.json();
}
