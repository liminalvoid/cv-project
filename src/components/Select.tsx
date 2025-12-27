import type { Dispatch, SetStateAction } from "react";

interface SelectProps {
  id: string;
  options: string[];
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export default function Select({
  options,
  id,
  value,
  setValue,
}: SelectProps) {
  const optionElements = options.map((title, id) => (
    <option value={title} key={id}>
      {title}
    </option>
  ));

  return (
    <select
      className="block border border-black rounded-lg p-1.25 min-w-40 dark:border-white"
      name="models"
      id={id}
      value={value}
      onChange={(event) => setValue(event.target.value)}
    >
      {optionElements}
    </select>
  );
}
