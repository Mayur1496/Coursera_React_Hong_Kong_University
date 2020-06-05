import React from 'react';
import { Card, CardImg, CardText,
    CardTitle } from 'reactstrap';



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

    function RenderComments({dish}){
        if(dish == null) return(<div></div>);
        const comments = dish.comments;
        if(comments != null){
            const comm = comments.map((c) => {
                return(
                    <li>
                        <p>{c.comment}</p>
                        <p>{"-- "+c.author + " , " + new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(c.date)))}</p>
                    </li>
                );
            })

            return(
                <ul className="list-unstyled">
                    <h4>{"Comments"}</h4>
                    {comm}
                </ul>
            );
        }else{
            return(
                <div></div>
            );
        }
    }


    const Dishdetail = (props) =>{
        return(
            <div className = "container">
                <div className="row">                  
                    <div className="col-12 col-md-5 m-1">
                        <RenderDishDetail dish = {props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments dish = {props.dish} />
                    </div>                   
                </div>
            </div>
        );
    }


export default Dishdetail;