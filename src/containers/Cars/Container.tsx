import * as React from 'react';
import { graphql } from 'react-apollo';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Spinner from 'react-bootstrap/Spinner';

import TasksList from '../../components/Task/List/List';
import { CarInfo } from '../../components/Car/info';
import CarDetailsForm from './Form/CarDetailsForm';
import { CAR_ID } from './constants';
import { FETCH_CAR_DETAILS } from './queries';

import { ICars } from './interfaces';

class Cars extends React.PureComponent<ICars> {
  render() {
    const { isLoading, car } = this.props;

    return (
      <Container>
        {
          isLoading ?
            <Spinner animation='grow' /> :
            <CarInfo car={car} />
        }

        <div className='subInfo'>
          <CardDeck>
            <Card>
              <Card.Body>
                <Card.Title>Add more information:</Card.Title>
                <CarDetailsForm carId={CAR_ID} />
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>Tasks:</Card.Title>
                <TasksList carId={CAR_ID} />
              </Card.Body>
            </Card>
          </CardDeck>
        </div>
      </Container>
    );
  }
}

const mapGraphQLToVariables = (props) => {
  const variables = {
    carId: CAR_ID,
  }

  return {
    variables
  };
}

const mapGraphQLToProps = (props) => {
  const data = props!.data!
  const { car, loading } = data;

  return {
    car,
    isLoading: loading
  }
}

export default graphql(FETCH_CAR_DETAILS, {
  options: mapGraphQLToVariables,
  props: mapGraphQLToProps
})(Cars);
