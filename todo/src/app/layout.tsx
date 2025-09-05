import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const geistLato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "ToDo App – Simple Task Manager",
  description:
    "A lightweight and user-friendly ToDo app to manage your daily tasks. Add, complete, and delete tasks with ease.",
  keywords: ["todo", "task manager", "to-do list", "productivity app"],
  authors: [{ name: "Alex Seriakov" }],
  openGraph: {
    title: "ToDo App – Simple Task Manager",
    description:
      "Stay productive with a clean and minimal ToDo app. Track tasks, mark completed ones, and stay organized every day.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToDo App – Simple Task Manager",
    description:
      "Organize your tasks effortlessly with a modern ToDo app. Simple, fast, and minimalistic.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistLato.variable}`}>{children}</body>
    </html>
  );
}
