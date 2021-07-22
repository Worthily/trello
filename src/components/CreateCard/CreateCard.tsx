import React, { Component } from 'react';

interface CreateCardProps {
  createCard(header: string, text: string): void;
}
interface CreateCardState {
  header: string;
  text: string;
}

export default class CreateCard extends Component<
  CreateCardProps,
  CreateCardState
> {
  // eslint-disable-next-line
  constructor(props: any) {
    super(props);
    this.state = {
      header: '',
      text: '',
    };
    this.onHeaderChange = this.onHeaderChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onHeaderChange(e: React.FormEvent<HTMLInputElement>): void {
    this.setState({
      header: e.currentTarget.value,
    });
  }
  onTextChange(e: React.FormEvent<HTMLTextAreaElement>): void {
    this.setState({
      text: e.currentTarget.value,
    });
  }
  onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (this.state.header !== '' && this.state.text !== '') {
      this.props.createCard(this.state.header, this.state.text);
      this.setState({
        text: '',
        header: '',
      });
    }
  }
  render() {
    return (
      <div className="createcard">
        <div className="createcard__wrapper">
          <h2 className="createcard__header">Создание карточки</h2>
          <form onSubmit={this.onSubmit} className="createcard__form">
            <input
              placeholder="Заголовок"
              onChange={this.onHeaderChange}
              type="text"
              name="inputHeader"
              className="createcard__header-input"
            />
            <textarea
              placeholder="Текст карточки"
              onChange={this.onTextChange}
              name="inputText"
              className="createcard__text-input"></textarea>
            <button type="submit" className="createcard__btn">
              OK
            </button>
          </form>
        </div>
      </div>
    );
  }
}
