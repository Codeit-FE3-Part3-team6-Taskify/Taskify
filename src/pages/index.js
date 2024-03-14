// import CtaAdd from '@/components/Buttons/CtaAdd/CtaAdd';
// import CtaIcon from '@/components/Buttons/CtaIcon/CtaIcon';
// import DashboardDelete from '@/components/Buttons/DashboardDelete/DashboardDelete';
// import PagenationArrow from '@/components/Buttons/PagenationArrow/PagenationArrow';
// import DashboardListItem from '@/components/Buttons/DashboardListItem/DashboardListItem';

// export default function Home() {
//   return (
//     <div>
//       <div className="max-w-xl mt-32 mx-auto">
//         <CtaAdd />
//       </div>
//       <div className="max-w-xl mt-32 mx-auto">
//         <DashboardDelete />
//       </div>
//       <div className="max-w-xl mt-32 mx-auto">
//         <CtaIcon color="violet" imageSrc={SettingIcon}>
//           관리
//         </CtaIcon>
//       </div>
//       <div className="max-w-xl mt-32 mx-auto">
//         <PagenationArrow direction="prev" />
//         <PagenationArrow disabled="disabled" />
//       </div>
//       <div className="max-w-xl mt-32 mx-auto">
//         <DashboardListItem createdByMe={true} />
//       </div>
//     </div>
//   );
// }
import Image from 'next/image';
import { useRouter } from 'next/router';
import DashboardHeader from '@/components/Header/DashboardHeader';
import DefaultHeader from '@/components/Header/DefaultHeader';
import CtaIcon from '@/components/Buttons/CtaIcon/CtaIcon';

import {
  LogoImg,
  LogoImgWhite,
  CombinedLogo,
  CombinedLogoWhite,
  CrownIcon,
  SettingIcon,
  AddButtonEmpty,
} from '../../public/images';

export default function Home() {
  const router = useRouter();
  const participants = [
    { id: 1, email: 'example1@example.com', nickname: '김' },
    { id: 2, email: 'xample2@example.com', nickname: '이' },
    { id: 3, email: 'ample3@example.com', nickname: '박' },
    { id: 4, email: 'example1@example.com', nickname: '김' },
    { id: 5, email: 'xample2@example.com', nickname: '이' },
    { id: 6, email: 'ample3@example.com', nickname: '박' },
  ];
  const userInfo = { nickname: 'yejin', email: 'yejiniee@codeit.com' };

  return (
    <div>
      <DefaultHeader
        smallLogo={
          <Image
            fill
            src={LogoImg}
            alt="logo"
            onClick={() => {
              router.push('/');
            }}
          />
        }
        largeLogo={
          <Image
            fill
            src={CombinedLogo}
            alt="logo"
            onClick={() => {
              router.push('/');
            }}
          />
        }
        buttons={
          <>
            <button
              type="button"
              onClick={() => {
                router.push('/login');
              }}
            >
              로그인
            </button>
            <button
              type="button"
              onClick={() => {
                router.push('/signup');
              }}
            >
              회원가입
            </button>
          </>
        }
      />
      <DefaultHeader
        isLanding
        smallLogo={
          <Image
            fill
            src={LogoImgWhite}
            alt="logo"
            onClick={() => {
              router.push('/');
            }}
          />
        }
        largeLogo={
          <Image
            fill
            src={CombinedLogoWhite}
            alt="logo"
            onClick={() => {
              router.push('/');
            }}
          />
        }
        buttons={
          <>
            <button
              type="button"
              onClick={() => {
                router.push('/login');
              }}
            >
              로그인
            </button>
            <button
              type="button"
              onClick={() => {
                router.push('/signup');
              }}
            >
              회원가입
            </button>
          </>
        }
      />
      <DashboardHeader
        hasSpace
        title="대시보드"
        ownerIcon={<Image src={CrownIcon} alt="" width={20} height={16} />}
        buttons={
          <>
            <CtaIcon imageSrc={SettingIcon}>관리</CtaIcon>
            <CtaIcon imageSrc={AddButtonEmpty}>초대하기</CtaIcon>
          </>
        }
        participants={participants}
        divider
        userInfo={userInfo}
      />

      <DashboardHeader title="계정관리" userInfo={userInfo} />
    </div>
  );
}
