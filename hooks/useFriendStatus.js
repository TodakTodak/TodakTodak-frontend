/**
 * This hook is set request, response friend information for friendCard component.
 * The arguments friend must have request or response friend status.
 *
 * @param {Object} friend the Object of friend request information
 *
 * @returns {String} status of friend request
*/

import { useState, useEffect } from "react";

import {
  FRIEND,
  PENDING,
  CHECK_STATUS,
  REJECT_FRIEND,
  RECEIVE_REJECT,
  SENDING_PENDING,
  RECEIVE_PENDING
} from "../constants/friendStatus";

const useFriendStatus = (friend) => {
  const [friendStatus, setFriendStatus] = useState("");

  useEffect(() => {
    switch (friend.status) {
      case SENDING_PENDING:
        setFriendStatus(PENDING);
        break;

      case RECEIVE_PENDING:
        setFriendStatus(CHECK_STATUS);
        break;

      case RECEIVE_REJECT:
        setFriendStatus(REJECT_FRIEND);
        break;

      default:
        setFriendStatus(FRIEND);
        break;
    }
  }, [friend]);

  return friendStatus;
};

export default useFriendStatus;
