import { cards, columns, comments, user } from '../types';

class StorageServise {
  private userKey = 'user';
  private cardsKey = 'cards';
  private commentsKey = 'comments';
  private columnsKey = 'columns';

  getUser() {
    let user: user;
    if (localStorage.getItem(this.userKey) != null) {
      user = localStorage.getItem(this.userKey) as user;
    } else {
      localStorage.setItem(this.userKey, '');
      user = '';
    }
    return user;
  }

  setUser(user: user) {
    localStorage.setItem(this.userKey, user);
  }

  getCards() {
    let cards: cards;
    if (localStorage.getItem(this.cardsKey) != null) {
      const cardsStr = localStorage.getItem(this.cardsKey) as user;
      cards = JSON.parse(cardsStr) as cards;
    } else {
      cards = [
        {
          id: 'w1',
          header: 'Отчет',
          text: 'Лишь сделанные на базе интернет-аналитики выводы ассоциативно распределены по отраслям. Как принято считать, акционеры крупнейших компаний освещают чрезвычайно интересные особенности картины в целом, однако',
          checked: false,
          author: 'Дмитрий',
          status: 'ToDo',
        },
      ];
      localStorage.setItem(this.cardsKey, JSON.stringify(cards));
    }
    return cards;
  }

  setCards(cards: cards) {
    localStorage.setItem(this.cardsKey, JSON.stringify(cards));
  }

  getColumns() {
    let columns: columns;

    if (localStorage.getItem(this.columnsKey) != null) {
      const columnsStr = localStorage.getItem(this.columnsKey) as string;
      columns = JSON.parse(columnsStr) as columns;
    } else {
      columns = [
        { id: 'ToDo', header: 'To Do' },
        { id: 'InProgress', header: 'In progress' },
        { id: 'Testing', header: 'Testing' },
        { id: 'Done', header: 'Done' },
      ];
      localStorage.setItem(this.columnsKey, JSON.stringify(columns));
    }
    return columns;
  }

  setColumns(columns: columns) {
    localStorage.setItem(this.columnsKey, JSON.stringify(columns));
  }

  getComments() {
    let comments: comments;

    if (localStorage.getItem(this.commentsKey) != null) {
      const commentsStr = localStorage.getItem(this.commentsKey) as string;
      comments = JSON.parse(commentsStr) as comments;
    } else {
      comments = [
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
      localStorage.setItem(this.commentsKey, JSON.stringify(comments));
    }
    return comments;
  }

  setComments(comments: comments) {
    localStorage.setItem(this.commentsKey, JSON.stringify(comments));
  }
}

export default StorageServise;
