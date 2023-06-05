# VIP List 😎

This project consists of two main components:
  - [**./client**](#client-component-🖥️)
  - [**./server**](#server-component-💻).

# How this project works? 🌳

In this project, the client component is responsible for maintaining the list of names, while the server component stores only the Merkle Root. This approach allows for efficient storage and verification of names in the VIP list.

# Client Component 🖥️

- The client provides a user interface for selecting a name from the VIP list.
- It generates a Merkle proof for the selected name using the Merkle Tree structure.
- The generated proof consists of a list of hash values that authenticate the path from the selected name to the Merkle Root.

## Run client

1 - Go to `./client` and install dependencies

```js
cd ./client
yarn install // or npm install
```

2 - Run the project

```js
yarn dev // or npm run dev
```

# Server Component 💻

- The server stores the 32-byte Merkle Root, which represents the integrity of the VIP list.
- It receives the name and proof from the client.
- The server verifies the received proof by comparing it with the stored Merkle Root.
- If the proof is valid: `{status: 200, message: "You are VIP ✅"}`
- If not: `{status: 401, message: "You are not VIP 🚨"}`

## Run server

1 - Go to `./server` and install dependencies

```js
cd ./server
yarn install // or npm install
```

2 - Run the project

```js
yarn dev // or npm run dev
```
