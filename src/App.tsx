import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <div> 
      <div className="mx-auto"> 
        <Header/>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
