import { LanguageSelector } from "./LanguageSelector";

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="max-w-screen-xl mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Spaza Connect</h1>
        <LanguageSelector />
      </div>
    </header>
  );
}