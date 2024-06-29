import Image from "next/image";
import PostInfo from "./PostInfo";
import PostInteraction from "./PostInteraction";
import { Suspense } from "react";
import Comments from "./Comments";

export default function Post() {
    // const posts = []
  return (
    <div className="flex flex-col gap-4">
    {/* USER */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={"/noAvatar.png"}
          width={40}
          height={40}
          alt=""
          className="w-10 h-10 rounded-full"
        />
        <span className="font-medium">
          {/* {post.user.name && post.user.surname
            ? post.user.name + " " + post.user.surname
            : post.user.username} */}
            username
        </span>
      </div>
      <PostInfo/>
    </div>
    {/* DESC */}
    <div className="flex flex-col gap-4">
      {/* {post.img && ( */}
        <div className="w-full min-h-96 relative">
          <Image
            src={"/demo.jpg"}
            fill
            className="object-cover rounded-md"
            alt=""
          />
        </div>
      {/* )} */}
      <p>this is post desciption</p>
    </div>
    {/* INTERACTION */}
    <Suspense fallback="Loading...">
      <PostInteraction
        // postId={post.id}
        // likes={post.likes.map((like) => like.userId)}
        // commentNumber={post._count.comments}
      />
    </Suspense>
    <Suspense fallback="Loading...">
      <Comments />
    </Suspense>
  </div>
  );
}
