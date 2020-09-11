import _ from 'lodash';
import jsonPlaceHolder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch( fetchPosts() );

    /* const userIds = _.uniq(_.map(getState().posts,  'userId'));
    userIds.forEach(id => dispatch(fetchUser(id))); */

    // Test Lodash Chain -- same code as documented above
    _.chain(getState().posts)
     .map('userId')
     .uniq()
     .forEach(id => dispatch(fetchUser(id)))
     .value();

};

export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceHolder.get('/posts');

    dispatch({ type:'FETCH_POSTS', payload: response.data });
};

export const fetchUser = userId => async dispatch => {
    const response = await jsonPlaceHolder.get(`/users/${userId}`);

    dispatch({ type:'FETCH_USER', payload: response.data });
};
