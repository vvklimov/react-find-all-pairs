import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "./index.css";
import App from "./App.jsx";
import { SettingsProvider } from "./context/settings_context";
import { SidebarProvider } from "./context/sidebar_context.jsx";
import { GameStateProvider } from "./context/gameState_context.jsx";
import { TimersProvider } from "./context/timers_context.jsx";
import { DeckProvider } from "./context/deck_context.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <SettingsProvider>
    <GameStateProvider>
      <SidebarProvider>
        <TimersProvider>
          <DeckProvider>
            <App />
          </DeckProvider>
        </TimersProvider>
      </SidebarProvider>
    </GameStateProvider>
  </SettingsProvider>
);
