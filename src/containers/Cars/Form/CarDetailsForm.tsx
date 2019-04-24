import * as React from 'react';
import { Query, graphql, compose } from 'react-apollo';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Field, reduxForm } from 'redux-form';

import { FETCH_MODEL_OPTIONS, FETCH_MAKE_OPTIONS, FETCH_TRIM_OPTIONS } from '../queries';
import { UPDATE_CAR } from '../mutations';
import { CarDetailsFormPropsWithForm } from './interfaces';
import { PHYSICAL_STATUS, SELLING_STATUS, LEGAL_STATUS, ENGINE_TYPE } from '../enums';

class CarDetailsForm extends React.PureComponent<CarDetailsFormPropsWithForm> {
  state = {
    make: [],
    model: [],
    trim: [],
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    const { make, model, trim } = this.state;
    const isSubmitDisabled = (make.length === 0 || model.length === 0 || trim.length === 0);

    return (
      <Form onSubmit={handleSubmit(this.onSubmit)}>
        <Form.Group>
          <Form.Label>Physical Status:</Form.Label>
          <Field
            name='physicalStatus'
            component='select'
            className='form-control'
          >
            { this.renderOptions(PHYSICAL_STATUS) }
          </Field>
        </Form.Group>

        <Form.Group>
          <Form.Label>Legal Status:</Form.Label>
          <Field
            name='legalStatus'
            component='select'
            className='form-control'
          >
            { this.renderOptions(LEGAL_STATUS) }
          </Field>
        </Form.Group>

        <Form.Group>
          <Form.Label>Selling Status:</Form.Label>
          <Field
            name='sellingStatus'
            component='select'
            className='form-control'
          >
            { this.renderOptions(SELLING_STATUS) }
          </Field>
        </Form.Group>

        <Form.Group>
          <Form.Label>Engine Type:</Form.Label>
          <Field
            name='engineType'
            component='select'
            className='form-control'
          >
            { this.renderOptions(ENGINE_TYPE) }
          </Field>
        </Form.Group>


        <Form.Group>
          <Form.Label>Make:</Form.Label>
          <Query query={FETCH_MAKE_OPTIONS}>
            {
              ({ data, loading }) => {
                if (loading) {
                  return <div>Loading car makers..</div>;
                }

                return (
                  <Field
                    name='make'
                    component='select'
                    className='form-control'
                    onChange={this.handleMakeChange}
                  >
                    <option value=''>Please select maker</option>
                    { 
                      data.make.map((value: any) => (
                        <option key={value} value={value}>{ value }</option>
                      ))
                    }
                  </Field>
                );
              }
            }
          </Query>
        </Form.Group>
        
        {
          make.length === 0 ? null :
          <Form.Group>
            <Form.Label>Model:</Form.Label>
            <Query query={FETCH_MODEL_OPTIONS} variables={{ make }}>
              {
                ({ data, loading }) => {
                  if (loading) {
                    return <div>Loading models..</div>;
                  }

                  return (
                    <Field
                      name='model'
                      component='select'
                      className='form-control'
                      onChange={this.handleModelChange}
                    >
                      <option value=''>Please select model</option>
                      { 
                        data.model.map((value: any) => (
                          <option key={value} value={value}>{ value }</option>
                        ))
                      }
                    </Field>
                  );
                }
              }
            </Query>
          </Form.Group>
        }

        {
          model.length === 0 ? null :
          <Form.Group>
            <Form.Label>Trim:</Form.Label>
            <Query query={FETCH_TRIM_OPTIONS} variables={{ make, model }}>
              {
                ({ data, loading }) => {
                  if (loading) {
                    return <div>Loading trims..</div>;
                  }

                  return (
                    <Field
                      name='trim'
                      component='select'
                      className='form-control'
                      onChange={this.handleTrimChange}
                    >
                      <option value=''>Please select trim</option>
                      { 
                        data.trim.map((value: any) => (
                          <option key={value} value={value}>{ value }</option>
                        ))
                      }
                    </Field>
                  );
                }
              }
            </Query>
          </Form.Group>
        }

        <Button variant='primary' type='submit' disabled={isSubmitDisabled}>
          { submitting ? 'Submitting...' : 'Submit'}
        </Button>
      </Form>
    );
  }

  renderOptions = (field) => {
    return Object.keys(field).map((value) => (
      <option value={value}>{field[value]}</option>
    ))
  }
  
  onSubmit = (values) => {
    return this.props.updateCar({
      variables: {
        car: {
          id: this.props.carId,
          ...values
        },
      }
    }).then(({ data }) => {
      this.props.refetch();
    }).catch((error) => {
      console.log(error);
    });
  }

  handleMakeChange = (e) => {
    this.setState({ make: e.target.value, model: [], trim: [] });
  }

  handleModelChange = (e) => {
    this.setState({ model: e.target.value });
  }

  handleTrimChange = (e) => {
    this.setState({ trim: e.target.value });
  }
}

export default compose(
  graphql(UPDATE_CAR, { name: 'updateCar' }),
  reduxForm({
    form: 'CarDetailsForm'
  }))(CarDetailsForm)
