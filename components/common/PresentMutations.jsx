import gql from 'graphql-tag';

export const LOVE_MUTATION = gql`
  mutation LOVE_MUTATION($id: ID!) {
    love(presentId: $id) {
      id
    }
  }
`;

export const CREATE_PRESENT_MUTATION = gql`
  mutation CREATE_PRESENT_MUTATION(
    $type: String
    $name: String
    $image: String
    $body: String!
    $creationTime: String!
    $price: Int
    $value: Int
  ) {
    createPresent(
      data: {
        type: $type
        body: $body
        image: $image
        creationTime: $creationTime
        name: $name
        price: $price
        value: $value
        status: "AVAILABLE"
      }
    ) {
      id
      name
      body
    }
  }
`;

export const ALL_PRESENTS_QUERY = gql`
  query ALL_PRESENTS_QUERY($skip: Int = 0, $first: Int, $type: String) {
    allPresents(
      first: $first
      skip: $skip
      where: { type: $type }
      orderBy: "creationTime_DESC"
    ) {
      body
      comments {
        id
        creationTime
        body
        lifeseed {
          id
          lifetree {
            image
          }
        }
      }
      image
      price
      value
      loves {
        id
        lifeseed {
          id
        }
      }
      creationTime
      id
      lifeseed {
        id
        lifetree {
          image
        }
      }
      name
    }
  }
`;

export const ALL_PRESENTS_QUERY_LIGHT = gql`
  query ALL_PRESENTS_QUERY_LIGHT($skip: Int = 0, $first: Int, $type: String) {
    allPresents(first: $first, skip: $skip, where: { type: $type }) {
      body
      creationTime
      id
      image
      name
      price
      value
    }
  }
`;

export const DELETE_PRESENT_MUTATION = gql`
  mutation DELETE_PRESENT_MUTATION($id: ID!) {
    deletePresent(id: $id) {
      id
    }
  }
`;

export const SINGLE_PRESENT_QUERY = gql`
  query SINGLE_PRESENT_QUERY($id: ID!) {
    present: Present(where: { id: $id }) {
      body
      comments {
        id
        creationTime
        body
        lifeseed {
          id
          lifetree {
            image
          }
        }
      }
      creationTime
      id
      image
      price
      value
      lifeseed {
        id
        lifetree {
          image
        }
      }
      loves {
        id
        lifeseed {
          id
        }
      }
      name
    }
  }
`;

export const SINGLE_PRESENT_QUERY_LIGHT = gql`
  query SINGLE_PRESENT_QUERY($id: ID!) {
    present: Present(where: { id: $id }) {
      body
      creationTime
      id
      image
      price
      value
      name
    }
  }
`;

export function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deletePresent));
}
