import { gql } from '@apollo/client';

export const GET_NOTES = gql`
  query {
    getNotes {
      _id
      text
      author {
        username
      }
      createdAt
    }
  }
`;