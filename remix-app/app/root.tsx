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
export async function loader(args) {
  const CONVEX_URL = process.env.CONVEX_URL;
  if (!CONVEX_URL) {
    throw new Error("Missing CONVEX_URL environment variable.");
  }

  return rootAuthLoader(args, async ({ request }) => {
    const { sessionId, userId, getToken } = request.auth;

    // Add logic to fetch data based on sessionId or userId if needed
    // const yourData = "example-data";

    return json({
      // yourData,
      ENV: { CONVEX_URL }, // Include the environment variable in the response
    });
  });
}
export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

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
        <ConvexProvider client={convex}>{children}</ConvexProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function App() {
  return <Outlet />;
}

export default ClerkApp(App);
