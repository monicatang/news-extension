
import { Row } from 'reactstrap';
import KeywordBubble from './KeywordBubble.js'
import React, { Component } from 'react';
import NewsCard from './NewsCard.js';
import './App.css';
import $ from 'jquery'; 

var apiKey = "d418a65c0c38453da8d0ee0eae5467e0";


class Following extends Component {

  constructor(props){
    super(props);
    this.state = {followed_news: [],
      keywords: "",
    };

    this.getNewsfeed = this.getNewsfeed.bind(this);
    this.containsImage = this.containsImage.bind(this);
    this.returnResults = this.returnResults.bind(this);
    this.convertArticles = this.convertArticles.bind(this);
    this.showKeywords = this.showKeywords.bind(this);

  }
  //retrieves followed news from api
  getNewsfeed() {
	  	let followed_stories = JSON.parse(localStorage.getItem("keywords"));

	  	if (followed_stories){
	  		let articles = [];
	  		for (var i=0; i<followed_stories.length; i++){
		  		let url = "https://newsapi.org/v2/everything?q=" + encodeURI(followed_stories[i]) + "&apiKey=" + apiKey + "&sortBy=publishedAt";
		  		let req = $.get(url);
		  		articles.push(req);
	  		}
	  		return articles;

	  	} else {
	      return;
	    }
	}



  //checks whether the article has an image
  containsImage(article) {
    return Boolean(article.urlToImage);
  }

  //forms card using info from article
  returnResults(article, index) {
	return <NewsCard image={article.urlToImage} headline={article.title} link={article.url} source={article.source.name} date = {article.publishedAt}/>;

    
  }

  convertArticles(data){
  	var articles = [];
  	for(var i=0; i<data.length; i++){
  		articles = articles.concat(data[i].articles);
  	}
  	return articles;
  }

  showKeywords(){
  	let terms = [];
  	let contents = [];
  	let existing_keywords = localStorage.getItem('keywords');
  	if(existing_keywords != null){
    	terms = JSON.parse(existing_keywords);
  	}
  	for(var i= 0; i<terms.length; i++){
  		contents.push(<KeywordBubble term ={terms[i]}/>);
  	}
  	return contents;
  	

 
  }

  componentDidMount() {
  	Promise.all(this.getNewsfeed())
  	.then(data => this.convertArticles(data))
	.then(articles => this.setState({followed_news: articles}))
	.catch(error => console.log(error));
  }

  render() {
  	
    if(this.state.followed_news !== []){
    	console.log(this.state.followed_news);

      return (
        <div>
          <h1 className="title"> Followed Stories </h1>
          <Row>{this.showKeywords()}</Row>
          <Row>{this.state.followed_news.filter(this.containsImage).map(this.returnResults)}</Row>
        </div>

      );
    }
  }
}

export default Following;
