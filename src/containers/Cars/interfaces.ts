export interface IFinancialDetails {
  purchasePrice: number;
  purchaseDate: string;
  purchaseLocation: string;
  paymentDonePercentage: number;
  sellingDate: string;
  sellingPrice: number;
  sellingLocation: string;
  sellingDonePercentage: number;
}

export interface ICar {
  id: string;
  make: string;
  model: string;
  trim: string;
  financialDetails: IFinancialDetails;
}

export interface ICars {
  car: ICar;
  isLoading: boolean;
}
