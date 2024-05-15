// Рендер этапов преображения Васюков
export const stagesList = {
  stages: [
    {
      description: "Строительство железнодорожной магистрали Москва-Васюки",
    },
    {
      description:
        "Открытие фешенебельной гостиницы «Проходная пешка» и других небоскрёбов",
    },
    {
      description:
        "Поднятие сельского хозяйства в радиусе на&nbsp;тысячу километров: производство овощей, фруктов, икры, шоколадных конфет",
    },
    {
      description: "Строительство&nbsp;дворца для&nbsp;турнира",
    },
    {
      description: "Размещение гаражей для&nbsp;гостевого автотранспорта&nbsp;",
    },
    {
      description:
        "Постройка сверхмощной радиостанции для передачи всему миру сенсационных результатов",
    },
    {
      description:
        "Создание аэропорта «Большие Васюки» с регулярным отправлением почтовых самолётов и дирижаблей во все концы света, включая Лос-Анжелос и Мельбурн",
    },
  ],
};

export function renderAppStages() {
  let appStages = document.getElementById("stages");

  let stagesHTML = "";

  let currentText = ""; // Текст текущего слайда
  let totalSlides = 0; // Общее количество слайдов

  // Проверяем, является ли текущее устройство мобильным
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    stagesList.stages.forEach((stage, index) => {
      // Если описание короткое, добавляем его к текущему тексту слайда
      if (stage.description.length < 72) {
        currentText += `
          <p class="stage-text">
            <span class="stage-number">${index + 1}</span>
            ${stage.description}
          </p>`;
      } else {
        // Если описание длинное
        if (currentText) {
          stagesHTML += `
            <div class="stage">
              ${currentText}
            </div>
          `;
          currentText = "";
          totalSlides++;
        }

        stagesHTML += `
          <div class="stage">
            <p class="stage-text">
              <span class="stage-number">${index + 1}</span>
              ${stage.description}
            </p>
          </div>
        `;
        totalSlides++;
      }
    });

    appStages.innerHTML = stagesHTML;

    let stageLeftButton = document.getElementById("stages-left");
    if (stageLeftButton) {
      stageLeftButton.addEventListener("click", () => {
        stageLeft(totalSlides);
      });
    }

    let stageRightButton = document.getElementById("stages-right");
    if (stageRightButton) {
      stageRightButton.addEventListener("click", () => {
        stageRight(totalSlides);
      });
    }
  } else {
    // Если это не мобильное устройство, отображаем обычный список этапов
    stagesList.stages.forEach((stage, index) => {
      stagesHTML += `
        <div class="stage">
          <p class="stage-number">${index + 1}</p>
          <p class="stage-text">${stage.description}</p>
        </div>
      `;
    });

    appStages.innerHTML = stagesHTML;
  }
}

function toggleArrowStageDisabled(offset, totalSlides) {
  let sliderLeftButton = document.getElementById("stages-left");
  let sliderRightButton = document.getElementById("stages-right");

  if (offset === 0) {
    sliderLeftButton.classList.add("stages-arrow-disabled");
    sliderLeftButton.disabled = true;
    sliderRightButton.classList.remove("stages-arrow-disabled");
  } else {
    sliderLeftButton.classList.remove("stages-arrow-disabled");
    sliderLeftButton.disabled = false;
  }

  const maxOffset = -(itemWidth * (totalSlides - 1));
  if (offset === maxOffset) {
    sliderRightButton.classList.add("stages-arrow-disabled");
    sliderRightButton.disabled = true;
  } else {
    sliderRightButton.classList.remove("stages-arrow-disabled");
    sliderRightButton.disabled = false;
  }
}

const itemWidth = 355; // Ширина каждого этапа

let offset = 0;
let currentSlide = 0;

function stageLeft(totalSlides) {
  offset += itemWidth;

  if (offset > 0) {
    offset = 0;
  }

  toggleArrowStageDisabled(offset, totalSlides);

  // Проверяем, не достигли ли мы предпоследнего слайда
  const penultimateOffset = -(itemWidth * (totalSlides - 2));
  if (offset === penultimateOffset + itemWidth) {
    toggleArrowStageDisabled(offset, totalSlides);
  }

  let stagesList = document.getElementById("stages");
  stagesList.style.left = offset + "px";
  if (currentSlide > 0) {
    updateCircles(--currentSlide);
  }
}

function stageRight(totalSlides) {
  const maxOffset = -(itemWidth * (totalSlides - 1));

  if (offset > maxOffset) {
    offset -= itemWidth;
    let stagesList = document.getElementById("stages");
    stagesList.style.left = offset + "px";
  }

  // Проверяем, не достигли ли мы последнего слайда
  if (offset === maxOffset) {
    toggleArrowStageDisabled(offset, totalSlides);
  }

  // Проверяем, не достигли ли мы второго слайда
  const secondSlideOffset = -itemWidth;
  if (offset === secondSlideOffset) {
    toggleArrowStageDisabled(offset, totalSlides);
  }

  if (currentSlide < totalSlides - 1) {
    updateCircles(++currentSlide);
  }
}

function updateCircles(currentSlide) {
  let circles = document.querySelectorAll(".circle");

  // Сбрасываем цвет всех кругов
  circles.forEach((circle) => {
    circle.classList.remove("active-circle");
  });

  // Устанавливаем цвет текущему кругу
  if (circles[currentSlide]) {
    circles[currentSlide].classList.add("active-circle");
  }
}
