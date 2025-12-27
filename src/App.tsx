import { useState } from "react";

import HandRecognizer from "./components/HandRecognizer";
import Sidebar from "./components/Sidebar";

function App() {
  const [model, setModel] = useState("default");
  const [drumkit, setDrumkit] = useState("808");

  return (
    <div className="flex items-center flex-row-reverse">
      <div className="h-dvh w-dvw flex items-center justify-center dark:bg-black">
        <HandRecognizer model={model} drumkit={drumkit} />
      </div>

      <Sidebar
        model={model}
        setModel={setModel}
        drumkit={drumkit}
        setDrumkit={setDrumkit}
      />
    </div>
  );
}

export default App;
