import type { ChooseSpecialistType, sortType } from "../types/sort.type";
export const sortOptions :sortType[] = [
  {
    value: "most_recommended",
    label: "Most recommended",
  },
  {
    value: "price_low_to_high",
    label: "Price Low to high",
  },
  {
    value: "price_high_to_low",
    label: "Price High to low",
  },
];
export const consultationOptions :sortType[] = [
  {
    value: "In-clinic",
    label: "In-clinic",
  },
  {
    value: "Home-Visit",
    label: "Home Visit",
  },
];
