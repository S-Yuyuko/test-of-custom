import { ExperienceProvider } from "@/contexts/ExperienceContext";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ExperienceProvider>{children}</ExperienceProvider>
      </body>
    </html>
  );
}
