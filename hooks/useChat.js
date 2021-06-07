/**
 * This hook is set initial chatting information.
 * Used by socket.io for live chat
 *
 * @param {Object} chatInfo the Object of chat information
 *
 * @returns {Object} socket and chatting list
 */

import { useEffect, useState } from "react";
import io from "socket.io-client";

import { SERVER_URL } from "@env";
import {
  JOIN_ROOM,
  LEAVE_USER,
  RECEIVE_CHAT,
  JOIN_USER_MESSAGE,
  LEAVE_USER_MESSAGE,
  RECEIVE_INITAL_CHATS
} from "../constants/socketEvents";

let socket;

const useChat = (chatInfo) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    socket = io.connect(SERVER_URL);

    socket.emit(JOIN_ROOM, chatInfo);

    socket.on(RECEIVE_CHAT, (data) =>
      setChats((chats) => [...chats, data])
    );

    socket.on(RECEIVE_INITAL_CHATS, (data) =>
      setChats(data)
    );

    socket.on(JOIN_USER_MESSAGE, (data) =>
      setChats((chats) => [...chats, data])
    );

    socket.on(LEAVE_USER_MESSAGE, (data) =>
      setChats((chats) => [...chats, data])
    );

    return () => {
      socket.emit(LEAVE_USER, chatInfo);
      socket.removeAllListeners();
    };
  }, []);

  return { chats, socket };
};

export default useChat;
