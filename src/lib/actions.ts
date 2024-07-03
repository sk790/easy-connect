"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const switchFollow = async (userId: string) => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) {
    throw new Error("user not logged in");
  }

  try {
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId,
      },
    });
    if (existingFollow) {
      await prisma.follower.delete({
        where: {
          Id: existingFollow.Id,
        },
      });
    } else {
      const existingFollowRequest = await prisma.followRequest.findFirst({
        where: {
          senderId: currentUserId,
          receiverId: userId,
        },
      });
      if (existingFollowRequest) {
        await prisma.followRequest.delete({
          where: {
            Id: existingFollowRequest.Id,
          },
        });
      } else {
        await prisma.followRequest.create({
          data: {
            Id: Math.random().toString(),
            senderId: currentUserId,
            receiverId: userId,
          },
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const blockUser = async (userId: string) => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) {
    throw new Error("user not logged in");
  }
  try {
    const isBlocked = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userId,
      },
    });
    if (isBlocked) {
      await prisma.block.delete({
        where: {
          Id: isBlocked.Id,
        },
      });
    } else {
      await prisma.block.create({
        data: {
          Id: Math.random().toString(),
          blockerId: currentUserId,
          blockedId: userId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error while blocking user");
  }
};

export const acceptFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("user not logged in");
  }
  try {
    const isFollowRequestSent = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });
    if (isFollowRequestSent) {
      await prisma.followRequest.delete({
        where: {
          Id: isFollowRequestSent.Id,
        },
      });
      await prisma.follower.create({
        data: {
          Id: Math.random().toString(),
          followerId: userId,
          followingId: currentUserId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error while accepting follow request");
  }
};
export const declineFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("user not logged in");
  }
  try {
    const isFollowRequestSent = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });
    if (isFollowRequestSent) {
      await prisma.followRequest.delete({
        where: {
          Id: isFollowRequestSent.Id,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error while accepting follow request");
  }
};

export const updateUserProfile = async (
  preveState: { success: boolean; error: boolean },
  payload: { formData: FormData; cover: string }
) => {
  const { cover, formData } = payload;
  const fields = Object.fromEntries(formData);
  const filteredFields = Object.fromEntries(
    Object.entries(fields).filter(([_, value]) => value !== "")
  );

  const { userId } = auth();
  if (!userId) return { success: false, error: true };

  const Profile = z.object({
    cover: z.string().optional(),
    name: z.string().max(50).optional(),
    surname: z.string().max(50).optional(),
    description: z.string().max(300).optional(),
    city: z.string().max(40).optional(),
    school: z.string().max(50).optional(),
    work: z.string().max(50).optional(),
    website: z.string().max(50).optional(),
  });

  const validateField = Profile.safeParse({ cover, ...filteredFields });
  if (!validateField.success) {
    console.log(validateField.error.flatten().formErrors);
    return { success: false, error: true };
  }

  try {
    await prisma.user.update({
      where: {
        Id: userId,
      },
      data: validateField.data,
    });
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

export const switchLike = async (postId: string) => {
  const { userId } = auth();

  if (!userId) throw new Error("User is not authenticated!");

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          Id: existingLike.Id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          Id: Math.random().toString(),
          postId,
          userId,
        },
      });
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};

export const addComment = async (postId: string, desc: string) => {
  const { userId } = auth();

  if (!userId) throw new Error("User is not authenticated!");

  try {
    const createdComment = await prisma.comment.create({
      data: {
        Id: Math.random().toString(),
        desc,
        userId,
        postId,
      },
      include: {
        user: true,
      },
    });

    return createdComment;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong!");
  }
};

export const addPost = async (formData: FormData, img: string) => {
  const desc = formData.get("desc") as string;

  const Desc = z.string().min(1).max(300);

  const validatedDesc = Desc.safeParse(desc);

  if (!validatedDesc.success) {
    //TODO
    console.log("description is not valid");
    return;
  }
  const { userId } = auth();

  if (!userId) throw new Error("User is not authenticated!");

  try {
    await prisma.post.create({
      data: {
        Id: Math.random().toString(),
        desc: validatedDesc.data,
        userId,
        img,
      },
    });

    revalidatePath("/");
  } catch (err) {
    console.log(err);
  }
};

export const addStory = async (img: string) => {
  const { userId } = auth();

  if (!userId) throw new Error("User is not authenticated!");

  try {
    const existingStory = await prisma.story.findFirst({
      where: {
        userId,
      },
    });

    if (existingStory) {
      await prisma.story.delete({
        where: {
          Id: existingStory.Id,
        },
      });
    }
    const createdStory = await prisma.story.create({
      data: {
        Id: Math.random().toString(),
        userId,
        img,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      include: {
        user: true,
      },
    });

    return createdStory;
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = async (postId: string) => {
  const { userId } = auth();

  if (!userId) throw new Error("User is not authenticated!");

  try {
    await prisma.post.delete({
      where: {
        Id: postId,
        userId,
      },
    });
    revalidatePath("/")
  } catch (err) {
    console.log(err);
  }
};
