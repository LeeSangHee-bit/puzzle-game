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

  // 외부 이미지 파일 없이도 과일처럼 보이도록 SVG 이미지 주소를 만듭니다.
  createFruitImageUrl(fruit) {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <rect width="120" height="120" rx="24" fill="#f5f7fb"/>
        <path d="M61 32 C78 34 91 48 88 66 C85 86 72 96 60 96 C48 96 35 86 32 66 C29 48 43 34 59 32 Z" fill="${fruit.color}"/>
        <path d="M61 30 C62 21 68 17 76 17" stroke="#5f8d4e" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M70 25 C82 21 90 26 91 36 C79 39 72 34 70 25 Z" fill="#6a994e"/>
        <circle cx="50" cy="52" r="7" fill="${fruit.accent}" opacity="0.55"/>
        <circle cx="71" cy="69" r="8" fill="${fruit.accent}" opacity="0.45"/>
        <path d="M48 43 C55 38 65 38 72 43" stroke="#ffffff" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.55"/>
        <text x="60" y="111" text-anchor="middle" font-size="12" font-family="Arial" fill="#27313a">${fruit.id}</text>
      </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }
};
