import axios from "axios";
import { decks } from "../utils/data";
const url = `https://randomuser.me/api?results=`;

const RandomPersonQuery = (shuffledArray, currentTheme) => {
  return {
    queryKey: ["RandomPersonList", shuffledArray],
    enabled: currentTheme === "people" && shuffledArray.length !== 0,
    queryFn: async () => {
      const resp = await axios.get(`${url}${shuffledArray.length / 2}`);
      const newDeck = resp.data.results.map((item) => {
        return { cardSrc: item?.picture?.large };
      });
      decks["people"].cardsSrc = newDeck;
      return decks;
    },
  };
};

export { RandomPersonQuery };
