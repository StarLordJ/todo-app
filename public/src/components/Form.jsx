import React from 'react';
import Input from './Input';

function Form( {onSubmit} ) {
  return (
    <form className="signup-form" onSubmit={onSubmit}>
      <Input className="mdc-text-field" inputClass="mdc-text-field__input" type="text" name="task" placeholder="Что бы сделать?"/>
      <button type="submit" className="button">Добавить</button>
    </form>
  );
}
export default Form;
