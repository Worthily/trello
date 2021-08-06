import React, { useState } from 'react';
import Column from './components/Column';
import LoginPopup from './components/LoginPopup';
import CreateCard from './components/CreateCard';
import ShowCardPopup from './components/ShowCardPopup';

function App() {
  let userLoc: string;
  let cardsLoc: Array<{
    id: string;
    header: string;
    text: string;
    checked: boolean;
    author: string;
    status: string;
  }>;

  if (localStorage.getItem('user') != null) {
    userLoc = localStorage.getItem('user') as string;
  } else {
    userLoc = '';
  }

  if (localStorage.getItem('cards') != null) {
    const cardsStr = localStorage.getItem('cards') as string;
    cardsLoc = JSON.parse(cardsStr) as Array<{
      id: string;
      header: string;
      text: string;
      checked: boolean;
      author: string;
      status: string;
    }>;
  } else {
    cardsLoc = [
      {
        id: 'w1',
        header: 'Отчет',
        text: 'Лишь сделанные на базе интернет-аналитики выводы ассоциативно распределены по отраслям. Как принято считать, акционеры крупнейших компаний освещают чрезвычайно интересные особенности картины в целом, однако',
        checked: false,
        author: 'Дмитрий',
        status: 'ToDo',
      },
    ];
  }

  let columnsLoc: Array<{
    id: string;
    header: string;
  }>;

  if (localStorage.getItem('columns') != null) {
    const columnsStr = localStorage.getItem('columns') as string;
    columnsLoc = JSON.parse(columnsStr) as Array<{
      id: string;
      header: string;
    }>;
  } else {
    columnsLoc = [
      { id: 'ToDo', header: 'To Do' },
      { id: 'InProgress', header: 'In progress' },
      { id: 'Testing', header: 'Testing' },
      { id: 'Done', header: 'Done' },
    ];
  }

  let commentsLoc: Array<{
    id: string;
    author: string;
    text: string;
    card: string;
  }>;

  if (localStorage.getItem('comments') != null) {
    const commentsStr = localStorage.getItem('comments') as string;
    commentsLoc = JSON.parse(commentsStr) as Array<{
      id: string;
      author: string;
      text: string;
      card: string;
    }>;
  } else {
    commentsLoc = [
      {
        id: 'c1',
        author: 'Димасик',
        text: 'деланные на базе интернет-аналитики выводы ассоциативно распределены',
        card: 'w1',
      },
      {
        id: 'c2',
        author: 'Димасик',
        text: 'деланные на базе интернет-аналитики выводы ассоциативно распределены',
        card: 'w1',
      },
    ];
  }

  const [user, setUser] = useState(userLoc);
  const [cards, setCards] = useState(cardsLoc);
  const [comments, setComments] = useState(commentsLoc);
  const [columns, setColumns] = useState(columnsLoc);
  const [createCardId, setCreateCardId] = useState('');
  const [showCardId, setShowCardId] = useState('');
  const [listenerESC, setListenerESC] = useState(false);

  function onCheck(id: string): void {
    const index = cards.findIndex((elem) => elem.id === id);
    const before = cards.slice(0, index);
    const after = cards.slice(index + 1);
    const changedCard = { ...cards[index], checked: !cards[index].checked };
    const newArr = [...before, changedCard, ...after];
    localStorage.setItem('cards', JSON.stringify(newArr));
    setCards(newArr);
  }

  function onDelete(id: string): void {
    let newArr: Array<{
      id: string;
      header: string;
      text: string;
      checked: boolean;
      author: string;
      status: string;
    }> = cards;

    newArr = newArr.filter((elem) => {
      return elem.id != id;
    });

    localStorage.setItem('cards', JSON.stringify(newArr));
    setCards(newArr);

    const newshowCardId = '';
    setShowCardId(newshowCardId);

    const commentsId: string[] = [];
    for (const item of comments) {
      if (item.card == id) {
        commentsId.push(item.id);
      }
    }

    onCommentDell(commentsId);
  }

  function getUser(userName: string): void {
    if (userName !== user) {
      const userLogin = userName;
      localStorage.setItem('user', userName);
      setUser(userLogin);
    }
  }

  function getHeader(id: string, header: string): void {
    const test = header.replace(/\s/g, '');
    if (test !== '') {
      const index = columns.findIndex((elem) => elem.id === id);
      const before = columns.slice(0, index);
      const after = columns.slice(index + 1);
      const changedColumn = {
        ...columns[index],
      };

      changedColumn.header = header;
      const newArr = [...before, changedColumn, ...after];
      localStorage.setItem('columns', JSON.stringify(newArr));
      setColumns(newArr);
    }
  }

  function getCreateCardPopup(id: string): void {
    setCreateCardId(id);
  }

  function createCard(cardHeader: string, cardText: string) {
    const testCardHeader = cardHeader.replace(/\s/g, '');
    const testCardText = cardText.replace(/\s/g, '');

    if (testCardHeader !== '' && testCardText !== '') {
      let id = 0;
      let success = false;
      const cardsId: string[] = [];

      for (let i = 0; i < cards.length; i++) {
        cardsId.push(cards[i].id);
      }

      while (!success) {
        if (cardsId.indexOf(`w${id}`) !== -1) {
          id++;
        } else {
          success = true;
        }
      }

      const card = {
        id: `w${id}`,
        header: cardHeader,
        text: cardText,
        checked: false,
        author: user,
        status: createCardId,
      };

      const newCards = [...cards, card];
      localStorage.setItem('cards', JSON.stringify(newCards));
      const newCreateCardId = '';
      setCards(newCards);
      setCreateCardId(newCreateCardId);
    }
  }

  function onShowPopup(id: string): void {
    setShowCardId(id);
  }

  function onCloseCardPopup(): void {
    setShowCardId('');
  }

  function addListener(): void {
    setListenerESC(true);
  }

  function changeCardHeader(id: string, header: string) {
    const test = header.replace(/\s/g, '');
    if (test !== '') {
      const index = cards.findIndex((elem) => elem.id === id);
      const newCard = cards[index];
      const before = cards.slice(0, index);
      const after = cards.slice(index + 1);
      newCard.header = header;
      const newArr = [...before, newCard, ...after];
      localStorage.setItem('cards', JSON.stringify(newArr));
      setCards(newArr);
    }
  }

  function changeCardText(id: string, text: string) {
    const test = text.replace(/\s/g, '');
    if (test !== '') {
      const index = cards.findIndex((elem) => elem.id === id);
      const newCard = cards[index];
      const before = cards.slice(0, index);
      const after = cards.slice(index + 1);
      newCard.text = text;
      const newArr = [...before, newCard, ...after];
      localStorage.setItem('cards', JSON.stringify(newArr));
      setCards(newArr);
    }
  }

  function onCommentDell(id: string[]) {
    let newArr: Array<{
      id: string;
      author: string;
      text: string;
      card: string;
    }> = comments;
    for (const idItem of id) {
      newArr = newArr.filter((elem) => {
        return elem.id != idItem;
      });
    }
    localStorage.setItem('comments', JSON.stringify(newArr));
    setComments(newArr);
  }

  function onCommentChange(id: string, text: string) {
    const test = text.replace(/\s/g, '');
    if (test !== '') {
      const index = comments.findIndex((elem) => elem.id === id);
      const newCard = comments[index];
      const before = comments.slice(0, index);
      const after = comments.slice(index + 1);
      newCard.text = text;
      const newArr = [...before, newCard, ...after];
      localStorage.setItem('comments', JSON.stringify(newArr));
      setComments(newArr);
    }
  }

  function onCommentAdd(id: string, text: string) {
    const test = text.replace(/\s/g, '');
    if (test !== '') {
      let commentId = 0;
      let success = false;
      const commentsId: string[] = [];

      for (let i = 0; i < comments.length; i++) {
        commentsId.push(comments[i].id);
      }

      while (!success) {
        if (commentsId.indexOf(`c${commentId}`) !== -1) {
          commentId++;
        } else {
          success = true;
        }
      }

      const comment = {
        id: `c${commentId}`,
        card: id,
        author: user,
        text: text,
      };

      const newArr = [...comments, comment];
      localStorage.setItem('comments', JSON.stringify(newArr));
      setComments(newArr);
    }
  }

  function commentsCount(id: string) {
    let count = 0;
    for (let i = 0; i < comments.length; i++) {
      if (id === comments[i].card) {
        count++;
      }
    }
    return count;
  }

  let UserPopup: JSX.Element;
  if (user == '') {
    UserPopup = <LoginPopup setUserName={getUser} user={user} />;
  } else {
    UserPopup = (
      <div className="login-popup__logged-wrapper">
        <span className="login-popup__logged-str">
          Приветствуем в Trello, {user}
        </span>
      </div>
    );
  }

  let createCardPopup: JSX.Element;
  if (createCardId != '') {
    createCardPopup = <CreateCard createCard={createCard} />;
  } else {
    createCardPopup = <></>;
  }

  let showCardPopup: JSX.Element;
  if (showCardId !== '') {
    const card = cards[cards.findIndex((elem) => elem.id === showCardId)];
    const column =
      columns[columns.findIndex((item) => card.status === item.id)];
    const cardComments: Array<{
      id: string;
      author: string;
      text: string;
      card: string;
    }> = [];

    for (let i = 0; i < comments.length; i++) {
      if (card.id === comments[i].card) {
        cardComments.push(comments[i]);
      }
    }

    showCardPopup = (
      <ShowCardPopup
        id={card.id}
        header={card.header}
        text={card.text}
        author={card.author}
        column={column.header}
        OnDelete={onDelete}
        OnClose={onCloseCardPopup}
        listener={listenerESC}
        addListener={addListener}
        onHeaderChange={changeCardHeader}
        onTextChange={changeCardText}
        cardComments={cardComments}
        onCommentDell={onCommentDell}
        onCommentChange={onCommentChange}
        onCommentAdd={onCommentAdd}
      />
    );
  } else {
    showCardPopup = <></>;
  }
  const columnItems = columns.map((item) => {
    return (
      <li key={item.id} className="app__column-item">
        <Column
          id={item.id}
          cards={cards}
          header={item.header}
          OnDelete={onDelete}
          onCheck={onCheck}
          getHeader={getHeader}
          createCard={getCreateCardPopup}
          onShowPopup={onShowPopup}
          commentsCount={commentsCount}
        />
      </li>
    );
  });
  return (
    <header className="app">
      {showCardPopup}
      {createCardPopup}
      {UserPopup}
      <ul className="app__column-wrapper">{columnItems}</ul>
    </header>
  );
}

export default App;
