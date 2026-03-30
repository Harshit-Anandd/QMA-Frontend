import httpClient from '../utils/http';
import type { QuantityInputDTO, QuantityMeasurementDTO } from '../types';

export const quantityService = {
  compare: async (input: QuantityInputDTO): Promise<QuantityMeasurementDTO> => {
    const response = await httpClient.post<QuantityMeasurementDTO>(
      '/quantities/compare',
      input
    );
    return response.data;
  },

  convert: async (input: QuantityInputDTO): Promise<QuantityMeasurementDTO> => {
    const response = await httpClient.post<QuantityMeasurementDTO>(
      '/quantities/convert',
      input
    );
    return response.data;
  },

  add: async (input: QuantityInputDTO): Promise<QuantityMeasurementDTO> => {
    const response = await httpClient.post<QuantityMeasurementDTO>(
      '/quantities/add',
      input
    );
    return response.data;
  },

  subtract: async (input: QuantityInputDTO): Promise<QuantityMeasurementDTO> => {
    const response = await httpClient.post<QuantityMeasurementDTO>(
      '/quantities/subtract',
      input
    );
    return response.data;
  },

  divide: async (input: QuantityInputDTO): Promise<QuantityMeasurementDTO> => {
    const response = await httpClient.post<QuantityMeasurementDTO>(
      '/quantities/divide',
      input
    );
    return response.data;
  },
};
