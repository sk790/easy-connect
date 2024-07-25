"use client";
import { blockUser, switchFollow } from "../../lib/actions";
import React, { useOptimistic, useState } from "react";

export default function UserInfoCardInteraction({
  userId,
  isFollowing,
  isFollowingSent,
  isUserBlocked,
}: {
  userId: string;
  isFollowing: boolean;
  isFollowingSent: boolean;
  isUserBlocked: boolean;
}) {
  const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isUserBlocked,
    followingRequestSent: isFollowingSent,
  });

  const follow = async () => {
    try {
      setOptimisticState("follow");
      await switchFollow(userId);
      setUserState((prev) => ({
        ...prev,
        following: prev.following && false,
        followingRequestSent:
          !prev.following && !prev.followingRequestSent ? true : false,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  const [optimisticState, setOptimisticState] = useOptimistic(
    userState,
    (state, value: "follow" | "block") =>
      value === "follow"
        ? {
            ...state,
            following: state.following && false,
            followingRequestSent:
              !state.following && !state.followingRequestSent ? true : false,
          }
        : { ...state, blocked: !state.blocked }
  );
  const block = async () => {
    try {
      setOptimisticState("block");
      await blockUser(userId);
      setUserState((prev) => ({ ...prev, blocked: !prev.blocked }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <>
        <form action={follow}>
          <button className="w-full bg-blue-500 text-white text-sm rounded-md p-2">
            {optimisticState.following
              ? "Follow"
              : optimisticState.followingRequestSent
              ? "Friend Request Sent"
              : "Unfollow"}
          </button>
        </form>
        <form action={block} className="self-end ">
          <button>
            <span className="text-red-400 text-xs cursor-pointer">
              {optimisticState.blocked ? "Unblock User" : "Block User"}
            </span>
          </button>
        </form>
      </>
    </>
  );
}
