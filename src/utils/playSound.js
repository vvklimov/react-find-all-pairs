import { getStorageItem } from "./helpers.js";
import { sounds } from "./data.js";
const BTN_CLICK = "btnClick";
const CARDS_BEING_SHUFFLED = "cardsBeingShuffled";
const FLIP_CARD = "flipCard";
const HOVER_MENU_SOUND = "hoverMenuSound";
const RADIO_BTN_CLICK = "radioBtnClick";
const THROWING_CARD = "throwingCard";
const WHOOP_1 = "whoop1";
const WHOOP_2 = "whoop2";

async function playSound(soundName, loopFlag) {
  const {
    other: { "sound-effects": playSoundFlag },
  } = getStorageItem("settings");
  if (playSoundFlag) {
    if (navigator.userActivation.hasBeenActive) {
      const audio = new Audio(sounds[soundName]);
      audio.play();
      audio.loop = loopFlag;
    } else {
      //   toast make an action to enable sounds;
    }
  }
  return;
}

export {
  BTN_CLICK,
  CARDS_BEING_SHUFFLED,
  FLIP_CARD,
  HOVER_MENU_SOUND,
  RADIO_BTN_CLICK,
  THROWING_CARD,
  WHOOP_1,
  WHOOP_2,
};
export default playSound;
// export default playSound;
