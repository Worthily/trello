import React, { Component } from 'react';

interface LoginProps {
  user: string;
  setUserName(user: string): void;
}
interface LoginState {
  user: string;
  setUserName(user: string): void;
}

export default class LoginPopup extends Component<LoginProps, LoginState> {
  // eslint-disable-next-line
  constructor(props: any) {
    super(props);
    this.state = {
      user: props.user,
      setUserName: props.setUserName,
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onValueChange(e: React.FormEvent<HTMLInputElement>): void {
    console.log('изменелас');
    this.setState({
      user: e.currentTarget.value,
    });
  }
  onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (this.state.user !== '') {
      console.log('передалос');
      this.props.setUserName(this.state.user);
      this.setState({
        user: '',
      });
    }
  }

  render() {
    return (
      <div className="login-popup">
        <div className="login-popup__wrapper">
          <p className="login-popup__header">Введите имя пользователя</p>
          <form className="login-popup__form" onSubmit={this.onSubmit}>
            <input
              className="login-popup__input"
              onChange={this.onValueChange}
              type="text"
              name="userNameInput"
            />
            <button className="login-popup__btn">OK</button>
          </form>
        </div>
      </div>
    );
  }
}
