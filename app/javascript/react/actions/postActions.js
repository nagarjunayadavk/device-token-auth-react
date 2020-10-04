import { FETCH_POSTS, FETCH_POST, CREATE_POST, UPDATE_POST, DELETE_POST, FETCH_POSTS_DATA_FAILURE } from './actionTypes';

import axios from 'axios';
import { axiosDefaultHeaders } from '../utils/helpers';
axiosDefaultHeaders(axios);

export const postActions = {
    addPost,
    removePost,
    fetchPosts
};

function addPost() {
    return {
        type: ADD_POST,
        msg: "Will Add a New Post"
    }
}

function removePost() {
    return {
        type: REMOVE_POST,
        msg: "Will Remove the Post"
    }
}

//   function failure(error) {
//     return {
//       type: FETCH_POSTS_DATA_FAILURE,
//       error
//     }
//   }

function fetchPosts() {
    return dispatch => {

        axios.get('/api/v1/posts')
            .then(({data}) => {
                dispatch({
                    type: FETCH_POSTS,
                    posts: data
                });
            })
            .catch(function (error) {
                // console.log(error)
                dispatch({
                    type: FETCH_POSTS_DATA_FAILURE,
                    error
                });
            });

    }
}
