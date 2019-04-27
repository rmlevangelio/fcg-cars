import * as React from 'react';
import Spinner from 'react-bootstrap/Spinner';

interface ILoader {
  loadingText: string;
}

export const Loader = ({ loadingText }: ILoader): JSX.Element => (
  <div className='spinnerContainer'>
    <Spinner animation='grow' />
    <div className='spinnerText'>Fetching car information...</div>
  </div>
);
