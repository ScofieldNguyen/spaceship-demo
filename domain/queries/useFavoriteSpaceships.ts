import { useQuery } from '@tanstack/react-query';
import SpaceshipFavoriteRepository from '@/domain/repositories/SpaceshipFavoriteRepository';

export default function useFavoriteSpaceships(
  spaceshipFavoriteRepository?: SpaceshipFavoriteRepository,
) {
  return useQuery({
    queryKey: ['spaceship-favorite'],
    queryFn: () => spaceshipFavoriteRepository?.listAll(),
  });
}
