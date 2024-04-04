import "~/styles/globals.css";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AxiomWebVitals } from "next-axiom";
import { HighlightInit } from '@highlight-run/next/client'

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

import { env } from "~/env";

// Set up Highlight ONLY in production
const NODE_ENV = env.NODE_ENV ?? 'no-env'
let HIGHLIGHT_PROJECT_ID = 'no-project-id'
if (NODE_ENV === 'production') {
  HIGHLIGHT_PROJECT_ID = env.HIGHLIGHT_PROJECT_ID ?? 'no-project-id'
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Ralph",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HighlightInit
				projectId={HIGHLIGHT_PROJECT_ID}
				serviceName="ralph-the-moose-frontend"
				tracingOrigins
				networkRecording={{
					enabled: true,
					recordHeadersAndBody: true,
					urlBlocklist: [],
				}}
			/>
      <html lang="en">
        <AxiomWebVitals />
        <SpeedInsights />
        <body className={`font-sans ${inter.variable}`}>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </body>
      </html>
    </>
  )
}
