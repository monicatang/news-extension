
import { Alert} from 'reactstrap';
import React, { Component } from 'react';

import './App.css';


export default class KeywordBubble extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true
    };

    this.deleteKeyword = this.deleteKeyword.bind(this);
  }

  deleteKeyword = (e, keyword) => {
    this.setState({ visible: false });
    let terms = JSON.parse(localStorage.getItem('keywords'));
    terms = terms.filter(phrase => phrase !== keyword);
    localStorage.setItem("keywords", JSON.stringify(terms));
    window.location.reload();
  }


  render(){
    return <Alert color="info" isOpen={this.state.visible} toggle={(e) => this.deleteKeyword(e, this.props.term)} className = "keywordAlert">{this.props.term}</Alert>
  }

}