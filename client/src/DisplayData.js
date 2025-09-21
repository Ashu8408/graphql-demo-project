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
      nationality
    }
  }
`;
const QUERY_ALL_COMPANY = gql`
 query GetAllCompany {
   companies{
     id
     name
     dateOfJoining
     isWorking
   }
 }
`;

function DisplayData() {
  const { loading, error, data } = useQuery(QUERY_ALL_USERS);
  const { data: companyData } = useQuery( QUERY_ALL_COMPANY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  if (companyData){
    console.log(companyData)
  }

  return (
    <div>
      <h2>Display Data Content</h2>
      
      {data.users.map((user) => (
        <div key={user.id}>
          <h3>{user.name} ({user.username}) — {user.age} years old is from {user.nationality}</h3>
          {/* <h3> ({user.username})</h3>
          <h3>{user.age}</h3> */}
        </div>
      ))}
      <br/>
      {companyData.companies.map((company) => (
        <div key={company.id}>
          <h3> Company Name: {company.name}, Date of joining: ({company.dateOfJoining}) isWorking: {company.isWorking}</h3>
        </div>
      ))}
    </div>
  );
}

export default DisplayData;
