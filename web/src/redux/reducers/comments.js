
import axios from 'axios';

// action types
const ALL_COMMENTS = 'ALL_COMMENTS';
const ADD_COMMENT = 'ADD_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';
const EDIT_COMMENT = 'EDIT_COMMENT';
const VOTE_COMMENT = 'VOTE_COMMENT';



// Action Creators
const allC = (comments,postId) => ({ type: ALL_COMMENTS, comments,postId });
const addC = (comment,postId) => ({ type: ADD_COMMENT, comment , postId});
const deleteC = (comment,postId) => ({ type: DELETE_COMMENT, comment,postId });
const editC = (comment,postId) => ({ type: EDIT_COMMENT, comment, postId });
const voteC = (comment,postId, voteOption) => ({ type: VOTE_COMMENT, comment,postId, voteOption });




let auth = {headers: {Authorization: 'token'}};

//props need to be different to generate an update on the page
const initialState = {
    counter: 0, //needed as a way to force the page to re-render after any changes in the reducer-changes in the Comments map weren't enough
    c: new Map(),
};

// reducer
const commentReducer = (state = initialState, action) => {
    let postComm; //array of comments of a single post
    let commentIndex;
    switch (action.type) {
        case ALL_COMMENTS:
            state.c.set(action.postId,[...action.comments]);
            return  {
                counter: state.counter+1,
                c: state.c
            };
        case ADD_COMMENT:
            postComm = state.c.get(action.postId);
            state.c.set(action.postId,[...postComm, action.comment]);
            return  {
                counter: state.counter+1,
                c: state.c
            };
        case DELETE_COMMENT:
            postComm = state.c.get(action.postId);
            state.c.set(action.postId,deleteFilter(postComm, action.comment));

            return {
                counter: state.counter+1,
                c: state.c
            };
        case VOTE_COMMENT:
            const option = action.voteOption;
            postComm = state.c.get(action.postId);
            commentIndex = getCommentIndex(postComm, action.comment);

            if(option==="upVote"){
                postComm[commentIndex].voteScore++;
            } else if(option==="downVote"){
                postComm[commentIndex].voteScore--;
            }
            state.c.set(action.postId,postComm);
            return {
                counter: state.counter+1,
                c: state.c
            };

        case EDIT_COMMENT:
            postComm = state.c.get(action.postId);
            commentIndex = getCommentIndex(postComm, action.comment.id);
            postComm[commentIndex] = action.comment;
            state.c.set(action.postId,postComm);
            return {
                counter: state.counter+1,
                c: state.c
            };
        default:
            return state;
    }
};
export default commentReducer;

function deleteFilter(array, id){
    return array.filter(function(el) {
        return el.id !== id;
    })
}

function getCommentIndex(array, id){
    return array.findIndex(function(el) {
        return el.id === id;
    })
}


//helper functions

const formatComments = data => data.map(comment => {

    return {
        id: comment.id,
        timestamp: comment.timestamp,
        body: comment.body,
        author: comment.author,
        voteScore: comment.voteScore,
        parentId:comment.parentId

    }
});




// dispatcher
export const loadComments = (postId) => dispatch =>{

      return  axios.get('http://localhost:3001/posts/' + postId + '/comments',auth)
            .then(res => res.data ? formatComments(res.data) : [])
            .then(formattedComments => dispatch(allC(formattedComments,postId)))
            .catch(err => console.error(`Could not load comments`, err))
};

export const addComment = (comment) => dispatch => {
let b = {
    id: comment.id,
    timestamp: comment.timestamp,
    body: comment.body,
    author: comment.author,
    parentId:comment.parentId
};

     return   axios.post('http://localhost:3001/comments',b,auth)
            .then(res => dispatch(addC(res.data,comment.parentId)))
            .catch(()=>alert(`Could not add comment`))

};

export const deleteComment = (commentId,postId) => dispatch => {

     return   axios.delete('http://localhost:3001/comments/'+commentId,auth)
             .then(() => dispatch(deleteC(commentId,postId)))
            .catch(()=>alert(`Could not delete comment`))
};

    export const editComment = (commentId,postId,content) => dispatch => {
        let b=  {
            timestamp: Date.now(),
            body: content
        };

        return    axios.put('http://localhost:3001/comments/'+commentId,b,auth)
                  .then(res => dispatch(editC(res.data,postId)))
                  .catch(()=>alert(`Could not edit comment`))
    };


    export const voteComment = (commentId,voteOption,postId) => dispatch => {
    let b =  {
        option: voteOption
    };
    return   axios.post('http://localhost:3001/comments/'+commentId,b,auth)
        .then(()=> dispatch(voteC(commentId,postId,voteOption)))
        .catch(err => console.error(`Could not vote on comment`, err))

    };









