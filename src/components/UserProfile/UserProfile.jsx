import Image from 'next/image';

export default function UserProfile({ userName, profileImage }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="relative w-6 h-7">
        <Image fill src={profileImage} alt="profile" />
      </span>
      <span className="hidden md:block">{userName}</span>
    </div>
  );
}
