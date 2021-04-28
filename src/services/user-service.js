

// const USER_URL = 'http://localhost:4000/api'
const USER_URL = "https://movie-reviewer-node-server.herokuapp.com/api"

const createUser = (user) =>
    fetch(`${USER_URL}/users`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

const findUserByEmail = (email) =>
    fetch(`${USER_URL}/users/${email}`)
        .then(res => res.json())

const findUserById = (userID) =>
    fetch(`${USER_URL}/users/${userID}`)
        .then(res => res.json())

const updateUser = (user) =>
    fetch(`${USER_URL}/users`,{
        method: 'PUT',
        body: JSON.stringify(user),
        headers:{
            'content-type': 'application/json'
        }
    })
        .then(res => res.json())

export default {
    createUser, findUserByEmail, updateUser, findUserById
}