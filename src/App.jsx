import { shallowEqual, useSelector } from "react-redux";

import {
  Navbar,
  Hero,
  Footer,
  Sidebar,
  Overlay,
  Submenu,
  Loading,
  GameMenu,
} from "./components/";
function App() {
  const { isLoaded } = useSelector((state) => {
    return {
      isLoaded: state.transfers.isLoaded,
    };
  }, shallowEqual);
  return (
    <>
      {/* <div
        style={{
          position: "absolute",
          fontSize: "3rem",
          zIndex: 100,
          color: "red",
        }}
        className="center-items"
      >
        <h3>{window.innerWidth}</h3>
      </div> */}
      {!isLoaded && <Loading />}
      <Navbar />
      <Hero />
      <Footer />
      <Sidebar />
      <GameMenu />
      {/* <Overlay /> */}
    </>
  );
}

export default App;
