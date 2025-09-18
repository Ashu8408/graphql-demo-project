const UserList = [
  {
    id: 1,
    name: "John",
    username: "john",
    age: 20,
    nationality: "CANADA",
    friends: [
      {
        id: 2,
        name: "Pedro",
        username: "PedroTech",
        age: 20,
        nationality: "BRAZIL",
      },
      {
        id: 5,
        name: "Kelly",
        username: "kelly2019",
        age: 5,
        nationality: "CHILE",
      },
    ],
  },
  {
    id: 2,
    name: "Pedro",
    username: "PedroTech",
    age: 20,
    nationality: "BRAZIL",
  },
  {
    id: 3,
    name: "Sarah",
    username: "cameron",
    age: 25,
    nationality: "INDIA",
    friends: [
      {
        id: 2,
        name: "Pedro",
        username: "PedroTech",
        age: 20,
        nationality: "BRAZIL",
      },
    ],
  },
  {
    id: 4,
    name: "Rafe",
    username: "rafe123",
    age: 60,
    nationality: "GERMANY",
  },
  {
    id: 5,
    name: "Kelly",
    username: "kelly2019",
    age: 5,
    nationality: "CHILE",
  },
];

const CompanyList = [
  {
    id: 1,
    name: "Amazon",
    dateOfJoining: "2019-02-11", // YYYY-MM-DD
    isWorking: true,
  },
  {
    id: 2,
    name: "Lenovo",
    dateOfJoining: "2007-06-15",
    isWorking: true,
  },
  {
    id: 3,
    name: "Google",
    dateOfJoining: "2009-08-01",
    isWorking: true,
  },
  {
    id: 4,
    name: "Microsoft",
    dateOfJoining: "2035-01-01",
    isWorking: false,
  },
];

module.exports = { UserList, CompanyList };