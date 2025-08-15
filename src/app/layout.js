import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import ClientSetup from "./client-setup";

const roboto = Roboto({
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
});

export const metadata = {
  title: "edi's site",
  description: "O site maneiro do edi.",
  metadataBase: new URL('https://coisasdoedi.beer/'),
  openGraph: {
    title: "edi's site",
    description: "O site maneiro do edi.",
    url: "https://coisasdoedi.beer",
    siteName: "Site.",
    type: "website",
    locale: "pt-BR",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${roboto.className} ${robotoMono.className}`}>
        <ClientSetup />
        {children}
      </body>
    </html>
  );
}
