import Link from 'next/link';
import Image from 'next/image';
import DefaultHeader from '@/components/common/Header/DefaultHeader';
import {
  FacebookIcon,
  InstaIcon,
  MailIcon,
  LogoImgWhite,
  CombinedLogoWhite,
  LandingImg1,
  LandingImg2,
  LandingImg3,
  LandingImg4,
  LandingImg5,
  LandingImg6,
} from '@/../public/images';
import LandingFooter from '@/components/LandingPage/LandingFooter/LandingFooter';
import CtaDefault from '@/components/common/Buttons/CtaDefault/CtaDefault';
import LandingCard from '@/components/LandingPage/LandingCard/LandingCard';
import useRedirectWithAccessToken from '@/hooks/useRedirectWithAccessToken';

export async function getStaticProps() {
  const imgData = {
    FacebookIcon,
    InstaIcon,
    MailIcon,
    CombinedLogoWhite,
    LogoImgWhite,
    LandingImg1,
    LandingImg2,
    LandingImg3,
    LandingImg4,
    LandingImg5,
    LandingImg6,
  };

  return {
    props: {
      imgData,
    },
  };
}

export default function Home({ imgData }) {
  useRedirectWithAccessToken('/mydashboard');
  return (
    <div className="bg-black w-full ">
      <DefaultHeader
        isLanding
        smallLogo={
          <Image fill src={imgData.LogoImgWhite} alt="작은 로고이미지" />
        }
        largeLogo={
          <Image fill src={imgData.CombinedLogoWhite} alt="큰 로고 이미지" />
        }
        buttons={
          <>
            <Link href="/signin">로그인</Link>
            <Link href="/signup">회원가입</Link>
          </>
        }
      />
      <main className="text-white m-auto mt-[42px] md:mt-[94px] md:max-w-[664px] lg:max-w-[1200px] ">
        <div className=" w-full max-w-[287px] md:max-w-[537px] lg:max-w-[732px] m-auto ">
          <Image
            className="w-full"
            priority
            src={imgData.LandingImg1}
            alt="테마이미지에 사람들"
          />
        </div>
        <h1 className="mt-[26px] md:mt-12 font-bold tracking-[-1px] not-italic text-center text-[42px] md:tracking-[-2px] md:leading-[100px] md:text-[56px] lg:text-[76px]  ">
          새로운 일정 관리
          <span className="block font-[montserrat] ml-7 md:inline text-violet_5534DA leading-[65px] tracking-[-1px]">
            Taskify
          </span>
        </h1>
        <p className="mt-[18px] md:mt-6 text-center text-[12px] md:text-[16px] lg:text-[18px]">
          서비스의 메인 설명 들어갑니다.
        </p>
        <Link
          className="m-auto mt-[70px] md:mt-70px block w-full max-w-[235px] md:max-w-[280px]"
          href="/signin"
        >
          <CtaDefault size="large">로그인하기</CtaDefault>
        </Link>
        <section className="m-auto max-w-[343px] mt-20 flex flex-col text-center w-full pt-[60px] bg-black_171717 md:max-w-[664px] md:mt-[184px] lg:max-w-[1200px] lg:pl-[60px] lg:flex-row lg:pt-[103px] lg:justify-between">
          <div className=" flex flex-col gap-[61px] font-medium md:gap-[100px] md:ml-[60px] md:text-left ">
            <span className="text-[18px] md:text-[22px] text-gray_9FA6B2">
              Point 1
            </span>
            <h3 className="text-4xl font-bold leading-[50px] md:leading-[64px] md:text-5xl">
              일의 우선순위를
              <br /> 관리하세요
            </h3>
          </div>

          <Image
            className="self-end w-full max-w-[296px] mt-[194px] md:mt-[220px] md:max-w-[519px] md:max-h-[435px] lg:mt-0 lg:w-[594px] lg:max-h-[498px] object-contain"
            src={imgData.LandingImg2}
            alt="우선순위 관리 이미지"
          />
        </section>
        <section className="m-auto pt-[60px] lg:pt-[103px] text-center gap-[192px] lg:pl-[108px] mt-[59px] flex flex-col w-full max-w-[343px] md:max-w-[664px] md:gap-[100px] lg:max-w-[1200px] lg:flex-row bg-black_171717">
          <Image
            className="order-1 self-center w-full max-w-[217px] md:max-w-[436px] md:max-h-[502px] object-contain"
            src={imgData.LandingImg3}
            alt="해야 할 일 등록 이미지"
          />
          <div className="flex flex-col gap-[61px] md:gap-[100px]  font-medium  md:pl-[60px] md:text-left lg:pl-0 lg:order-2">
            <span className="text-[18px] text-gray_9FA6B2 md:text-[22px]">
              Point 2
            </span>
            <h3 className="text-4xl font-bold leading-[50px] md:leading-[64px] md:text-5xl ">
              해야 할 일을
              <br /> 등록하세요
            </h3>
          </div>
        </section>
        <h4 className="text-[22px] font-bold text-center mt-[90px] lg:text-left">
          생산성을 높이는 다양한 설정 ⚡
        </h4>
        <section className="mb-[120px] mt-[42px] flex flex-col m-auto max-w-[343px] gap-10 md:max-w-[378px] lg:flex-row lg:max-w-[1200px] lg:mt-9 lg:gap-[33px]">
          <LandingCard
            src={imgData.LandingImg4}
            alt="대시보드 설정 설명 이미지"
            title="대시보드 설정"
            paragraph="대시보드 사진과 이름을 변경할 수 있어요."
          />

          <LandingCard
            src={imgData.LandingImg5}
            alt="초대 설명 이미지"
            title="초대"
            paragraph="새로운 팀원을 초대할 수 있어요."
          />
          <LandingCard
            src={imgData.LandingImg6}
            alt="구성원 초대하는 설명 이미지"
            title="구성원"
            paragraph="구성원을 초대하고 내보낼 수 있어요."
          />
        </section>
      </main>
      <LandingFooter imgData={imgData} />
    </div>
  );
}
