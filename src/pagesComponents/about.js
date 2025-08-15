import Tooltip from "@/components/tooltip";

export default function About() {
  return (
    <div className="flex flex-col px-5 lg:px-20 justify-center items-center">
      <div className="flex flex-col justify-center items-end">   
        <h1 className="text-4xl lg:text-8xl font-bold text-center bg-background-component text-red-600">
          {'//'} SOBRE MIM {'//'}
        </h1>

        <p className={`text-1xl lg:text-5xl font-bold text-right pb-5 text-small-foreground`}>
          sobre quem??
        </p>
      </div>
      <div className="flex flex-col justify-start items-start">
        <p className={`text-1xl lg:text-3xl font-bold`}>
          Meu nome é <span className="text-red-600">edi</span>, e eu gosto bastante de <span className="text-red-600">pizza</span>.<br />
          E esse site aqui é um site que eu fiz para... eh... pra fazer valer a pena o dominio que eu comprei.<br />
          Eu ja programei em <span className="text-red-600">python</span>, <span className="text-red-600">javascript</span>, <span className="text-red-600">typescript</span>, <span className="text-red-600">html</span> e <span className="text-red-600">c#</span>. Um poucado de <span className="text-red-600">gdscript</span> e <span className="text-red-600">css</span>.<br />
        </p>
        <p className={`text-1xl lg:text-3xl mt-5 text-small-foreground font-bold bg-background-component`}>Curiosidade:</p>
        <p className={`text-1xl lg:text-3xl font-bold`}>
          O nome <span className="text-red-600">edi</span> é uma piada que um amigo fez com o nome <span className="text-red-600">edd</span>.<br />
          E eu não preciso falar nada que o nome <span className="text-red-600">edd</span> vem da série <a href="https://www.youtube.com/@eddsworld" className="text-red-600">eddwords</a> do youtube, do personagem principal <span className="text-red-600">edd</span>.<br />
          Essa série era muito foda e eu gostava bastante de assistir, mesmo não entendo nada que os personagem falava por que eu não sabia nada de inglês e ainda tendo que ver umas dublagens feito pela comunidade. Muito irado.<br />
          É triste que infelizmente o criador morreu. 😭🙏<br />
        </p>

        <p className={`text-1xl lg:text-3xl font-bold mt-5`}>
          🪦 RIP <a href="https://en.wikipedia.org/wiki/Edd_Gould" className="text-green-600">Edd Gould</a>.
        </p>

        <a href="https://coisasdoedi.beer" className="text-red-600">
          coisas do edi
        </a>
      </div>
    </div>
  );
}