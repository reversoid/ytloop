import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/core/app-providers";
import { Link } from "@nextui-org/react";
import NextLink from "next/link";
import Image from "next/image";
import logo from "./static/logo.svg";

export const metadata: Metadata = {
  title: "YTLoop",
  description: "Loop youtube video",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <div className="flex flex-col h-full">
            <header className="h-16 border-b-1 shrink-0 flex justify-center items-center">
              <NextLink className="w-fit" href={"/"}>
                <Image
                  className="h-10 w-fit aspect-video"
                  src={logo}
                  alt="Logo image"
                />
              </NextLink>
            </header>

            <main className="flex-grow">{children}</main>

            <footer className="h-16 border-t-1 flex justify-center items-center">
              <Link color="foreground" href="mailto:grenka7777777gmail.com">
                Contact
              </Link>
            </footer>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
