import SpaceshipFavoriteRepository from '@/domain/repositories/SpaceshipFavoriteRepository';
import StorageService from '@/integrations/favoriteRepo/StorageService';
import SpaceShip from '@/domain/entities/SpaceShip';

export default class StorageSpaceshipFavoriteRepositoryImpl
  implements SpaceshipFavoriteRepository
{
  private storageService: StorageService;
  private readonly STORAGE_KEY = 'favoriteSpaceships';
  private spaceships: SpaceShip[];
  private fetchedFirstTime: boolean;

  constructor(storageService: StorageService) {
    this.storageService = storageService;
    this.spaceships = [];
    this.fetchedFirstTime = false;
  }

  async isFavorite(id: string): Promise<boolean> {
    if (!this.fetchedFirstTime) {
      await this.fetchAllData();
    }

    return this.spaceships.some((s) => s.id === id);
  }

  async favorite(spaceShip: SpaceShip): Promise<SpaceShip> {
    if (!this.fetchedFirstTime) {
      await this.fetchAllData();
    }

    // check duplicate
    if (this.spaceships.some((s) => s.id === spaceShip.id)) {
      return Promise.resolve(spaceShip);
    }

    this.spaceships.push(spaceShip);

    this.storageService.save(this.STORAGE_KEY, JSON.stringify(this.spaceships));

    return Promise.resolve(spaceShip);
  }

  async listAll(): Promise<SpaceShip[]> {
    if (!this.fetchedFirstTime) {
      await this.fetchAllData();
    }

    return Promise.resolve(this.spaceships);
  }

  private async fetchAllData() {
    const strData = await this.storageService.load(this.STORAGE_KEY);

    try {
      this.spaceships = JSON.parse(strData);
    } catch (e) {
      this.spaceships = [];
    }

    this.fetchedFirstTime = true;
  }

  async remove(id: string): Promise<SpaceShip> {
    if (!this.fetchedFirstTime) {
      await this.fetchAllData();
    }

    const index = this.spaceships.findIndex((s) => s.id === id);
    const removed = this.spaceships[index];
    this.spaceships = this.spaceships.filter((s) => s.id !== id);

    this.storageService.save(this.STORAGE_KEY, JSON.stringify(this.spaceships));

    return Promise.resolve(removed);
  }
}
