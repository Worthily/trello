import React, { useState } from 'react';
import Column from './components/Column';
import LoginPopup from './components/LoginPopup';
import CreateCard from './components/CreateCard';
import ShowCardPopup from './components/ShowCardPopup';
import StorageServise from './store/StorageServise';

function App() {
  const appStorage = new StorageServise('user', 'cards', 'comments', 'columns');
  const [user, setUser] = useState(appStorage.getUser());
  const [cards, setCards] = useState(appStorage.getCards());
  const [comments, setComments] = useState(appStorage.getComments);
  const [columns, setColumns] = useState(appStorage.getColumns());
  const [createCardId, setCreateCardId] = useState('');
  const [showCardId, setShowCardId] = useState('');
  const [listenerESC, setListenerESC] = useState(false);

  function onCheck(id: string): void {
    const index = cards.findIndex((elem) => elem.id === id);
    const before = cards.slice(0, index);
    const after = cards.slice(index + 1);
    const changedCard = { ...cards[index], checked: !cards[index].checked };
    const newArr = [...before, changedCard, ...after];
    appStorage.setCards(newArr);
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
    appStorage.setCards(newArr);
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
      appStorage.setUser(userName);
      setUser(userName);
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
      appStorage.setColumns(newArr);
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
      appStorage.setCards(newCards);
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
      appStorage.setCards(newArr);
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
      appStorage.setCards(newArr);
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
    appStorage.setComments(newArr);
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
      appStorage.setComments(newArr);
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
      appStorage.setComments(newArr);
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
