import type { Metadata } from "next";
import "./globals.css";
import { SessionProviderWrapper } from "@/components/SessionProviderWrapper";
import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Katalyst",
  description: "Business decision-support copilot untuk UMKM",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased bg-slate-100">
        <SessionProviderWrapper>
          <div className="flex">
            <Sidebar />
            <main className="flex-1 min-h-screen bg-slate-100">{children}</main>
          </div>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
