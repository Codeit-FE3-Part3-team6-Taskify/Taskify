import CtaAdd from '@/components/Buttons/CtaAdd/CtaAdd';
import CtaIcon from '@/components/Buttons/CtaIcon/CtaIcon';
import DashboardDelete from '@/components/Buttons/DashboardDelete/DashboardDelete';
import PaginationButton from '@/components/Buttons/PaginationButton/PaginationButton';
import DashboardListItem from '@/components/Buttons/DashboardListItem/DashboardListItem';
import { SettingIcon } from '@/../public/images';

export default function Home() {
  return (
    <div>
      <div className="max-w-xl mt-32 mx-auto">
        <CtaAdd />
      </div>
      <div className="max-w-xl mt-32 mx-auto">
        <DashboardDelete />
      </div>
      <div className="max-w-xl mt-32 mx-auto">
        <CtaIcon color="violet" imageSrc={SettingIcon}>
          관리
        </CtaIcon>
      </div>
      <div className="max-w-xl mt-32 mx-auto">
        <PaginationButton direction="prev" />
        <PaginationButton disabled="disabled" />
      </div>
      <div className="max-w-xl mt-32 mx-auto">
        <DashboardListItem createdByMe={true} />
      </div>
    </div>
  );
}
