import React, { useState } from 'react';
import dellImg from '../../assets/img/delete.svg';
import closeImg from '../../assets/img/close.png';
import sendBtn from '../../assets/img/send-button.png';
import changeBtn from '../../assets/img/change-white.png';
import Comment from '../Comment';

// eslint-disable-next-line
function ShowCardPopup(props: any) {
  const [headerString, setHeaderString] = useState(props.headerString);
  const [textString, setTextString] = useState(props.textString);
  const [commentText, setCommentText] = useState('');

  function addListen() {
    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 27) {
        props.addListener();
        props.OnClose();
      }
    });
  }
  function onHeaderValueChange(e: React.FormEvent<HTMLInputElement>): void {
    if (e.currentTarget.value !== '') {
      setHeaderString(e.currentTarget.value);
    }
  }
  function onHeaderSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (headerString !== '') {
      props.onHeaderChange(props.id, headerString);
    }
    setHeaderString('');
  }
  function onTextValueChange(e: React.FormEvent<HTMLTextAreaElement>): void {
    if (e.currentTarget.value !== '') {
      setTextString(e.currentTarget.value);
    }
  }
  function onTextSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (textString !== '') {
      props.onTextChange(props.id, textString);
    }
    setTextString('');
  }
  function onCommentValueChange(e: React.FormEvent<HTMLInputElement>): void {
    if (e.currentTarget.value !== '') {
      setCommentText(e.currentTarget.value);
    }
  }
  function onCommentSubmit(e: React.FormEvent) {
    e.preventDefault();
    const test = commentText.replace(/\s/g, '');
    if (test !== '') {
      props.onCommentAdd(props.id, commentText);
    }
    setCommentText('');
  }

  if (!props.listener) {
    addListen();
  }
  let headerTop: JSX.Element;
  if (headerString == '') {
    headerTop = (
      <div className="show-card__header-wrapper">
        <h2 className="show-card__header">{props.header}</h2>
        <div
          onClick={() => {
            setHeaderString(' ');
          }}
          className="show-card__header-chenge-btn">
          <img
            src={changeBtn}
            alt="changeBtn"
            className="show-card__header-chenge-btn-img"
          />
        </div>
        <p className="show-card__author">{props.author}</p>
        <p className="show-card__column">Колонка: {props.column}</p>
      </div>
    );
  } else {
    headerTop = (
      <div className="show-card__header-wrapper">
        <form
          onSubmit={onHeaderSubmit}
          className="show-card__change-header-form">
          <input
            onChange={onHeaderValueChange}
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
          onClick={() => {
            setTextString(' ');
          }}
          className="show-card__text-chenge-btn">
          <img
            src={changeBtn}
            alt="changeBtn"
            className="show-card__text-chenge-btn-img"
          />
        </div>
        <p className="show-card__text">{props.text}</p>
      </>
    );
  } else {
    cardText = (
      <>
        <form onSubmit={onTextSubmit} className="show-card__change-text-form">
          <textarea
            onChange={onTextValueChange}
            className="show-card__change-text-inp"
          />
          <button type="submit" className="show-card__change-text-btn">
            OK
          </button>
        </form>
      </>
    );
  }
  const comments = props.cardComments.map(
    (item: { id: string; author: string; text: string; card: string }) => {
      if (item) {
        return (
          <li key={item.id} className="show-card__comment-item">
            <Comment
              id={item.id}
              author={item.author}
              text={item.text}
              onDelete={props.onCommentDell}
              onChange={props.onCommentChange}
            />
          </li>
        );
      }
    },
  );
  return (
    <div className="show-card">
      <div className="show-card__wrapper">
        <div className="show-card__top">
          {headerTop}
          <div
            onClick={() => props.OnDelete(props.id)}
            className="show-card__dell-btn">
            <img src={dellImg} alt="dell" className="show-card__dell-btn-img" />
          </div>
          <div onClick={() => props.OnClose()} className="show-card__close-btn">
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
        <form onSubmit={onCommentSubmit} className="show-card__comment-form">
          <input
            onChange={onCommentValueChange}
            type="text"
            value={commentText}
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

export default ShowCardPopup;
