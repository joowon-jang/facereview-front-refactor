import React, { ReactElement, useState } from "react";
import { CategoryType } from "types/index";
import "./categorylist.scss";

type CategoryListPropType = {
  selected: CategoryType[];
  setSelected: React.Dispatch<React.SetStateAction<CategoryType[]>>;
  maxSelection?: number;
};

const CategoryList = ({
  selected,
  setSelected,
  maxSelection = 3,
}: CategoryListPropType): ReactElement => {
  const { v4: uuidv4 } = require("uuid");
  const categoryByName = {
    sports: "🤾‍♀️ 스포츠",
    game: "🎮 게임",
    news: "📰 뉴스",
    travel: "✈️ 여행",
    cook: "🧑‍🍳 요리",
    comedy: "🤣 코미디",
    fear: "🧟‍♀️ 공포",
    drama: "🎭 드라마",
    review: "🤓 리뷰",
    fancam: "📷 직캠",
    talking: "🗣️ 토크",
    information: "📊 정보",
    music: "🎵 음악",
    show: "🎪 예능",
    eating: "🍽️ 먹방",
    comic: "🦸‍♂️ 만화",
    health: "🏋️‍♂️ 운동",
    vlog: "📷 브이로그",
  };
  const categories: CategoryType[] = [
    "sports",
    "game",
    "news",
    "travel",
    "cook",
    "comedy",
    "fear",
    "drama",
    "review",
    "fancam",
    "talking",
    "information",
    "music",
    "show",
    "eating",
    "comic",
    "health",
    "vlog",
  ];

  const handleCategoryClick = (category: CategoryType) => {
    if (selected.includes(category)) {
      setSelected((prev) => {
        const popedCategoryList = prev.filter((item) => item !== category);
        setSelected(popedCategoryList);

        return popedCategoryList;
      });
      return;
    }
    if (selected.length < maxSelection) {
      setSelected((prev) => {
        const pushedCategoryList = [...prev, category];
        setSelected(pushedCategoryList);

        return pushedCategoryList;
      });
    }
  };

  return (
    <div className="categories-container">
      {categories.map((category) => (
        <button
          key={uuidv4()}
          className={`category-item ${
            selected.includes(category) ? "selected" : null
          }`}
          onClick={() => handleCategoryClick(category)}
        >
          <p className="font-label-medium">{categoryByName[category]}</p>
        </button>
      ))}
    </div>
  );
};

export default CategoryList;
