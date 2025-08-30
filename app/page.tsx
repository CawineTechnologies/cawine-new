import Image from "next/image";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { log } from "console";


export default function Home() {
  if (typeof window !== 'undefined') {
    const vendoId = localStorage.getItem('vendo_id');
    log(vendoId);
  }

  // const snapshot = await getDocs(collection(db, 'Products'));
  // const products = snapshot.docs.map(doc => ({
  //   id: doc.id, ...doc.data()
  // }));

  const backgroundStyle = {
    backgroundImage: 'url("/cawine_bg.avif")',
    backgroundSize: 'cover',
  };

  const mainBg = {
    backgroundColor: 'lightgrey',
    borderRadius: '20px',
    padding: '20px',
  }

  return (
    <div style={backgroundStyle} className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main style={mainBg} className="flex flex-col gap-[32px] row-start-2 items-center sm:items-center">
        <Image
          className="dark:invert"
          src="/cawine_main_icon_round.png"
          alt="cawine logo"
          width={70}
          height={70}
          priority
        />
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            You can start by viewing all our services.

          </li>
          <li className="tracking-[-.01em]">
            Login or register to start order with us.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/landing.html"
            rel="noopener noreferrer"
          >

            Continue
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="/login.html"
            rel="noopener noreferrer"
          >
            Login
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/website/aboutus.html"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          About Us
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/website/contact.html"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Contact
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/website/index.html"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Vist our website →
        </a>
      </footer>
    </div>
  );

}
