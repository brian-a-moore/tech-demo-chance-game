type Props = {
  children: React.ReactNode;
};

export const Window: React.FC<Props> = ({ children }) => {
  return <div className="bg-zinc-800 h-screen w-screen flex flex-col gap-y-4 items-center justify-center p-4">{children}</div>;
};

export const WindowContent: React.FC<Props> = ({ children }) => {
  return <div className="w-full max-w-[690px] bg-zinc-700 p-4 rounded-lg shadow-lg">{children}</div>;
};

export const CardContainer: React.FC<Props> = ({ children }) => {
  return <div className="bg-zinc-800 flex gap-4 flex-wrap items-center justify-center p-4 rounded-md">{children}</div>;
};