import React, { Component } from 'react';
import './App.css';
import {  InputGroup, 
  InputGroupAddon, 
  InputGroupText, 
  Input, 
  Card, 
  CardImg, 
  CardText, 
  CardBody,
  CardTitle, 
  CardSubtitle, 
  Button, 
  Container, 
  Row, 
  Col } from 'reactstrap';

var apiKey = "d418a65c0c38453da8d0ee0eae5467e0";

const url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=' + apiKey;



const NewsCard = (props) => {
  return (
    <Col xs="6" sm="4">
      <a href={props.url}>
        <Card className="card-gallery">
          <CardImg className="gallery-img" top width="100%" src={props.img} alt="Card image cap" />
          <CardBody>
            <CardText className="card-text">{props.headline}</CardText>
          </CardBody>
        </Card>
      </a>
    </Col>
  );
};

class App extends Component {

  constructor(){
    super();
    this.state = {top_headlines: [1]};
  }

  getData() {
    fetch(url, {
        method: 'GET'
      })
      .then((resp) => resp.json())
      .then((json) => this.setState({top_headlines: json.articles}))
      .catch(function(error){
        console.log(error);
      });
  }

  hasImage(article) {
    return Boolean(article.urlToImage);
  }

  extractInfo(article, index) {
    if(index < 9){
      return <NewsCard img={article.urlToImage} headline={article.title} url={article.url}/>;
    } else {
      return;
    }
    
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    if(this.state.top_headlines){
      return (
        <Container>
          <h1 className="title"> Top Headlines </h1>
          <Row>{this.state.top_headlines.filter(this.hasImage).map(this.extractInfo)}</Row>
        </Container>
      );
    }
  }
}

export default App;
