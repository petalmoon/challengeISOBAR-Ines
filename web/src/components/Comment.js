import React, {Component} from 'react';
import {
    Container,
    Button,
    ListItemText, ListItemAvatar, Avatar
} from '@material-ui/core';
import {Col,Row} from "reactstrap";
import EdiText from "react-editext";
import {getUser} from "./globalUser";
import {voteComment, deleteComment, editComment} from "../redux/reducers/comments";
import Icon from "../assets/images/dislike.png";
import Icon2 from "../assets/images/like.png";
import JohnDoe from "../assets/images/man.png";
import './../App.css';
import connect from "react-redux/es/connect/connect";

const styles = {
    styles:{
        display: 'flex',
        alignItems: 'center'
            },
    votes: {
        marginLeft:10,
        marginRight:10,
        fontSize:17
    },
    timestamp: {
        marginLeft:10,
        marginRight:10,
        fontFamily:'Tahoma',
        fontSize:13
    }

};

const mapStateToProps = (data) => {
    return {comments: data.comments,
        posts: data.post};
};
const mapDispatchToProps = { deleteComment,voteComment,editComment};




function handleSave(event,props,t)  {
    if(getUser()===props.author) {
       props.editComment(props.id, props.parentId,event);
    }  else{
        alert('Could not edit comment');
        t.setState({key: Math.random()})
    }
}


function handleDelete(props){
    if(getUser()===props.author) {
        props.deleteComment(props.id,props.parentId);
    }else{
        alert('Could not delete comment');
    }
}

function votes(props){
    if(props.voteScore>=0){
        return  <p> <strong style={{marginLeft:2, color:'green'}}>{props.voteScore}</strong></p>;
    }  else {
        return  <p> <strong style={{marginLeft:2, color:'red'}}>{props.voteScore}</strong></p>;
    }

}

function  timestamp(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let month = (date.getMonth()+1);
    return hours + ':' + minutes.substr(-2) + '  ' + date.getDate() +'/'+ month +'/'+date.getFullYear();

}



class Comment extends Component {

    constructor(props) {
        super(props);
        this.state={
            editing:false,
            key: 0 //to re-render the react-editext component
        }
    }

    render() {
        return (
        <Container style={{flexDirection: 'row'}}>
            <Row style={styles.styles}>

                <Col style={styles.styles}>
                    <ListItemAvatar>
                        <Avatar>
                            <img src={JohnDoe} className={'avatar-style'} style={{ marginRight: 10}}/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText style={{marginRight:10}}><strong>@{this.props.author}</strong></ListItemText>
                </Col>

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
                <strong style={styles.timestamp}>{timestamp(this.props.timestamp)}</strong>
                <Col>
                    <img src={Icon2} className={'icon-style'} style={{marginRight:5, marginLeft:10}} onClick={() => this.props.voteComment(this.props.id,'upVote',this.props.parentId)}/>
                    <img src={Icon} className={'icon-style'}  style={{marginRight:10}} onClick={() => this.props.voteComment(this.props.id, 'downVote',this.props.parentId)}/>
                </Col>
                <Col  style={styles.votes}>
                    {votes(this.props)}
                </Col>
                <Row style={styles.styles}>
                    <Col>
                        <Button  onClick={() => handleDelete(this.props)}  style={{ alignSelf: 'flex-end', margin: 20}}>Delete</Button>
                    </Col>
                </Row>
            </Row>
        </Container>
        )
    }
}export default connect(mapStateToProps, mapDispatchToProps)(Comment);



