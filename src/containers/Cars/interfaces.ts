enum EngineType {
  VEE,
  INLINE,
  BOXER,
  ROTARY,
}

enum PhysicalStatus {
  AT_OWNER,
  AT_BUYER,
  AT_OUR_LOCATION,
}

enum LegalStatus {
  OWNER,
  US,
  BUYER,
}

enum SellingStatus {
  AVAILABLE,
  PENDING,
  SOLD,
  RESERVED,
}

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
  engineType: EngineType;
  sellingStatus: SellingStatus;
  physicalStatus: PhysicalStatus;
  legalStatus: LegalStatus;
}

export interface ICars {
  car: ICar;
  refetch: () => void;
  isLoading: boolean;
}
