import React, { useState } from 'react';
import dellImg from '../../assets/img/delete.svg';
import closeImg from '../../assets/img/close.png';
import sendBtn from '../../assets/img/send-button.png';
import changeBtn from '../../assets/img/change-white.png';
import Comment from '../Comment';
import CardHeaderChange from '../../ui/CardHeaderChange';
import CardTextChange from '../../ui/CardTextChange';
import { comments } from '../../types';

function ShowCardPopup(props: {
  id: string;
  header: string;
  text: string;
  author: string;
  column: string;
  OnDelete(id: string): void;
  OnClose(): void;
  listener: boolean;
  addListener(): void;
  onHeaderChange(id: string, header: string): void;
  onTextChange(id: string, text: string): void;
  cardComments: comments;
  onCommentDell(id: string[]): void;
  onCommentChange(id: string, text: string): void;
  onCommentAdd(id: string, text: string): void;
}) {
  const [headerChange, setHeaderChange] = useState(false);
  const [textChange, setTextChange] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [header, setHeader] = useState(props.header);
  const [text, setText] = useState(props.text);

  function addListen() {
    document.addEventListener('keyup', (event) => {
      if (event.keyCode === 27) {
        props.addListener();
        props.OnClose();
      }
    });
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
  if (!headerChange) {
    headerTop = (
      <div className="show-card__header-wrapper">
        <h2 className="show-card__header">{header}</h2>
        <div
          onClick={() => {
            setHeaderChange(true);
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
      <CardHeaderChange
        header={header}
        setHeader={(header: string) => {
          setHeader(header);
        }}
        onHeaderChange={(header: string) => {
          props.onHeaderChange(props.id, header);
        }}
        setHeaderChange={(status: boolean) => {
          setHeaderChange(status);
        }}
      />
    );
  }

  let cardText: JSX.Element;
  if (!textChange) {
    cardText = (
      <>
        <div
          onClick={() => {
            setTextChange(true);
          }}
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
      <CardTextChange
        text={text}
        setText={(text: string) => {
          setText(text);
        }}
        onTextChange={(text: string) => {
          props.onTextChange(props.id, text);
        }}
        setTextChange={(status: boolean) => {
          setTextChange(status);
        }}
      />
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
