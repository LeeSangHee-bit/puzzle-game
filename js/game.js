const PuzzleGame = {
  fruits: [
    { id: "apple", name: "사과", color: "#e63946", accent: "#9d0208" },
    { id: "banana", name: "바나나", color: "#ffd166", accent: "#f4a261" },
    { id: "grape", name: "포도", color: "#7b2cbf", accent: "#5a189a" },
    { id: "orange", name: "오렌지", color: "#f77f00", accent: "#d95d00" },
    { id: "strawberry", name: "딸기", color: "#ef476f", accent: "#c9184a" },
    { id: "watermelon", name: "수박", color: "#2a9d8f", accent: "#e63946" },
    { id: "peach", name: "복숭아", color: "#ffb4a2", accent: "#e5989b" },
    { id: "kiwi", name: "키위", color: "#8ac926", accent: "#6a994e" },
    { id: "lemon", name: "레몬", color: "#f9dc5c", accent: "#f4c430" },
    { id: "cherry", name: "체리", color: "#d90429", accent: "#8d0801" },
    { id: "pineapple", name: "파인애플", color: "#f4d35e", accent: "#5f8d4e" },
    { id: "mango", name: "망고", color: "#ffbe0b", accent: "#fb8500" },
    { id: "pear", name: "배", color: "#c7f464", accent: "#8ab17d" },
    { id: "blueberry", name: "블루베리", color: "#4361ee", accent: "#3a0ca3" },
    { id: "plum", name: "자두", color: "#9d4edd", accent: "#5a189a" },
    { id: "melon", name: "멜론", color: "#b5e48c", accent: "#76c893" },
    { id: "coconut", name: "코코넛", color: "#bc8a5f", accent: "#6f4e37" },
    { id: "lime", name: "라임", color: "#70e000", accent: "#38b000" }
  ],
  checkDelay: 700,
  state: null,
  elements: null,

  // 게임에서 사용할 상태 객체를 새로 만듭니다.
  createInitialState() {
    return {
      cards: [],
      openedCardIds: [],
      tryCount: 0,
      matchCount: 0,
      isChecking: false,
      isCleared: false,
      hasReset: false
    };
  },

  // 과일 18쌍을 만들어 6x6 카드 데이터로 변환합니다.
  createCards() {
    const fruitPairs = [...this.fruits, ...this.fruits];
    const shuffledFruits = PuzzleUtil.shuffle(fruitPairs);

    return shuffledFruits.map((fruit, index) => ({
      id: index,
      fruitId: fruit.id,
      fruitName: fruit.name,
      imageUrl: PuzzleUtil.createFruitImageUrl(fruit),
      isFlipped: false,
      isMatched: false
    }));
  },

  // 게임 상태 영역의 숫자를 갱신합니다.
  updateStatus() {
    this.elements.tryCountText.textContent = this.state.tryCount;
    this.elements.matchCountText.textContent = `${this.state.matchCount} / ${this.fruits.length}`;
  },

  // 카드 id로 현재 카드 객체를 찾습니다.
  findCard(cardId) {
    return this.state.cards.find((card) => card.id === cardId);
  },

  // 모든 짝을 찾았는지 판단합니다.
  checkClearCondition() {
    if (this.state.matchCount !== this.fruits.length) {
      return;
    }

    this.state.isCleared = true;
    this.elements.messageElement.textContent = `클리어! ${this.state.tryCount}번 만에 모든 과일을 찾았습니다.`;
  },

  // 열려 있는 카드 2장이 같은 과일인지 확인합니다.
  checkOpenedCards() {
    const [firstCardId, secondCardId] = this.state.openedCardIds;
    const firstCard = this.findCard(firstCardId);
    const secondCard = this.findCard(secondCardId);

    this.state.tryCount += 1;

    if (firstCard.fruitId === secondCard.fruitId) {
      firstCard.isMatched = true;
      secondCard.isMatched = true;
      this.state.matchCount += 1;
      this.state.openedCardIds = [];
      this.state.isChecking = false;
      this.elements.messageElement.textContent = `${firstCard.fruitName} 짝을 찾았습니다.`;
      this.updateStatus();
      this.render();
      this.checkClearCondition();
      return;
    }

    this.elements.messageElement.textContent = "다른 과일입니다. 다시 시도해보세요.";
    PuzzleBoard.markWrongCards([firstCardId, secondCardId]);

    setTimeout(() => {
      firstCard.isFlipped = false;
      secondCard.isFlipped = false;
      this.state.openedCardIds = [];
      this.state.isChecking = false;
      this.updateStatus();
      this.render();
    }, this.checkDelay);
  },

  // 카드를 클릭했을 때 뒤집고, 2장이 열리면 정답을 확인합니다.
  handleCardClick(card) {
    if (this.state.isChecking || this.state.isCleared || card.isFlipped || card.isMatched) {
      return;
    }

    card.isFlipped = true;
    this.state.openedCardIds.push(card.id);
    this.render();

    if (this.state.openedCardIds.length === 2) {
      this.state.isChecking = true;
      this.checkOpenedCards();
    }
  },

  // 보드 렌더링을 board.js에 위임합니다.
  render() {
    PuzzleBoard.render(this.state.cards, (card) => this.handleCardClick(card));
  },

  // 게임 상태를 처음으로 되돌립니다.
  reset() {
    this.state = this.createInitialState();
    this.state.cards = this.createCards();

    this.elements.messageElement.textContent = "카드 2장을 클릭해서 같은 과일을 찾아보세요.";
    this.updateStatus();
    this.render();
  },

  resetFromButton() {
    this.reset();
    this.state.hasReset = true;
  },

  // 앱 시작 시 필요한 HTML 요소와 이벤트를 연결합니다.
  init(elements) {
    this.elements = elements;
    PuzzleBoard.init(elements.boardElement);
    elements.resetButton.addEventListener("click", () => this.resetFromButton());
    this.reset();
  }
};
