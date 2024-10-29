import { useQuery } from '@tanstack/react-query';
import SpaceshipRepository from '@/domain/repositories/SpaceshipRepository';

export default function useSpaceships(
  page: number,
  searchTerm: string,
  spaceshipRepo?: SpaceshipRepository,
) {
  return useQuery({
    queryKey: ['spaceship', page, searchTerm],
    queryFn: () => spaceshipRepo?.search(page, searchTerm),
  });
}
