"use client";
import { addPost } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import AddPostButton from "./AddPostButton";
import { CldUploadWidget } from "next-cloudinary";

const AddPost = () => {
  const { user, isLoaded } = useUser();

  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<any>();
  const [imageState, setImageState] = useState(true);

  if (!isLoaded) {
    return "Loading...";
  }
  let c = false;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
      <Image
        src={user?.imageUrl || "/noAvatar.png"}
        alt=""
        width={48}
        height={48}
        className="w-12 h-12 object-cover rounded-full"
      />
      <div className="flex-1">
        {/* TEXT INPUT */}
        <form
          action={(formData) => addPost(formData, img ? img.secure_url : "")}
          className="flex gap-4"
        >
          <textarea
            placeholder="What's on your mind?"
            className="flex-1 bg-slate-100 rounded-lg p-2"
            name="desc"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <div className="">
            <Image
              src="/emoji.png"
              alt=""
              width={20}
              height={20}
              className="w-5 h-5 cursor-pointer self-end"
            />
            <div onClick={() => setImageState(false)}>
              <AddPostButton />
            </div>
          </div>
        </form>
        {/* POST OPTIONS */}
        <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
          <CldUploadWidget
            uploadPreset="easy-connect"
            onSuccess={(result, { widget }) => {
              setImg(result.info);
              widget.close();
              setImageState(true);
            }}
          >
            {({ open }) => {
              return (
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => open()}
                >
                  <Image src="/addimage.png" alt="" width={20} height={20} />
                  Photo
                </div>
              );
            }}
          </CldUploadWidget>

          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addVideo.png" alt="" width={20} height={20} />
            Video
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/poll.png" alt="" width={20} height={20} />
            Poll
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addevent.png" alt="" width={20} height={20} />
            Event
          </div>
        </div>
        {img && (
          <div className={`mt-5 ${imageState?"block":"hidden"}`}>
            <Image src={img.secure_url} alt="" width={80} height={80} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPost;
