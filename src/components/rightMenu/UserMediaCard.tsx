import prisma from "../../lib/client";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function UserMediaCard({ user }: { user: User }) {
  if (!user) return null;

  const posts = await prisma.post.findMany({
    where: {
      userId: user.Id,
      img: {
        not: null,
      },
    },
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* TOP */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Media</span>
        <Link href="/" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>
      {/* BOTTOM */}
      <div className="flex gap-4 justify-between flex-wrap">
        {posts && posts.length > 0
          ? posts.map((post) => (
              <div className="relative w-1/5 h-24" key={post.id}>
                <Image
                  src={post.img!}
                  alt=""
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            ))
          : "No Media Found"}
      </div>
    </div>
  );
}
