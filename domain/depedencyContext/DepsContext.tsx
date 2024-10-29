import { createContext, PropsWithChildren, useContext } from 'react';
import SpaceshipRepository from '@/domain/repositories/SpaceshipRepository';
import SpaceshipFavoriteRepository from '@/domain/repositories/SpaceshipFavoriteRepository';

interface ContextType {
  spaceShipRepo?: SpaceshipRepository;
  spaceShipFavoriteRepo?: SpaceshipFavoriteRepository;
}

interface DepsContextProviderProps extends ContextType, PropsWithChildren {}

const DepsContext = createContext<ContextType>({});

export default function DepsProvider(props: DepsContextProviderProps) {
  const { children, ...deps } = props;
  return <DepsContext.Provider value={deps}>{children}</DepsContext.Provider>;
}

export function useSpaceshipRepo() {
  const { spaceShipRepo } = useContext(DepsContext);
  return spaceShipRepo;
}

export function useSpaceshipFavoriteRepo() {
  const { spaceShipFavoriteRepo } = useContext(DepsContext);
  return spaceShipFavoriteRepo;
}
