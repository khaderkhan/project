import {useGoogleLogin} from "react-google-login";

const BASE_URL = "http://localhost:4000/api/comments"



const createComment = (comment) =>
    fetch(`${BASE_URL}`,{
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