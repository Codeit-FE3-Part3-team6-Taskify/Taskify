import Image from 'next/image';
import Header from '@/components/CommonHeader/CommonHeader';
import UserProfile from '@/components/UserProfile/UserProfile';
import {
  Divider,
  LogoImg,
  CombinedLogo,
  TempProfile,
} from '../../public/images';

export default function Home() {
  return (
    <div>
      <Header
        smallLogo={<Image fill src={LogoImg} alt="logo" />}
        largeLogo={<Image fill src={CombinedLogo} alt="logo" />}
        buttons={
          <>
            <button type="button">로그인</button>
            <button type="button">회원가입</button>
          </>
        }
      />
      <Header
        hasSpace
        title="대시보드"
        ownerIcon={
          <Image src="/images/CrownIcon.svg" alt="" width={20} height={16} />
        }
        buttons={
          <>
            <button
              type="button"
              className="text-gray_787486 text-sm font-medium"
            >
              관리
            </button>
            <button
              type="button"
              className="text-gray_787486 text-sm font-medium"
            >
              초대하기
            </button>
          </>
        }
        participants={<Image fill src={TempProfile} alt="logo" />}
        divider={<Image fill src={Divider} alt="divider" />}
        profile={<UserProfile userName="냐옹이" profileImage={TempProfile} />}
      />
    </div>
  );
}
