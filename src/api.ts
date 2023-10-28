import { Breed } from './types';

const baseUrl = 'https://api-dog-breeds.vercel.app';

async function getBreeds(breed: string): Promise<Breed[]> {
  try {
    const response = await fetch(`${baseUrl}/api/catalog?q=${breed}`);
    const data: unknown = await response.json();
    return isBreedArray(data) ? data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

function isBreedArray(data: unknown): data is Breed[] {
  return (
    Array.isArray(data) &&
    data.every((item: Breed) => {
      return !!(item.wool && item.color && item.group);
    })
  );
}

export { baseUrl, getBreeds };
