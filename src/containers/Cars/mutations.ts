import gql from 'graphql-tag';

export const CREATE_TASK = gql`
  mutation createNewTask($carId: ID!, $task: TaskInput!) {
    createTask(carId: $carId, task: $task)
  }
`;

export const UPDATE_TASK = gql`
  mutation updateSelectedTask($taskId: ID!, $completed: Boolean!) {
    updateTask(id: $taskId, completed: $completed) {
      id,
      taskType,
      comment,
      completed
    }
  }
`;

export const UPDATE_CAR = gql`
  mutation updateCar($car: CarInput) {
    updateCar(car: $car) {
      id,
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
