export type sortType = {
  value: string;
  label: string;
};
export type ChooseSpecialistType = {
  img: string;
  name: string;
};

export type DoctorsType = {
  id: number;
  name: string;
  specialty: string;
  hospital: string;
  rating: number;
  hours: string;
  price: number;
  image: string;
  lat: number;
  long: number;
};
