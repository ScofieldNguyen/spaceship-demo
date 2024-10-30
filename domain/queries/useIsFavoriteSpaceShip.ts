import { useQuery } from '@tanstack/react-query';
import SpaceshipFavoriteRepository from '@/domain/repositories/SpaceshipFavoriteRepository';
import SpaceShip from '@/domain/entities/SpaceShip';

export default function useIsFavoriteSpaceship(
  ship: SpaceShip,
  spaceshipFavoriteRepository?: SpaceshipFavoriteRepository,
) {
  return useQuery({
    queryKey: ['spaceship-isfavorite', ship.id],
    queryFn: () => spaceshipFavoriteRepository?.isFavorite(ship.id),
  });
}
