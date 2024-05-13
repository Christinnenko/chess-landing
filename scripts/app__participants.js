//Рендер участников турнира
export const participantsList = {
  participants: [
    {
      img: "image/participants-img.png",
      name: "Хозе-Рауль Капабланка",
      rank: "Чемпион мира по шахматам",
    },
    {
      img: "image/participants-img.png",
      name: "Эммануил Ласкер",
      rank: "Чемпион мира по шахматам",
    },
    {
      img: "image/participants-img.png",
      name: "Александр Алехин",
      rank: "Чемпион мира по шахматам",
    },
    {
      img: "image/participants-img.png",
      name: "Арон Нимцович",
      rank: "Чемпион мира по шахматам",
    },
    {
      img: "image/participants-img.png",
      name: "Рихард Рети",
      rank: "Чемпион мира по шахматам",
    },
    {
      img: "image/participants-img.png",
      name: "Остап Бендер",
      rank: "Гроссмейстер",
    },
  ],
};

export function renderAppParticipants() {
  let appParticipants = document.getElementById("participants-items");

  let participantsHTML = participantsList.participants
    .map(
      (participant) => `
        <div class="participant">
          <img class="participant-img" src="${participant.img}" alt="Изображение участника">
          <p class="participant-name">${participant.name}</p>
          <p class="participant-rank">${participant.rank}</p>
          <a class="participant-link__info">Подробнее</a>
        </div>
      `
    )
    .join("");

  appParticipants.innerHTML = participantsHTML;

  let sliderLeftButton = document.getElementById("slider-left");
  if (sliderLeftButton) {
    sliderLeftButton.onclick = sliderRight;
  }

  let sliderRightButton = document.getElementById("slider-right");
  if (sliderRightButton) {
    sliderRightButton.onclick = sliderLeft;
  }

  // Устанавливаем общее количество участников
  let participantsTotal = document.querySelector(".participants-nav__total");
  participantsTotal.innerText = `/ ${participantsList.participants.length}`;
}

function toggleArrowDisabled(offset) {
  let sliderLeftButton = document.getElementById("slider-left");
  if (offset === 0) {
    sliderLeftButton.classList.add("arrow-disabled");
  } else {
    sliderLeftButton.classList.remove("arrow-disabled");
  }
}

const totalItems = participantsList.participants.length; // Общее количество элементов в виде числа
const itemsToShow = 3; // Количество элементов, которые можно показать одновременно
const itemWidth = 414; // Ширина каждого элемента
const lastItems = totalItems % itemsToShow; //Кол-во элементов на последнем клике

let offset = 0;

function sliderLeft() {
  let participantsCounter = document.querySelector(
    ".participants-nav__counter"
  );

  offset -= itemsToShow * itemWidth;

  if (lastItems == 0) {
    if (parseInt(participantsCounter.innerText) + itemsToShow > totalItems) {
      offset = 0;
      participantsCounter.innerText = itemsToShow;
    } else {
      participantsCounter.innerText =
        parseInt(participantsCounter.innerText) + itemsToShow;
    }
  } else {
    if (
      parseInt(participantsCounter.innerText) + itemsToShow > totalItems &&
      parseInt(participantsCounter.innerText) + lastItems > totalItems
    ) {
      offset = 0;
      participantsCounter.innerText = itemsToShow;
    } else if (
      parseInt(participantsCounter.innerText) + itemsToShow > totalItems &&
      parseInt(participantsCounter.innerText) + lastItems <= totalItems
    ) {
      participantsCounter.innerText =
        parseInt(participantsCounter.innerText) + lastItems;
    } else {
      participantsCounter.innerText =
        parseInt(participantsCounter.innerText) + itemsToShow;
    }
  }

  toggleArrowDisabled(offset);
  let participantsList = document.getElementById("participants-items");
  participantsList.style.left = offset + "px";
}

function sliderRight() {
  let participantsCounter = document.querySelector(
    ".participants-nav__counter"
  );

  offset += itemsToShow * itemWidth;

  if (lastItems == 0) {
    if (parseInt(participantsCounter.innerText) == totalItems) {
      participantsCounter.innerText -= itemsToShow;
    } else if (
      parseInt(participantsCounter.innerText) - itemsToShow <
      itemsToShow
    ) {
      offset = 0;
      participantsCounter.innerText = itemsToShow;
    } else {
      participantsCounter.innerText =
        parseInt(participantsCounter.innerText) - itemsToShow;
    }
  } else {
    if (parseInt(participantsCounter.innerText) == totalItems) {
      participantsCounter.innerText =
        parseInt(participantsCounter.innerText) - lastItems;
    } else if (
      parseInt(participantsCounter.innerText) - itemsToShow <
      itemsToShow
    ) {
      offset = 0;
      participantsCounter.innerText = itemsToShow;
    } else {
      participantsCounter.innerText =
        parseInt(participantsCounter.innerText) - itemsToShow;
    }
  }

  toggleArrowDisabled(offset);
  let participantsList = document.getElementById("participants-items");
  participantsList.style.left = offset + "px";
}
