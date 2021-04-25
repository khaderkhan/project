
const FOLLOWER_URL = "http://localhost:4000/api/fan";

const followFan = (fanId, user) =>
    fetch(`${FOLLOWER_URL}/${fanId}`,{
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }

    })
        .then(response => response.json())

const unFollow = (fanId, user) =>
    fetch(`${FOLLOWER_URL}/${fanId}`,{
        method: 'DELETE',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => res.json())


const findAllFollowers = (userId) =>
    fetch(`${FOLLOWER_URL}/following/${userId}`)
        .then(res => res.json())

export default {
    followFan, unFollow, findAllFollowers
}

