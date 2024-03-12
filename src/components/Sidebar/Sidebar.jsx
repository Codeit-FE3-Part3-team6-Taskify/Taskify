import Image from 'next/image';
import {
  Logo,
  LogoImg,
  AddButtonEmpty,
  CrownIcon,
} from '../../../public/images';

export default function Sidebar({ dashboards }) {
  // 송상훈 Todo: 나중에 재사용될 가능성 있는 함수, 그때 보고 분리해서 따로 만들어도 될듯
  const createCircle = (color) => {
    const circleStyle = {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      marginRight: '1rem',
      backgroundColor: color,
    };

    return <div style={circleStyle} />;
  };

  return (
    <div className="flex flex-col w-[30rem] flex-shrink-0 border-r h-screen">
      <div className="flex flex-row mt-8 ml-8 mb-24">
        <Image src={LogoImg} width={29} height={33} alt="로고이미지" />
        <Image src={Logo} width={80} height={22} alt="로고" />
      </div>
      <div className="flex flex-row mx-8 justify-between mb-8">
        <p className="text-gray_787486 text-[1.2rem] font-bold">Dash Boards</p>
        <Image src={AddButtonEmpty} width={20} height={20} alt="더하기 버튼" />
      </div>
      <div className="flex flex-col h-full mx-8">
        {dashboards && dashboards.length > 0 ? (
          dashboards.map((dashboard) => (
            <div
              key={dashboard.id}
              className="flex items-center gap-x-3 h-16 text-gray_787486 font-medium text-3xl"
            >
              {dashboard.color && createCircle(dashboard.color)}
              <p>{dashboard.title}</p>
              {dashboard.createdByMe && (
                <Image src={CrownIcon} width={17.5} height={14} alt="왕관" />
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
