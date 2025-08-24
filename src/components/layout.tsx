import { useState, type ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const rockers = [
    "britPop",
    "classicRock",
    "dustBowl",
    "folk",
    "grunge",
    "hairMetal",
    "nuMetal",
    "popPunk",
    "punk",
    "rock",
    "rockNRoll",
  ];
  const [activeRocker, setActiveRocker] = useState(
    rockers[Math.floor(Math.random() * rockers.length)]
  );
  const activeRockerSrc = `/img/rockers/${activeRocker}.png`;

  const changeRocker = () => {
    const newRocker = rockers[Math.floor(Math.random() * rockers.length)];
    if (newRocker !== activeRocker) {
      setActiveRocker(newRocker);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col justify-center items-center mb-4">
        <div className="flex justify-center items-center gap-1 my-6">
          <h1 className="text-4xl">
            <img src="/img/logo.png" alt="Chris' Tuner" className="h-26" />
          </h1>
          <img
            src={activeRockerSrc}
            alt="Logo"
            className="h-26"
            onClick={changeRocker}
          />
        </div>
        <nav className="w-full flex justify-center items-center gap-4 bg-tuner-dark-turquoise text-white py-4">
          <a href="/">Tuner</a>
          <a href="/how-to-use">How to Use</a>
          <a href="/about">About</a>
        </nav>
      </header>

      <main>{children}</main>
    </div>
  );
}
