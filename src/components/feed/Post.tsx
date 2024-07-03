import Image from "next/image";
import PostInfo from "./PostInfo";
import PostInteraction from "./PostInteraction";
import { Suspense } from "react";
import Comments from "./Comments";
import { Post as PostType, User } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

type feedPostType = PostType & { user: User } & {
  likes: [{ userId: string }];
} & { _count: { comments: number } };
export default function Post({ post }: { post: feedPostType }) {
  // const posts = []
  const { userId } = auth();
  return (
    <div className="flex flex-col gap-4">
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/profile/${post.user.username}`}>
            <Image
              src={post.user.avatar || "/noAvatar.png"}
              width={40}
              height={40}
              alt=""
              className="w-10 h-10 rounded-full"
            />
          </Link>
          <span className="font-medium">
            {post.user.name && post.user.surname
              ? post.user.name + " " + post.user.surname
              : post.user.username}
          </span>
        </div>
        {userId === post.user.Id && <PostInfo postId={post.Id} />}
      </div>
      {/* DESC */}
      <div className="flex flex-col gap-4">
        {post.img && (
          <div className="w-full min-h-[500px] relative">
            <Image
              src={post.img}
              fill
              className="object-cover rounded-md"
              alt=""
            />
          </div>
        )}
        <p>{post.desc}</p>
      </div>
      {/* INTERACTION */}
      <Suspense fallback="Loading...">
        <PostInteraction
          postId={post.Id}
          likes={post.likes.map((like) => like.userId)}
          comments={post._count.comments}
        />
      </Suspense>
      <Suspense fallback="Loading...">
        <Comments postId={post.Id} />
      </Suspense>
    </div>
  );
}
