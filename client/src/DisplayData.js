import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client/react";


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
const GET_COMPANY_BY_NAME = gql`
    query GetCompanyByName($name: String! ){
        company(name: $name) {
            name
            isWorking
            dateOfJoining
        }
    }
`
const CREATE_USER_MUTATION = gql`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            id
            name
            age
            nationality
        }
    }
`
const DELETE_USER_BY_ID = gql`
    mutation DeleteUser($deleteUserId: ID!) {
        deleteUser(id: $deleteUserId) {
            id
        }
    }
`
const DELETE_USER_BY_USERNAME = gql `
    mutation DeleteByUsername($username: String!) {
        deleteUserByUserName(username: $username) {
            id
            name
            username
        }
    }
`

function DisplayData() {

    const [companySearched, setCompanySearched] = useState("");

    //create user state
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [age, setAge] = useState("");
    const [nationality, setNationality] = useState("");
    const [deleteID, setDeleteID] = useState("");
    const [deleteUsername, setDeleteUsername] = useState("");

    const { loading, error, data, refetch } = useQuery(QUERY_ALL_USERS);
    const { data: companyData } = useQuery( QUERY_ALL_COMPANY);
    const [ fetchCompany, { data: companySearchedData, error: companyError }, ] = useLazyQuery(GET_COMPANY_BY_NAME);
    // fetchCompany is a fn that fetches the data

    const [ createUser ] = useMutation (CREATE_USER_MUTATION);
    const [ deleteUserByID ] = useMutation (DELETE_USER_BY_ID);
    const [ deleteUserByUsername ] = useMutation (DELETE_USER_BY_USERNAME);

    //==== checking data in console =====
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (companyData){
    console.log(companyData)
    }
    if (companySearchedData){
    console.log(companySearchedData)
    }
    if (companyError){
    console.log(companyError)
    }

    return (
        <div>
            <h2>Display Data Content</h2>

            <div className="create-user-panel">
                <input type = "text" placeholder="Name..." onChange={(event) => setName(event.target.value)} />
                <input type = "text" placeholder="Username..." onChange={(event) => setUsername(event.target.value)} />
                <input type = "number" placeholder="Age..." onChange={(event) => setAge(event.target.value)} />
                {/* <input type = "text" placeholder="Nationality..." onChange={(event) => setNationality(event.target.value.toUpperCase())} /> */}
                <select onChange={(event) => setNationality(event.target.value)}>
                    <option value="CANADA">Canada</option>
                    <option value="BRAZIL">Brazil</option>
                    <option value="USA">USA</option>
                    <option value="INDIA">India</option>
                    <option value="GERMANY">Germany</option>
                    <option value="CHILE">Chile</option>
                    <option value="UKRAINE">Ukraine</option>
                </select>
                <button
                    onClick={() => {
                        createUser({
                            variables: {input: { name, username, age: Number(age), nationality }},
                        });
                        refetch();
                    }} > Create User </button>
            </div>
            <br/>
            <div className="user-list-panel">
                {/* showing user data */}
                {/* {data.users.map((user) => ( */}
                <div className="users-card" >
                    {/* <h3>[{user.id}]. {user.name} ({user.username}) — {user.age} years old is from {user.nationality}</h3> */}
                    {/* <h3> ({user.username})</h3>
                    <h3>{user.age}</h3> */}
                    <table className="user-list-table" border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Age</th>
                            <th>Nationality</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.users.map((user) => (
                            <tr id={user.id} key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.age}</td>
                                <td>{user.nationality}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* ))} */}
            </div>
            <br/>
            <div className="delete-user-panel">
                <div className="delete-by-id">
                    <input type = "number" placeholder="enter the emp ID to delete..." onChange={(event) => setDeleteID(event.target.value)} />
                    <button onClick={() => {
                            deleteUserByID({
                                variables: { deleteUserId: deleteID }, });
                            refetch();
                        }}
                    > Delete </button>
                </div>
                <br/>
                <br/>
                <div className="delete-by-username">
                    <input type = "text" placeholder="enter the emp username to delete..." onChange={(event) => setDeleteUsername(event.target.value)} />
                    <button onClick={() => {
                            deleteUserByUsername({
                                variables: { username: deleteUsername }, });
                            refetch();
                        }}
                    > Delete </button>
                </div>
            </div>
            <br/>
            {/* {companyData.companies.map((company) => (
            <div key={company.id}>
                <h3> Company Name: {company.name}, Date of joining: ({company.dateOfJoining}) isWorking: {company.isWorking}</h3>
            </div>
            ))} */}
            <div className="company-list-panel">
                {companyData &&
                    companyData.companies.map((company) => {
                    return <h3> Company Name: {company.name}, Date of joining: ({company.dateOfJoining}) isWorking: {company.isWorking}</h3>;
                    })}
            </div>
            <br/>
            <div className="fetch-company-panel">
                <input type="text" placeholder="Company Name..." onChange={(event) => setCompanySearched(event.target.value)} />
                <button onClick={() => fetchCompany({ variables: { name: companySearched } })}> Fetch Company </button>
                <div className="company-data-card">
                    {companySearchedData && companySearchedData.company && (
                        <div className="company-info">
                            <h3>Company Name: {companySearchedData.company.name}</h3>
                            <p>Is Working: {companySearchedData.company.isWorking ? "Yes" : "No"}</p>
                            <p>Date of Joining: {companySearchedData.company.dateOfJoining}</p>
                        </div>
                    )}
                    {companyError && <h4> There was an error fetching the data:- {companyError.message}</h4>}
                </div>
            </div>
        </div>
    );
}

export default DisplayData;
