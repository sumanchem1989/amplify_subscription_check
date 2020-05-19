import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import * as subscriptions from "./src/graphql/subscriptions";

import { API, graphqlOperation, Auth } from "aws-amplify";
import { createTodo } from "./src/graphql/mutations";
import { listTodos } from "./src/graphql/queries";

const initialState = {
  name: "",
  description: "",
};

const Todo = () => {
  const [formState, setFormState] = useState(initialState);
  const [owner, setOwner] = useState(null);
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState(["sk.das", "smnkd89", "sumanchem1989"]);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((data) => {
        console.log(data.username);
        setOwner(data.username);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // fetchTodos();
    let subscription;
    if (owner) {
      users.forEach((user) => {
        subscription = API.graphql(
          graphqlOperation(subscriptions.onCreateTodo, {
            owner: user,
          })
        ).subscribe({
          next: (todoData) => {
            console.log({ todoData });
            setTodos((state) => [todoData.value.data.onCreateTodo, ...state]);
          },
        });
      });
    }

    // Stop receiving data updates from the subscription
    () => subscription.unsubscribe();
  }, [owner]);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function addTodo() {
    try {
      const todo = { ...formState };

      setFormState(initialState);
      const res = await API.graphql(
        graphqlOperation(createTodo, { input: todo })
      );
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(val) => setInput("name", val)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <TextInput
        onChangeText={(val) => setInput("description", val)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <Button title="Create Todo" onPress={addTodo} />
      {todos.map((todo, index) => (
        <View key={todo.id ? todo.id : index} style={styles.todo}>
          <Text style={styles.todoName}>{todo.name}</Text>
          <Text>{todo.description}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  todo: { marginBottom: 15 },
  input: { height: 50, backgroundColor: "#ddd", marginBottom: 10, padding: 8 },
  todoName: { fontSize: 18 },
});

export default Todo;
