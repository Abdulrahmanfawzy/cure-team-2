import { TopDoctors } from "@/features/auth/components/home/doctors";
import { Hero } from "@/features/auth/components/home/hero";
import { FindCare } from "@/features/auth/components/home/maps";
import { FAQ } from "@/features/auth/components/home/questions";
import { Reviews } from "@/features/auth/components/home/reviews";
import { HowItWorks } from "@/features/auth/components/home/works";

export default function Home() {
  return (
    <main className="bg-white text-neutral-900 px-15">
      <Hero />
      <HowItWorks />
      <FindCare />
      <TopDoctors />
      <Reviews />
      <FAQ />
    </main>
  );
}
