import FriendRequestList from "@/components/rightMenu/FriendRequestList";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

export default async function page() {
  const { userId } = auth();
  if (!userId) return null;

  const requests = await prisma.followRequest.findMany({
    where: {
      receiverId: userId,
    },
    include: {
      sender: true,
    },
  });

  if (requests.length === 0)
    return (
      <>
        <div className="text-gray-500 text-center min-h-full flex justify-center">
          No Friend Requests
        </div>
      </>
    );
  return (
    <div className="h-screen">
      <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
        {/* TOP */}
        <div className="flex justify-between items-center font-medium">
          <span className="text-gray-500">Friend Requests</span>
          {/* <Link href="/" className="text-blue-500 text-xs">
          See all
        </Link> */}
        </div>
        {/* USER */}
        <FriendRequestList requests={requests} />
      </div>
    </div>
  );
}
