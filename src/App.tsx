import React, { useState } from 'react';
import Column from './components/Column';
import LoginPopup from './components/LoginPopup';
import CreateCard from './components/CreateCard';
import ShowCardPopup from './components/ShowCardPopup';
import StorageServise from './store/StorageServise';
import { cards, comments, user } from './types';

function App() {
  const appStorage = new StorageServise();
  const [user, setUser] = useState(appStorage.getUser());
  const [cards, setCards] = useState(appStorage.getCards());
  const [comments, setComments] = useState(appStorage.getComments());
  const [columns, setColumns] = useState(appStorage.getColumns());
  const [createCardId, setCreateCardId] = useState('');
  const [showCardId, setShowCardId] = useState('');
  const [listenerESC, setListenerESC] = useState(false);

  function onCradChecked(id: string): void {
    const newArr = cards.map((item) => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    appStorage.setCards(newArr);
    setCards(newArr);
  }

  function onCardDelete(id: string): void {
    let newArr: cards[] = cards.filter((elem) => {
      return elem.id != id;
    });
    appStorage.setCards(newArr);
    setCards(newArr);

    setShowCardId('');

    const commentsId: string[] = [];
    for (const item of comments) {
      if (item.card == id) {
        commentsId.push(item.id);
      }
    }

    onDeleteComments(commentsId);
  }

  function getUser(userName: user): void {
    if (userName !== user) {
      appStorage.setUser(userName);
      setUser(userName);
    }
  }

  function changeColumnTitle(id: string, newTitle: string): void {
    if (newTitle.trim()) {
      const newArr = columns.map((item) => {
        if (item.id === id) {
          return { ...item, header: newTitle };
        }
        return item;
      });
      appStorage.setColumns(newArr);
      setColumns(newArr);
    }
  }

  function showCreateCardPopup(id: string): void {
    setCreateCardId(id);
  }

  function createCard(cardHeader: string, cardText: string) {
    if (cardHeader.trim() && cardText.trim()) {
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

  function onShowCardPopup(id: string): void {
    setShowCardId(id);
  }

  function onCloseCardPopup(): void {
    setShowCardId('');
  }

  function addListener(): void {
    setListenerESC(true);
  }

  function changeCardHeader(id: string, header: string) {
    if (header.trim()) {
      const newArr = cards.map((item) => {
        if (item.id === id) {
          return { ...item, header };
        }
        return item;
      });
      appStorage.setCards(newArr);
      setCards(newArr);
    }
  }

  function changeCardText(id: string, text: string) {
    if (text.trim()) {
      const newArr = cards.map((item) => {
        if (item.id === id) {
          return { ...item, text };
        }
        return item;
      });
      appStorage.setCards(newArr);
      setCards(newArr);
    }
  }

  const onDeleteComments = (ids: string[]) => {
    const filteredComments = comments.filter((comment) => {
      return !ids.includes(comment.id);
    });
    appStorage.setComments(filteredComments);
    setComments(filteredComments);
  };

  function onCommentChange(id: string, text: string) {
    if (text.trim()) {
      const newArr = comments.map((item) => {
        if (item.id === id) {
          return { ...item, text };
        }
        return item;
      });
      appStorage.setComments(newArr);
      setComments(newArr);
    }
  }

  function onCommentAdd(id: string, text: string) {
    if (text.trim()) {
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

  const UserLable = (
    <div className="login-popup__logged-wrapper">
      <span className="login-popup__logged-str">
        Приветствуем в Trello, {user}
      </span>
    </div>
  );

  let createCardPopup: JSX.Element;
  if (createCardId != '') {
    createCardPopup = <CreateCard createCard={createCard} />;
  } else {
    createCardPopup = <></>;
  }

  let showCardPopup: JSX.Element = <></>;
  if (showCardId !== '') {
    const card = cards.find((elem) => elem.id === showCardId);
    if (card != undefined) {
      const column = columns.find((item) => card.status === item.id);
      if (column != undefined) {
        const cardComments: comments[] = [];

        for (let i = 0; i < comments.length; i++) {
          if (card.id === comments[i].card) {
            cardComments.push(comments[i]);
          }
        }

        showCardPopup = (
          <ShowCardPopup
            card={card}
            column={column.header}
            OnDelete={onCardDelete}
            OnClose={onCloseCardPopup}
            listener={listenerESC}
            addListener={addListener}
            onHeaderChange={changeCardHeader}
            onTextChange={changeCardText}
            cardComments={cardComments}
            onCommentDell={onDeleteComments}
            onCommentChange={onCommentChange}
            onCommentAdd={onCommentAdd}
          />
        );
      }
    }
  } else {
    showCardPopup = <></>;
  }

  const columnItems = columns.map((item) => {
    return (
      <li key={item.id} className="app__column-item">
        <Column
          column={item}
          cards={cards}
          OnDelete={onCardDelete}
          onCheck={onCradChecked}
          getHeader={changeColumnTitle}
          createCard={showCreateCardPopup}
          onShowPopup={onShowCardPopup}
          commentsCount={commentsCount}
        />
      </li>
    );
  });

  return (
    <header className="app">
      {showCardPopup}
      {createCardPopup}
      {user == '' ? (
        <LoginPopup setUserName={getUser} user={user} />
      ) : (
        <div className="login-popup__logged-wrapper">
          <span className="login-popup__logged-str">
            Приветствуем в Trello, {user}
          </span>
        </div>
      )}
      <ul className="app__column-wrapper">{columnItems}</ul>
    </header>
  );
}

export default App;
