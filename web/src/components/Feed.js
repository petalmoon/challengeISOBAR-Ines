import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container,
    List,
    Select,
    MenuItem,
    TextField
} from '@material-ui/core';

import SinglePost from './SinglePost';
import { allPosts} from '../redux/reducers/posts';
import {changeUser } from "./globalUser";
import NewPost from "./NewPost";
import {Row} from "reactstrap";




const mapStateToProps = ({ posts }) => ({ posts });

const mapDispatchToProps = { allPosts };

const renderPost = (post,index) => (
    <SinglePost
        key={index}
        id={post.id}
        timestamp={post.timestamp}
        title={post.title}
        body={post.body}
        author={post.author}
        category={post.category}
        voteScore = {post.voteScore}
    />
);

function categoryFilter(array, category){
    return array.filter(function(el) {
        return el.category === category;
    })
}

const printCategories = (t) => {
    if(t.props.posts.p.length>0){
        if(t.state.category!=="none"){
            let toRender = categoryFilter(t.props.posts.p, t.state.category);
            console.log(toRender);
            return toRender.map(renderPost);
        }else{
            return t.props.posts.p.map(renderPost);
        }
    }
};


class Feed extends Component {

    constructor(props){


        super(props);
        this.state = {
            category: 'none'
        };


    }
    componentDidMount(){
      this.props.allPosts();
    }

    render(){
        const endMsg = this.props.posts.length === 0 ? "There aren't any posts yet!" : "These are all the posts for now!"

        const handleUserChange = event => {
           changeUser(event.target.value);
        };

        const handleChange = event => {
            this.setState({category: event.target.value});
        };


        return (
            <Container className={'feed-style'} style={{marginTop:64, marginBottom:10}} >
                <br/>
              <p className={'posts-category' }>Who are you?</p>
                <TextField label="Username" style={{ marginBottom:30}} variant="outlined" onChange={(e)=>handleUserChange(e)} />


                <NewPost className={'new-post'} style={{marginTop:2}}/>


                <Row className={'posts-category'} style={{display:'center', flexWrap:'wrap', margin:20}}>
                    <div className="col-75" style={{marginTop:10}}>
                        <strong><label style={{marginRight:10,fontSize:18}} >Show Posts by Category</label></strong>

                        <Select onChange={(e)=>handleChange(e)}>
                            <MenuItem value="none">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="react">React</MenuItem>
                            <MenuItem value="redux">Redux</MenuItem>
                            <MenuItem value="udacity">Udacity</MenuItem>
                        </Select>
                    </div>
                </Row>
                <div>
                    <List key={this.state.category}> {/*when the category changes, the entire list is re-rendered due to a change of props*/}
                        {
                          printCategories(this)
                        }
                    </List>
                    <p style={ {  margin: 10, alignSelf: 'center', fontSize: 12, color: 'grey'}}>{endMsg}</p>
                </div>

            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);