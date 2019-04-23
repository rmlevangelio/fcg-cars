import { InjectedFormProps } from 'redux-form';

export interface ICarDetailsPublicProps {
  carId: string;
}

export interface ICarDetailsFormValues {
  make: string;
  model: string;
  trim: string;
}

export type CarDetailsFormProps =
  & ICarDetailsPublicProps
  ;


export type CarDetailsFormPropsWithForm =
  & ICarDetailsPublicProps
  & InjectedFormProps<ICarDetailsFormValues, CarDetailsFormProps>
