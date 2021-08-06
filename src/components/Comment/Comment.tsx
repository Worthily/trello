import React, { useState } from 'react';
import dellImg from '../../assets/img/delete.svg';
import changeBtn from '../../assets/img/change-white.png';
import CommentChange from '../../ui/CommentChange';

function Comment(props: {
  id: string;
  author: string;
  text: string;
  onDelete(id: string[]): void;
  onChange(id: string, text: string): void;
}) {
  const [text, setText] = useState(props.text);
  const [change, setChange] = useState(false);

  function onStartChange() {
    setChange(true);
  }

  const { id, author, onDelete, onChange } = props;
  let commentBody: JSX.Element;

  if (change == false) {
    commentBody = (
      <>
        <div className="comment__text-wrapper">
          <p className="comment__author">{author}</p>
          <p className="comment__text">{text}</p>
        </div>
        <div className="comment__buttons-wrapper">
          <div onClick={onStartChange} className="comment__change-btn">
            <img
              src={changeBtn}
              alt="delete"
              className="comment__change-btn-img"
            />
          </div>
          <div
            onClick={() => {
              const idArr: string[] = [];
              idArr.push(id);
              onDelete(idArr);
            }}
            className="comment__dell-btn">
            <img src={dellImg} alt="delete" className="comment__dell-btn-img" />
          </div>
        </div>
      </>
    );
  } else {
    commentBody = (
      <CommentChange
        id={id}
        text={text}
        setChange={setChange}
        onChange={onChange}
        setText={(text: string) => {
          setText(text);
        }}
      />
    );
  }

  return <div className="comment">{commentBody}</div>;
}

export default Comment;
