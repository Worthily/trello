import React from 'react';
import Card from '../Card';
import Addcardbtn from '../../ui/Add-new-card-btn';

function Column({
  cards,
  header,
}: {
  // eslint-disable-next-line
  cards: any[];
  header: string;
}): JSX.Element {
  const elements = cards.map((item) => {
    if (item) {
      return (
        <li key={item.id} className="column__card-item">
          <Card
            header={item.header}
            text={item.text}
            checked={item.checked}
            author={item.author}
          />
        </li>
      );
    }
  });

  return (
    <div className="column">
      <h2 className="column__header">{header}</h2>
      <ul className="column__card-wrapper">{elements}</ul>
      <Addcardbtn />
    </div>
  );
}

export default Column;
