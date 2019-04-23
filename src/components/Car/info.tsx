import * as React from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Form from 'react-bootstrap/Form';

import { ICar } from '../../containers/Cars/interfaces';
import { DateFormatter } from '../../utils/formatter/DateFormatter';
import { CurrencyFormatter } from '../../utils/formatter/CurrencyFormatter';
import { PercentageFormatter } from '../../utils/formatter/PercentageFormatter';

interface ICarInfo {
  car: ICar;
}

export class CarInfo extends React.PureComponent<ICarInfo> {
  render() {
    const { car } = this.props;
    const {
      purchasePrice,
      purchaseDate,
      purchaseLocation,
      paymentDonePercentage,
      sellingDate,
      sellingPrice,
      sellingLocation,
      sellingDonePercentage,
    } = car.financialDetails

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