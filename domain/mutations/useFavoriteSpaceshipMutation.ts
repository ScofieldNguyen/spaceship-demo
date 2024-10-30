import { useMutation, useQueryClient } from '@tanstack/react-query';
import SpaceshipFavoriteRepository from '@/domain/repositories/SpaceshipFavoriteRepository';
import SpaceShip from '@/domain/entities/SpaceShip';

export function useFavoriteSpaceshipMutation(
  spaceshipFavoriteRepository: SpaceshipFavoriteRepository,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ship: SpaceShip) =>
      spaceshipFavoriteRepository?.favorite(ship),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['spaceship-isfavorite', data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ['spaceship-favorite'],
      });
    },
  });
}
