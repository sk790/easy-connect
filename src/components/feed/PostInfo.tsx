"use client";

import { deletePost } from "@/lib/actions";
import Image from "next/image";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export default function PostInfo({ postId }: { postId: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const Delete = async (postId: string) => {
    try {
      setLoading(true);
      await deletePost(postId);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div className="relative">
      <Image
        src="/more.png"
        width={16}
        height={16}
        alt=""
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer"
      />
      {open && (
        <div className="absolute top-4 right-0 bg-white p-4 w-32 rounded-lg flex flex-col gap-2 text-xs shadow-lg z-30">
          <span className="cursor-pointer">View</span>
          <span className="cursor-pointer">Re-post</span>
          <form action={()=>Delete(postId)}>
            <button className="text-red-500">
              {loading ? "Deleting..." : "Delete"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
