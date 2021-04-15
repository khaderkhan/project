const initialState = {
    users: []
}

const userReducer = (state= initialState, action) => {
    switch (action.type) {
        case "CREATE_USER":
            return {
                users: [
                    ...state.users,
                    action.user
                ]
            }
        case "FIND_USER_BY_EMAIL":
            return {
                ...state,
                users: action.user
            }
        default:
            return state
    }
}

export default userReducer;