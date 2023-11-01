import { Breed } from '@/types';

const BASE_URL = 'https://api-dog-breeds.vercel.app';
const BREEDS_PER_PAGE = 12;

const dogBreedsApi = {
  totalCount: 0,
  async getBreeds(breed: string, page = 1): Promise<Breed[]> {
    try {
      const response = await fetch(`${BASE_URL}/api/catalog?q=${breed}&_limit=${BREEDS_PER_PAGE}&_page=${page}`);
      this.totalCount = Number(response.headers.get('X-Total-Count'));

      const data: unknown = await response.json();
      return this.isBreedArray(data) ? data : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  isBreedArray(data: unknown): data is Breed[] {
    return (
      Array.isArray(data) &&
      data.every((item: Breed) => {
        return !!(item.wool && item.color && item.group);
      })
    );
  },
  getImageSrc: (pathToImage: string): string => `${BASE_URL}/${pathToImage}`,
};

export { dogBreedsApi, BREEDS_PER_PAGE };
