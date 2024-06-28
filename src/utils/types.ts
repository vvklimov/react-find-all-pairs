export type GameStateName =
  | "IDLE"
  | "PAUSE"
  | "GAMEOVER_FAILURE"
  | "GAMEOVER_SUCCESS"
  | "GAME"
  | "RESUME";

export type Tag = "difficulty" | "size" | "themes" | "other";

export type SettingsDifficultyName = "easy" | "normal" | "hard";

export type SettingsDifficultyClass = "easy" | "normal" | "hard";

export type SettingsSizeName =
  | "16 cards"
  | "20 cards"
  | "24 cards"
  | "36 cards";

export type SettingsSizeClass =
  | "16-cards"
  | "20-cards"
  | "24-cards"
  | "36-cards";

export type SettingsThemeName =
  | "dark fantasy"
  | "nature"
  | "people"
  | "JavaScript frameworks"
  | "surprise me";

export type SettingsThemeClass =
  | "dark-fantasy"
  | "nature"
  | "people"
  | "javascript-frameworks"
  | "surprise-me";

export type SettingsOtherName = "show rules" | "hide found cards";

export type SettingsOtherClass = "show-rules" | "hide-found-cards";

export type SubtagName =
  | SettingsDifficultyName
  | SettingsSizeName
  | SettingsThemeName
  | SettingsOtherName;
export type SubtagClass =
  | SettingsDifficultyClass
  | SettingsSizeClass
  | SettingsThemeClass
  | SettingsOtherClass;

export type Subtag = {
  subtagName: SubtagName;
  subtagClass: SubtagClass;
};

export type NavTag = {
  tag: Tag;
  subtags: Subtag[];
};

export type Background = {
  theme: SettingsThemeClass;
  src: string | string[];
};

export type SettingsOtherValue = {
  "show-rules": boolean;
  "hide-found-cards": boolean;
};
export type Settings = {
  difficulty: SettingsDifficultyClass;
  size: SettingsSizeClass;
  themes: SettingsThemeClass;
  other: SettingsOtherValue;
};

export type CardSrc = { cardSrc: string };

export type Decks = {
  nature: Deck;
  "dark-fantasy": Deck;
  people: Deck;
  "javascript-frameworks": Deck;
  "surprise-me": Deck;
};

export type Deck = {
  deckImg: string;
  cardsSrc: CardSrc[];
};

export type LastFlippedCard = {
  index: number;
  cardIndex: number;
};
export type DeckState = {
  shuffledArray: number[];
  gridClassName: string;
  gridIntValue: number;
  flippedCards: number[];
  lastFlippedCard: LastFlippedCard | null;
  onClickEnabled: boolean;
  pairsToWin: number | null;
  permutatedArray: number[];
  startNewGamePending: boolean;
  startNewGameCallCounter: number;
  foundCards: number[];
};

export type CallCounterCommandNames = "INC" | "DEC" | "RESET";

export type SettingsState = {
  settings: Settings;
  tempSettings: Settings;
  settingsAreEqual: boolean;
  currentSize: number;
  arrayLength: number;
  themesWereEqual: boolean;
};

export type Timer = {
  min: string;
  sec: string;
  msec: string;
};

export type GameMenuTextContentName =
  | "newRecord"
  | "won"
  | "lost"
  | "applyNewSettings"
  | "default";

export type GameMenuTextContent = {
  textContentName: GameMenuTextContentName;
  currentGameTime: Timer;
};
export type GameMenuState = {
  show: boolean;
  textContent: GameMenuTextContent;
};
