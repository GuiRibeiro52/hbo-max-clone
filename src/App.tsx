import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div> 
        <ScrollToTop />
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
