// Auth Types
export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  tokenType: string;
  accessToken: string;
  expiresInSeconds: number;
  user: User;
}

export interface OAuthCallbackParams {
  accessToken?: string;
  tokenType?: string;
  expiresIn?: string;
  error?: string;
  message?: string;
}

export interface User {
  id: number;
  email: string;
  fullName: string;
  role: string;
  provider: string;
  enabled: boolean;
  createdAt: string;
}

// Quantity Types
export type QuantityType = 'length' | 'weight' | 'temperature' | 'volume';
export type ActionType = 'comparison' | 'conversion' | 'arithmetic';
export type ArithmeticOp = '+' | '-' | '*' | '/';
export type MeasurementType = 'LengthUnit' | 'WeightUnit' | 'TemperatureUnit' | 'VolumeUnit';

export interface QuantityUnitDTO {
  value: number;
  unit: string;
  measurementType: MeasurementType;
}

export interface QuantityInputDTO {
  thisQuantityDTO: QuantityUnitDTO;
  thatQuantityDTO?: QuantityUnitDTO;
  targetQuantityDTO?: QuantityUnitDTO;
}

export interface QuantityMeasurementDTO {
  resultString?: string;
  resultValue?: number;
  resultUnit?: string;
  isError?: boolean;
  errorMessage?: string;
}

export interface CompareRequest {
  type: QuantityType;
  value1: number;
  unit1: string;
  value2: number;
  unit2: string;
}

export interface ConvertRequest {
  type: QuantityType;
  value: number;
  fromUnit: string;
  toUnit: string;
}

export interface ArithmeticRequest {
  type: QuantityType;
  value1: number;
  unit1: string;
  value2: number;
  unit2: string;
  operator: ArithmeticOp;
}
