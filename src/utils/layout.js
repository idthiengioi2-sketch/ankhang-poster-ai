export function getAutoColumns(productCount) {
  if (productCount <= 2) {
    return 2;
  }

  if (productCount <= 6) {
    return 3;
  }

  if (productCount <= 12) {
    return 4;
  }

  return 5;
}

export function getGridColumns(columns) {
  const gridClasses = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
  };

  return gridClasses[columns] || gridClasses[4];
}

export function getCardSize(columns) {
  const cardSizes = {
    2: {
      imageHeight: "h-[210px]",
      nameSize: "text-3xl",
      priceSize: "text-5xl",
      minHeight: "min-h-[430px]",
    },

    3: {
      imageHeight: "h-[155px]",
      nameSize: "text-2xl",
      priceSize: "text-4xl",
      minHeight: "min-h-[340px]",
    },

    4: {
      imageHeight: "h-[110px]",
      nameSize: "text-[20px]",
      priceSize: "text-3xl",
      minHeight: "min-h-[255px]",
    },

    5: {
      imageHeight: "h-[85px]",
      nameSize: "text-base",
      priceSize: "text-2xl",
      minHeight: "min-h-[215px]",
    },
  };

  return cardSizes[columns] || cardSizes[4];
}