import React, { Component } from 'react';
import Card from '../Card';
import Addcardbtn from '../../ui/Add-new-card-btn';
import changeImg from '../../assets/img/change.png';

interface ColumnProps {
  // eslint-disable-next-line
  cards: any[];
  id: string;
  header: string;
  OnDelete(id: string): void;
  onCheck(id: string): void;
  getHeader(header: string, id: string): void;
  createCard(id: string): void;
}
interface ColumnState {
  header: string;
  changeing: boolean;
}

export default class Column extends Component<ColumnProps, ColumnState> {
  // eslint-disable-next-line
  constructor(props: any) {
    super(props);
    this.state = {
      changeing: false,
      header: this.props.header,
    };
    this.onChangeBtnClick = this.onChangeBtnClick.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeBtnClick(): void {
    this.setState(({ changeing }) => {
      return {
        changeing: !changeing,
      };
    });
  }

  onValueChange(e: React.FormEvent<HTMLInputElement>): void {
    console.log('123');
    this.setState({
      header: e.currentTarget.value,
    });
  }

  onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (this.state.header !== '') {
      this.props.getHeader(this.state.header, this.props.id);
      this.setState({
        changeing: false,
      });
    }
  }

  render() {
    const { cards, OnDelete, onCheck, createCard, id } = this.props;
    let heading = (
      <div className="column__header-wrapper">
        <h2 className="column__header">{this.props.header}</h2>
        <div
          onClick={this.onChangeBtnClick}
          className="column__header-change-btn">
          <img src={changeImg} alt="change" />
        </div>
      </div>
    );
    if (this.state.changeing) {
      heading = (
        <div className="column__header-wrapper">
          <form onSubmit={this.onSubmit} className="column__form">
            <input
              onChange={this.onValueChange}
              className="column__input"
              type="text"
              name=""
            />
            <button className="column__submit-btn">OK</button>
          </form>
        </div>
      );
    }
    const elements = cards.map((item) => {
      if (item) {
        return (
          <li key={item.id} className="column__card-item">
            <Card
              header={item.header}
              text={item.text}
              checked={item.checked}
              author={item.author}
              OnDelete={() => OnDelete(item.id)}
              onCheck={() => onCheck(item.id)}
            />
          </li>
        );
      }
    });
    return (
      <div className="column">
        {heading}
        <ul className="column__card-wrapper">{elements}</ul>
        <Addcardbtn createCard={() => createCard(id)} />
      </div>
    );
  }
}
