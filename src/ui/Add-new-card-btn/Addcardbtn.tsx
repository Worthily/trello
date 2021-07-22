import React, { Component } from 'react';

interface AddcardbtnProps {
  createCard(): void;
}

export default class Addcardbtn extends Component<AddcardbtnProps> {
  // eslint-disable-next-line
  constructor(props: any) {
    super(props);
  }
  render() {
    const { createCard } = this.props;
    return (
      <div onClick={createCard} className="column__add-card-btn">
        Добавить новую карточку...
      </div>
    );
  }
}
