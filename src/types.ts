type Breed = {
  id: number;
  name: string;
  image: string;
  country: string;
  lifespan: string;
  height: string;
  weight: string;
  wool: string;
  color: string;
  group: string;
  price: string;
};

type BreedResponse = {
  results: Breed[];
  totalCount: number;
};

export type { Breed, BreedResponse };
