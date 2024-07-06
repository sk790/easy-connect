"use client";

import { User } from "@prisma/client";
import React, { useActionState, useState } from "react";
import UpdateButton from "./UpdateButton";
import Image from "next/image";
import { updateUserProfile } from "../../lib/actions";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";

export default function UpdateUser({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const [coverData, setCoverData] = useState<any>();

  const router = useRouter()
  const handleClose = () => {
    setOpen(false);
    state.success && router.refresh();
  };

  const [state, formAction] = useActionState(updateUserProfile, {
    success: false,
    error: false,
  });

  return (
    <div className="">
      <span
        className="text-blue-500 text-xs cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Update
      </span>
      {open && (
        <div className="absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50 ">
          <form
            action={(formData) =>
              formAction({formData, cover:coverData?.secure_url||""})
            }
            className="p-8 bg-white rounded-lg shadow-md flex flex-col gap-2 w-full md:w-1/2 lg:w-[600px] relative"
          >
            <h1>Update Profile</h1>
            <div className="mt-4 text-xs text-gray-500">
              Use the navbar profile to change the avatar or username.
            </div>

            <CldUploadWidget
              uploadPreset="easy-connect"
              onSuccess={(result) => {
                setCoverData(result.info);
              }}
            >
              {({ open }) => {
                return (
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => open()}
                  >
                    <label htmlFor="">Cover Picture</label>
                    <Image
                      src={user.cover || "/noCover.png"}
                      alt=""
                      width={48}
                      height={32}
                      className="w-12 h-8 rounded-md object-cover"
                    />
                    <span className="text-xs underline text-gray-600">
                      Change
                    </span>
                  </div>
                );
              }}
            </CldUploadWidget>

            <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
              {/* INPUT */}
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder={user.name || "First Name"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="name"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Surname
                </label>
                <input
                  type="text"
                  placeholder={user.surname || "Surname"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="surname"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Description
                </label>
                <input
                  type="text"
                  placeholder={user.description || "Description"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="description"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  City
                </label>
                <input
                  type="text"
                  placeholder={user.city || "City"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="city"
                />
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  School
                </label>
                <input
                  type="text"
                  placeholder={user.school || "School"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="school"
                />
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Work
                </label>
                <input
                  type="text"
                  placeholder={user.work || "Work"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="work"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Website
                </label>
                <input
                  type="text"
                  placeholder={user.website || "Website"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  name="website"
                />
              </div>
            </div>
            <UpdateButton />
            {state && state.success && <span className="text-green-500">Profile updated</span>}
            {state && state.error && <span className="text-red-500">Somthing Went Wrong</span>}
            <div
              className="absolute text-xl right-2 top-3 cursor-pointer"
              onClick={handleClose}
            >
              X
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
