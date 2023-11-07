import { Breed, BreedResponse } from '@/types';

const BASE_URL = 'https://api-dog-breeds.vercel.app';
const BREEDS_PER_PAGE = 12;

const getImageSrc = (pathToImage: string): string => `${BASE_URL}/${pathToImage}`;

const dogBreedsApi = {
  totalCount: 0,
  async getBreeds(breed: string, page = 1, limit = BREEDS_PER_PAGE): Promise<BreedResponse | null> {
    try {
      const response = await fetch(`${BASE_URL}/api/catalog?q=${breed}&_limit=${limit}&_page=${page}`);
      const totalCount = Number(response.headers.get('X-Total-Count'));
      const data: unknown = await response.json();
      const results = this.isBreedArray(data)
        ? data.map((item: Breed) => ({ ...item, image: getImageSrc(item.image) }))
        : [];

      return {
        results,
        totalCount,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  async getBreed(breedId: number): Promise<Breed | null> {
    try {
      const response = await fetch(`${BASE_URL}/api/catalog/${breedId}`);

      const data: unknown = await response.json();
      return this.isBreedObject(data) ? { ...data, image: getImageSrc(data.image) } : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  isBreedArray(data: unknown): data is Breed[] {
    return Array.isArray(data) && data.every((item: unknown) => this.isBreedObject(item));
  },
  isBreedObject(data: unknown): data is Breed {
    return !!(data as Breed).wool && !!(data as Breed).color && !!(data as Breed).group;
  },
};

export { dogBreedsApi, BREEDS_PER_PAGE };
