import { useId, type Dispatch, type SetStateAction } from "react";

import Select from "./Select";
import Pad from "./Pad";

interface SidebarProps {
  model: string;
  setModel: Dispatch<SetStateAction<string>>;
  drumkit: string;
  setDrumkit: Dispatch<SetStateAction<string>>;
}

export default function Sidebar({
  model,
  setModel,
  drumkit,
  setDrumkit,
}: SidebarProps) {
  const modelSelectId = useId();
  const drumkitSelectId = useId();

  return (
    <div className="fixed grid items-center grid-cols-2 gap-y-3 rounded-l-lg ring-1 ring-black text-black dark:ring-white dark:text-white p-3.5">
      <h1 className="col-span-2 text-xl font-semibold">Settings</h1>

      <label htmlFor={modelSelectId}>Model</label>
      <Select
        id={modelSelectId}
        options={["default", "custom"]}
        value={model}
        setValue={setModel}
      />

      <label htmlFor={drumkitSelectId}>Drum Kit</label>
      <Select
        id={drumkitSelectId}
        options={["808", "909"]}
        value={drumkit}
        setValue={setDrumkit}
      />

      {/* <p className="col-span-2">Bindings</p>
      <div className="col-span-2 grid grid-cols-4 items-center justify-center gap-3">
        <Pad title="Kick" />
        <Pad title="Snare" />
        <Pad title="Clap" />
        <Pad title="Cowbell" />
        <Pad title="Closed Hat" />
        <Pad title="Open Hat" />
        <Pad title="Rim Shot" />
        <Pad title="Clave" />
      </div> */}
    </div>
  );
}
