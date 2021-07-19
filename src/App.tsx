import React, { Component } from 'react';
import Column from './components/Column';

interface AppState {
  header?: string;
  cards: Array<{
    id: string;
    header: string;
    text: string;
    checked: boolean;
    author: string;
    status: string;
  }>;
}
interface AppProps {
  header?: string;
  cards: Array<{
    id: string;
    header: string;
    text: string;
    checked: boolean;
    author: string;
    status: string;
  }>;
}

export default class App extends Component<AppState, AppProps> {
  // eslint-disable-next-line
  constructor(props: any) {
    super(props);
    this.state = {
      cards: [
        {
          id: 'w2487955',
          header: 'Отчет',
          text: 'Лишь сделанные на базе интернет-аналитики выводы ассоциативно распределены по отраслям. Как принято считать, акционеры крупнейших компаний освещают чрезвычайно интересные особенности картины в целом, однако',
          checked: true,
          author: 'Дмитрий',
          status: 'ToDo',
        },
        {
          id: 'w2487955',
          header: 'Отчет',
          text: 'Лишь сделанные на базе интернет-аналитики выводы ассоциативно распределены по отраслям. Как принято считать, акционеры крупнейших компаний освещают чрезвычайно интересные особенности картины в целом, однако',
          checked: true,
          author: 'Дмитрий',
          status: 'ToDo',
        },
        {
          id: 'w2487955',
          header: 'Отчет',
          text: 'Лишь сделанные на базе интернет-аналитики выводы ассоциативно распределены по отраслям. Как принято считать, акционеры крупнейших компаний освещают чрезвычайно интересные особенности картины в целом, однако',
          checked: true,
          author: 'Дмитрий',
          status: 'Testing',
        },
        {
          id: 'w2487955',
          header: 'Отчет',
          text: 'Лишь сделанные на базе интернет-аналитики выводы ассоциативно распределены по отраслям. Как принято считать, акционеры крупнейших компаний освещают чрезвычайно интересные особенности картины в целом, однако',
          checked: true,
          author: 'Дмитрий',
          status: 'Testing',
        },
        {
          id: 'w2487955',
          header: 'Отчет',
          text: 'Лишь сделанные на базе интернет-аналитики выводы ассоциативно распределены по отраслям. Как принято считать, акционеры крупнейших компаний освещают чрезвычайно интересные особенности картины в целом, однако',
          checked: true,
          author: 'Дмитрий',
          status: 'Testing',
        },
        {
          id: 'w2487955',
          header: 'Отчет',
          text: 'Лишь сделанные на базе интернет-аналитики выводы ассоциативно распределены по отраслям. Как принято считать, акционеры крупнейших компаний освещают чрезвычайно интересные особенности картины в целом, однако',
          checked: true,
          author: 'Дмитрий',
          status: 'Testing',
        },
        {
          id: 'w2487955',
          header: 'Отчет',
          text: 'Лишь сделанные на базе интернет-аналитики выводы ассоциативно распределены по отраслям. Как принято считать, акционеры крупнейших компаний освещают чрезвычайно интересные особенности картины в целом, однако',
          checked: true,
          author: 'Дмитрий',
          status: 'InProgress',
        },
        {
          id: 'w2487955',
          header: 'Отчет',
          text: 'Лишь сделанные на базе интернет-аналитики выводы ассоциативно распределены по отраслям. Как принято считать, акционеры крупнейших компаний освещают чрезвычайно интересные особенности картины в целом, однако',
          checked: true,
          author: 'Дмитрий',
          status: 'InProgress',
        },
        {
          id: 'w2487955',
          header: 'Отчет',
          text: 'Лишь сделанные на базе интернет-аналитики выводы ассоциативно распределены по отраслям. Как принято считать, акционеры крупнейших компаний освещают чрезвычайно интересные особенности картины в целом, однако',
          checked: true,
          author: 'Дмитрий',
          status: 'InProgress',
        },
        {
          id: 'w2487955',
          header: 'Отчет',
          text: 'Лишь сделанные на базе интернет-аналитики выводы ассоциативно распределены по отраслям. Как принято считать, акционеры крупнейших компаний освещают чрезвычайно интересные особенности картины в целом, однако',
          checked: true,
          author: 'Дмитрий',
          status: 'Done',
        },
        {
          id: 'w2487955',
          header: 'Отчет',
          text: 'Лишь сделанные на базе интернет-аналитики выводы ассоциативно распределены по отраслям. Как принято считать, акционеры крупнейших компаний освещают чрезвычайно интересные особенности картины в целом, однако',
          checked: true,
          author: 'Дмитрий',
          status: 'Done',
        },
      ],
    };
    this.onDelete = this.onDelete.bind(this);
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

  render() {
    const { cards } = this.state;
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
    return (
      <header className="app">
        <Column cards={todoCards} header="To Do" OnDelete={this.onDelete} />
        <Column
          cards={inprogressCards}
          header="In progress"
          OnDelete={this.onDelete}
        />
        <Column
          cards={testingCards}
          header="Testing"
          OnDelete={this.onDelete}
        />
        <Column cards={doneCards} header="Done" OnDelete={this.onDelete} />
      </header>
    );
  }
}
