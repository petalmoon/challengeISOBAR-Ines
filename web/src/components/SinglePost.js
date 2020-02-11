import React, {Component} from 'react';
import { connect } from 'react-redux';
import Comment from './Comment';
import {loadComments, addComment} from '../redux/reducers/comments';
import { votePost,editPost,deletePost } from '../redux/reducers/posts';
import './../App.css';
import Icon from "../assets/images/dislike.png";
import Icon2 from "../assets/images/like.png";
import JohnDoe from './../assets/images/man.png';
import {
    Container,
    List,
    Button,
    ListItemText,
    ListItemAvatar,
    Avatar
} from '@material-ui/core';

import {Row,Col} from 'reactstrap';
import {getUser} from "./globalUser";
import EdiText from "react-editext";
import Input from "@material-ui/core/Input/Input";



const styles = {

   timestamp:{
        marginLeft:10,
        fontFamily:'Tahoma',
        fontSize:13
    },
    styles: {
        display: 'flex',
        alignItems: 'center',
        marginLeft:10
    },
    votes: {
        marginLeft:10,
        marginRight:10,
        fontSize:17
    }
};

const renderComment = (comment,index) => (

    <Comment
        key={index}
        id={comment.id}
        body={comment.body}
        timestamp={comment.timestamp}
        author={comment.author}
        voteScore={comment.voteScore}
        parentId={comment.parentId}

    />
);

const displayComments = (props) => {

    if (typeof props.comments !== 'undefined') {
        if (typeof props.comments.c.get(props.id) !==  'undefined') {
            return props.comments.c.get(props.id).map(renderComment);
        }else {
                return <p>No comments to show!</p>
            }
    }else {
        return <p>Loading comments...</p>
    }
};


const mapStateToProps = (data) => {

    return {comments: data.comments,
            posts: data.post};
};
const mapDispatchToProps = { loadComments, deletePost,votePost ,addComment,editPost};



function handleSave (event,props,t)  {
    if (getUser()===props.author) {
    props.editPost(props.id,props.title,event);
    } else{
        alert('Could not edit post');
        t.setState({key: Math.random()})
    }
};


const uuidv1 = require('uuid/v1');


class SinglePost extends Component {

    constructor(props){
        super(props);
        this.state = {
            body: '',
            cbody:'',
            editing: false,
            key:0 //to re-render react-editext component
        }
    }

    componentDidMount(){
        this.props.loadComments(this.props.id);
    }


    handleDelete() {

       if (getUser()===this.props.author) {
           this.props.deletePost(this.props.id)
       } else {
          alert(`Could not delete post`)
       }
    }


   votes(props){
        if(props.voteScore>=0){
            return  <p> <strong style={{marginLeft:2, color:'green'}}>{props.voteScore}</strong></p>;
        }  else {
            return  <p> <strong style={{marginLeft:2, color:'red'}}>{props.voteScore}</strong></p>;
        }

    };

   timestamp(timestamp) {
        let date = new Date(timestamp);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let month = (date.getMonth()+1);
        return hours + ':' + minutes.substr(-2) + '  ' + date.getDate() +'/'+ month +'/'+date.getFullYear();
    }

    commentsNumber(props){
        let v =  props.comments.c.get(props.id);
        if(typeof props.comments.c.get(props.id)!=='undefined'){
            return v.length;
        }else { return 0;}

    }

    onSubmit() {
       if(getUser()){
        if (this.state.cbody){
            this.props.addComment({
                id: uuidv1(),
                timestamp: Date.now(),
                body: this.state.cbody,
                author: getUser(),
                parentId: this.props.id

            })

        } else {
            alert('You have to write something!');
        }
    } else {
           alert('You have to insert your username above!');
}
   }


    render() {
        return (
            <Container styles={{ flexDirection: 'row'}}>
                <div style={{  boxShadow: "9px 7px 28px 4px #9E9E9E"}}>
                <div style={styles.styles}>
                <Col style={styles.styles}>

                    <ListItemAvatar>
                        <Avatar>
                            <img src={JohnDoe} className={'avatar-style'} style={{ marginRight: 10}}/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText style={{marginRight:10}}><strong>@{this.props.author}</strong></ListItemText>
                </Col>
                    <p>{this.props.title}</p>
                  <strong style={styles.timestamp}>{this.timestamp(this.props.timestamp)}</strong>
                </div>
                <div style={{marginLeft:25}}>
                <Col>
                    <ListItemText>
                        <EdiText
                            key={this.state.key}
                            value={this.props.body}
                            type="text"
                            onSave={(event)=>handleSave(event,this.props,this)}
                            editing={this.state.editing}

                        />
                        </ListItemText>
                </Col>
                    <Row style={styles.styles}>
                        <Col>
                            <img src={Icon2} className={'icon-style'}  style={{marginRight:5, marginLeft:10}}  onClick={()=>this.props.votePost(this.props.id,'upVote')}/>
                            <img src={Icon} className={'icon-style'}  style={{marginRight:10}} onClick={()=>this.props.votePost(this.props.id,'downVote')}/>
                        </Col>
                        <Col  style={styles.votes}>
                            {this.votes(this.props)}
                        </Col>
                    </Row>
                    <Row style={styles.styles}>
                        <Button onClick={() => this.handleDelete()} style={{ alignSelf: 'flex-end', margin: 20}}>Delete</Button>
                        <strong>Category: #{this.props.category}</strong>
                        <strong style={{marginLeft:20}}>Comments: {this.commentsNumber(this.props)}</strong>

                    </Row>
                    <Row style={styles.styles}>
                        <Input type={'text'} placeholder={'Speak up your mind! Add a New Comment...'} rows={3} style={{width:500}} value={this.state.cbody} onChange={(event)=>{this.setState({cbody: event.target.value});}}/>
                        <Button style={{alignSelf: 'flex-end', margin: 20}} onClick={()=>this.onSubmit()} >
                            Comment
                        </Button>
                    </Row>

                </div>
          </div>
                    <List>
                        {
                            displayComments(this.props)
                        }
                    </List>
            </Container>
        )
    }
} export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);



/*
!!this.props.comments.length && this.props.comments.map(renderComment)
 */