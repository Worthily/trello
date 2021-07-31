import React, { useState } from 'react';
import dellImg from '../../assets/img/delete.svg';
import changeBtn from '../../assets/img/change-white.png';

// eslint-disable-next-line
function Comment(props: any) {
  const [text, setText] = useState(props.text);
  const [change, setChange] = useState(false);

  function onStartChange() {
    setChange(true);
  }
  function onValueChange(e: React.FormEvent<HTMLTextAreaElement>): void {
    setText(e.currentTarget.value);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const test = text.replace(/\s/g, '');
    if (test !== '') {
      props.onChange(props.id, text);
      setChange(false);
    }
  }
  const { id, author, onDelete } = props;
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
              onDelete(id);
            }}
            className="comment__dell-btn">
            <img src={dellImg} alt="delete" className="comment__dell-btn-img" />
          </div>
        </div>
      </>
    );
  } else {
    commentBody = (
      <form onSubmit={onSubmit} className="comment__form">
        <textarea onChange={onValueChange} className="comment__text"></textarea>
        <button className="comment__submit-btn">ОК</button>
      </form>
    );
  }

  return <div className="comment">{commentBody}</div>;
}

export default Comment;
