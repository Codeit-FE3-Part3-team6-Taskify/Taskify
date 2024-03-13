import CtaDefault from '@/components/CtaDefault/CtaDefault';
import CtaAdd from '@/components/CtaAdd/CtaAdd';

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
    </div>
  );
}
