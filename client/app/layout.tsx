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

const appSectionStyle =
  "flex w-full xl:w-3/5 lg:w-4/5 md:w-full mx-auto py-4 px-8 lg:px-0";

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
      <body
        className={`${doto.variable} ${sourceCodePro.variable} antialiased flex flex-col w-full h-screen overflow-hidden`}
      >
        <header
          className={`${appSectionStyle} justify-between items-baseline-last`}
        >
          <h1 className="font-doto lg:text-3xl">
            <a href="/">_indentify.</a>
          </h1>
          <span className="flex items-center gap-4 md:gap-24">
            <h4 className="font-source-code-pro text-neutral-500 text-xs md:text-base flex items-center gap-2">
              <a
                href="/about"
                className="hover:text-neutral-50 transition-colors"
              >
                _about_me
              </a>
            </h4>

            <h6 className="font-source-code-pro text-neutral-500 text-xs flex items-center gap-2">
              <a
                href="https://github.com/somraj2501/indentify"
                className="hover:text-neutral-50 transition-colors"
              >
                <Github className="inline" size={18} />
              </a>
            </h6>
          </span>
        </header>
        <main className={`${appSectionStyle} flex-1 min-h-0`} role="main">
          {children}
        </main>
        <footer className={`${appSectionStyle} justify-center`}>
          <h6 className="font-source-code-pro text-neutral-500  text-xs">
            Made with ❤️ by{" "}
            <a
              href="https://github.com/somraj2501"
              className="hover:text-neutral-50 transition-colors"
            >
              Som Raj
            </a>
          </h6>
        </footer>
      </body>
    </html>
  );
}
