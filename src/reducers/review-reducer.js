

const initialState = {
    reviews: []
}

const reviewReducer = (state = initialState, action) => {

    switch (action.type){
        case 'CREATE_REVIEW':

            return {
                ...state,
                reviews: [
                    ...state.reviews,
                    action.review
                ]
            }
        case "FIND_ALL_REVIEWS_FOR_MOVIE":
            return {
                ...state,
                reviews: action.reviews
            }
        case "DELETE_REVIEW":
            return {
                reviews: state.reviews.filter(r => {
                    return r._id !== action.reviewToDelete._id;
                })
            };
        case "UPDATE_REVIEW":
            return {
                reviews: state.reviews.map(review => {
                    if(review._id === action.review._id){
                        return action.review
                    } else{
                        return review
                    }
                })
            }
        default:
            return state;
    }
}

export default reviewReducer;