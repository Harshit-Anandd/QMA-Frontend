// Auth Types
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  role: string;
  name: string;
}

export interface User {
  email: string;
  role: string;
  name: string;
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
  quantity1: QuantityUnitDTO;
  quantity2?: QuantityUnitDTO;
  targetUnit?: string;
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
