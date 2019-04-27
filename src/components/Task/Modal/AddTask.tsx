import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { graphql, compose } from 'react-apollo';

import { CREATE_TASK } from '../../../containers/Cars/mutations';
import { FETCH_TASKS } from '../../../containers/Cars/queries';
import { AddTaskPropsWithForm } from './interfaces';

class AddTaskModal extends React.PureComponent<AddTaskPropsWithForm> {
  render() {
    const { handleClose, show, handleSubmit } = this.props;
    return (
      <Modal show={show} onHide={handleClose}>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Add new task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Type:</Form.Label>
              <Field
                name='taskType'
                component='select'
                className='form-control'
              >
                <option value=''>Please select task type</option>
                <option value='ADD_DOCUMENT'>Add Document</option>
                <option value='WASH_CAR'>Wash Car</option>
                <option value='ADD_PAYMENT_DETAILS'>Add Payment Details</option>
              </Field>
            </Form.Group>
            <Form.Group>
              <Form.Label>Comment:</Form.Label>
              <Field name='taskComment' component='textarea' rows='3' className='form-control'/>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button type='submit' variant='primary' onClick={handleClose}>
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }

  onSubmit = (values) => {
    return this.props.createTask({
      variables: {
        carId: this.props.carId,
        task: {
          taskType: values.taskType,
          comment: values.taskComment
        }
      }
    }).then(({ data }) => {
      this.props.refetch();
    }).catch((error) => {
      console.log(error);
    });
  }
}

const mapQueriesToVariables = (props) => {
  const variables = {
    carId: props.carId,
  }

  return {
    variables
  };
}

const mapQueriesToProps = (props) => {
  const data = props!.data!
  const { refetch } = data;

  return {
    refetch,
  }
}

export default compose(
  graphql(FETCH_TASKS, {
    options: mapQueriesToVariables,
    props: mapQueriesToProps
  }),
  graphql(CREATE_TASK, { name: 'createTask' }),
  reduxForm({
    form: 'addTaskForm'
  })
)(AddTaskModal);
