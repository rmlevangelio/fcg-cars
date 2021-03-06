import gql from 'graphql-tag';

export const INITIAL_FETCH = gql`
  query initialFetch($carId: ID!) {
    car(id: $carId) {
      make,
      model,
      trim,
      engineType,
      physicalStatus,
      legalStatus,
      sellingStatus,
      financialDetails {
        purchasePrice,
        purchaseDate,
        purchaseLocation,
        paymentDonePercentage,
        sellingDate,
        sellingPrice,
        sellingLocation,
        sellingDonePercentage,
        margin
      }
    },
    tasks(carId: $carId) {
      id,
      taskType,
      comment,
      completed
    },
    make
  }
`;

export const FETCH_CAR_DETAILS = gql`
  query fetchCarDetails($carId: ID!) {
    car(id: $carId) {
      make,
      model,
      trim,
      engineType,
      physicalStatus,
      legalStatus,
      sellingStatus,
      financialDetails {
        purchasePrice,
        purchaseDate,
        purchaseLocation,
        paymentDonePercentage,
        sellingDate,
        sellingPrice,
        sellingLocation,
        sellingDonePercentage,
        margin
      }
    }
  }
`;

export const FETCH_MODEL_OPTIONS = gql`
  query fetchModelOptions($make: String!) {
    model(make: $make)
  }
`;

export const FETCH_TRIM_OPTIONS = gql`
  query fetchTrimOptions($make: String!, $model: String!) {
    trim(make: $make, model: $model)
  }
`;
  
export const FETCH_TASKS = gql`
  query fetchTasks($carId: ID!) {
    tasks(carId: $carId) {
      id,
      taskType,
      comment,
      completed
    },
  }
`;
