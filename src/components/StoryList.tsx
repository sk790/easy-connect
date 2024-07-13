"use client";

import { addStory } from "../lib/actions";
import { useUser } from "@clerk/nextjs";
// import { Story,User } from "@prisma/client";
import {Story,User} from "@prisma/client"
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useOptimistic, useState } from "react";

type StoryWithUser = Story & {
  user: User;
};
const StoryList = ({
  stories,
  userId,
}: {
  stories: StoryWithUser[];
  userId: string;
}) => {
  const [storyList, setStoryList] = useState(stories);
  const [img, setImg] = useState<any>();

  const { user, isLoaded } = useUser();

  const add = async () => {
    if (!img?.secure_url) return;

    try {
      const createdStory = await addStory(img.secure_url);
      setStoryList((prev) => [createdStory!, ...prev]);
      setImg(null);
    } catch (err) {
      console.log(err);
    }
  };

  const [optimisticStories, addOptimisticStory] = useOptimistic(
    storyList,
    (state, value: StoryWithUser) => [value, ...state]
  );

  return (
    <div className="flex gap-1 md:gap-2">
      <CldUploadWidget
        uploadPreset="easy-connect"
        onSuccess={(result, { widget }) => {
          setImg(result.info);
          widget.close();
        }}
      >
        {({ open }) => {
          return (
            <div className="flex flex-col items-center gap-1 cursor-pointer relative">
              <Image
                src={img?.secure_url || user?.imageUrl || "/noAvatar.png"}
                alt=""
                width={50}
                height={50}
                className="w-10 h-10 lg:w-20 lg:h-20 rounded-full ring-2 object-cover"
                onClick={() => open()}
              />
              {img ? (
                <form action={add}>
                  <button className="text-xs bg-blue-500 p-1 rounded-md text-white">
                    Send
                  </button>
                </form>
              ) : (
                <span className="text-xs lg:text-sm lg:font-medium">
                  Add a Story
                </span>
              )}
              <div className="absolute top-5 right-[5px] rounded-full lg:top-12 lg:right-[-8px]">
                <Image src="/addStory.png" alt="" width={15} height={15} className="rounded-full w-5 h-5" />
              </div>
            </div>
          );
        }}
      </CldUploadWidget>
      {/* STORY */}
      {optimisticStories.map((story) => (
        <div
          className="flex flex-col items-center gap-1 cursor-pointer relative"
          key={story.id}
        >
          <Image
            src={story.user.avatar || "/noAvatar.png"}
            alt=""
            width={50}
            height={50}
            className="w-10 h-10 lg:w-20 lg:h-20 rounded-full ring-2 object-cover"
          />
          <span className="text-xs lg:text-sm" >
            {story.user.name || story.user.username}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StoryList;
