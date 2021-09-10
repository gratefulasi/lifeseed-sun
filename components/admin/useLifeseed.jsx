import { gql, useQuery } from '@apollo/client';

export const CURRENT_LIFESEED_QUERY = gql`
  query {
    authenticatedItem {
      ... on Lifeseed {
        id
        email
        lifetree {
          id
          image
          planttime
        }
        name
        basket {
          id
          quantity
          present {
            id
            image
            value
            price
            name
            body
          }
        }
      }
    }
  }
`;

export function useLifeseed() {
  const { data } = useQuery(CURRENT_LIFESEED_QUERY);
  return data?.authenticatedItem;
}
