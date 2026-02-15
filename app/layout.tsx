import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CnyThemeProvider } from "@/components/CnyThemeProvider";
import "katex/dist/katex.min.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jiahao Zhu",
  description:
    "Research Master's student specialising in computational cognitive modelling, risky decision-making, and decision-making dynamics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}
    >
      <body className="font-sans text-base leading-[1.75]">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var t = localStorage.getItem('theme');
                var d = t === 'dark';
                if (d) document.documentElement.classList.add('dark');
                var c={2025:"01-29",2026:"02-17",2027:"02-06",2028:"01-26",2029:"02-13",2030:"02-03"};
                var y=new Date().getFullYear(),i;
                for(i=-1;i<=1;i++){var e=c[y+i];if(e){var n=new Date((y+i)+"-"+e+"T00:00:00"),s=new Date(n);s.setDate(s.getDate()-7);var f=new Date(n);f.setDate(f.getDate()+14);var now=new Date();now.setHours(0,0,0,0);if(now>=s&&now<=f){document.documentElement.classList.add("cny");break}}}
              })();
            `,
          }}
        />
        <CnyThemeProvider />
        <Nav />
        <main className="max-w-content mx-auto px-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
