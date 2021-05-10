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

export async function getMyPosts(userEmail) {
  const response = await fetch(`${SERVER_URL}/post/${userEmail}`, {
    method: "GET"
  });

  return await response.json();
}

export async function getMyComments(userEmail) {
  const response = await fetch(`${SERVER_URL}/comment/${userEmail}`, {
    method: "GET"
  });

  return await response.json();
}

export async function getCategoryPosts(category) {
  const response = await fetch(`${SERVER_URL}/post/category/${category}`, {
    method: "GET"
  });

  return await response.json();
}

export async function patchComment(commentInfo) {
  const response = await fetch(`${SERVER_URL}/post/comments`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(commentInfo)
  });

  return await response.json();
}

export async function patchPost(likeInfo) {
  const response = await fetch(`${SERVER_URL}/post`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(likeInfo)
  });

  return await response.json();
}

export async function patchPostCommentLike(likeInfo) {
  const response = await fetch(`${SERVER_URL}/post/comments/like`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(likeInfo)
  });

  return await response.json();
}
