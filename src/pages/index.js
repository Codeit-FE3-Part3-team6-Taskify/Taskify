import CtaDefault from '@/components/Buttons/CtaDefault/CtaDefault';
import CtaAdd from '@/components/Buttons/CtaAdd/CtaAdd';
import CtaIcon from '@/components/Buttons/CtaIcon/CtaIcon';
import DashboardDelete from '@/components/Buttons/DashboardDelete/DashboardDelete';
import { SettingIcon } from '@/../public/images';

export default function Home() {
  return (
    <div>
      <div className="max-w-xl mt-32 mx-auto">
        <CtaDefault type="button" color="white" size="small">
          테스트
        </CtaDefault>
      </div>
      <div className="max-w-xl mt-32 mx-auto">
        <CtaAdd />
      </div>
      <div className="max-w-xl mt-32 mx-auto">
        <DashboardDelete />
      </div>
      <div className="max-w-xl mt-32 mx-auto">
        <CtaIcon size="large" imageSrc={SettingIcon}>
          관리
        </CtaIcon>
      </div>
    </div>
  );
}
