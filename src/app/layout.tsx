import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/core/app-providers";
import { Button, Link } from "@nextui-org/react";
import NextLink from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import { IconAt, IconBrandGithub } from "@tabler/icons-react";

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
            <header className="h-16 border-b-1 shrink-0 flex justify-center">
              <div className="px-2 h-16 grow flex items-center max-w-screen-xl">
                <NextLink className="w-fit" href={"/"}>
                  <Image
                    className="h-10 w-fit aspect-video"
                    src={logo}
                    alt="Logo image"
                  />
                </NextLink>
              </div>
            </header>

            <main className="flex-grow">{children}</main>

            <footer className="border-t-1 flex justify-center items-center">
              <div className="h-16 flex grow justify-between max-w-screen-xl px-2 items-center">
                <Button
                  as={Link}
                  href="https://github.com/reversoid/ytloop"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconBrandGithub />
                </Button>

                <Button as={Link} href="mailto:grenka7777777gmail.com">
                  <IconAt />
                </Button>
              </div>
            </footer>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
