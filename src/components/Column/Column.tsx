import React, { useState } from 'react';
import Card from '../Card';
import AddCardBtn from '../../ui/AddCardBtn';
import changeImg from '../../assets/img/change.png';

function Column(props: {
  id: string;
  cards: Array<{
    id: string;
    header: string;
    text: string;
    checked: boolean;
    author: string;
    status: string;
  }>;
  header: string;
  OnDelete(id: string): void;
  onCheck(id: string): void;
  getHeader(id: string, header: string): void;
  createCard(id: string): void;
  onShowPopup(id: string): void;
  commentsCount(id: string): number;
}) {
  const [header, setHeader] = useState(props.header);
  const [change, setChange] = useState(false);

  function onChangeBtnClick(): void {
    setChange(!change);
  }

  function onValueChange(e: React.FormEvent<HTMLInputElement>): void {
    setHeader(e.currentTarget.value);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (header !== '') {
      props.getHeader(header, props.id);
      setChange(false);
    }
  }

  const {
    cards,
    OnDelete,
    onCheck,
    createCard,
    id,
    onShowPopup,
    commentsCount,
  } = props;

  let heading = (
    <div className="column__header-wrapper">
      <h2 className="column__header">{props.header}</h2>
      <div onClick={onChangeBtnClick} className="column__header-change-btn">
        <img src={changeImg} alt="change" />
      </div>
    </div>
  );

  if (change) {
    heading = (
      <div className="column__header-wrapper">
        <form onSubmit={onSubmit} className="column__form">
          <input
            onChange={onValueChange}
            className="column__input"
            value={header}
          />
          <button className="column__submit-btn">OK</button>
        </form>
      </div>
    );
  }

  const elements = cards.map((item) => {
    if (item && item.status == id) {
      return (
        <li key={item.id} className="column__card-item">
          <Card
            header={item.header}
            text={item.text}
            checked={item.checked}
            author={item.author}
            OnDelete={() => OnDelete(item.id)}
            onCheck={() => onCheck(item.id)}
            onShowPopup={() => onShowPopup(item.id)}
            commentsCount={() => commentsCount(item.id)}
          />
        </li>
      );
    }
  });

  return (
    <div className="column">
      {heading}
      <ul className="column__card-wrapper">{elements}</ul>
      <AddCardBtn createCard={() => createCard(id)} />
    </div>
  );
}

export default Column;
