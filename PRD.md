# 프로젝트 : 간단한 퍼즐 게임

## 목표
- 브라우저에서 실행되는 게임
- 클릭 이벤트 처리
- 클리어 조건 판단
- 6x6 퍼즐로 2개의 동일한 과일 이미지를 맞추는 게임
- 3분 제한 시간 안에 모든 과일 짝을 찾아야 하는 게임

## 기술
- 단순 html, css, javascript
- 하나의 index.html 파일, css 파일, javascript 파일

## 대상
- 코딩 초보자도 이해할 수 있는 구조

## 폴더 구조

```text
puzzle-game/
├─ index.html
├─ css/
│  └─ styles.css
├─ js/
│  ├─ app.js    -- 기존 script.js에서 앱 시작점 관련 소스만 위치
│  ├─ board.js  -- 퍼즐보드 그리기 영역
│  ├─ game.js   -- 클릭이벤트, 정답확인, 클리어 조건
│  └─ util.js   -- 랜덤 섞기, 공통함수
├─ assets/
│  └─ images/
└─ PRD.md

```
