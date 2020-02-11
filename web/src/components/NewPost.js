import React , { Component }  from "react";
import { connect } from 'react-redux';
import {Container, Button, Select, MenuItem} from '@material-ui/core';
import { Form} from 'semantic-ui-react';
import {getUser } from "./globalUser";
import {addPost } from '../redux/reducers/posts';
import {Row} from 'reactstrap';
import TextField from "@material-ui/core/TextField/TextField";



const mapStateToProps = (data) => {
    return {posts: data.post};
};

const mapDispatchToProps = { addPost };

const uuidv1 = require('uuid/v1');


class NewPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            title:'',
            content: '',
            error: '',
            category:''
        }
    }
    onSubmit() {
        console.log(this.props);
        if (this.state.content){
            this.props.addPost({
                id: uuidv1(),
                timestamp: Date.now(),
                title: this.state.title,
                body: this.state.content,
                author: getUser(),
                category:this.state.category


            });
            this.setState({ state: this.state }); //auto render
        } else {
            this.setState({error: 'You have to write something!'});
        }
    }

    onTitleChange = event => {
        this.setState({title: event.target.value});
    };

    onMessageChange = event => {
        this.setState({content: event.target.value});
    };

    handleChangeCat = event => {
        this.setState({category: event.target.value});
        console.log(this.state.category);
    };

    render(){



        return (

            <Container className='form-wrapper' style={{ maxWidth:500}}>
                <h2 style={{fontSize:30,backgroundColor:'#b3b3ff'}}>Create a New Post</h2>
                <div>
                    <Container style={{margin: 15, flex: 1}}>
                        <Form >
                            <div className="form-group">
                                <TextField type="text" variant='outlined' className="form-control" value={this.state.title} placeholder={'Insert the title of this post!'} onChange={(e)=>this.onTitleChange(e)} />
                            </div>
                            <br/>
                            <div className="form-group" style={{alignContents:'center'}}>
                                <TextField multiline variant='outlined' className="form-control" placeholder={'Whats up?'}  rows="5" style={{width:300}} value={this.state.content} onChange={(e)=>this.onMessageChange(e)} />
                            </div>

                            <Row className={'posts-category'} style={{display:'center', flexWrap:'wrap'}}>
                                <div className="col-75" style={{marginTop:10}}>
                                    <label style={{marginRight:10}} >Post Category</label>

                                    <Select onChange={(e)=>this.handleChangeCat(e)}>
                                        <MenuItem value="react">React</MenuItem>
                                        <MenuItem value="redux">Redux</MenuItem>
                                        <MenuItem value="udacity">Udacity</MenuItem>
                                    </Select>
                                    <Button style={{ alignSelf: 'flex-end', margin: 20,backgroundColor:'#f2ccff'}} onClick={() => this.onSubmit()}>
                                        Add Post
                                    </Button>
                                </div>
                            </Row>
                        </Form>




                    </Container>
                </div>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);