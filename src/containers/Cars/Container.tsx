import * as React from 'react';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

import TasksList from '../../components/Task/List';
import CarDetailsForm from './Form/CarDetailsForm';
import { CAR_ID } from './constants';
import { FETCH_CAR_DETAILS } from './queries';
import { DateFormatter } from '../../utils/formatter/DateFormatter';
import { CurrencyFormatter } from '../../utils/formatter/CurrencyFormatter';
import { PercentageFormatter } from '../../utils/formatter/PercentageFormatter';

interface ICars {

}

class Cars extends React.PureComponent {
  render() {
    return (
      <Container>
        <Query query={FETCH_CAR_DETAILS} variables={{ carId: CAR_ID }}>
          {
            ({ data, loading }) => {
              if (loading) {
                return <Spinner animation="grow" />;
              }

              const { car } = data;
              const {
                purchasePrice,
                purchaseDate,
                purchaseLocation,
                paymentDonePercentage,
                sellingDate,
                sellingPrice,
                sellingLocation,
                sellingDonePercentage
              } = car.financialDetails;

              return (
                <div className='mainCarInfo'>
                  <CardDeck>
                    <Card>
                      <Card.Body>
                        <h4>{`${car.make} ${car.model} ${car.trim}`}</h4>
                        <Card.Title>Financial Information</Card.Title>
                        <Card.Subtitle className='mb-2 text-muted'>Purchased</Card.Subtitle>
                        <Card.Text>
                          <b>{ `${CurrencyFormatter(purchasePrice, '$')}` }</b> { `(${DateFormatter(purchaseDate)}, ${purchaseLocation})` }
                          <br/>
                          <small>{ PercentageFormatter(paymentDonePercentage) } payments to buyer done</small>
                        </Card.Text>
                        <Card.Subtitle className='mb-2 text-muted'>Sold</Card.Subtitle>
                        <Card.Text>
                          <b>{ `${CurrencyFormatter(sellingPrice, '$')}` }</b> { `(${DateFormatter(sellingDate)}, ${sellingLocation})` }
                          <br/>
                          <small>{ PercentageFormatter(sellingDonePercentage) } payments from seller done</small>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <Card>
                      <Card.Body>
                        <Card.Title>Status</Card.Title>
                        <Card.Subtitle className='mb-2 text-muted'>Physical Status:</Card.Subtitle>
                        <Form.Group>
                          <Form.Control as="select">
                            <option>At buyer</option>
                          </Form.Control>
                        </Form.Group>
                        <Card.Subtitle className='mb-2 text-muted'>Legal Status:</Card.Subtitle>
                        <Form.Group>
                          <Form.Control as="select">
                            <option>Buyer</option>
                          </Form.Control>
                        </Form.Group>
                        <Card.Subtitle className='mb-2 text-muted'>Seller Status:</Card.Subtitle>
                        <Form.Group>
                          <Form.Control as="select" className='spaceBottom'>
                            <option>Sold</option>
                          </Form.Control>
                        </Form.Group>
                        <br/>
                      </Card.Body>
                    </Card>
                  </CardDeck>
                </div>
              );
            }
          }
        </Query>
        <div className='subInfo'>
          <CardDeck>
            <Card>
              <Card.Body>
                <Card.Title>Add more information:</Card.Title>
                <CarDetailsForm />
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

export default connect(null, null)(Cars);
