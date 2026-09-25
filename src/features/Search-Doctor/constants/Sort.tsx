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