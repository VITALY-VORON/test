import type { Metadata } from "next";
import "./globals.scss";
import StoreProvider from "./StoreProvider";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    absolute: process.env.SITE_NAME,
    template: `%s | ${process.env.SITE_NAME}`,
  },
  description: process.env.SITE_DESCRIPTION,
  metadataBase: new URL(process.env.APP_URL),
  openGraph: {
    type: "website",
    siteName: process.env.SITE_NAME,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <Suspense>
          <body className={"antialiased"}>{children}</body>
        </Suspense>
      </StoreProvider>
    </html>
  );
}

