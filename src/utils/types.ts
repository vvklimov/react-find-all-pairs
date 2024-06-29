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
  permutedArray: number[];
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

export type TimerValues = {
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
  currentGameTime: TimerValues;
};
export type GameMenuState = {
  show: boolean;
  textContent: GameMenuTextContent;
};

export type TimerClass = "target-time" | "current-game-time" | "best-time";

export type TimerNameTextContent = "target time:" | "time:" | "best time:";

export type Timer = {
  timerClass: TimerClass;
  timerName: TimerNameTextContent;
  defaultValues: TimerValues;
};

export type DefaultTimers = {
  targetTime: Timer;
  currentGameTime: Timer;
  bestTime: Timer;
};

export type TimerName = "targetTime" | "currentGameTime" | "bestTime";

export type TimersState = {
  defaultTimers: DefaultTimers;
  targetTime: TimerValues;
  currentGameTime: TimerValues;
  bestTime: TimerValues;
  timerInterval: null | number;
  isPaused: boolean;
  pulseFlag: boolean;
  newRecordFlag: boolean;
  lostFlag: boolean;
};

export type TargetTimeTimerValues = {
  mins: string;
  secs: string;
  msecs: string;
};
export type TargetTimeValues = {
  easy16: TargetTimeTimerValues;
  normal16: TargetTimeTimerValues;
  hard16: TargetTimeTimerValues;
  easy20: TargetTimeTimerValues;
  normal20: TargetTimeTimerValues;
  hard20: TargetTimeTimerValues;
  easy24: TargetTimeTimerValues;
  normal24: TargetTimeTimerValues;
  hard24: TargetTimeTimerValues;
  easy36: TargetTimeTimerValues;
  normal36: TargetTimeTimerValues;
  hard36: TargetTimeTimerValues;
};

export type BestTimeLocalStorageFormat = {
  "16-cards": TimerValues;
  "20-cards": TimerValues;
  "24-cards": TimerValues;
  "36-cards": TimerValues;
};

export type ReversedTimerUnitFormat = {
  min: string | number | null;
  sec: string | number | null;
  msec: string | number | null;
};

export type HeroCenter = {
  heroLeft?: number;
  heroRight?: number;
  heroBottom?: number;
  heroTop?: number;
  heroCenterX?: number;
  heroCenterY?: number;
};

export type CardCoordinates = {
  cardCenterX: number;
  cardCenterY: number;
};

export type CardsCenter = {
  [key: number]: CardCoordinates;
};
export type MoveCardsToDestination = {
  [key: number]: { destCoord: string };
};
export type TransfersState = {
  heroCenter: HeroCenter;
  cardsCenter: CardsCenter;
  moveToCenter: MoveCardsToDestination;
  moveToRight: MoveCardsToDestination;
  moveToLeft: MoveCardsToDestination;
  currentPosition: MoveCardsToDestination;
  moveToDefaultPosition: "translate(0px, 0px)";
  visible: boolean;
  isLoaded: boolean;
  snakeLikeArrivalPending: boolean;
  heightAspectRatio: boolean;
};
export type updateCurrentPositionCommands =
  | "moveToCenter"
  | "moveToRight"
  | "moveToLeft";

export type TranslateCardsCommands =
  | updateCurrentPositionCommands
  | "moveCardsAway";

export type CardCompleteCoordinates = {
  index: number;
  centerX: number;
  centerY: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
};

export type DeckAR = {
  16: string;
  20: string;
  24: string;
  36: string;
};
