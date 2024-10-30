import GetSpaceshipResponse from '@/integrations/spaceshipRepo/response/GetSpaceshipResponse';

export default interface ApiClient {
  getSpaceships(
    first: number,
    after: string | null,
  ): Promise<GetSpaceshipResponse>;
  getAllSpaceships(): Promise<GetSpaceshipResponse>;
}
