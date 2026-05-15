const PuzzleGame = {
  animals: [
    { id: "cat", name: "고양이", color: "#f4a261", accent: "#e76f51" },
    { id: "dog", name: "강아지", color: "#bc8a5f", accent: "#8d5524" },
    { id: "panda", name: "판다", color: "#f8f9fa", accent: "#2f3437" },
    { id: "fox", name: "여우", color: "#f77f00", accent: "#d95d00" },
    { id: "bear", name: "곰", color: "#8d6e63", accent: "#5d4037" },
    { id: "rabbit", name: "토끼", color: "#f8c8dc", accent: "#d98bae" },
    { id: "lion", name: "사자", color: "#d4a017", accent: "#8f5f00" },
    { id: "koala", name: "코알라", color: "#9e9e9e", accent: "#616161" }
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

  // 동물 8쌍을 만들어 4x4 카드 데이터로 변환합니다.
  createCards() {
    const animalPairs = [...this.animals, ...this.animals];
    const shuffledAnimals = PuzzleUtil.shuffle(animalPairs);

    return shuffledAnimals.map((animal, index) => ({
      id: index,
      animalId: animal.id,
      animalName: animal.name,
      imageUrl: PuzzleUtil.createAnimalImageUrl(animal),
      isFlipped: false,
      isMatched: false
    }));
  },

  // 게임 상태 영역의 숫자를 갱신합니다.
  updateStatus() {
    this.elements.tryCountText.textContent = this.state.tryCount;
    this.elements.matchCountText.textContent = `${this.state.matchCount} / ${this.animals.length}`;
  },

  // 카드 id로 현재 카드 객체를 찾습니다.
  findCard(cardId) {
    return this.state.cards.find((card) => card.id === cardId);
  },

  // 모든 짝을 찾았는지 판단합니다.
  checkClearCondition() {
    if (this.state.matchCount !== this.animals.length) {
      return;
    }

    this.state.isCleared = true;
    this.elements.messageElement.textContent = `클리어! ${this.state.tryCount}번 만에 모든 동물을 찾았습니다.`;
  },

  // 열려 있는 카드 2장이 같은 과일인지 확인합니다.
  checkOpenedCards() {
    const [firstCardId, secondCardId] = this.state.openedCardIds;
    const firstCard = this.findCard(firstCardId);
    const secondCard = this.findCard(secondCardId);

    this.state.tryCount += 1;

    if (firstCard.animalId === secondCard.animalId) {
      firstCard.isMatched = true;
      secondCard.isMatched = true;
      this.state.matchCount += 1;
      this.state.openedCardIds = [];
      this.state.isChecking = false;
      this.elements.messageElement.textContent = `${firstCard.animalName} 짝을 찾았습니다.`;
      this.updateStatus();
      this.render();
      this.checkClearCondition();
      return;
    }

    this.elements.messageElement.textContent = "다른 동물입니다. 다시 시도해보세요.";
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

    this.elements.messageElement.textContent = "카드 2장을 클릭해서 같은 동물을 찾아보세요.";
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
