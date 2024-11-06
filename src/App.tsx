import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gray-900"> 
      <div className="max-w-[1536px] mx-auto px-4"> 
        <Outlet />
      </div>
    </div>
  );
}

export default App;
