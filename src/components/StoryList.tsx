import Image from "next/image";
import React from "react";

const StoryList = () => {
  return (
    <div
      className="flex flex-col items-center gap-2 cursor-pointer"
    //   key={story.id}
    >
      <Image
        src={"/noAvatar.png"}
        // src={"https://www.pexels.com/photo/silhouette-of-a-man-photographing-with-a-camera-against-orange-sky-at-dusk-12984738/"}
        alt=""
        width={80}
        height={80}
        className="w-20 h-20 rounded-full ring-2"
      />
      <span className="font-medium">
        {/* {story.user.name || story.user.username} */}
        username
      </span>
    </div>
  );
};

export default StoryList;
