import { Clock, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// ✍️ Edit this array with your own doctors' data
const doctors = [
  {
    id: 1,
    name: "Robert Johnson",
    specialty: "Orthopedic",
    hospital: "El-Nasr Hospital",
    rating: 4.8,
    hours: "9:30am - 8:00pm",
    price: 350,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Robert Johnson",
    specialty: "Orthopedic",
    hospital: "El-Nasr Hospital",
    rating: 4.8,
    hours: "9:30am - 8:00pm",
    price: 350,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop",
  },
  {
    id: 3,
    name: "Robert Johnson",
    specialty: "Orthopedic",
    hospital: "El-Nasr Hospital",
    rating: 4.8,
    hours: "9:30am - 8:00pm",
    price: 350,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop",
  },
];

function DoctorCard({ doctor }: { doctor: (typeof doctors)[number] }) {
  return (
    <Card className="rounded-2xl border p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="size-14 rounded-full object-cover"
        />
        <div>
          <p className="font-medium leading-tight">{doctor.name}</p>
          <p className="text-sm text-muted-foreground">
            {doctor.specialty} | {doctor.hospital}
          </p>
          <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
              {doctor.rating}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" />
              {doctor.hours}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Price/hour</span>
        <span className="font-semibold text-red-500">${doctor.price}</span>
      </div>

      <Button className="mt-3 w-full rounded-lg bg-[#3F3D9E] hover:bg-[#3F3D9E]/90">
        Book appointment
      </Button>
    </Card>
  );
}

export default function Doctors() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline" className="rounded-lg px-8">
          Next Page
        </Button>
      </div>
    </div>
  );
}