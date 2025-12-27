interface PadProps {
  title: string;
}

export default function Pad({ title }: PadProps) {
  return (
    <button className="border border-black dark:border-white rounded-lg w-20 h-20 text-wrap hover:cursor-pointer">
      {title}
    </button>
  );
}
