import "./globals.css";

// const monts = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "VSTEP",
  description: "Thi thử VSTEP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
