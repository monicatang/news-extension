import {  InputGroup,  
  Input, 
  Alert,
  Button, 
  Row } from 'reactstrap';
  import React, { Component } from 'react';
  import NewsCard from './NewsCard.js';
  import './App.css';
  import $ from 'jquery';

var apiKey = `${process.env.REACT_APP_API_KEY}`;
var headlines_url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=';

class Headlines extends Component {

  constructor() {
    super();
    this.state = {displayed_news: [],
      visible: false,
      keywords: ""
    };
    this.toggleVisible = this.toggleVisible.bind(this);
    this.getData = this.getData.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.returnSearch = this.returnSearch.bind(this);
    this.follow = this.follow.bind(this);
    this.getCategoryData = this.getCategoryData.bind(this);
    this.renderCard = this.renderCard.bind(this);
  }

  toggleVisible() {
    this.setState({ visible: !this.state.visible });
  }

  // Follows certain search keyword combinations
  showAlerts() {
    if (this.state.visible) {
      var input = this.state.keywords;
      if (input) {
        return <Alert color="success" isOpen={this.state.visible} toggle={this.toggleVisible}>
          Followed {this.state.keywords}!
        </Alert>
      } else {
        return <Alert color="info" isOpen={this.state.visible} toggle={this.toggleVisible}>Please enter search keywords.</Alert>
      }
    };
  } 

  follow() {
    var input = this.state.keywords;

    if (input) {
      var terms = [];
      var existing_keywords = localStorage.getItem('keywords');
      console.log(existing_keywords);
      if (existing_keywords != null) {
        terms = JSON.parse(existing_keywords);
      }

      if ($.inArray(input, terms) === -1) {
        terms.push(input)
      };
      localStorage.setItem("keywords", JSON.stringify(terms));
      console.log(localStorage.getItem("keywords"));
    }
  }

  // Retrieves news from API
  getData(url) {
    console.log(process.env.REACT_APP_API_KEY);
    fetch(url, {
      method: 'GET'
    })
      .then((resp) => resp.json())
      .then((json) => this.setState({displayed_news: json.articles}))
      .catch(function(error){
        console.log(error);
      });
  }

  renderCard(data){
    return data.filter(this.hasImage).map(this.extractInfo);
  }

  // Checks whether the article has an image
  hasImage(article) {
    return Boolean(article.urlToImage);
  }

  // Forms card using info from article
  extractInfo(article, index) {
    return <NewsCard image={article.urlToImage} headline={article.title} link={article.url} source={article.source.name} date = {article.publishedAt}/>;
  }

  handleSearchChange(e) {
   this.setState({keywords: e.target.value});
 }

  returnSearch() {
    if (this.state.keywords) {
      this.getData("https://newsapi.org/v2/everything?q=" + encodeURI(this.state.keywords) + "&apiKey=" + apiKey + "&sortBy=popularity");
    } else {
      return;
    }
  }

  getCategoryData(e, category) {
    let url = headlines_url + apiKey + '&category=' + category;
    this.getData(url);
  }

  componentDidMount() {
    let url =  headlines_url + apiKey;
    this.getData(url);
  }

  render() {
    if (this.state.displayed_news) {
      return (
        <div>
        {this.showAlerts()}
        <h1 className="title"> Top Headlines </h1>
        <InputGroup className = "search-bar">
        <Input className="search-input" value={this.state.keywords} onChange={this.handleSearchChange} placeholder="Enter keywords to search for or follow a particular story" />
        <Button className="search-button" color="secondary" onClick={this.returnSearch}>Search</Button>
        <Button outline color="secondary" onClick={(event) => {this.toggleVisible(); this.follow();}}>Follow</Button>
        </InputGroup>
        <div>
        <Button className="category-btns" color="link" onClick={(e) => this.getCategoryData(e, "general")} >General</Button>
        <Button className="category-btns" color="link" onClick={(e) => this.getCategoryData(e, "business")}>Business</Button>
        <Button className="category-btns" color="link" onClick={(e) => this.getCategoryData(e, "entertainment")}>Entertainment</Button>
        <Button className="category-btns" color="link" onClick={(e) => this.getCategoryData(e, "health")}>Health</Button>
        <Button className="category-btns" color="link" onClick={(e) => this.getCategoryData(e, "science")}>Science</Button>
        <Button className="category-btns" color="link" onClick={(e) => this.getCategoryData(e, "sports")}>Sports</Button>
        <Button className="category-btns" color="link" onClick={(e) => this.getCategoryData(e, "technology")}>Technology</Button>
        </div>
        <Row>{this.renderCard(this.state.displayed_news)}</Row>
        </div>
        );
      }
    }
  }

export default Headlines;
