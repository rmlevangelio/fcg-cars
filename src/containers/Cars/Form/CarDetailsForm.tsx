import * as React from 'react';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { FETCH_MODEL_OPTIONS, FETCH_MAKE_OPTIONS, FETCH_TRIM_OPTIONS } from '../queries';

class CarDetailsForm extends React.PureComponent {
  state = {
    make: [],
    model: [],
    trim: [],
  }

  render() {
    const { make, model } = this.state;

    return (
      <Form>
        <Form.Group>
          <Form.Label>Make:</Form.Label>
          <Query query={FETCH_MAKE_OPTIONS}>
            {
              ({ data, loading }) => {
                if (loading) {
                  return <div>Loading car makers..</div>;
                }

                return (
                  <Form.Control as='select' onChange={this.handleMakeChange}>
                    <option value='none'>Please select maker</option>
                    { 
                      data.make.map((value: any) => (
                        <option value={value}>{ value }</option>
                      ))
                    }
                  </Form.Control>
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
                    <Form.Control as='select' onChange={this.handleModelChange}>
                      <option value='none'>Please select model</option>
                      { 
                        data.model.map((value: any) => (
                          <option value={value}>{ value }</option>
                        ))
                      }
                    </Form.Control>
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
                    <Form.Control as='select'>
                      <option value='none'>Please select trim</option>
                      { 
                        data.trim.map((value: any) => (
                          <option value={value}>{ value }</option>
                        ))
                      }
                    </Form.Control>
                  );
                }
              }
            </Query>
          </Form.Group>
        }

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    );
  }

  handleMakeChange = (e) => {
    this.setState({ make: e.target.value, model: [], trim: [] });
  }

  handleModelChange = (e) => {
    this.setState({ model: e.target.value });
  } 
}

export default connect(null, null)(CarDetailsForm);
