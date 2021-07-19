import React, { Component } from 'react';
import commentImg from '../../assets/img/comment.png';
import notCheckImg from '../../assets/img/viewblack.png';
import checkImg from '../../assets/img/viewgreen.png';
import dellImg from '../../assets/img/delete.svg';

interface CardType {
  header?: string;
  text?: string;
  checked?: boolean;
  author?: string;
}
interface CardState {
  header?: string;
  text?: string;
  checked?: boolean;
  author?: string;
}

export default class Card extends Component<CardType, CardState> {
  // eslint-disable-next-line
  constructor(props: any) {
    super(props);
    this.state = {
      header: props.header,
      text: props.text,
      author: props.author,
      checked: props.checked,
    };
    this.OnChecked = this.OnChecked.bind(this);
  }
  OnChecked() {
    this.setState(({ checked }) => ({
      checked: !checked,
    }));
  }
  render() {
    const { header, text, checked, author } = this.state;
    let btnSrc;
    if (checked == true) {
      btnSrc = checkImg;
    } else {
      btnSrc = notCheckImg;
    }

    return (
      <div className="column__card card">
        <h2 className="card__header">{header}</h2>
        <p className="card__autor">{author}</p>
        <div className="card__text-wrapper">
          <p className="card__text">{text}</p>
        </div>
        <div className="card__buttons-wrapper">
          <div onClick={this.OnChecked} className="card__checked-btn card__btn">
            <img src={btnSrc} alt="checked" className="card__checked-img" />
          </div>
          <div className="card__comments-btn card__btn">
            <img src={commentImg} alt="comment" className="card__comment-img" />
          </div>
          <div className="card__dell-btn card__btn">
            <img src={dellImg} alt="delete" className="card__dell-img" />
          </div>
        </div>
      </div>
    );
  }
}
