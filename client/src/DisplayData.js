import React from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
    }
  }
`;

function DisplayData() {
  const { loading, error, data } = useQuery(QUERY_ALL_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Display Data Content</h2>
      {data.users.map((user) => (
        <div key={user.id}>
          <h3>{user.name} ({user.username}) — {user.age} years old</h3>
          {/* <h3> ({user.username})</h3>
          <h3>{user.age}</h3> */}
        </div>
      ))}
    </div>
  );
}

export default DisplayData;
