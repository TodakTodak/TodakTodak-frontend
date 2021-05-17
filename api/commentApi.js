import { SERVER_URL } from "@env";

export async function getMyComments(userEmail) {
  const response = await fetch(`${SERVER_URL}/comment/${userEmail}`, {
    method: "GET"
  });

  return await response.json();
}

export async function patchCommentLike(commentLikeInfo) {
  const response = await fetch(`${SERVER_URL}/comment/like`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(commentLikeInfo)
  });

  return await response.json();
}

export async function patchComment(commentInfo) {
  const response = await fetch(`${SERVER_URL}/comment`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(commentInfo)
  });

  return await response.json();
}

export async function deleteComment(commentId) {
  const response = await fetch(`${SERVER_URL}/comment/${commentId}`, {
    method: "DELETE"
  });

  return await response.json();
}
