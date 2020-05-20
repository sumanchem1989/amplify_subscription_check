/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($receiverUsername: String, $name: String) {
    onCreateTodo(receiverUsername: $receiverUsername, name: $name) {
      id
      name
      description
      receiverUsername
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($receiverUsername: String, $name: String) {
    onUpdateTodo(receiverUsername: $receiverUsername, name: $name) {
      id
      name
      description
      receiverUsername
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($receiverUsername: String, $name: String) {
    onDeleteTodo(receiverUsername: $receiverUsername, name: $name) {
      id
      name
      description
      receiverUsername
    }
  }
`;
