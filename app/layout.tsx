import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Plan Treningowy FBW',
  description: 'Przejrzysty, minimalistyczny i nowoczesny plan treningowy Full Body Workout (Trening A i B) z filmami instruktażowymi i partiami mięśniowymi.',
  openGraph: {
    title: 'Plan Treningowy FBW',
    description: 'Przejrzysty, minimalistyczny i nowoczesny plan treningowy Full Body Workout (Trening A i B) z filmami instruktażowymi i partiami mięśniowymi.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plan Treningowy FBW',
    description: 'Przejrzysty, minimalistyczny i nowoczesny plan treningowy Full Body Workout (Trening A i B) z filmami instruktażowymi i partiami mięśniowymi.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              try {
                var s = localStorage.getItem('fbw_app_settings');
                var theme = s ? JSON.parse(s).theme : 'dark';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
                var fs = s ? JSON.parse(s).fontSizePercent : 115;
                if (fs) {
                  document.documentElement.style.fontSize = fs + '%';
                }
              } catch(e) {}
            })();`,
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
