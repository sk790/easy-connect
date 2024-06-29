import Image from "next/image";
import FriendRequests from "./FriendRequests";
import Birthday from "./Birthday";
import Ad from "../Ad";
import UserInfoCard from "../UserInfoCard";
import UserMediaCard from "../UserMediaCard";

const RightMenu = ({ userId }: { userId?: string }) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        {userId ? (
          <>
            <UserInfoCard userId = {userId} />
            <UserMediaCard userId = {userId} />
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
