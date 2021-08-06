class StorageServise {
  private userKey: string;
  private cardsKey = 'cards';
  private commentsKey = 'comments';
  private columnsKey = 'columns';

  constructor(
    userKey: string,
    cardsKey: string,
    commentsKey: string,
    columnsKey: string,
  ) {
    this.userKey = userKey;
    this.cardsKey = cardsKey;
    this.commentsKey = commentsKey;
    this.columnsKey = columnsKey;
  }

  getUser() {
    let user: string;
    if (localStorage.getItem(this.userKey) != null) {
      user = localStorage.getItem(this.userKey) as string;
    } else {
      localStorage.setItem(this.userKey, '');
      user = '';
    }
    return user;
  }

  setUser(user: string) {
    localStorage.setItem(this.userKey, user);
  }

  getCards() {
    let cards: Array<{
      id: string;
      header: string;
      text: string;
      checked: boolean;
      author: string;
      status: string;
    }>;
    if (localStorage.getItem(this.cardsKey) != null) {
      const cardsStr = localStorage.getItem(this.cardsKey) as string;
      cards = JSON.parse(cardsStr) as Array<{
        id: string;
        header: string;
        text: string;
        checked: boolean;
        author: string;
        status: string;
      }>;
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

  setCards(
    cards: Array<{
      id: string;
      header: string;
      text: string;
      checked: boolean;
      author: string;
      status: string;
    }>,
  ) {
    localStorage.setItem(this.cardsKey, JSON.stringify(cards));
  }
  getColumns() {
    let columns: Array<{
      id: string;
      header: string;
    }>;

    if (localStorage.getItem(this.columnsKey) != null) {
      const columnsStr = localStorage.getItem(this.columnsKey) as string;
      columns = JSON.parse(columnsStr) as Array<{
        id: string;
        header: string;
      }>;
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

  setColumns(
    columns: Array<{
      id: string;
      header: string;
    }>,
  ) {
    localStorage.setItem(this.columnsKey, JSON.stringify(columns));
  }
  getComments() {
    let comments: Array<{
      id: string;
      author: string;
      text: string;
      card: string;
    }>;

    if (localStorage.getItem('comments') != null) {
      const commentsStr = localStorage.getItem('comments') as string;
      comments = JSON.parse(commentsStr) as Array<{
        id: string;
        author: string;
        text: string;
        card: string;
      }>;
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
      localStorage.setItem('comments', JSON.stringify(comments));
    }
    return comments;
  }
  setComments(
    comments: Array<{
      id: string;
      author: string;
      text: string;
      card: string;
    }>,
  ) {
    localStorage.setItem('comments', JSON.stringify(comments));
  }
}

export default StorageServise;
