import * as React from 'react';
import { Query, graphql, compose } from 'react-apollo';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import AddTaskModal from '../Modal/AddTask';
import { FETCH_TASKS } from '../../../containers/Cars/queries';
import { UPDATE_TASK } from '../../../containers/Cars/mutations';
import { ITask, ITaskList } from './interfaces';

import './List.css';

class TasksList extends React.PureComponent<ITaskList> {
  state = {
    show: false,
  }

  render() {
    const { carId, tasks, refetch, loading } = this.props;

    return (
      <div className='taskList'>
        { loading ? <div>Loading tasks...</div> : null }
        { !tasks ? <div>{`No tasks found.`}</div> : (
          <ListGroup variant="flush">
            {
              tasks.map((task: ITask) => (
                <ListGroup.Item key={task.id} className='taskItem'>
                  <label htmlFor={task.id}>
                    <input id={task.id} type='checkbox' className='taskCheckbox' checked={task.completed} onChange={this.handleChange} />
                    {task.comment}
                  </label>
                </ListGroup.Item>
              ))
            }
          </ListGroup>
        )}
        <Button className='addTaskButton' variant='primary' onClick={this.handleShowModal}>+ Add new task</Button>

        <AddTaskModal
          carId={carId}
          show={this.state.show}
          handleClose={this.handleCloseModal}
          refetch={refetch}
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

const mapGraphQLToVariables = (props) => {
  const variables = {
    carId: props.carId,
  }

  return {
    variables
  };
}

const mapGraphQLToProps = (props) => {
  const data = props!.data!
  const { tasks, loading, refetch } = data;

  return {
    tasks,
    loading,
    refetch
  }
}

export default compose(
  graphql(FETCH_TASKS, {
    options: mapGraphQLToVariables,
    props: mapGraphQLToProps
  }),
  graphql(UPDATE_TASK, {
    name: 'updateTask'
  })
)(TasksList);
