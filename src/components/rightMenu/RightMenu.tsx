import Image from "next/image";
import FriendRequests from "./FriendRequests";
import Birthday from "./Birthday";
import Ad from "../Ad";
import UserInfoCard from "../UserInfoCard";

const RightMenu = () => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <FriendRequests />
        <Birthday />
        <Ad size="md"/>
        <UserInfoCard/>
      </div>
    </>
  );
};

export default RightMenu;
