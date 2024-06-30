import { shallowEqual } from "react-redux";
import { useAppSelector } from "./utils/hooks";

import { Navbar, Hero, Footer, Sidebar, Loading, GameMenu } from "./components";
function App() {
  const { isLoaded } = useAppSelector((state) => {
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
