import React from 'react';
import EditForm from './EditForm';

export default class TaskList extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props)

  return (
    <div className="task-wrapper">
      <ul className="task-field">
        {this.props.tasks.map(task => task.edit ? <li key={task.id} className={"task-item"} id={task.id}> <time>{task.date}</time> <EditForm onSubmit={this.props.onEdit} text={task.value }/> </li> : 
          <li key={task.id} className={task.completed ? "task-item task-item_completed" : "task-item"} id={task.id}>
            <time>{task.date}</time>
            {task.completed ? <p className="task"><del>{task.value}</del></p> : <p className="task">{task.value}</p>}
            <button type="button" className="material-icons btn-action" onClick={this.props.handleDone}>{task.completed ? 'done_all' : 'done' }</button>
            <button type="button" className="material-icons btn-action" onClick={this.props.handleEdit}>create</button>
            <button type="button" className="material-icons btn-action" onClick={this.props.handleDelete}>delete_sweep</button>
          </li>
        )}
      </ul>
    </div>
  )}
}
