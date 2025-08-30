import Image from "next/image";

export default function Sent() {

    const backgroundStyle = {
    backgroundImage: 'url("/cawine_bg.avif")',
    backgroundSize: 'cover',
  };

    return (
        <div style={backgroundStyle} className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-center">
                <Image
                    className="dark:invert"
                    src="/cawine_main_icon_round.png"
                    alt="Next.js logo"
                    width={70}
                    height={70}
                    priority
                />
                <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
                    <li className="mb-2 tracking-[-.01em]">
                        Your order is beeing sent successfully, thank you for choosing cawine!.

                    </li>
                </ol>

                <div className="flex gap-4 items-center flex-col sm:flex-row">
                    <a
                        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                        href="/orderstatus.html"
                        rel="noopener noreferrer"
                    >

                        Track Order
                    </a>
                    <a
                        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
                        href="/home.html"
                        rel="noopener noreferrer"
                    >
                        Track Later
                    </a>
                </div>
            </main>
        </div>
    );
}