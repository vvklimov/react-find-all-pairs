import axios from "axios";
import { decks, type SettingsThemeClass } from "@/utils";
const url = "https://picsum.photos/159/250.webp?random=";
const RandomImageQuery = (
  shuffledArray: number[],
  currentTheme: SettingsThemeClass
) => {
  return {
    queryKey: ["RandomImagesList", shuffledArray],
    enabled: currentTheme === "surprise-me" && shuffledArray.length !== 0,
    queryFn: async () => {
      const requiredNumOfQueries = [...new Set(shuffledArray)];
      const respPromises = requiredNumOfQueries.map((_, index) =>
        axios.get(`${url}${index}`)
      );
      const result = await Promise.all(respPromises);
      const newDeck = result.map((image) => {
        return { cardSrc: image?.request?.responseURL };
      });
      decks["surprise-me"].cardsSrc = newDeck;
      return decks;
    },
  };
};

export { RandomImageQuery };
