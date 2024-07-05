import { AppProviders } from "@/core/providers/app-providers";
import { Button, Link } from "@nextui-org/react";
import { IconAt, IconBrandGithub } from "@tabler/icons-react";
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/core/layout/header";

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
    <html suppressHydrationWarning lang="en">
      <body>
        <AppProviders>
          <div className="flex flex-col h-full">
            <Header />

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
