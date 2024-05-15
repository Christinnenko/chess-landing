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
    sliderLeftButton.onclick = function () {
      sliderRight(itemsToShow, itemWidth);
    };
  }

  let sliderRightButton = document.getElementById("slider-right");
  if (sliderRightButton) {
    sliderRightButton.onclick = function () {
      sliderLeft(itemsToShow, itemWidth);
    };
  }

  let sliderLeftButtonMob = document.getElementById("slider-left-mob");
  if (sliderLeftButtonMob) {
    sliderLeftButtonMob.onclick = function () {
      sliderRight(itemsToShowMobile, itemWidthMobile);
    };
  }

  let sliderRightButtonMob = document.getElementById("slider-right-mob");
  if (sliderRightButtonMob) {
    sliderRightButtonMob.onclick = function () {
      sliderLeft(itemsToShowMobile, itemWidthMobile);
    };
  }

  let participantsTotal = document.querySelector(".participants-nav__total");
  participantsTotal.innerText = `/ ${participantsList.participants.length}`;
}

function toggleArrowDisabled(offset) {
  let sliderLeftButton = document.getElementById("slider-left");
  let sliderLeftButtonMob = document.getElementById("slider-left-mob");
  if (offset === 0) {
    sliderLeftButton.classList.add("arrow-disabled");
    sliderLeftButton.disabled = true;
    sliderLeftButtonMob.classList.add("arrow-disabled");
    sliderLeftButtonMob.disabled = true;
  } else {
    sliderLeftButton.classList.remove("arrow-disabled");
    sliderLeftButton.disabled = false;
    sliderLeftButtonMob.classList.remove("arrow-disabled");
    sliderLeftButtonMob.disabled = false;
  }
}

let itemsToShow = 3; // количество элементов которые нужно показать на десктопе
let itemWidth = 414; // ширина одного элемента на десктопе
let itemsToShowMobile = 1; //количество элементов которые нужно показать на мобиле
let itemWidthMobile = 348; // ширина одного элемента на мобиле
const totalItems = participantsList.participants.length; // Общее количество элементов в виде числа
const lastItems = totalItems % itemsToShow; //Кол-во элементов на последнем клике

let offset = 0;

function sliderLeft(itemsToShow, itemWidth) {
  stopSliderInterval();

  let participantsCounter;
  if (window.innerWidth >= 768) {
    participantsCounter = document.querySelector(".participants-nav__counter");
  } else {
    participantsCounter = document.querySelector(
      ".participants-nav__counter-mob"
    );
  }

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

  startSliderInterval();
}

function sliderRight(itemsToShow, itemWidth) {
  stopSliderInterval();

  let participantsCounter;
  if (window.innerWidth >= 768) {
    participantsCounter = document.querySelector(".participants-nav__counter");
  } else {
    participantsCounter = document.querySelector(
      ".participants-nav__counter-mob"
    );
  }

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
  startSliderInterval();
}

function startSliderInterval() {
  intervalId = setInterval(function () {
    if (window.innerWidth >= 768) {
      sliderLeft(itemsToShow, itemWidth);
    } else {
      sliderLeft(itemsToShowMobile, itemWidthMobile);
    }
  }, 4000);
}

let intervalId;

function stopSliderInterval() {
  clearInterval(intervalId);
}

document.addEventListener("DOMContentLoaded", function () {
  renderAppParticipants();
  startSliderInterval();
});
