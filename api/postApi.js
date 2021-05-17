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

export async function getCategoryPosts(category, page) {
  const response = await fetch(`${SERVER_URL}/post/category/${category}`, {
    method: "GET",
    headers: {
      "page": page
    }
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

export async function patchPostLike(likeInfo) {
  const response = await fetch(`${SERVER_URL}/post/like`, {
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

export async function getDetailPost(postId) {
  const response = await fetch(`${SERVER_URL}/post/${postId}`, {
    method: "GET"
  });

  return await response.json();
}

export async function patchPost(postInfo) {
  const response = await fetch(`${SERVER_URL}/post`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postInfo)
  });

  return await response.json();
}

export async function deletePost(postId) {
  const response = await fetch(`${SERVER_URL}/post/${postId}`, {
    method: "DELETE"
  });

  return await response.json();
}
