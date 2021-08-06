import React from 'react';
import commentImg from '../../assets/img/comment.png';
import notCheckImg from '../../assets/img/viewblack.png';
import checkImg from '../../assets/img/viewgreen.png';
import dellImg from '../../assets/img/delete.svg';

function Card(props: {
  header: string;
  text: string;
  checked: boolean;
  author: string;
  OnDelete(): void;
  onCheck(): void;
  onShowPopup(): void;
  commentsCount(): number;
}) {
  const {
    header,
    text,
    checked,
    author,
    OnDelete,
    onCheck,
    onShowPopup,
    commentsCount,
  } = props;

  const btnImgSrc = checked ? checkImg : notCheckImg;

  let commentsCountSpan: JSX.Element;
  if (commentsCount() !== 0) {
    commentsCountSpan = (
      <span className="card__comment-count">{commentsCount()}</span>
    );
  } else {
    commentsCountSpan = <></>;
  }

  return (
    <div className="column__card card">
      <div onClick={onShowPopup} className="card__info-wrapper">
        <h2 className="card__header">{header}</h2>
        <p className="card__autor">{author}</p>
        <div className="card__text-wrapper">
          <p className="card__text">{text}</p>
        </div>
      </div>
      <div className="card__buttons-wrapper">
        <div onClick={onCheck} className="card__checked-btn card__btn">
          <img src={btnImgSrc} alt="checked" className="card__checked-img" />
        </div>
        <div className="card__comments-btn card__btn">
          {commentsCountSpan}
          <img src={commentImg} alt="comment" className="card__comment-img" />
        </div>
        <div onClick={OnDelete} className="card__dell-btn card__btn">
          <img src={dellImg} alt="delete" className="card__dell-img" />
        </div>
      </div>
    </div>
  );
}

export default Card;
