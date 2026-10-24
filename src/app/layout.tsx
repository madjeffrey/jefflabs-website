import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Viewport } from "next";
import classNames from "classnames";

import {
  Footer,
  Header,
  RouteGuard,
  Providers,
  BackgroundEffects,
  Meta,
} from "@/components";
import { baseURL, effects, fonts, style, home, person } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang={person.locale ?? "en"}
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
      )}
    >
      <head>
        <meta name="color-scheme" content="light dark" />
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var root = document.documentElement;
                  var mql = window.matchMedia('(prefers-color-scheme: dark)');
                  var getDeviceTheme = function() { return (mql && mql.matches ? 'dark' : 'light'); };
                  var defaultTheme = ${JSON.stringify(style.theme)};
                  var hasUserOverride = localStorage.getItem('user-has-toggled') === 'true';
                  var savedTheme = hasUserOverride ? localStorage.getItem('data-theme') : null;
                  var activeTheme = (savedTheme === 'light' || savedTheme === 'dark')
                    ? savedTheme
                    : (defaultTheme === 'light' || defaultTheme === 'dark')
                      ? defaultTheme
                      : getDeviceTheme();
                  root.setAttribute('data-theme', activeTheme);
                  root.style.colorScheme = activeTheme;
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                  document.documentElement.style.colorScheme = 'dark';
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col items-center bg-page text-fg antialiased selection:bg-brand/30 selection:text-fg">
        <Providers>
          <BackgroundEffects effects={effects} />
          <Header />
          <main className="relative z-10 flex w-full flex-1 justify-center px-4 py-8 sm:px-6 md:px-8">
            <div className="flex w-full max-w-5xl justify-center">
              <RouteGuard>{children}</RouteGuard>
            </div>
          </main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
