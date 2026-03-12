import { Poppins, Lexend } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

export const metadata = {
  title: "Wiki.Learn",
  description: "Plateforme e-learning inspirée de Wikipédia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${poppins.variable} ${lexend.variable}`}>
      <body>
        <main className="app-container">
          {children}
        </main>
      </body>
    </html>
  );
}
