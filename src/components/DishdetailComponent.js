import React, { Component } from 'react';
import { Card, CardImg, CardText, 
    CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader,
    ModalBody, Button, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

function RenderDishDetail({dish}){
    if(dish != null){
        return(
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardTitle className="ml-3">{dish.name}</CardTitle>
                <CardText className="ml-3">{dish.description}</CardText>
            </Card>
        );
    }else{
        return(
            <div></div>
        );
    }
}


function RenderComments({comments}){
    if(comments != null){
        const comm = comments.map((c) => {
            return(
                <li key={c.id}>
                    <p>{c.comment}</p>
                    <p>{"-- "+c.author + " , " + new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(c.date)))}</p>
                </li>
            );
        })

        return(
            <ul className="list-unstyled">
                <h4>{"Comments"}</h4>
                {comm}
                <CommentForm/>
            </ul>
            
        );
    }else{
        return(
            <div></div>
        );
    }
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function Dishdetail(props) {
    return(
        <div className = "container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">                  
                <div className="col-12 col-md-5 m-1">
                    <RenderDishDetail dish = {props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments = {props.comments} />
                </div>                   
            </div>
            
        </div>
    );
}

class CommentForm extends Component{
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }

    render(){
        return(
        <div>
            <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={this.handleSubmit}>
                        <Row className="form-group">
                            <Label htmlFor="rating" md={12}>Rating</Label>
                            <Control.select model=".rating" id="rating" 
                                    className="form-control ml-3 mr-3" defaultValue={1}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Control.select>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="author" md={12}>Your name</Label>
                            <Control.text model=".author" id="author" name="author"
                                className="form-control ml-3 mr-3"
                                placeholder="Your Name"
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }} 
                            />
                            <Errors
                                className="text-danger ml-3"
                                model=".author"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be greater than 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                            />
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment" md={12}>Comment</Label>
                            <Col md={10}>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    className="form-control"
                                    rows="6"/>
                            </Col>
                        </Row>

                        <Button type="submit" value="submit" color="primary">Submit</Button>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </div>
        );
    }
}

export default Dishdetail;