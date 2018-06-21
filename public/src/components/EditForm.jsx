import React from 'react';
import Input from './Input';

function EditForm( {onSubmit, text} ) {
  return (
    <form className="edit-form" onSubmit={onSubmit}>
      <Input className="edit-form_field" inputClass="edit-form_field-input" type="text"  name="task" placeholder='' defaultValue={text}/>
      <button type="submit" className="btn-action material-icons">send</button>
    </form>
  );
}
export default EditForm;
