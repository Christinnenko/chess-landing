import { renderAppRunningLine } from "./app__running_line.js";
import { renderAppStages } from "./app__stages.js";
import { renderAppParticipants } from "./app__participants.js";

document.addEventListener("DOMContentLoaded", function () {
  renderAppRunningLine();
  renderAppStages();
  renderAppParticipants();
});
