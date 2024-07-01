import Image from "next/image";
import FriendRequests from "./FriendRequests";
import Birthday from "./Birthday";
import Ad from "../Ad";
import UserMediaCard from "./UserMediaCard";
import { User } from "@prisma/client";
import UserInfoCard from "./UserInfoCard";

const RightMenu = ({ user }: { user?: User }) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        {user ? (
          <>
            <UserInfoCard user = {user} />
            <UserMediaCard user = {user} />
          </>
        ) : null}
        <FriendRequests />
        <Birthday />
        <Ad size="md" />
        {/* <UserInfoCard /> */}
      </div>
    </>
  );
};

export default RightMenu;
