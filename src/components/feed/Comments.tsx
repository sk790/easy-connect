import React from "react";
import CommentList from "./CommentList";
import prisma from "../../lib/client";

export default async function Comments({ postId }: { postId: string }) {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: true,
    },
  });
  return (
    <div className="">
      {/* WRITE */}
      <CommentList comments = {comments} postId={postId} />
    </div>
  );
}
