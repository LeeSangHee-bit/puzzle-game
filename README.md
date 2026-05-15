# 과일 짝 맞추기 퍼즐 게임

6x6 칸에서 같은 과일 카드 2장을 찾는 간단한 퍼즐 게임입니다.

## 실행 방법

브라우저에서 `index.html` 파일을 열거나 Live Server로 실행합니다.

## 이번에 바뀐 점

- 게임 주제가 동물 카드에서 과일 카드로 바뀌었습니다.
- 보드가 4x4에서 6x6으로 커졌습니다.
- 과일 종류가 18개로 늘었습니다.
- 같은 과일이 2장씩 만들어져서 총 36장의 카드가 나옵니다.
- 보드가 너무 답답해 보이지 않도록 화면 폭과 카드 간격을 조정했습니다.

## 카드 데이터가 만들어지는 방법

이 게임의 카드는 HTML에 처음부터 적혀 있는 것이 아닙니다. 게임이 시작될 때 JavaScript가 카드 데이터를 직접 만듭니다.

아주 쉽게 말하면, 카드는 아래 순서로 만들어집니다.

```text
과일 18개 준비
-> 똑같이 한 번 더 복사해서 36장 만들기
-> 카드 순서 섞기
-> 카드 데이터로 바꾸기
-> 과일 그림 만들기
-> 화면에 카드 버튼으로 보여주기
```

### 1. 과일 18개를 준비합니다

`js/game.js` 파일의 `PuzzleGame.fruits`에 과일 목록이 있습니다.

과일 하나는 이런 정보를 가지고 있습니다.

```js
{ id: "apple", name: "사과", color: "#e63946", accent: "#9d0208" }
```

각 값의 뜻은 이렇습니다.

- `id`: 과일을 구분하는 이름표입니다. 예를 들면 `apple`, `banana` 같은 값입니다.
- `name`: 화면에서 사용할 과일 이름입니다.
- `color`: 과일 그림의 기본 색입니다.
- `accent`: 과일 그림에 함께 사용할 강조 색입니다.

### 2. 같은 과일을 한 번 더 복사합니다

짝 맞추기 게임은 같은 카드가 2장씩 있어야 합니다.

그래서 코드에서는 과일 18개를 한 번 더 복사해서 총 36장을 만듭니다.

```js
const fruitPairs = [...this.fruits, ...this.fruits];
```

쉽게 말하면 이런 뜻입니다.

```text
과일 18개
+ 같은 과일 18개
= 카드 재료 36장
```

### 3. 카드 순서를 섞습니다

`js/util.js` 파일의 `PuzzleUtil.shuffle()` 함수가 카드 순서를 무작위로 섞습니다.

```js
const shuffledFruits = PuzzleUtil.shuffle(fruitPairs);
```

이 과정은 책상 위에 카드 36장을 놓고 손으로 마구 섞는 것과 비슷합니다.

그래서 게임을 새로 시작할 때마다 카드 위치가 달라집니다.

### 4. 진짜 카드 데이터로 바꿉니다

섞인 과일 재료를 하나씩 카드 데이터로 바꿉니다.

```js
return shuffledFruits.map((fruit, index) => ({
  id: index,
  fruitId: fruit.id,
  fruitName: fruit.name,
  imageUrl: PuzzleUtil.createFruitImageUrl(fruit),
  isFlipped: false,
  isMatched: false
}));
```

카드 한 장은 이런 정보를 가진 작은 가방이라고 생각하면 됩니다.

```js
{
  id: 0,
  fruitId: "apple",
  fruitName: "사과",
  imageUrl: "사과 그림 주소",
  isFlipped: false,
  isMatched: false
}
```

각 값의 뜻은 이렇습니다.

- `id`: 카드 한 장마다 붙는 번호입니다.
- `fruitId`: 어떤 과일 카드인지 알려주는 이름표입니다.
- `fruitName`: 과일 이름입니다.
- `imageUrl`: 카드에 보여줄 그림 주소입니다.
- `isFlipped`: 카드가 지금 뒤집혀 있는지 알려줍니다.
- `isMatched`: 짝을 찾은 카드인지 알려줍니다.

### 5. 과일 그림도 코드가 직접 만듭니다

이 게임은 과일 그림 파일을 따로 가져오지 않습니다.

`js/util.js` 파일의 `PuzzleUtil.createFruitImageUrl(fruit)` 함수가 SVG 그림을 직접 만들어서 카드에 넣습니다.

쉽게 말하면, 과일의 색과 이름표를 보고 작은 과일 그림을 즉석에서 그리는 것입니다.

### 6. 화면에 카드 버튼으로 보여줍니다

마지막으로 `js/board.js` 파일의 `PuzzleBoard.render()`가 카드 데이터를 보고 화면에 카드 버튼을 만듭니다.

```js
cards.forEach((card) => {
  this.boardElement.appendChild(this.createCardButton(card, onCardClick));
});
```

쉽게 말하면, 카드 데이터 36개를 보고 화면에 카드 버튼 36개를 하나씩 붙이는 것입니다.

## 보드가 6x6으로 보이는 이유

`css/styles.css` 파일에서 보드를 6칸씩 보이도록 바꿨습니다.

```css
.board {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}
```

`repeat(6, 1fr)`은 "가로 한 줄에 똑같은 크기의 칸을 6개 만들자"라는 뜻입니다.

## 한 줄 정리

이 게임의 카드는 게임이 시작될 때 JavaScript가 과일 목록을 복사하고, 섞고, 카드 데이터로 바꾼 뒤 화면에 그려서 만들어집니다.
