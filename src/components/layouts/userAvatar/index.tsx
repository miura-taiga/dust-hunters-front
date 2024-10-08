import { FC } from "react";
import Image from "next/image";

const UserAvatar: FC = () => {
  const imageUrl = "/images/userAvatars/female.jpg";
  const hunterRank = 20;

  return (
    <div className="fixed bottom-20 left-4 flex flex-col items-center z-50">
      {/* アバターの背景円 */}
      <div className="relative w-24 h-24 bg-[#1E3A8A] rounded-full flex items-center justify-center shadow-md">
        <Image
          src={imageUrl}
          alt="User Avatar"
          className="rounded-full"
          width={90}
          height={90}
        />
      </div>
      {/* ハンターランク表示 */}
      <div className="absolute bottom-[-8px] right-[-8px] bg-white text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-md">
        {hunterRank}
      </div>
    </div>
  );
};

export default UserAvatar;
