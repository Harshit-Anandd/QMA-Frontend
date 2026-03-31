import React, { useState } from 'react';
import { quantityService } from '../../services/quantityService';
import type { QuantityInputDTO, MeasurementType } from '../../types';
import './Quantity.css';

type ActionType = 'comparison' | 'conversion' | 'arithmetic';
type ArithmeticOp = '+' | '-' | '*' | '/';

interface TypeConfig {
  label: string;
  icon: string;
  measurementType: MeasurementType;
  units: string[];
}

const TYPE_CONFIGS: TypeConfig[] = [
  {
    label: 'Length',
    icon: '📏',
    measurementType: 'LengthUnit',
    units: ['FEET', 'INCH', 'YARDS', 'CENTIMETERS'],
  },
  {
    label: 'Weight',
    icon: '⚖️',
    measurementType: 'WeightUnit',
    units: ['GRAM', 'KILOGRAM', 'POUND'],
  },
  {
    label: 'Temperature',
    icon: '🌡️',
    measurementType: 'TemperatureUnit',
    units: ['CELSIUS', 'FAHRENHEIT', 'KELVIN'],
  },
  {
    label: 'Volume',
    icon: '🧪',
    measurementType: 'VolumeUnit',
    units: ['LITRE', 'MILLILITRE', 'GALLON'],
  },
];

const ARITHMETIC_OPS: ArithmeticOp[] = ['+', '-', '*', '/'];

