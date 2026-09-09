import type { Metadata } from 'next';
import './globals.css';
import { StudentProvider } from '@/lib/context/StudentContext';
import { ThemeProvider } from '@/lib/context/ThemeContext';

export const metadata: Metadata = {
  title: 'SkillBridge — Academic–Industry Collaboration Portal',
  description: 'Verified skill profiling, gap diagnostics, and placement matching — connecting students, faculty, and recruiters across DTU, IIT, and AICTE-affiliated institutions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('skillbridge_theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = saved || (prefersDark ? 'dark' : 'light');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-blue-200 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-200 transition-colors duration-150">
        <ThemeProvider>
          <StudentProvider>
            {children}
          </StudentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
