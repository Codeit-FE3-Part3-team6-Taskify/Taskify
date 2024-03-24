# ✨프로젝트 소개

## ☀️ Project Topic

우리의 시간을 효율적으로 관리하기 위해, 다양한 일정 및 시간 관리 기능을 제공하는 일정관리 플랫폼 

## 👨‍💻 Members

**Codeit FE Sprint 3기 - 6팀**

|  Name  |                      Github                      |
| :----: | :----------------------------------------------: |
| 심은주 |       [@nyaknya](https://github.com/nyaknya)       |
| 조예진 |     [@yejiniee](https://github.com/yejiniee)     |
| 노진석 | [@SiWooJinSeok](https://github.com/SiWooJinSeok) |
| 송상훈 |    [@Song-Sang](https://github.com/Song-Sang)    |

## ⏲️ Duration

2024.03.08(목) ~ 03.25(월)


## 🛠️ Skills & Tools

![Next.js](https://img.shields.io/badge/next.js-%2320232a.svg?style=for-the-badge&logo=next.js&logoColor=%2361DAFB) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) <img src="https://img.shields.io/badge/Css-1572B6?style=for-the-badge&logo=Css3&logoColor=white"> ![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

## 📚 Library

![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"> ![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-%23764ABC.svg?style=for-the-badge&logo=redux&logoColor=white)
 ![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) <img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white"> <img src="https://img.shields.io/badge/gitmoji-ffdd67?style=for-the-badge&logo=gitmoji&logoColor=white"> ![Day.js](https://img.shields.io/badge/Day.js-%23007ACC?style=for-the-badge&logo=javascript&logoColor=white) ![React Datepicker](https://img.shields.io/badge/React_Datepicker-%23000000?style=for-the-badge&logo=react&logoColor=61DAFB)
![date-fns](https://img.shields.io/badge/date--fns-%23AA4226?style=for-the-badge) ![React Select](https://img.shields.io/badge/React_Select-%2361DAFB?style=for-the-badge&logo=react&logoColor=white) <img src="https://img.shields.io/badge/beautiful_dnd-68BC71?style=for-the-badge&logo=beautiful_dnd&logoColor=white">


## 💬 Community

<img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"> ![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)

## 🚢 Deploy

![Babel](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=black) ![Vercel](https://img.shields.io/badge/Vercel-%23000000?style=for-the-badge&logo=vercel&logoColor=white)


<br/>

---

# ✨로컬 환경 - 설치 및 실행 가이드

## 1. Getting the sources

```bash
git clone https://github.com/Codeit-FE3-part3-team6-Taskify/Taskify.git
cd Taskify
```

## 2. Install packages

```bash
npm install
```

## 3. Run development server

```bash
npm run start
```

<br>

---


# ✨ Feature

## 1. 랜딩 페이지

- 로그인이 되어있다면 '나의 대시보드' 페이지로 이동합니다.
- 로그인이 되어있지 않다면 상단에 <로그인, 회원가입 버튼>을 통해 해당 페이지로 이동합니다.

## 2. 로그인 페이지

- <로고 버튼>은 랜딩 페이지로 이동합니다.
- <회원가입 버튼>은 회원가입 페이지로 이동합니다.
- 유효한 이메일과, 비밀번호를 입력하고 <로그인 버튼>을 클릭하면 '나의 대시보드'페이지로 이동합니다.
- 각 인풋 요소는 유효하지 않은 정보가 입력되었을시 경고창을 보여줍니다.
- 비밀번호는 해당 인풋의 아이콘을 통해 숨기거나 나타낼 수 있습니다.
- 로그인 성공시 액세스 토큰을 발급합니다.

## 3. 회원가입 페이지

- <로고 버튼>은 랜딩 페이지로 이동합니다.
- <로그인 버튼>은 회원가입 페이지로 이동합니다.
- 각 인풋 요소는 유효하지 않은 정보가 입력되었을시 경고창을 보여줍니다.
- 모든 인풋 요소가 채워지고 경고창이 없다면 가입하기 버튼이 활성화 됩니다.
- 중복 이메일 가입 시도는 모달창을 통해 거절됩니다.

## 4. 나의 대시보드 페이지 (헤더, 사이드바)

- 액세스 토큰이 활성화 되어있다면, 랜딩 페이지로 이동 경로는 해당 페이지로 대체됩니다.
- '대시보드 목록' 영역에서 소속된 대시보드 목록을 확인하고, 해당 대시보드로 이동할 수 있습니다.(페이지네이션)
- <새로운 대시보드 버튼>을 통해 대시보드를 생성할 수 있습니다.
- 내가 생성한 대시보드는 '왕관 아이콘'을 통해 확인 가능합니다.
- '초대받은 대시보드' 영역을 통해 타인이 생성한 대시보드의 초대요청에 응하거나 거절할 수 있습니다.(무한스크롤)

## 5. 대시보드 페이지 (헤더, 사이드바)

- 생성된 대시보드는 기본 'To do', 'On progress', 'Done' 컬럼을 가지고 있습니다.
- 컬럼은 <새로운 컬럼 추가히기 버튼>을 통해 생성 그리고 각 컬럼의 제목 옆 아이콘을 통해 삭제, 수정할 수 있습니다.
- 생성된 칼럼에서 <+ 버튼>을 통해 '할 일 생성' 모달을 띄울 수 있습니다.
  - 담당자, 제목, 설명, 마감일, 태그, 이미지를 지정해서 해당 컬럼에 '할 일 카드'를 추가합니다.
  - 필수 항목을 입력하지 않으면 <생성 버튼>은 비활성화 됩니다
- '할 일 카드'를 선택하면 해당 '할 일 카드'모달을 띄울 수 있습니다.
  -  만들어진 카드 정보를 보여줍니다.
  -  <케밥 버튼>을 통해 해당 할 일의 수정, 삭제가 가능합니다.(드롭다운)
  -  해당 카드에 대한 댓글 작성이 가능합니다, 내가 작성한 댓글은 수정 및 삭제가 가능합니다.(무한스크롤)
