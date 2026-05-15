const PuzzleBoard = {
  boardElement: null,

  // 보드에서 사용할 HTML 요소를 저장합니다.
  init(boardElement) {
    this.boardElement = boardElement;
  },

  // 카드 안에 들어갈 과일 이미지 요소를 만듭니다.
  createCardImage(card) {
    const image = document.createElement("img");

    image.className = "card-image";
    image.src = card.imageUrl;
    image.alt = card.fruitName;
    image.draggable = false;

    return image;
  },

  // 카드 버튼 하나를 만듭니다.
  createCardButton(card, onCardClick) {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "card";
    button.dataset.id = card.id;
    button.setAttribute("aria-label", `${card.fruitName} 카드`);

    if (card.isFlipped) {
      button.classList.add("flipped");
    }

    if (card.isMatched) {
      button.classList.add("matched");
    }

    button.appendChild(this.createCardImage(card));
    button.addEventListener("click", () => onCardClick(card));

    return button;
  },

  // 카드 데이터를 기준으로 6x6 퍼즐 보드를 다시 그립니다.
  render(cards, onCardClick) {
    this.boardElement.innerHTML = "";

    cards.forEach((card) => {
      this.boardElement.appendChild(this.createCardButton(card, onCardClick));
    });
  },

  // 틀린 카드 2장을 잠깐 표시합니다.
  markWrongCards(cardIds) {
    cardIds.forEach((cardId) => {
      const cardButton = this.boardElement.querySelector(`[data-id="${cardId}"]`);

      if (cardButton) {
        cardButton.classList.add("wrong");
      }
    });
  }
};
