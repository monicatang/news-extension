import React, { Component } from 'react';
import './App.css';
import {  InputGroup,  
  Input, 
  Alert,
  Card, 
  CardImg, 
  CardText, 
  CardBody,
  Button, 
  Container, 
  Row, 
  Col } from 'reactstrap';

var apiKey = "d418a65c0c38453da8d0ee0eae5467e0";



const NewsCard = (props) => {
  return (
    <Col xs="6" sm="4">
      <a href={props.link}>
        <Card className="card-gallery">
          <div className="text-block">{props.source}</div>
          <CardImg className="gallery-img" top width="100%" src={props.image} alt="Card image cap" />
          <CardBody className="card-body">
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
    this.state = {displayed_news: [],
      visible: false,
      keywords: ""
    };

    this.toggleVisible = this.toggleVisible.bind(this);
    this.getData = this.getData.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.returnSearch = this.returnSearch.bind(this);
  }

  toggleVisible() {
    this.setState({ visible: !this.state.visible });
  }

  openConfirm() {
    return <Alert color="success" isOpen={this.state.visible} toggle={this.toggleVisible}>
                 Followed {this.state.keywords}!
           </Alert>}

  //retrieves news from api
  getData(url) {
    fetch(url, {
        method: 'GET'
      })
      .then((resp) => resp.json())
      .then((json) => this.setState({displayed_news: json.articles}))
      .catch(function(error){
        console.log(error);
      });
  }

  //checks whether the article has an image
  hasImage(article) {
    return Boolean(article.urlToImage);
  }

  //forms card using info from article
  extractInfo(article, index) {
    if(index < 9){
      return <NewsCard image={article.urlToImage} headline={article.title} link={article.url} source={article.source.name}/>;
    } else {
      return;
    }
    
  }

  handleSearchChange(e) {
   this.setState({keywords: e.target.value});
  }

  returnSearch(){
    if(this.state.keywords){
      this.getData("https://newsapi.org/v2/everything?q=" + encodeURI(this.state.keywords) + "&apiKey=" + apiKey);
    } else {
      return;
    }

  }

  componentDidMount() {
    let headlines_url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=' + apiKey;
    this.getData(headlines_url);
  }



  render() {
    if(this.state.displayed_news){
      return (
        <Container>
            
           {this.state.visible && this.openConfirm()}
          <h1 className="title"> Top Headlines </h1>
          <InputGroup className = "search-bar">
            <Input className="search-input" value={this.state.keywords} onChange={this.handleSearchChange} placeholder="Enter keywords to search for or follow a particular story" />
            <Button className="search-button" color="secondary" onClick={this.returnSearch}>Search</Button>
            <Button outline color="secondary" onClick={this.toggleVisible}>Follow</Button>
          </InputGroup>
          <Row>{this.state.displayed_news.filter(this.hasImage).map(this.extractInfo)}</Row>
        </Container>
      );
    }
  }
}

export default App;
