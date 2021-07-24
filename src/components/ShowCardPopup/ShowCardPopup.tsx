import React, { Component } from 'react';
import dellImg from '../../assets/img/delete.svg';
import closeImg from '../../assets/img/close.png';
import sendBtn from '../../assets/img/send-button.png';
import changeBtn from '../../assets/img/change-white.png';
import Comment from '../Comment';

interface ShowCardProps {
  id: string;
  header: string;
  text: string;
  author: string;
  column: string;
  listener: boolean;
  headerString: string;
  textString: string;
  cardComments: Array<{
    id: string;
    author: string;
    text: string;
    card: string;
  }>;
  OnDelete(id: string): void;
  OnClose(): void;
  addListener(): void;
  onHeaderChange(id: string, header: string): void;
  onTextChange(id: string, header: string): void;
  onCommentAdd(card: string, header: string): void;
  onCommentDell(id: string): void;
  onCommentChange(id: string, text: string): void;
}

interface ShowCardState {
  headerString: string;
  textString: string;
  commentText: string;
}

export default class ShowCardPopup extends Component<
  ShowCardProps,
  ShowCardState
> {
  // eslint-disable-next-line
  constructor(props: any) {
    super(props);
    this.state = {
      headerString: props.headerString,
      textString: props.textString,
      commentText: '',
    };
    this.addListen = this.addListen.bind(this);
    this.onHeaderChange = this.onHeaderChange.bind(this);
    this.onHeaderValueChange = this.onHeaderValueChange.bind(this);
    this.onHeaderSubmit = this.onHeaderSubmit.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onTextSubmit = this.onTextSubmit.bind(this);
    this.onTextValueChange = this.onTextValueChange.bind(this);
    this.onCommentValueChange = this.onCommentValueChange.bind(this);
    this.onCommentSubmit = this.onCommentSubmit.bind(this);
  }
  addListen() {
    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 27) {
        this.props.addListener();
        this.props.OnClose();
      }
    });
  }
  onHeaderChange() {
    this.setState(() => {
      return {
        headerString: ' ',
      };
    });
  }
  onTextChange() {
    this.setState(() => {
      return {
        textString: ' ',
      };
    });
  }
  onHeaderValueChange(e: React.FormEvent<HTMLInputElement>): void {
    if (e.currentTarget.value !== '') {
      this.setState({
        headerString: e.currentTarget.value,
      });
    }
  }
  onHeaderSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (this.state.headerString !== '') {
      this.props.onHeaderChange(this.props.id, this.state.headerString);
    }
    this.setState({
      headerString: '',
    });
  }
  onTextValueChange(e: React.FormEvent<HTMLTextAreaElement>): void {
    if (e.currentTarget.value !== '') {
      this.setState({
        textString: e.currentTarget.value,
      });
    }
  }
  onTextSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (this.state.textString !== '') {
      this.props.onTextChange(this.props.id, this.state.textString);
    }
    this.setState({
      textString: '',
    });
  }

  onCommentValueChange(e: React.FormEvent<HTMLInputElement>): void {
    if (e.currentTarget.value !== '') {
      this.setState({
        commentText: e.currentTarget.value,
      });
    }
  }
  onCommentSubmit(e: React.FormEvent) {
    e.preventDefault();
    const test = this.state.commentText.replace(/\s/g, '');
    if (test !== '') {
      this.props.onCommentAdd(this.props.id, this.state.commentText);
    }
    this.setState({
      commentText: '',
    });
  }

  render() {
    const {
      id,
      header,
      text,
      author,
      column,
      OnDelete,
      OnClose,
      listener,
      cardComments,
      onCommentDell,
      onCommentChange,
    } = this.props;
    const { headerString, textString } = this.state;
    if (!listener) {
      this.addListen();
    }
    let headerTop: JSX.Element;
    if (headerString == '') {
      headerTop = (
        <div className="show-card__header-wrapper">
          <h2 className="show-card__header">{header}</h2>
          <div
            onClick={this.onHeaderChange}
            className="show-card__header-chenge-btn">
            <img
              src={changeBtn}
              alt="changeBtn"
              className="show-card__header-chenge-btn-img"
            />
          </div>
          <p className="show-card__author">{author}</p>
          <p className="show-card__column">Колонка: {column}</p>
        </div>
      );
    } else {
      headerTop = (
        <div className="show-card__header-wrapper">
          <form
            onSubmit={this.onHeaderSubmit}
            className="show-card__change-header-form">
            <input
              onChange={this.onHeaderValueChange}
              type="text"
              className="show-card__change-header-inp"
            />
            <button type="submit" className="show-card__change-header-btn">
              OK
            </button>
          </form>
        </div>
      );
    }

    let cardText: JSX.Element;
    if (textString == '') {
      cardText = (
        <>
          <div
            onClick={this.onTextChange}
            className="show-card__text-chenge-btn">
            <img
              src={changeBtn}
              alt="changeBtn"
              className="show-card__text-chenge-btn-img"
            />
          </div>
          <p className="show-card__text">{text}</p>
        </>
      );
    } else {
      cardText = (
        <>
          <form
            onSubmit={this.onTextSubmit}
            className="show-card__change-text-form">
            <textarea
              onChange={this.onTextValueChange}
              className="show-card__change-text-inp"
            />
            <button type="submit" className="show-card__change-text-btn">
              OK
            </button>
          </form>
        </>
      );
    }
    const comments = cardComments.map((item) => {
      if (item) {
        return (
          <li key={item.id} className="show-card__comment-item">
            <Comment
              id={item.id}
              author={item.author}
              text={item.text}
              onDelete={onCommentDell}
              onChange={onCommentChange}
            />
          </li>
        );
      }
    });
    return (
      <div className="show-card">
        <div className="show-card__wrapper">
          <div className="show-card__top">
            {headerTop}
            <div onClick={() => OnDelete(id)} className="show-card__dell-btn">
              <img
                src={dellImg}
                alt="dell"
                className="show-card__dell-btn-img"
              />
            </div>
            <div onClick={() => OnClose()} className="show-card__close-btn">
              <img
                src={closeImg}
                alt="close"
                className="show-card__close-btn-img"
              />
            </div>
          </div>
          <div className="show-card__text-wrapper">
            <p className="show-card__text-prefix">Описание:</p>
            {cardText}
          </div>
          <form
            onSubmit={this.onCommentSubmit}
            className="show-card__comment-form">
            <input
              onChange={this.onCommentValueChange}
              type="text"
              value={this.state.commentText}
              placeholder="Оставить комментарий"
              className="show-card__comment-input"
            />
            <button className="show-card__comment-send-btn">
              <img
                src={sendBtn}
                alt="send"
                className="show-card__comment-send-btn-img"
              />
            </button>
          </form>
          <ul className="show-card__comment-wrapper">{comments}</ul>
        </div>
      </div>
    );
  }
}
