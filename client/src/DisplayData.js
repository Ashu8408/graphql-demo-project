import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useQuery, useLazyQuery } from "@apollo/client/react";


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

function DisplayData() {

    const [companySearched, setCompanySearched] = useState("");

    const { loading, error, data } = useQuery(QUERY_ALL_USERS);
    const { data: companyData } = useQuery( QUERY_ALL_COMPANY);
    const [ fetchCompany, { data: companySearchedData, error: companyError }, ] = useLazyQuery(GET_COMPANY_BY_NAME);
    // fetchCompany is a fn that fetches the data

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    //==== checking data in console =====
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
            
            {data.users.map((user) => (
            <div key={user.id}>
                <h3>{user.name} ({user.username}) — {user.age} years old is from {user.nationality}</h3>
                {/* <h3> ({user.username})</h3>
                <h3>{user.age}</h3> */}
            </div>
            ))}
            <br/>
            {/* {companyData.companies.map((company) => (
            <div key={company.id}>
                <h3> Company Name: {company.name}, Date of joining: ({company.dateOfJoining}) isWorking: {company.isWorking}</h3>
            </div>
            ))} */}

            {companyData &&
                companyData.companies.map((company) => {
                return <h3> Company Name: {company.name}, Date of joining: ({company.dateOfJoining}) isWorking: {company.isWorking}</h3>;
                })}

            <div className="company-details-panel">
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
