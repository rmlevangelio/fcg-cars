import * as React from 'react';
import { graphql } from 'react-apollo';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

import TasksList from '../../components/Task/List/List';
import AddTaskModal from '../../components/Task/Modal/AddTask';
import CarDetailsForm from './Form/CarDetailsForm';
import { Loader } from '../../components/Loader/Loader';
import { CarInfo } from '../../components/Car/info';
import { CAR_ID } from './constants';
import { INITIAL_FETCH } from './queries';
import { ICars } from './interfaces';

import './Container.css';

class Cars extends React.PureComponent<ICars> {
  state = {
    showModal: false 
  }

  render() {
    const { loading, car, refetch, tasks, makeOptions } = this.props;

    return (
      <Container>
        {
          loading ?
          <Loader loadingText='Fetching car information...' /> : (
            <div>
              <CarInfo car={car} />
              <div className='subInfo'>
                <CardDeck>
                  <Card>
                    <Card.Body>
                      <Card.Title>Add more information:</Card.Title>
                      <CarDetailsForm carId={CAR_ID} makeOptions={makeOptions} refetch={refetch} />
                    </Card.Body>
                  </Card>
                  <Card>
                    <Card.Body>
                      <Card.Title>Tasks:</Card.Title>
                      <TasksList tasks={tasks} showModal={this.handleShowModal} refetch={refetch} />
                    </Card.Body>
                  </Card>
                </CardDeck>
              </div>
            </div>
          )
        }
        <AddTaskModal
          carId={CAR_ID}
          show={this.state.showModal}
          handleClose={this.handleCloseModal}
          refetch={refetch}
        />
      </Container>
    );
  }

  handleShowModal = () => {
    this.setState({ showModal: true });
  }

  handleCloseModal = () => {
    this.setState({ showModal: false });
  }
}

const mapQueriesToVariables = (props) => {
  const variables = {
    carId: CAR_ID,
  }

  return {
    variables
  };
}

const mapQueriesToProps = (props) => {
  const data = props!.data!
  const { car, loading, refetch, tasks, make } = data;

  return {
    car,
    refetch,
    loading,
    tasks,
    makeOptions: make
  }
}

export default graphql(INITIAL_FETCH, {
  options: mapQueriesToVariables,
  props: mapQueriesToProps
})(Cars);
