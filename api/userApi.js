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

export async function addFriend(friendInfo) {
  const response = await fetch(`${SERVER_URL}/auth/friend`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(friendInfo)
  });

  return await response.json();
}

export async function getWaitingFriends(userInfo) {
  const response = await fetch(`${SERVER_URL}/auth/waitingFriend`, {
    method: "GET",
    headers: {
      "user": userInfo
    }
  });

  return await response.json();
}

export async function acceptPendingFriend(friendInfo) {
  const response = await fetch(`${SERVER_URL}/auth/waitingFriend`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(friendInfo)
  });

  return await response.json();
}

export async function rejectPendingFriend(friendInfo) {
  const response = await fetch(`${SERVER_URL}/auth/rejectFriend`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(friendInfo)
  });

  return await response.json();
}

export async function getFriends(userEmail) {
  const response = await fetch(`${SERVER_URL}/auth/friend`, {
    method: "GET",
    headers: {
      "user": userEmail
    }
  });

  return await response.json();
}

export async function getMyPosts(userEmail) {
  const response = await fetch(`${SERVER_URL}/auth/posts`, {
    method: "GET",
    headers: {
      "usereMail": userEmail
    }
  });

  return await response.json();
}
