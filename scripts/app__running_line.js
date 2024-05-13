//Рендер бегущей строки

export function renderAppRunningLine() {
  let appRunningLines = document.querySelectorAll(".running-line");

  appRunningLines.forEach((runningLine) => {
    let text = `
      Дело помощи утопающим — дело рук самих утопающих! Шахматы двигают вперед
      не только культуру, но и экономику! Лед тронулся, господа присяжные
      заседатели!
    `;

    let substrings = text.split("!");

    let runningLineHTML = `
      <p class="running-line__text running-line__start">
        ${substrings
          .map(
            (substring, index) =>
              `<span>${substring}${
                index < substrings.length - 1
                  ? "!</span><span class='running-line__circle'></span><span>"
                  : ""
              }</span>`
          )
          .join("")}
      </p>
      <p class="running-line__text running-line__end">
        ${substrings
          .map(
            (substring, index) =>
              `<span>${substring}${
                index < substrings.length - 1
                  ? "!</span><span class='running-line__circle'></span><span>"
                  : ""
              }</span>`
          )
          .join("")}
      </p>
    `;

    runningLine.innerHTML = runningLineHTML;
  });
}
