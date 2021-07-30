import React, { useState } from 'react';

// interface LoginProps {
//   user: string;
//   setUserName(user: string): void;
// }
// interface LoginState {
//   user: string;
// }
// eslint-disable-next-line
function LoginPopup(props: any) {
  const [user, setUser] = useState('');
  // constructor(props: any) {
  //   super(props);
  //   this.state = {
  //     user: props.user,
  //   };
  //   this.onValueChange = this.onValueChange.bind(this);
  //   this.onSubmit = this.onSubmit.bind(this);
  // }

  function onValueChange(e: React.FormEvent<HTMLInputElement>): void {
    setUser(e.currentTarget.value);
  }
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // if (this.state.user !== '') {
    //   this.props.setUserName(this.state.user);
    //   this.setState({
    //     user: '',
    //   });
    // }
    if (user !== '') {
      props.setUserName(user);
      setUser('');
    }
  }

  return (
    <div className="login-popup">
      <div className="login-popup__wrapper">
        <p className="login-popup__header">Введите имя пользователя</p>
        <form className="login-popup__form" onSubmit={onSubmit}>
          <input
            className="login-popup__input"
            onChange={onValueChange}
            type="text"
            name="userNameInput"
          />
          <button className="login-popup__btn">OK</button>
        </form>
      </div>
    </div>
  );
}
export default LoginPopup;
