const USER_URL = 'http://localhost:4000/api/user'

const createUser = (user) =>
fetch(USER_URL, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
        'content-type': 'application/json'
    }
})
    .then(response => response.json())

export default {
    createUser
}