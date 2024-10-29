import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import SpaceshipRepository from '@/domain/repositories/SpaceshipRepository';
import SpaceshipSearchResult from '@/domain/entities/SpaceshipSearchResult';

export default function useSpaceships(
  searchTerm: string,
  spaceshipRepo?: SpaceshipRepository,
) {
  const result = useInfiniteQuery<
    SpaceshipSearchResult,
    Error,
    InfiniteData<SpaceshipSearchResult>
  >({
    queryKey: ['spaceship', searchTerm],
    // @ts-ignore
    queryFn: ({ pageParam }: { pageParam: string | null }) =>
      spaceshipRepo?.search(pageParam, searchTerm),
    getNextPageParam: (lastPage) => {
      if (lastPage.hasMore) {
        return lastPage.cursor;
      }
      return null;
    },
  });

  const ships = result.data
    ? result.data.pages.flatMap((page) => page.ships)
    : [];

  return {
    ...result,
    ships,
  };
}
