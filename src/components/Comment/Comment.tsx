import React, { Component } from 'react';
import dellImg from '../../assets/img/delete.svg';
import changeBtn from '../../assets/img/change-white.png';

interface CommentProps {
  id: string;
  author: string;
  text: string;
  onDelete(id: string): void;
  onChange(id: string, text: string): void;
}

interface CommentState {
  author: string;
  text: string;
  change: boolean;
}

export default class Comment extends Component<CommentProps, CommentState> {
  // eslint-disable-next-line
  constructor(props: any) {
    super(props);
    this.state = {
      author: props.author,
      text: props.text,
      change: false,
    };
    this.onStartChange = this.onStartChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  onStartChange() {
    this.setState({
      change: true,
    });
  }
  onValueChange(e: React.FormEvent<HTMLTextAreaElement>): void {
    this.setState({
      text: e.currentTarget.value,
    });
  }

  onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const test = this.state.text.replace(/\s/g, '');
    if (test !== '') {
      this.props.onChange(this.props.id, this.state.text);
      this.setState({
        change: false,
      });
    }
  }
  render() {
    const { id, author, text, onDelete } = this.props;
    const { change } = this.state;
    let commentBody: JSX.Element;
    if (change == false) {
      commentBody = (
        <>
          <div className="comment__text-wrapper">
            <p className="comment__author">{author}</p>
            <p className="comment__text">{text}</p>
          </div>
          <div className="comment__buttons-wrapper">
            <div onClick={this.onStartChange} className="comment__change-btn">
              <img
                src={changeBtn}
                alt="delete"
                className="comment__change-btn-img"
              />
            </div>
            <div
              onClick={() => {
                onDelete(id);
              }}
              className="comment__dell-btn">
              <img
                src={dellImg}
                alt="delete"
                className="comment__dell-btn-img"
              />
            </div>
          </div>
        </>
      );
    } else {
      commentBody = (
        <form onSubmit={this.onSubmit} className="comment__form">
          <textarea
            onChange={this.onValueChange}
            className="comment__text"></textarea>
          <button className="comment__submit-btn">ОК</button>
        </form>
      );
    }

    return <div className="comment">{commentBody}</div>;
  }
}
