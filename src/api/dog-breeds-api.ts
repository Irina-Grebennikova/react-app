import { Breed } from '@/types';

const BASE_URL = 'https://api-dog-breeds.vercel.app';

const dogBreedsApi = {
  async getBreeds(breed: string): Promise<Breed[]> {
    try {
      const response = await fetch(`${BASE_URL}/api/catalog?q=${breed}`);
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

export { dogBreedsApi };
