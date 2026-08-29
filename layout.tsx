import "./globals.css";

export const metadata = {
  title: "Tyson Media",
  description: "منصة التصوير والهاند ميد",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}