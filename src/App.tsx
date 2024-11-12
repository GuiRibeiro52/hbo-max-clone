import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Footer from "./components/Footer";

function App() {
  return (
    <div> 
      <div className="mx-auto"> 
        <Header/>
        <Outlet />
        <Footer />
      </div>
      <ScrollToTopButton />
    </div>
  );
}

export default App;
