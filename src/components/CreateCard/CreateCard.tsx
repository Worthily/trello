import React, { useState } from 'react';

// eslint-disable-next-line
function CreateCard(props: any) {
  const [header, setHeader] = useState('');
  const [text, setText] = useState('');

  function onHeaderChange(e: React.FormEvent<HTMLInputElement>): void {
    setHeader(e.currentTarget.value);
  }
  function onTextChange(e: React.FormEvent<HTMLTextAreaElement>): void {
    setText(e.currentTarget.value);
  }
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (header !== '' && text !== '') {
      props.createCard(header, text);
      setHeader('');
      setText('');
    }
  }
  return (
    <div className="createcard">
      <div className="createcard__wrapper">
        <h2 className="createcard__header">Создание карточки</h2>
        <form onSubmit={onSubmit} className="createcard__form">
          <input
            placeholder="Заголовок"
            onChange={onHeaderChange}
            type="text"
            name="inputHeader"
            className="createcard__header-input"
          />
          <textarea
            placeholder="Текст карточки"
            onChange={onTextChange}
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

export default CreateCard;
