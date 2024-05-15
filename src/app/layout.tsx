import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/core/app-providers";
import { Button, Link } from "@nextui-org/react";
import NextLink from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import { IconAt, IconBrandGithub } from "@tabler/icons-react";
import { ThemeSwitcher } from "@/shared/theme-switcher";

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
            <header className="h-16 border-b-1 border-foreground-200 shrink-0 flex justify-center">
              <div className="px-2 h-16 grow flex justify-between items-center max-w-screen-xl">
                <div className="dark:lg:bg-foreground-600 p-0.5 rounded-lg">
                  <NextLink className="w-fit" href={"/"}>
                    <Image
                      className="h-10 w-fit aspect-video"
                      src={logo}
                      alt="Logo image"
                    />
                  </NextLink>
                </div>

                <ThemeSwitcher />
              </div>
            </header>

            <main className="flex-grow">{children}</main>

            <footer className="border-t-1 border-foreground-200 flex justify-center items-center">
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
