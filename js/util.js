const PuzzleUtil = {
  // 배열의 순서를 무작위로 섞습니다.
  shuffle(items) {
    const shuffledItems = [...items];

    for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      const currentItem = shuffledItems[index];

      shuffledItems[index] = shuffledItems[randomIndex];
      shuffledItems[randomIndex] = currentItem;
    }

    return shuffledItems;
  },

  // 외부 이미지 파일 없이도 동물 이미지처럼 보이도록 SVG 이미지 주소를 만듭니다.
  createAnimalImageUrl(animal) {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <rect width="120" height="120" rx="24" fill="#f5f7fb"/>
        <circle cx="60" cy="58" r="34" fill="${animal.color}"/>
        <circle cx="45" cy="35" r="13" fill="${animal.accent}"/>
        <circle cx="75" cy="35" r="13" fill="${animal.accent}"/>
        <circle cx="48" cy="54" r="5" fill="#202a33"/>
        <circle cx="72" cy="54" r="5" fill="#202a33"/>
        <path d="M52 70 Q60 78 68 70" stroke="#202a33" stroke-width="5" fill="none" stroke-linecap="round"/>
        <text x="60" y="108" text-anchor="middle" font-size="13" font-family="Arial" fill="#27313a">${animal.id}</text>
      </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }
};
