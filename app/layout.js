import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Hocaya Sor — İslami Soru & Cevap",
  description: "Fetva veri tabanına dayanan İslami soru-cevap asistanı",
  icons: {
    icon: "/hocayasor_logo_no_background.png",
    apple: "/hocayasor_logo_no_background.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}