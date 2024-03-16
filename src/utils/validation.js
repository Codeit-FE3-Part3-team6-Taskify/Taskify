const regexEmail =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

export const checkSignEmail = (email) => {
  if (email === '') {
    return '이메일을 입력해주세요';
  }
  if (!regexEmail.test(email)) {
    return '이메일 형식으로 작성해주세요';
  }
  return '';
};

export const checkSignPassword = (password) => {
  if (password === '') {
    return '비밀번호를 입력해주세요';
  }
  if (password.length < 8) {
    return '8자 이상 작성해주세요.';
  }
  return '';
};

export const checkPasswordConfirmed = (password, passwordConfirmed) => {
  if (passwordConfirmed === '') {
    return '비밀번호를 입력해주세요!';
  }
  if (password !== passwordConfirmed) {
    return '비밀번호가 일치하지 않습니다.';
  }
  return '';
};

export const checkNickname = (nickname) => {
  if (nickname === '') {
    return '닉네임을 입력해주세요';
  }
  if (nickname.length > 10) {
    return '10자 이하로 작성해주세요';
  }
  return '';
};
