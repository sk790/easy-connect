import { auth } from "@clerk/nextjs/server";
import Post from "./Post";
import prisma from "../../lib/client";

const Feed = async ({ username }: { username?: string }) => {
  const { userId } = auth();
  console.log("UserId:", userId);

  let posts: any[] = [];
  if (username) {
    posts = await prisma.post.findMany({
      where: {
        user: {
          username: username,
        },
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  if (!username && userId) {
    console.log("userId:saurabh", userId);

    const following = await prisma.follower.findMany({
      where: {
        followingId: userId,
      },
      select: {
        followerId: true,
      },
    });
    const followingIds = following.map((f) => f.followerId);
    const ids = [userId, ...followingIds];

    posts = await prisma.post.findMany({
      where: {
        userId: {
          in: ids,
        },
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log("posts:", posts);
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-12">
      {posts.length
        ? posts.map((post) => <Post key={post.id} post={post} />)
        : "No posts found!"}
    </div>
  );
};

export default Feed;
