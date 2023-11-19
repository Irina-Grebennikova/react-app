import { Breed } from '@/types';

const BASE_URL = 'https://api-dog-breeds.vercel.app';
const BREEDS_PER_PAGE = 12;

const dogBreedsApi = {
  totalCount: 0,
  async getBreeds(breed: string, page = 1, limit = BREEDS_PER_PAGE): Promise<Breed[]> {
    try {
      const response = await fetch(`${BASE_URL}/api/catalog?q=${breed}&_limit=${limit}&_page=${page}`);
      this.totalCount = Number(response.headers.get('X-Total-Count'));

      const data: unknown = await response.json();
      return this.isBreedArray(data) ? data : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  async getBreed(breedId: number): Promise<Breed | null> {
    try {
      const response = await fetch(`${BASE_URL}/api/catalog/${breedId}`);

      const data: unknown = await response.json();
      return this.isBreedObject(data) ? data : null;
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
  getImageSrc: (pathToImage: string): string => `${BASE_URL}/${pathToImage}`,
};

export { dogBreedsApi, BREEDS_PER_PAGE };
