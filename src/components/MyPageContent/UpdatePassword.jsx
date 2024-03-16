import { useState } from 'react';
import { axiosPut } from '@/features/axios';
import TableBox from '../Table/TableBox';
import CtaDefault from '@/components/Buttons/CtaDefault/CtaDefault';
import PasswordInput from '../SignInput/PasswordInput';
import { checkNewPassword, checkPasswordConfirmed } from '@/utils/validation';

export default function UpdatePassword({ password }) {
  const [formValues, setFormValues] = useState({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirmed: '',
  });

  const [errors, setErrors] = useState({
    newPasswordError: '',
    newPasswordConfirmedError: '',
  });

  const [showModal, setShowModal] = useState(false);

  const handleBlur = (validateFunction, errorType, ...param) => {
    const result = validateFunction(...param);
    setErrors((prev) => ({ ...prev, [errorType]: result }));
  };

  const onChange = (formValueType, value) => {
    setFormValues((prev) => ({ ...prev, [formValueType]: value }));
  };

  const onSubmit = async () => {
    // TODO(조예진):
    // 지금은 임시적으로 prop으로 비밀번호를 보내줬지만 현재 비밀번호 값을 어디서 가져오지..?
    // 일단 put 요청을 보내고 error response가 오면 모달을 띄워야 하나..
    if (formValues.currentPassword !== password) {
      setShowModal(true);
      return;
    }
    const updatedMyPassword = await axiosPut('auth/password', {
      password: formValues.currentPassword,
      newPassword: formValues.newPassword,
    });
    if (!updatedMyPassword.status) {
      // 비밀번호 state값 변경해줌
      alert('비밀번호 변경 완료');
    }
  };

  const disabled =
    Object.values(formValues).every((value) => !!value) &&
    Object.values(errors).every((error) => !error);

  return (
    <>
      <TableBox>
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="mb-2 text-xl md:text-2xl font-bold">
            비밀번호 변경
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-base md:text-lg font-medium">
                현재 비밀번호
              </span>
              <PasswordInput
                placeholder="현재 비밀번호 입력"
                value={formValues.currentPassword}
                onChange={(e) => onChange('currentPassword', e.target.value)}
              />
            </div>
            <div>
              <span className="text-base md:text-lg font-medium">
                새 비밀번호
              </span>
              <PasswordInput
                placeholder="새 비밀번호 입력"
                value={formValues.newPassword}
                onChange={(e) => onChange('newPassword', e.target.value)}
                onBlur={() =>
                  handleBlur(
                    checkNewPassword,
                    'newPasswordError',
                    formValues.currentPassword,
                    formValues.newPassword,
                  )
                }
                error={errors.newPasswordError}
              />
            </div>
            <div>
              <span className="text-base md:text-lg font-medium">
                새 비밀번호 확인
              </span>
              <PasswordInput
                placeholder="새 비밀번호 입력"
                value={formValues.newPasswordConfirmed}
                onChange={(e) =>
                  onChange('newPasswordConfirmed', e.target.value)
                }
                onBlur={() =>
                  handleBlur(
                    checkPasswordConfirmed,
                    'newPasswordConfirmedError',
                    formValues.newPassword,
                    formValues.newPasswordConfirmed,
                  )
                }
                error={errors.newPasswordConfirmedError}
              />
            </div>
            <div className="relative flex justify-end">
              <CtaDefault onClick={onSubmit} size="xsmall" disabled={!disabled}>
                변경
              </CtaDefault>
            </div>
          </div>
        </div>
      </TableBox>
      {/* // TODO(조예진): 모달 컴포넌트 추가할것 */}
      {showModal && <div>현재 비밀번호가 틀렸습니다.</div>}
    </>
  );
}
