import React, { useState } from 'react';
import Card from '../Card';
import AddCardBtn from '../../ui/AddCardBtn';
import changeImg from '../../assets/img/change.png';
import ColumnHeaderChange from '../../ui/ColumnHeaderChange';
import { cards, columns } from '../../types';

function Column(props: {
  column: columns;
  cards: cards[];
  OnDelete(id: string): void;
  onCheck(id: string): void;
  getHeader(id: string, header: string): void;
  createCard(id: string): void;
  onShowPopup(id: string): void;
  commentsCount(id: string): number;
}) {
  const { id, header } = props.column;
  const { cards, OnDelete, onCheck, createCard, onShowPopup, commentsCount } =
    props;
  const [columnHeader, setHeader] = useState(header);
  const [change, setChange] = useState(false);

  function onChangeBtnClick(): void {
    setChange(!change);
  }

  let heading = (
    <div className="column__header-wrapper">
      <h2 className="column__header">{header}</h2>
      <div onClick={onChangeBtnClick} className="column__header-change-btn">
        <img src={changeImg} alt="change" />
      </div>
    </div>
  );

  if (change) {
    heading = (
      <ColumnHeaderChange
        header={columnHeader}
        setHeader={(header: string) => {
          setHeader(header);
        }}
        getHeader={(header: string) => {
          props.getHeader(id, header);
        }}
        setChange={(status: boolean) => {
          setChange(status);
        }}
      />
    );
  }

  const elements = cards.map((item) => {
    if (item && item.status == id) {
      return (
        <li key={item.id} className="column__card-item">
          <Card
            card={item}
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
