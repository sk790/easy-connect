"use client";

import { deletePost } from "../../lib/actions";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function PostInfo({ postId }: { postId: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const Delete = async (postId: string) => {
    try {
      setLoading(true);
      await deletePost(postId);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Image
        src="/more.png"
        width={16}
        height={16}
        alt=""
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer"
      />
      {open && (
        <div className="absolute top-4 right-0 bg-slate-500 w-32 rounded-lg flex flex-col gap-2 text-xs shadow-lg z-30">
          <form action={() => Delete(postId)}>
            <button className="text-red-500 hover:bg-slate-500 hover:text-white p-2 rounded-lg w-full text-left">
              {loading ? "Deleting..." : "Delete"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
