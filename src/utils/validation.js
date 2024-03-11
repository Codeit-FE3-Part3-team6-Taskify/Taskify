const regexEmail =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

export const checkLoginEmail = (email) => {
  if (email === '') {
    return '이메일을 입력해주세요';
  }
  if (!regexEmail.test(email)) {
    return '이메일 형식으로 작성해주세요';
  }
  return '';
};

export const checkLoginPassword = (password) => {
  if (password === '') {
    return '비밀번호를 입력해주세요';
  }
  if (password.length < 8) {
    return '8자 이상 작성해주세요.';
  }
  return '';
};
