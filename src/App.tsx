import React, { Component } from 'react';
import Column from './components/Column';
import LoginPopup from './components/LoginPopup';
import CreateCard from './components/CreateCard';

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
  createCardId: string;
}

export default class App extends Component<AppProps, AppState> {
  // eslint-disable-next-line
  constructor(props: any) {
    super(props);
    this.state = {
      user: '',
      cards: [
        {
          id: 'w1',
          header: 'Отчет',
          text: 'Лишь сделанные на базе интернет-аналитики выводы ассоциативно распределены по отраслям. Как принято считать, акционеры крупнейших компаний освещают чрезвычайно интересные особенности картины в целом, однако',
          checked: false,
          author: 'Дмитрий',
          status: 'ToDo',
        },
        {
          id: 'w2',
          header: 'Отчет',
          text: 'Лишь сделанные на базе интернет-аналитики выводы ассоциативно распределены по отраслям. Как принято считать, акционеры крупнейших компаний освещают чрезвычайно интересные особенности картины в целом, однако',
          checked: false,
          author: 'Дмитрий',
          status: 'ToDo',
        },
        {
          id: 'w3',
          header: 'Отчет',
          text: 'Лишь сделанные на базе интернет-аналитики выводы ассоциативно распределены по отраслям. Как принято считать, акционеры крупнейших компаний освещают чрезвычайно интересные особенности картины в целом, однако',
          checked: false,
          author: 'Дмитрий',
          status: 'ToDo',
        },
        {
          id: 'w4',
          header: 'Отчет',
          text: 'Лишь сделанные на базе интернет-аналитики выводы ассоциативно распределены по отраслям. Как принято считать, акционеры крупнейших компаний освещают чрезвычайно интересные особенности картины в целом, однако',
          checked: false,
          author: 'Дмитрий',
          status: 'Testing',
        },
        {
          id: 'w5',
          header: 'Отчет',
          text: 'Лишь сделанные на базе интернет-аналитики выводы ассоциативно распределены по отраслям. Как принято считать, акционеры крупнейших компаний освещают чрезвычайно интересные особенности картины в целом, однако',
          checked: false,
          author: 'Дмитрий',
          status: 'Testing',
        },
        {
          id: 'w6',
          header: 'Отчет',
          text: 'Лишь сделанные на базе интернет-аналитики выводы ассоциативно распределены по отраслям. Как принято считать, акционеры крупнейших компаний освещают чрезвычайно интересные особенности картины в целом, однако',
          checked: false,
          author: 'Дмитрий',
          status: 'Testing',
        },
        {
          id: 'w7',
          header: 'Отчет',
          text: 'Лишь сделанные на базе интернет-аналитики выводы ассоциативно распределены по отраслям. Как принято считать, акционеры крупнейших компаний освещают чрезвычайно интересные особенности картины в целом, однако',
          checked: false,
          author: 'Дмитрий',
          status: 'InProgress',
        },
        {
          id: 'w8',
          header: 'Отчет',
          text: 'Лишь сделанные на базе интернет-аналитики выводы ассоциативно распределены по отраслям. Как принято считать, акционеры крупнейших компаний освещают чрезвычайно интересные особенности картины в целом, однако',
          checked: false,
          author: 'Дмитрий',
          status: 'InProgress',
        },
        {
          id: 'w9',
          header: 'Отчет',
          text: 'Лишь сделанные на базе интернет-аналитики выводы ассоциативно распределены по отраслям. Как принято считать, акционеры крупнейших компаний освещают чрезвычайно интересные особенности картины в целом, однако',
          checked: false,
          author: 'Дмитрий',
          status: 'InProgress',
        },
        {
          id: 'w10',
          header: 'Отчет',
          text: 'Лишь сделанные на базе интернет-аналитики выводы ассоциативно распределены по отраслям. Как принято считать, акционеры крупнейших компаний освещают чрезвычайно интересные особенности картины в целом, однако',
          checked: false,
          author: 'Дмитрий',
          status: 'Done',
        },
        {
          id: 'w11',
          header: 'Отчет',
          text: 'Лишь сделанные на базе интернет-аналитики выводы ассоциативно распределены по отраслям. Как принято считать, акционеры крупнейших компаний освещают чрезвычайно интересные особенности картины в целом, однако',
          checked: false,
          author: 'Дмитрий',
          status: 'Done',
        },
      ],
      columns: [
        { id: 'ToDo', header: 'To Do' },
        { id: 'InProgress', header: 'In progress' },
        { id: 'Testing', header: 'Testing' },
        { id: 'Done', header: 'Done' },
      ],
      createCardId: '',
    };
    this.onDelete = this.onDelete.bind(this);
    this.getUser = this.getUser.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.getHeader = this.getHeader.bind(this);
    this.createCard = this.createCard.bind(this);
    this.getCreateCardPopup = this.getCreateCardPopup.bind(this);
  }

  onCheck(id: string): void {
    this.setState(({ cards }) => {
      const index = cards.findIndex((elem) => elem.id === id);
      const before = cards.slice(0, index);
      const after = cards.slice(index + 1);
      const changedCard = { ...cards[index], checked: !cards[index].checked };
      const newArr = [...before, changedCard, ...after];
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
      return {
        cards: newArr,
      };
    });
  }

  getUser(userName: string): void {
    this.setState(({ user }) => {
      if (userName == user) {
        return {
          user: user,
        };
      } else {
        const userLogin = userName;
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
      return {
        cards: newCards,
        createCardId: '',
      };
    });
  }

  render() {
    const { cards, user, columns, createCardId } = this.state;
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

    return (
      <header className="app">
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
          />
          <Column
            id={columns[1].id}
            cards={inprogressCards}
            header={columns[1].header}
            OnDelete={this.onDelete}
            onCheck={this.onCheck}
            getHeader={this.getHeader}
            createCard={this.getCreateCardPopup}
          />
          <Column
            id={columns[2].id}
            cards={testingCards}
            header={columns[2].header}
            OnDelete={this.onDelete}
            onCheck={this.onCheck}
            getHeader={this.getHeader}
            createCard={this.getCreateCardPopup}
          />
          <Column
            id={columns[3].id}
            cards={doneCards}
            header={columns[3].header}
            OnDelete={this.onDelete}
            onCheck={this.onCheck}
            getHeader={this.getHeader}
            createCard={this.getCreateCardPopup}
          />
        </div>
      </header>
    );
  }
}
