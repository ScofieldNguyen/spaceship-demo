import { useMutation, useQueryClient } from '@tanstack/react-query';
import SpaceshipFavoriteRepository from '@/domain/repositories/SpaceshipFavoriteRepository';
import SpaceShip from '@/domain/entities/SpaceShip';

export function useUnFavoriteSpaceshipMutation(
  spaceshipFavoriteRepository: SpaceshipFavoriteRepository,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ship: SpaceShip) =>
      spaceshipFavoriteRepository?.remove(ship.id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['spaceship-favorite'],
      });
      queryClient.invalidateQueries({
        queryKey: ['spaceship-isfavorite', data.id],
      });
    },
  });
}
