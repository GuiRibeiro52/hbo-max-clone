import { Outlet } from "react-router-dom";

function App() {
  return (
    <div> 
      <div className="mx-auto"> 
        <Outlet />
      </div>
    </div>
  );
}

export default App;
