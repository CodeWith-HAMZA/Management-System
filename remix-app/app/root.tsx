import {
  Links,
  Meta,
  Outlet,
  Scripts,
  json,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useState } from "react";
import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import { ClerkApp } from "@clerk/remix";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider, useTheme } from "providers/theme-provider";
export async function loader(args: unknown) {
  const CONVEX_URL = process.env.CONVEX_URL;
  if (!CONVEX_URL) {
    throw new Error("Missing CONVEX_URL environment variable.");
  }

  return rootAuthLoader(args, async ({ request }) => {
    const { sessionId, userId, getToken } = request.auth;

    // Add logic to fetch data based on sessionId or userId if needed
    // const yourData = "example-data";

    return json({
      user: { id: userId},
      ENV: { CONVEX_URL }, // Include the environment variable in the response
    });
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { ENV } = useLoaderData<typeof loader>();
  const [convex] = useState(() => new ConvexReactClient(ENV.CONVEX_URL));
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body>

        <ConvexProvider client={convex}>
          <ThemeProvider>
          {children}
          </ThemeProvider>
        </ConvexProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function App() {
  const theme = useTheme()
  return  <>
    <Toaster />
    <Outlet /> 
  </>
}

export default ClerkApp(App);
