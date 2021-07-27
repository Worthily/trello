import React, { Component } from 'react';
import Column from './components/Column';
import LoginPopup from './components/LoginPopup';
import CreateCard from './components/CreateCard';
import ShowCardPopup from './components/ShowCardPopup';

interface AppProps {
  header?: string;
}
interface AppState {
  columns: Array<{ id: string; header: string }>;
  header?: string;
  user: string;
  cards: Array<{
    id: string;
    header: string;
    text: string;
    checked: boolean;
    author: string;
    status: string;
  }>;
  comments: Array<{
    id: string;
    author: string;
    text: string;
    card: string;
  }>;
  createCardId: string;
  showCardId: string;
  listenerESC: boolean;
}

export default class App extends Component<AppProps, AppState> {
  // eslint-disable-next-line
  constructor(props: any) {
    super(props);
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

    // asd
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
      ];
    }
    // asd

    this.state = {
      user: userLoc,
      cards: cardsLoc,
      comments: commentsLoc,
      columns: columnsLoc,
      createCardId: '',
      showCardId: '',
      listenerESC: false,
    };
    this.onDelete = this.onDelete.bind(this);
    this.getUser = this.getUser.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.getHeader = this.getHeader.bind(this);
    this.createCard = this.createCard.bind(this);
    this.getCreateCardPopup = this.getCreateCardPopup.bind(this);
    this.onShowPopup = this.onShowPopup.bind(this);
    this.onCloseCardPopup = this.onCloseCardPopup.bind(this);
    this.addListener = this.addListener.bind(this);
    this.changeCardHeader = this.changeCardHeader.bind(this);
    this.changeCardText = this.changeCardText.bind(this);
    this.onCommentDell = this.onCommentDell.bind(this);
    this.onCommentChange = this.onCommentChange.bind(this);
    this.commentsCount = this.commentsCount.bind(this);
    this.onCommentAdd = this.onCommentAdd.bind(this);
  }

  onCheck(id: string): void {
    this.setState(({ cards }) => {
      const index = cards.findIndex((elem) => elem.id === id);
      const before = cards.slice(0, index);
      const after = cards.slice(index + 1);
      const changedCard = { ...cards[index], checked: !cards[index].checked };
      const newArr = [...before, changedCard, ...after];
      localStorage.setItem('cards', JSON.stringify(newArr));
      return {
        cards: newArr,
      };
    });
  }
  onDelete(id: string): void {
    this.setState(({ cards }) => {
      const index = cards.findIndex((elem) => elem.id === id);
      const before = cards.slice(0, index);
      const after = cards.slice(index + 1);
      const newArr = [...before, ...after];
      localStorage.setItem('cards', JSON.stringify(newArr));
      return {
        showCardId: '',
        cards: newArr,
      };
    });
  }
  getUser(userName: string): void {
    this.setState(({ user }) => {
      if (userName == user) {
        localStorage.setItem('user', user);
        return {
          user: user,
        };
      } else {
        const userLogin = userName;
        localStorage.setItem('user', userName);
        return {
          user: userLogin,
        };
      }
    });
  }
  getHeader(header: string, id: string): void {
    this.setState(({ columns }) => {
      const index = columns.findIndex((elem) => elem.id === id);
      const before = columns.slice(0, index);
      const after = columns.slice(index + 1);
      const changedCard = {
        ...columns[index],
      };
      changedCard.header = header;
      const newArr = [...before, changedCard, ...after];
      localStorage.setItem('columns', JSON.stringify(newArr));
      return {
        columns: newArr,
      };
    });
  }
  getCreateCardPopup(id: string): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.setState(({ createCardId }) => {
      return {
        createCardId: id,
      };
    });
  }
  createCard(cardHeader: string, cardText: string) {
    this.setState(({ cards }) => {
      const card = {
        id: `w ${cards.length}`,
        header: cardHeader,
        text: cardText,
        checked: false,
        author: this.state.user,
        status: this.state.createCardId,
      };
      const newCards = [...cards, card];
      localStorage.setItem('cards', JSON.stringify(newCards));
      return {
        cards: newCards,
        createCardId: '',
      };
    });
  }
  onShowPopup(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.setState(() => {
      return {
        showCardId: id,
      };
    });
  }
  onCloseCardPopup(): void {
    this.setState(() => {
      return {
        showCardId: '',
      };
    });
  }
  addListener() {
    // eslint-disable-next-line
    this.setState(({ listenerESC }) => {
      return {
        listenerESC: true,
      };
    });
  }
  changeCardHeader(id: string, header: string) {
    const test = header.replace(/\s/g, '');
    if (test !== '') {
      this.setState(({ cards }) => {
        const index = cards.findIndex((elem) => elem.id === id);
        const newCard = cards[index];
        const before = cards.slice(0, index);
        const after = cards.slice(index + 1);
        newCard.header = header;
        const newArr = [...before, newCard, ...after];
        localStorage.setItem('cards', JSON.stringify(newArr));
        return {
          cards: newArr,
        };
      });
    }
  }
  changeCardText(id: string, text: string) {
    const test = text.replace(/\s/g, '');
    if (test !== '') {
      this.setState(({ cards }) => {
        const index = cards.findIndex((elem) => elem.id === id);
        const newCard = cards[index];
        const before = cards.slice(0, index);
        const after = cards.slice(index + 1);
        newCard.text = text;
        const newArr = [...before, newCard, ...after];
        localStorage.setItem('cards', JSON.stringify(newArr));
        return {
          cards: newArr,
        };
      });
    }
  }
  onCommentDell(id: string) {
    this.setState(({ comments }) => {
      const index = comments.findIndex((elem) => elem.id === id);
      const before = comments.slice(0, index);
      const after = comments.slice(index + 1);
      const newArr = [...before, ...after];
      localStorage.setItem('comments', JSON.stringify(newArr));
      return {
        comments: newArr,
      };
    });
  }
  onCommentChange(id: string, text: string) {
    this.setState(({ comments }) => {
      const index = comments.findIndex((elem) => elem.id === id);
      const newCard = comments[index];
      const before = comments.slice(0, index);
      const after = comments.slice(index + 1);
      newCard.text = text;
      const newArr = [...before, newCard, ...after];
      localStorage.setItem('comments', JSON.stringify(newArr));
      return {
        comments: newArr,
      };
    });
  }
  onCommentAdd(id: string, text: string) {
    this.setState(({ comments, user }) => {
      const comment = {
        id: 'c' + comments.length,
        card: id,
        author: user,
        text: text,
      };
      const newArr = [...comments, comment];
      localStorage.setItem('comments', JSON.stringify(newArr));
      return {
        comments: newArr,
      };
    });
  }
  commentsCount(id: string) {
    let count = 0;
    for (let i = 0; i < this.state.comments.length; i++) {
      if (id === this.state.comments[i].card) {
        count++;
      }
    }
    return count;
  }
  render() {
    const {
      cards,
      user,
      columns,
      createCardId,
      showCardId,
      listenerESC,
      comments,
    } = this.state;
    const todoCards = cards.map((item) => {
      if (item.status == 'ToDo') {
        return item;
      }
    });
    const inprogressCards = cards.map((item) => {
      if (item.status == 'InProgress') {
        return item;
      }
    });
    const testingCards = cards.map((item) => {
      if (item.status == 'Testing') {
        return item;
      }
    });
    const doneCards = cards.map((item) => {
      if (item.status == 'Done') {
        return item;
      }
    });
    let UserPopup: JSX.Element;
    if (user == '') {
      UserPopup = <LoginPopup setUserName={this.getUser} user={user} />;
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
      createCardPopup = <CreateCard createCard={this.createCard} />;
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
          OnDelete={this.onDelete}
          OnClose={this.onCloseCardPopup}
          listener={listenerESC}
          addListener={this.addListener}
          headerString=""
          textString=""
          onHeaderChange={this.changeCardHeader}
          onTextChange={this.changeCardText}
          cardComments={cardComments}
          onCommentDell={this.onCommentDell}
          onCommentChange={this.onCommentChange}
          onCommentAdd={this.onCommentAdd}
        />
      );
    } else {
      showCardPopup = <></>;
    }

    return (
      <header className="app">
        {showCardPopup}
        {createCardPopup}
        {UserPopup}
        <div className="app_column-wrapper">
          <Column
            id={columns[0].id}
            cards={todoCards}
            header={columns[0].header}
            OnDelete={this.onDelete}
            onCheck={this.onCheck}
            getHeader={this.getHeader}
            createCard={this.getCreateCardPopup}
            onShowPopup={this.onShowPopup}
            commentsCount={this.commentsCount}
          />
          <Column
            id={columns[1].id}
            cards={inprogressCards}
            header={columns[1].header}
            OnDelete={this.onDelete}
            onCheck={this.onCheck}
            getHeader={this.getHeader}
            createCard={this.getCreateCardPopup}
            onShowPopup={this.onShowPopup}
            commentsCount={this.commentsCount}
          />
          <Column
            id={columns[2].id}
            cards={testingCards}
            header={columns[2].header}
            OnDelete={this.onDelete}
            onCheck={this.onCheck}
            getHeader={this.getHeader}
            createCard={this.getCreateCardPopup}
            onShowPopup={this.onShowPopup}
            commentsCount={this.commentsCount}
          />
          <Column
            id={columns[3].id}
            cards={doneCards}
            header={columns[3].header}
            OnDelete={this.onDelete}
            onCheck={this.onCheck}
            getHeader={this.getHeader}
            createCard={this.getCreateCardPopup}
            onShowPopup={this.onShowPopup}
            commentsCount={this.commentsCount}
          />
        </div>
      </header>
    );
  }
}
