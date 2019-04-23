import * as React from 'react';
import { Query } from 'react-apollo';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import AddTaskModal from './Modal/AddTask';
import { FETCH_TASKS } from '../../containers/Cars/queries';
import { ITask, ITaskList } from './interfaces';

import './List.css';

class TasksList extends React.PureComponent<ITaskList> {
  state = {
    show: false,
  }

  render() {
    const { carId } = this.props;
    return (
      <div className='taskList'>
        <Query query={FETCH_TASKS} variables={{ carId }}>
          {
            ({ data, loading }) => {
              if (loading) {
                return <div>Loading tasks...</div>;
              }
    
              if (data.tasks.length === 0) {
                return <div>{`No tasks found.`}</div>;
              }

              return (
                <ListGroup variant="flush">
                  {
                    data.tasks.map((task: ITask) => (
                      <ListGroup.Item key={task.id}>
                        <span>{task.comment}</span>
                        <input id={task.id} type='checkbox' checked={task.completed} onChange={this.handleChange} />
                      </ListGroup.Item>
                    ))
                  }
                </ListGroup>
              );
            }
          }
        </Query>
        <Button className='addTaskButton' variant='primary' onClick={this.handleShowModal}>+ Add new task</Button>

        <AddTaskModal
          carId={carId}
          show={this.state.show}
          handleClose={this.handleCloseModal}
        />
      </div>
    );
  }

  handleShowModal = () => {
    this.setState({ show: true });
  }

  handleCloseModal = () => {
    this.setState({ show: false });
  }

  handleChange = (e) => {
    // const { , toggleTask } = this.props;
    // const selectedTask = tasks.find((task: ITask) => task.id === e.target.id);

    // toggleTask(selectedTask);
  }
}

export default TasksList;
