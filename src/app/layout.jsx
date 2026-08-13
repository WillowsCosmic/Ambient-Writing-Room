import './globals.css';
import {
  EB_Garamond,
  Caveat,
  Literata,
  Playfair_Display,
  Cormorant_Garamond,
  Lora,
  Kalam,
  Homemade_Apple,
} from 'next/font/google';
import Header from '../components/Header';
import AudioBar from '../components/AudioBar';

const garamond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-garamond',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

const literata = Literata({
  subsets: ['latin'],
  variable: '--font-literata',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

const kalam = Kalam({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-kalam',
  display: 'swap',
});

const apple = Homemade_Apple({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-apple',
  display: 'swap',
});

export const metadata = {
  title: 'Ambient Writing Room — Dark Academia Solitude',
  description: 'Distraction-free ambient writing sanctuary with procedural audio synthesis and vintage journal skeuomorphism.',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${garamond.variable} ${caveat.variable} ${literata.variable} ${playfair.variable} ${cormorant.variable} ${lora.variable} ${kalam.variable} ${apple.variable}`}
    >
      <body className="bg-background text-on-background min-h-screen font-body-md antialiased selection:bg-[#5c1f1f]/20 selection:text-[#400a0c] relative overflow-x-hidden">
        {/* Soft Vignette Background Layer */}
        <div className="fixed inset-0 pointer-events-none z-30 shadow-[inset_0_0_150px_rgba(43,36,28,0.15)]"></div>

        {/* Top Header */}
        <Header />

        {/* Main Route Content */}
        <main className="relative z-10">{children}</main>

        {/* Persistent Audio Controls */}
        <AudioBar />
      </body>
    </html>
  );
}
