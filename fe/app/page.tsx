import Image from 'next/image';
import CreationForm from './CreationForm';

export default function Home() {
  return (
    <main className="h-[100vh] w-screen flex flex-col justify-center items-center bg-[radial-gradient(169.40%_89.55%_at_50%_50%,rgba(21, 20, 20, 0.4)_0%,rgba(255,255,255,0.00)_100%)]">
      <h1 className="text-5xl font-extrabold [text-shadow:_0_1px_4px_var(--tw-shadow-color)] shadow-slate-200/30">
        Shortys
      </h1>
      <h3 className="mb-6 text-md">Rocket-fast URL shortener 🚀</h3>
      <CreationForm />
    </main>
  );
}
