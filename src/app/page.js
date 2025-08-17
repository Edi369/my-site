import Initial from "@/pages_components/initial";
import About from "@/pages_components/about";

export default function Home() {
  return (
    <>
      <Initial />
      <About />
      {/* add more space for the footer */}
      <div className="py-30" />
    </>
  );
}