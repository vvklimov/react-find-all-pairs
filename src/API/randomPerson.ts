import axios from "axios";
import { decks } from "../utils/data";
import { SettingsThemeClass } from "../utils/types";
const url = `https://randomuser.me/api?results=`;
type PersonShape = { picture: { large: string } };

const RandomPersonQuery = (
  shuffledArray: number[],
  currentTheme: SettingsThemeClass
) => {
  return {
    queryKey: ["RandomPersonList", shuffledArray],
    enabled: currentTheme === "people" && shuffledArray.length !== 0,
    queryFn: async () => {
      const resp = await axios.get(`${url}${shuffledArray.length / 2}`);
      const newDeck = resp.data.results.map((person: PersonShape) => {
        return { cardSrc: person?.picture?.large };
      });
      decks["people"].cardsSrc = newDeck;
      return decks;
    },
  };
};

export { RandomPersonQuery };
