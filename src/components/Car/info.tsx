import * as React from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Form from 'react-bootstrap/Form';

import { ICar } from '../../containers/Cars/interfaces';
import { DateFormatter } from '../../utils/formatter/DateFormatter';
import { CurrencyFormatter } from '../../utils/formatter/CurrencyFormatter';
import { PercentageFormatter } from '../../utils/formatter/PercentageFormatter';
import { PHYSICAL_STATUS, SELLING_STATUS, LEGAL_STATUS, ENGINE_TYPE } from '../../containers/Cars/enums';

import './info.css';

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

              { car.physicalStatus ? (
                  <div className='infoSection'>
                    <Card.Subtitle className='mb-2 text-muted'>Physical status:</Card.Subtitle>
                    <Card.Text>{ PHYSICAL_STATUS[car.physicalStatus] }</Card.Text>
                  </div>
                ) : null
              }

              { car.legalStatus ? (
                  <div className='infoSection'>
                    <Card.Subtitle className='mb-2 text-muted'>Legal Status:</Card.Subtitle>
                    <Card.Text>{ LEGAL_STATUS[car.legalStatus] }</Card.Text>
                  </div>
                ) : null
              }

              { car.sellingStatus ? (
                  <div className='infoSection'>
                    <Card.Subtitle className='mb-2 text-muted'>Selling Status:</Card.Subtitle>
                    <Card.Text>{ SELLING_STATUS[car.sellingStatus] }</Card.Text>
                  </div>
                ) : null
              }

              { car.engineType ? (
                  <div className='infoSection'>
                    <Card.Subtitle className='mb-2 text-muted'>Engine type:</Card.Subtitle>
                    <Card.Text>{ ENGINE_TYPE[car.engineType] }</Card.Text>
                  </div>
                ) : null
              }
              
            </Card.Body>
          </Card>
        </CardDeck>
      </div>
    );
  }
}
