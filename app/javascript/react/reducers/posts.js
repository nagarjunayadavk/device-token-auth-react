import { FETCH_POSTS, FETCH_POST, CREATE_POST, UPDATE_POST, DELETE_POST } from '../actions/actionTypes';

export function postStore (state = { posts: [] }, action) {
    switch (action.type) {

        case FETCH_POSTS:
            return {
                ...state,
                posts: action.posts
            }
        case FETCH_POST:
            return {
                ...state,
                posts: action.posts
            }
        case CREATE_POST:
            return {
                ...state,
            }
        case UPDATE_POST:
            return {
                ...state,
            }
        case DELETE_POST:
            return {
                ...state,
                posts: action.posts
            }
        default:
            return state
    }
};