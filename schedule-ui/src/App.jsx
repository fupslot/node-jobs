import React from "react";
import doc from "./document.svg";

import Schedule from "./components/Schedule";

function App() {
  return (
    <>
      <nav className="bg-blue-200 p-4">
        <div className="flex text-lg">
          <img src={doc} width={18} height={18} />
          <span className="font-bold pl-2">Schedule UI</span>
        </div>
      </nav>
      <Schedule />
    </>
  );
}

export default App;
