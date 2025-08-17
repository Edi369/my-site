import Shortcuts from "@/components/shortcuts";
import { readFileSync } from "fs";

export default function Home() {
  const linksinfo = JSON.parse(readFileSync("src/linksinfo.json", "utf8"));

  return (
    <div className="flex flex-col px-5 lg:px-20 pb-10 pt-25 items-end justify-end">
      { /* Site name */ }
      <h1 className="text-8xl font-bold text-right text-red-600">edi</h1>
      <h2 className="text-3xl font-bold text-right text-red-800">edi<span className="text-small-foreground">.</span></h2>

      <p className="text-4xl lg:text-5xl font-bold text-right">
        Oi! Esse é o meu site.
      </p>

      { /* Introduction */ }
      <p className="text-2xl lg:text-3xl w-full mt-5 font-bold text-left">
        Nesse site, você pode encontrar informações sobre mim, meus projetos, meus gostos e etc ai.<br />
        meu portfólio legal e simples na internet para internautas 😎.
      </p>

      { /* Links/Shortcuts */ }
      <div className="flex flex-col gap-2 mt-5 w-full items-center lg:items-start lg:justify-start">
        <p className="text-2xl font-bold text-left">Não se esqueça de dar uma olhada na
          <span className="text-red-600">  lista de atalhos</span>:
        </p>
        
        <div className="flex flex-wrap gap-2 bg-background-component">
          <Shortcuts linksinfo={linksinfo} classname="text-2xl lg:text-base" />
        </div>
      </div>
    </div>
  );
}