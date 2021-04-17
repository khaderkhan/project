

const USER_URL = 'http://localhost:4000/api/users'

const createUser = (user) =>
    fetch(USER_URL, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

const findUserByEmail = (email) =>
    fetch(`${USER_URL}/${email}`)
        .then(res => res.json())

const findUserById = (userID) =>
    fetch(`${USER_URL}/${userID}`)
        .then(res => res.json())

const updateUser = (userId, user) =>
    fetch(`${USER_URL}`,{
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