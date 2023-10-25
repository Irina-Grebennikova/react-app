import { Breed } from './types';

const baseUrl = 'https://api-dog-breeds.vercel.app';

async function getBreeds(breed: string): Promise<Breed[]> {
  try {
    const response = await fetch(`${baseUrl}/api/catalog?q=${breed}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export { baseUrl, getBreeds };
