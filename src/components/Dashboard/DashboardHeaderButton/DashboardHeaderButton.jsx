import CtaIcon from '@/components/common/Buttons/CtaIcon/CtaIcon';
import { AddButtonEmpty, SettingIcon } from '../../../../public/images';

export default function DashboardHeaderButton({ invitationClick }) {
  return (
    <div className="flex gap-[16px]">
      <CtaIcon imageSrc={SettingIcon}>관리</CtaIcon>
      <CtaIcon onClick={invitationClick} imageSrc={AddButtonEmpty}>
        초대하기
      </CtaIcon>
    </div>
  );
}
