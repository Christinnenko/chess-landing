//Рендер этапов преображения Васюков

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
