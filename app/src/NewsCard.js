import {  
  Card, 
  CardImg, 
  CardText, 
  CardBody,
  CardFooter,
  Col } from 'reactstrap';
import React, { Component } from 'react';
import './App.css';

export default class NewsCard extends Component{
  render() {
    return <Col xs="6" sm="4">
      <a href={this.props.link}>
        <Card className="card-gallery">
          <div className="text-block">{this.props.source}</div>
          <CardImg className="gallery-img" top width="100%" src={this.props.image} alt="Card image cap" />
           <CardFooter className="card-date">{this.props.date.slice(0, 10)}</CardFooter>
          <CardBody className="card-body">
            <CardText className="card-text">{this.props.headline} </CardText>
          </CardBody>
         
        </Card>
      </a>
    </Col>
  };
};