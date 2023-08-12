import { gql } from '@apollo/client';

export const CREATE_NOTE = gql`
  mutation CreateNote($text: String!) {
    createNote(text: $text) {
      _id
      text
      createdAt
      author {
        _id
        username
        createdAt
      }
    }
  }
`;


