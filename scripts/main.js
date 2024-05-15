import { renderAppRunningLine } from "./app__running_line.js";
import { renderAppStages } from "./app__stages.js";
import { renderAppParticipants } from "./app__participants.js";

function renderApp() {
  renderAppRunningLine();
  renderAppParticipants();
  renderAppStages();
}

document.addEventListener("DOMContentLoaded", function () {
  renderApp();
});

window.addEventListener("resize", function () {
  renderApp();
});
