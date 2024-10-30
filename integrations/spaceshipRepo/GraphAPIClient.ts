import ApiClient from '@/integrations/spaceshipRepo/ApiClient';
import GetSpaceshipResponse from '@/integrations/spaceshipRepo/response/GetSpaceshipResponse';
import {
  ApolloClient,
  gql,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

export default class GraphAPIClient implements ApiClient {
  private readonly endpoint: string;
  private readonly client: ApolloClient<NormalizedCacheObject>;
  private readonly PAGINATION_QUERY = gql`
    query GetStarships($first: Int!, $after: String) {
      allStarships(first: $first, after: $after) {
        starships {
          id
          name
          model
          crew
          passengers
          consumables
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  `;
  private readonly GET_ALL_QUERY = gql`
    query GetStarships {
      allStarships {
        starships {
          id
          name
          model
          crew
          passengers
          consumables
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  `;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.client = new ApolloClient({
      uri: this.endpoint,
      cache: new InMemoryCache(),
    });
  }

  async getSpaceships(
    first: number,
    after: string | null,
  ): Promise<GetSpaceshipResponse> {
    return await this.client.query({
      query: this.PAGINATION_QUERY,
      variables: { first, after },
    });
  }

  getAllSpaceships(): Promise<GetSpaceshipResponse> {
    return this.client.query({ query: this.GET_ALL_QUERY });
  }
}
