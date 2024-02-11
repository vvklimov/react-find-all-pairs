import axios from "axios";
import { decks } from "../utils/data";
const url = "https://picsum.photos/159/250.webp";

const RandomImageQuery = (shuffledArray, currentTheme) => {
  return {
    queryKey: ["RandomImagesList", shuffledArray],
    enabled: currentTheme === "surprise-me" && shuffledArray.length !== 0,
    queryFn: async () => {
      const requiredNumOfQueries = [...new Set(shuffledArray)];
      const respPromises = requiredNumOfQueries.map(() => axios.get(url));
      const result = await Promise.all(respPromises);
      const newDeck = result.map((item) => {
        return { cardSrc: item?.request?.responseURL };
      });
      decks["surprise-me"].cardsSrc = newDeck;
      return decks["surprise-me"].cardsSrc;
    },
  };
};

export { RandomImageQuery };
