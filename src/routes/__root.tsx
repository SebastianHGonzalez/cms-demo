import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import * as React from "react";
import type { QueryClient } from "@tanstack/react-query";
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary";
import { NotFound } from "~/components/NotFound";
import appCss from "~/styles/app.css?url";
import { seo } from "~/utils/seo";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title:
          "TanStack Start | Type-Safe, Client-First, Full-Stack React Framework",
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div id="root" className="flex min-h-screen flex-col">
          <header className="flex items-center space-x-4 bg-gray-800 p-4 text-white">
            <h1 className="text-2xl font-bold">CMS Demo</h1>

            <nav>
              <ul className="flex items-center space-x-4">
                <li>
                  <Link to="/" className="text-white hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/pages" className="text-white hover:underline">
                    Pages
                  </Link>
                </li>
              </ul>
            </nav>
          </header>

          <div className="flex-1">{children}</div>
          <footer className="flex items-center justify-center bg-gray-800 p-4 text-white">
            <p className="text-sm">CMS Demo</p>
          </footer>
        </div>

        <ReactQueryDevtools />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
