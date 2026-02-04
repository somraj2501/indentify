import type { Metadata } from "next";
import { Doto, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { Github } from "lucide-react";

const doto = Doto({
  variable: "--font-doto",
  subsets: ["latin"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "indentify",
  description: "format | indent | prettify",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/indentify_logo.svg" />
      </head>
      <body
        className={`${doto.variable} ${sourceCodePro.variable} antialiased flex flex-col w-screen h-screen`}
      >
        <header className="w-screen lg:w-4/5 max-w-4xl mx-auto py-4 px-8 md:px-0 flex justify-between">
          <h1 className="font-doto lg:text-3xl">_indentify.</h1>
          <h6 className="font-source-code-pro text-neutral-500  text-xs">
            <a
              href="https://github.com/somraj2501/code-formatter"
              className="hover:text-neutral-50 transition-colors"
            >
              <Github className="inline" size={18} />
            </a>
          </h6>
        </header>
        {children}
        <footer className="w-screen lg:w-4/5 max-w-4xl mx-auto py-2 px-8 flex justify-center">
          <h6 className="font-source-code-pro text-neutral-500  text-xs">
            Made with ❤️ by{" "}
            <a
              href="https://github.com/somraj2501"
              className="hover:text-neutral-50 transition-colors"
            >
              somraj2501
            </a>
          </h6>
        </footer>
      </body>
    </html>
  );
}
