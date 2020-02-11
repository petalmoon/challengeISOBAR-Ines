import axios from 'axios';


// action types
const ALL_POSTS = 'ALL_POSTS';
const CATEGORY_POSTS = 'CATEGORY_POSTS';
const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const EDIT_POST = 'EDIT_POST';
const VOTE_POST = 'VOTE_POST';
let auth = {headers: {Authorization: 'token'}};



// Action Creators
const allP = posts => ({ type: ALL_POSTS, posts });
const addP = post => ({ type: ADD_POST, post });
const categoryP = posts => ({ type: CATEGORY_POSTS, posts });
const deleteP = post => ({ type: DELETE_POST, post });
const editP = post => ({ type: EDIT_POST, post });
const voteP = (post,voteOption) => ({ type: VOTE_POST, post, voteOption});


const initialState = {
    counter: 0, //number of posts
    p: []
}

// reducer
const postsReducer = (state = initialState, action) => {
    let postIndex;
    switch (action.type) {
        case ALL_POSTS:
            return {
                counter: state.counter + 1,
                p: action.posts,
            };

        case CATEGORY_POSTS:
            //the filter is already applied on the server-side
            return {
                counter: state.counter + 1,
                p: action.posts
            };

        case ADD_POST:
            return {
                counter: state.counter + 1,
                p: [action.post, ...state.p]
            };
        case DELETE_POST:
            return {
                counter: state.counter + 1,
                p: deleteFilter(state.p,action.post)
            };
        case VOTE_POST:
            const option = action.voteOption;
            postIndex = getPostIndex(state.p, action.post);
            if(option==="upVote"){
                state.p[postIndex].voteScore ++;
            } else if(option==="downVote"){
                state.p[postIndex].voteScore --;
            }
            return {
                counter: state.counter + 1,
                p: state.p
            };

        case EDIT_POST:
            postIndex = getPostIndex(state.p, action.post.id);
            state.p[postIndex] = action.post;
            return {
                counter: state.counter + 1,
                p: state.p
            };
        default:
            return state;
    }
};
export default postsReducer;

function deleteFilter(array, id){
    return array.filter(function(el) {
        return el.id !== id;
    })
}

function getPostIndex(array, id){
    return array.findIndex(function(el) {
        return el.id === id;
    })
}

//helper functions

const formatPosts = data => data.map(post => {

    return {
        id: post.id,
        timestamp: post.timestamp,
        title:post.title,
        body: post.body,
        author: post.author,
        category:post.category,
        voteScore:post.voteScore

    }
});




// dispatcher
export const allPosts = () =>  dispatch => {
    return axios.get('http://localhost:3001/posts/',auth)
            .then(res => res.data ? formatPosts(Array.from(res.data)) : [])
            .then(formattedPosts => dispatch(allP(formattedPosts)))
            .catch(err => console.error(`No posts could be loaded`, err))


};


export const categoryPosts = (category) => dispatch => {

      return  axios.get('http://localhost:3001/'+ category + '/posts/',auth)
            .then(res => res.data.objects ? formatPosts(res.data.objects) : [])
            .then(formattedPosts => dispatch(categoryP(formattedPosts)))
            .catch(err => console.error(`No posts to be loaded`, err))



};

export const addPost = (post) =>  dispatch =>  {
let b = {
        id: post.id,
            timestamp: Date.now(),
            title: post.title,
            body: post.body,
            author: post.author,
            category:post.category
    };

      return  axios.post('http://localhost:3001/posts',b,auth)
            .then(res => dispatch(addP(res.data)))
            .catch(err => console.error(`Could not add post`, err))


};

export const deletePost = (postId) => dispatch => {

      return  axios.delete('http://localhost:3001/posts/'+postId,auth)
          .then(() => dispatch(deleteP(postId)))
            .catch(()=>alert(`Could not delete post`))

};

export const editPost = (postId, newTitle, content) => dispatch => {
    let b = {
        title: newTitle,
        body: content
    };

     return  axios.put('http://localhost:3001/posts/'+postId,b,auth)
              .then(res => dispatch(editP(res.data)))
            .catch(()=>alert(`Could not edit post`))

};

export const votePost = (postId,voteOption) => dispatch => {
    let b =  {
        option: voteOption
    };

        return axios.post('http://localhost:3001/posts/'+postId,b,auth)
            .then(() => dispatch(voteP(postId, voteOption)))
            .catch(()=>alert(`Could not vote on post`))

};



