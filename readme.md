Click [Here](https://gentle-everglades-20021.herokuapp.com/) to open to the Hosted API server link.

    https://gentle-everglades-20021.herokuapp.com/

# Antarctica Globa Code test:

## Problem statement:

Using Nodejs runtime environment, create a RESTful API for Registration, Login & a getUserList.

-> Register a user with First Name, Last Name, Email ID, Password, a unique employeeID, and Organization Name.

-> The user must use their Email ID and Password to login.

-> Get all list of users with following criteria: 1. Search using First Name, Last Name and employeeID 2. Sort data by First Name, Last Name, Email ID, employeeID and Organization Name 3. Add pagination to your API to filter the records

### APIs hosted on Heroku:

### Folder structure:

    ├── config        # App config values
    ├── controlles    # Route controllers files
    ├── middlewares   # Middlewares files
    ├── models        # Database schema files
    ├── routes        # route files
    ├── .gitignore
    ├── index         # start up file
    └── read.md

## API Links:

### Signup => /api/auth/signup

**Request method:** POST

**Request body:** must contain the following fields in body {firstname, lastname, email, password, employeeId, orgName}.

#### Example:

```
{
    "firstname":"abc",
    "lastname":"efg",
    "email":"abc.efg@user.com",
    "password":"password123",
    "employeeId":"098",
    "orgName":"XYZ company"
}
```

**Response:** Returns a jwt token on success.

### Signin => /api/auth/signin

**Request method:** POST

**Request body:** must contain the following fields in body {email, and password}.

#### Example:

```
{
    "email":"abc.efg@user.com",
    "password":"password123"
}
```

**Response:** A jwt user token, which will be used for the subsequent requests.

### GetuserList => /api/user/getuserlist

**Request Method:** GET

**Headers:** header contains the authorization token inside _req.headers.authorization_

**Response:** Send all the user list from the database.

**Queries:**

- Sort: Sort the user list on basis of provided parameter in ascending or descending order.

  **Ex:** _/api/user/getuserlist?sortBy=firstname:asc_

      Sort the list in ascending order on basis of firstname.

- Pagination:

  **Ex:** _/api/user/getuserlist?limit=10&skip=5_

      Limit the user list per page 10 and skip the value at index 5.

- Search: Return the user value on the basis of the given search value.

  **Ex:** _/api/user/getuserlist?search=firstname:abc_

      Return the user with firstname abc if found in database, otherwise empty value.
