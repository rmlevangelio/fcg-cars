import * as React from 'react';
import { graphql, DataProps, MutateProps } from 'react-apollo';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import { UPDATE_TASK } from '../../../containers/Cars/mutations';
import { ITask, ITaskList } from './interfaces';

import './List.css';

class TasksList extends React.PureComponent<ITaskList> {
  render() {
    const { tasks } = this.props;

    return (
      <div className='taskList'>
        { tasks.length === 0 ?
          <div>{`No tasks found.`}</div> : (
          <ListGroup variant='flush'>
            {
              tasks.map((task: ITask) => (
                <ListGroup.Item key={task.id} className='taskItem'>
                  <label htmlFor={task.id}>
                    <input id={task.id} type='checkbox' className='taskCheckbox' checked={task.completed} onChange={this.handleChange} />
                    { task.completed ? <del>{ task.comment }</del> : task.comment }
                  </label>
                </ListGroup.Item>
              ))
            }
          </ListGroup>
        )}
        <Button className='addTaskButton' variant='primary' onClick={this.handleShowModal}>+ Add new task</Button>
      </div>
    );
  }

  handleShowModal = (e) => {
    return this.props.showModal();
  }

  handleChange = (e) => {
    const { tasks } = this.props;
    const selectedTask = tasks.find((task: ITask) => task.id === e.target.id);
    
    return selectedTask ? this.props.updateTask({
      variables: {
        taskId: selectedTask.id,
        completed: !selectedTask.completed
      }
    }).then(({ data }) => {
      this.props.refetch();
    }).catch((error) => {
      console.log(error);
    }) : null;
  }
}

export default graphql<any, any>(UPDATE_TASK, {
  name: 'updateTask'
})(TasksList);
