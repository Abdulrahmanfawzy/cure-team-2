import { Apple, Google } from "@/components/shared/components/icons";
import { sans, serif } from "@/types/home";


export function DownloadCTA() {
  return (
    <section className="mx-auto w-full max-w-275 px-5 sm:px-8 lg:px-0">
      <div className="relative overflow-hidden rounded-xl bg-[#5B8BD6] px-10 py-10 text-white sm:px-10">
        <div className="relative z-10 max-w-107.5">
          <h2 className={`${serif} text-4xl`}>Your Health, One Tap Away</h2>
          <p className={`${sans} mt-3 text-xs leading-4 text-white/90`}>
            Book appointments, chat with doctors, and manage your health anytime—right from your
            phone. Download the app now and stay connected wherever you are.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Google />
            <Apple />
          </div>
        </div>

        {/* phone mockup */}
        <div aria-hidden="true" className="absolute -right-10 top-8 hidden h-65 w-75 rotate-[-28deg] md:block lg:right-10">
          <img src="../../../../../public/images/iPhone.svg" alt="iPhone" />
        </div>
      </div>
    </section>
  );
}