import * as React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface IAddTaskModal {
  show: boolean;
  carId: string;
  handleClose: () => void;
}

export class AddTaskModal extends React.PureComponent<IAddTaskModal> {
  render() {
    const { handleClose, show } = this.props;
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <Form>
            <Form.Group>
              <Form.Label>Type:</Form.Label>
              <Form.Control as='select' name='taskType'>
                <option value='none'>Please select task type</option>
                <option value='addDocument'>Add Document</option>
                <option value='washCar'>Wash Car</option>
                <option value='addPaymentDetails'>Add Payment Details</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Comment:</Form.Label>
              <Form.Control as='textarea' rows='3' name='taskComment'/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
