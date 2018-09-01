import { gql } from "apollo-boost";

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const getPostsQuery = gql`
  {
    posts {
      title
      id
    }
  }
`;

const addPostMutation = gql`
  mutation AddPost($title: String!, $tags: String!, $authorId: ID!) {
    addPost(title: $title, tags: $tags, authorId: $authorId) {
      title
      id
    }
  }
`;

const getPostQuery = gql`
  query GetPost($id: ID) {
    post(id: $id) {
      id
      title
      tags
      author {
        id
        name
        age
        posts {
          title
          id
        }
      }
    }
  }
`;

export { getAuthorsQuery, getPostsQuery, addPostMutation, getPostQuery };
