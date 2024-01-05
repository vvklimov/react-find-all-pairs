import { useState } from "react";
import {
  Navbar,
  Hero,
  Footer,
  Sidebar,
  Overlay,
  Submenu,
  Loading,
} from "./components/";
import { useSettingsContext } from "./context/settings_context";
import { useGameStateContext } from "./context/gameState_context";
import { IDLE } from "./actions";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Footer />
      <Sidebar />
      {/* <Overlay /> */}
      <Submenu />
      {/* <Loading /> */}
    </>
  );
}

export default App;
