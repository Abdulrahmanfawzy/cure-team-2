import type { ChooseSpecialistType, sortType } from "../types/sort.type";
import Dentist from '@/assets/hugeicons_dental-tooth.svg';
export const sortOptions :sortType[] = [
  {
    value: "most-recommended",
    label: "Most recommended",
  },
  {
    value: "price-low-high",
    label: "Price Low to high",
  },
  {
    value: "price-high-low",
    label: "Price High to low",
  },
];
export const consultationOptions :sortType[] = [
  {
    value: "in-clinic",
    label: "In-clinic",
  },
  {
    value: "home-visit",
    label: "Home Visit",
  },
];
export const ChooseSpecialist : ChooseSpecialistType[] = [
    {
    img:Dentist,
    name:'Dentist',
  },
    {
    img:Dentist,
    name:'Cardiologist',
  },
        {
    img:Dentist,
    name:'Dentist',
  },
    {
    img:Dentist,
    name:'Cardiologist',
  },
        {
    img:Dentist,
    name:'Dentist',
  },
    {
    img:Dentist,
    name:'Cardiologist',
  },
        {
    img:Dentist,
    name:'Dentist',
  },
    {
    img:Dentist,
    name:'Cardiologist',
  },
        {
    img:Dentist,
    name:'Dentist',
  },
    {
    img:Dentist,
    name:'Cardiologist',
  },
]
export const doctors = [
  {
    id: 1,
    name: "Dr. Robert Johnson",
    specialty: "Orthopedic",
    hospital: "El-Nasr Hospital",
    rating: 4.8,
    hours: "9:30am - 8:00pm",
    price: 50,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80",
    lat: 30.0444,
    long: 31.2357,
  },
  {
    id: 2,
    name: "Dr. Sarah Williams",
    specialty: "Pediatrician",
    hospital: "Dar Al Fouad Hospital",
    rating: 4.8,
    hours: "9:30am - 8:00pm",
    price: 60,
    image: "https://images.unsplash.com/photo-1594824813511-c74421255e4e?w=200&auto=format&fit=crop&q=80",
    lat: 30.0501,
    long: 31.2402,
  },
  {
    id: 3,
    name: "Dr. Michael Chen",
    specialty: "Cardiology",
    hospital: "Cleopatra Hospital",
    rating: 4.9,
    hours: "9:00am - 7:00pm",
    price: 70,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&auto=format&fit=crop&q=80",
    lat: 30.0485,
    long: 31.2298,
  },
  {
    id: 4,
    name: "Dr. Emily Davis",
    specialty: "Dermatologist",
    hospital: "El-Gouna Clinic",
    rating: 4.7,
    hours: "10:00am - 6:00pm",
    price: 65,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80",
    lat: 30.0382,
    long: 31.2450,
  },
  {
    id: 5,
    name: "Dr. Ahmed Hassan",
    specialty: "Neurology",
    hospital: "Al-Salam International",
    rating: 4.9,
    hours: "8:30am - 4:30pm",
    price: 85,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&auto=format&fit=crop&q=80",
    lat: 30.055,
    long: 31.232,
  },
  {
    id: 6,
    name: "Dr. Jessica Taylor",
    specialty: "Dentist",
    hospital: "Modern Dental Care",
    rating: 4.8,
    hours: "10:00am - 7:00pm",
    price: 55,
    image: "https://images.unsplash.com/photo-1623854767648-e7bb8009f0db?w=200&auto=format&fit=crop&q=80",
    lat: 30.041,
    long: 31.226,
  },
];