import {useGoogleLogin} from "react-google-login";

// const BASE_URL = "http://localhost:4000/api"

const BASE_URL ="https://movie-reviewer-node-server.herokuapp.com/api"





const createComment = (comment) =>
    fetch(`${BASE_URL}/comments`,{
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => res.json());


export default {
    createComment
}