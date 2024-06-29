import React from "react";

export default function UserInfoCardInteraction() {
  return (
    <>
      <form>
        <button className="w-full bg-blue-500 text-white text-sm rounded-md p-2">
          {/* {optimisticState.following
            ? "Following"
            : optimisticState.followingRequestSent
            ? "Friend Request Sent"
            : "Follow"} */}
            "Following"
        </button>
      </form>
      <form className="self-end ">
        <button>
          <span className="text-red-400 text-xs cursor-pointer">
            {/* {optimisticState.blocked ? "Unblock User" : "Block User"} */}
            Block User
          </span>
        </button>
      </form>
    </>
  );
}
