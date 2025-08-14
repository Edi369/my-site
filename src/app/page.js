export default function Home() {
  return (
    <div className="flex flex-col px-20 py-25">
      { /* Introdução */ }
      <h1 className="text-6xl font-bold text-right text-red-600">edi</h1>
      <div className="flex flex-wrap justify-end">
        <h2 className="text-3xl font-bold text-right text-red-800">edi</h2>
        <p className="text-3xl font-bold text-right text-small-foreground">.</p>
      </div>
      <p className={`text-4xl font-bold text-right`}>Oi! Esse é o meu site.</p>
    </div>
  );
}