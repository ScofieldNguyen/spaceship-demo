export default interface StorageService {
  save(key: string, value: string): Promise<void>;
  load(key: string): Promise<string>;
}