export const Quantity: React.FC = () => {
  const [selectedType, setSelectedType] = useState<TypeConfig>(TYPE_CONFIGS[0]);
  const [action, setAction] = useState<ActionType>('comparison');
  const [value1, setValue1] = useState('');
  const [unit1, setUnit1] = useState(selectedType.units[0]);
  const [value2, setValue2] = useState('');
  const [unit2, setUnit2] = useState(selectedType.units[0]);
  const [targetUnit, setTargetUnit] = useState(selectedType.units[0]);
  const [operator, setOperator] = useState<ArithmeticOp>('+');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTypeChange = (type: TypeConfig) => {
    setSelectedType(type);
    setUnit1(type.units[0]);
    setUnit2(type.units[0]);
    setTargetUnit(type.units[0]);
    setResult(null);
    setError('');
  };

  const handleCompare = async () => {
    if (!value1 || !value2) {
      setError('Please enter both values');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const input: QuantityInputDTO = {
        thisQuantityDTO: {
          value: parseFloat(value1),
          unit: unit1,
          measurementType: selectedType.measurementType,
        },
        thatQuantityDTO: {
          value: parseFloat(value2),
          unit: unit2,
          measurementType: selectedType.measurementType,
        },
      };

      const response = await quantityService.compare(input);
      setResult(response);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Comparison failed');
    } finally {
      setLoading(false);
    }
  };

  const handleConvert = async () => {
    if (!value1) {
      setError('Please enter a value');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const input: QuantityInputDTO = {
        thisQuantityDTO: {
          value: parseFloat(value1),
          unit: unit1,
          measurementType: selectedType.measurementType,
        },
        targetQuantityDTO: {
          value: 0,
          unit: targetUnit,
          measurementType: selectedType.measurementType,
        },
      };

      const response = await quantityService.convert(input);
      setResult(response);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Conversion failed');
    } finally {
      setLoading(false);
    }
  };

  const handleArithmetic = async () => {
    if (!value1 || !value2) {
      setError('Please enter both values');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const input: QuantityInputDTO = {
        thisQuantityDTO: {
          value: parseFloat(value1),
          unit: unit1,
          measurementType: selectedType.measurementType,
        },
        thatQuantityDTO: {
          value: parseFloat(value2),
          unit: unit2,
          measurementType: selectedType.measurementType,
        },
      };

      let response;
      switch (operator) {
        case '+':
          response = await quantityService.add(input);
          break;
        case '-':
          response = await quantityService.subtract(input);
          break;
        case '*':
          response = await quantityService.divide(input);
          break;
        case '/':
          response = await quantityService.divide(input);
          break;
        default:
          throw new Error('Invalid operator');
      }

      setResult(response);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Arithmetic operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleExecute = () => {
    switch (action) {
      case 'comparison':
        handleCompare();
        break;
      case 'conversion':
        handleConvert();
        break;
      case 'arithmetic':
        handleArithmetic();
        break;
    }
  };

  return (
    <div className="quantity-container">
      <div className="quantity-types">
        {TYPE_CONFIGS.map((type) => (
          <button
            key={type.label}
            className={`type-button ${selectedType.label === type.label ? 'active' : ''}`}
            onClick={() => handleTypeChange(type)}
          >
            <span className="type-icon">{type.icon}</span>
            <span className="type-label">{type.label}</span>
          </button>
        ))}
      </div>

      <div className="quantity-card">
        <div className="action-tabs">
          <button
            className={`tab ${action === 'comparison' ? 'active' : ''}`}
            onClick={() => {
              setAction('comparison');
              setResult(null);
              setError('');
            }}
          >
            Compare
          </button>
          <button
            className={`tab ${action === 'conversion' ? 'active' : ''}`}
            onClick={() => {
              setAction('conversion');
              setResult(null);
              setError('');
            }}
          >
            Convert
          </button>
          <button
            className={`tab ${action === 'arithmetic' ? 'active' : ''}`}
            onClick={() => {
              setAction('arithmetic');
              setResult(null);
              setError('');
            }}
          >
            Arithmetic
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="input-section">
          {action === 'comparison' && (
            <>
              <div className="input-group">
                <label>Value 1</label>
                <div className="input-row">
                  <input
                    type="number"
                    placeholder="Enter value"
                    value={value1}
                    onChange={(e) => setValue1(e.target.value)}
                    disabled={loading}
                  />
                  <select value={unit1} onChange={(e) => setUnit1(e.target.value)} disabled={loading}>
                    {selectedType.units.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="operator">⚖️</div>

              <div className="input-group">
                <label>Value 2</label>
                <div className="input-row">
                  <input
                    type="number"
                    placeholder="Enter value"
                    value={value2}
                    onChange={(e) => setValue2(e.target.value)}
                    disabled={loading}
                  />
                  <select value={unit2} onChange={(e) => setUnit2(e.target.value)} disabled={loading}>
                    {selectedType.units.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}

          {action === 'conversion' && (
            <>
              <div className="input-group">
                <label>Value</label>
                <div className="input-row">
                  <input
                    type="number"
                    placeholder="Enter value"
                    value={value1}
                    onChange={(e) => setValue1(e.target.value)}
                    disabled={loading}
                  />
                  <select value={unit1} onChange={(e) => setUnit1(e.target.value)} disabled={loading}>
                    {selectedType.units.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="operator">→</div>

              <div className="input-group">
                <label>Target Unit</label>
                <select value={targetUnit} onChange={(e) => setTargetUnit(e.target.value)} disabled={loading}>
                  {selectedType.units.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {action === 'arithmetic' && (
            <>
              <div className="input-group">
                <label>Value 1</label>
                <div className="input-row">
                  <input
                    type="number"
                    placeholder="Enter value"
                    value={value1}
                    onChange={(e) => setValue1(e.target.value)}
                    disabled={loading}
                  />
                  <select value={unit1} onChange={(e) => setUnit1(e.target.value)} disabled={loading}>
                    {selectedType.units.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="input-group">
                <label>Operator</label>
                <select value={operator} onChange={(e) => setOperator(e.target.value as ArithmeticOp)} disabled={loading}>
                  {ARITHMETIC_OPS.map((op) => (
                    <option key={op} value={op}>
                      {op}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label>Value 2</label>
                <div className="input-row">
                  <input
                    type="number"
                    placeholder="Enter value"
                    value={value2}
                    onChange={(e) => setValue2(e.target.value)}
                    disabled={loading}
                  />
                  <select value={unit2} onChange={(e) => setUnit2(e.target.value)} disabled={loading}>
                    {selectedType.units.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}

          <button className="execute-button" onClick={handleExecute} disabled={loading}>
            {loading ? 'Processing...' : 'Execute'}
          </button>
        </div>

        {result && (
          <div className="result-section">
            {result.isError ? (
              <div className="result-error">{result.errorMessage}</div>
            ) : (
              <>
                <h3>Result</h3>
                {result.resultString && <p className="result-text">{result.resultString}</p>}
                {result.resultValue !== undefined && (
                  <p className="result-value">
                    {result.resultValue} {result.resultUnit || ''}
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
