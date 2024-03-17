import { useState } from 'react';
import { axiosPut } from '@/features/axios';
import TableBox from '@/components/common/Table/TableBox';
import CtaDefault from '@/components/common/Buttons/CtaDefault/CtaDefault';
import PasswordInput from '@/components/common/SignInput/PasswordInput';
import { checkNewPassword, checkPasswordConfirmed } from '@/utils/validation';

export default function UpdatePassword() {
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
    const res = await axiosPut('auth/password', {
      password: formValues.currentPassword,
      newPassword: formValues.newPassword,
    });

    if (!res.status) {
      alert('비밀번호 변경 완료');
      setFormValues({
        currentPassword: '',
        newPassword: '',
        newPasswordConfirmed: '',
      });

      return;
    }

    if (res.status === 400) {
      setShowModal(true);
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
