import Image from 'next/image';
import { Logo, LogoImg, AddButtonEmpty, CrownIcon } from '@/../public/images';

export default function Sidebar({ dashboards }) {
  // 송상훈 Todo: 나중에 재사용될 가능성 있는 함수, 그때 보고 분리해서 따로 만들어도 될듯
  const createCircle = (color) => {
    const circleStyle = {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: color,
    };

    return <div style={circleStyle} />;
  };

  return (
    <div className="flex flex-col border-r items-center h-screen mt-5 w-[67px] md:w-[160px] lg:w-[300px]">
      <div className="flex flex-row md:w-full mb-9 md:mb-14 md:pl-6">
        <Image src={LogoImg} width={29} height={33} alt="로고이미지" />
        <Image
          className="hidden md:inline"
          src={Logo}
          width={80}
          height={22}
          alt="로고"
        />
      </div>
      <div className="flex md:w-full md:justify-between md:px-6">
        <p className="text-gray_787486 text-[12px] font-bold hidden md:inline ">
          Dash Boards
        </p>
        <Image src={AddButtonEmpty} width={20} height={20} alt="더하기 버튼" />
      </div>
      <div className="flex flex-col h-full mt-3 md:pl-6 md:w-full">
        {dashboards && dashboards.length > 0 ? (
          dashboards.map((dashboard) => (
            <div
              key={dashboard.id}
              className="flex items-center gap-x-2 h-12 lg:h-14"
            >
              {dashboard.color && createCircle(dashboard.color)}
              <p className="hidden  text-gray_787486 md:inline ml-2 md:text-sm lg:text-lg">
                {dashboard.title}
              </p>
              {dashboard.createdByMe && (
                <Image
                  className="hidden md:inline"
                  src={CrownIcon}
                  width={17.5}
                  height={14}
                  alt="왕관"
                />
              )}
            </div>
          ))
        ) : (
          <div>
            <p>No</p>
          </div>
        )}
      </div>
    </div>
  );
}
