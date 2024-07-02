"use client";
import { acceptFollowRequest, declineFollowRequest } from "@/lib/actions";
import { FollowRequest, User } from "@prisma/client";
import Image from "next/image";
import React, { useOptimistic, useState } from "react";

type RequestWithuser = FollowRequest & {
  sender: User;
};
export default function FriendRequestList({
  requests,
}: {
  requests: RequestWithuser[];
}) {
  const [requestState, setRequestState] = useState(requests);

  const acceptRequest = async (requestId: string, userId: string) => {
    setOptimisticRequestsState(requestId);
    try {
      await acceptFollowRequest(userId);
      setRequestState((prev) => prev.filter((req) => req.Id !== requestId));
    } catch (error) {}
  };
  const declineRequest = async (requestId: string, userId: string) => {
    setOptimisticRequestsState(requestId);
    try {
      await declineFollowRequest(userId);
      setRequestState((prev) => prev.filter((req) => req.Id !== requestId));
    } catch (error) {}
  };

  const [optimisticRequestsState, setOptimisticRequestsState] = useOptimistic(
    requestState,
    (state, value: string) => state.filter((req) => req.Id !== value)
  );
  return (
    <div className="">
      {/* {optimisticRequests.map((request) => ( */}
      {optimisticRequestsState.map((request) => (
        <div className="flex items-center justify-between" key={request.id}>
          <div className="flex items-center gap-4">
            <Image
              src={
                (request.sender.avatar && request.sender.avatar) ||
                "/noAvatar.png"
              }
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-semibold">
              {request.sender.name && request.sender.surname
                ? request.sender.name + " " + request.sender.surname
                : request.sender.username}
            </span>
          </div>
          <div className="flex gap-3 justify-end">
            <form action={() => acceptRequest(request.Id, request.sender.Id)}>
              <button>
                <Image
                  src="/accept.png"
                  alt=""
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </button>
            </form>
            <form action={() => declineRequest(request.Id, request.sender.Id)}>
              <button>
                <Image
                  src="/reject.png"
                  alt=""
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}
