import { shallowEqual, useSelector } from "react-redux";

import {
  Navbar,
  Hero,
  Footer,
  Sidebar,
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
      {!isLoaded && <Loading />}
      <Navbar />
      <Hero />
      <Footer />
      <Sidebar />
      <GameMenu />
    </>
  );
}

export default App;
