import { alpha } from '@mui/system';

const alphaValues = [0.04, 0.08, 0.12, 0.30, 0.50];

const withAlphas = (color) => {
  const alphas = {};
  alphaValues.forEach((value) => {
    alphas[`alpha${value * 100}`] = alpha(color.main, value);
  });
  return { ...color, ...alphas };
};

const createColor = (colorValues) => {
  return withAlphas({
    lightest: colorValues[0],
    light: colorValues[1],
    main: colorValues[2],
    dark: colorValues[3],
    darkest: colorValues[4],
    contrastText: colorValues[5],
  });
};

export const neutral = createColor([
  '#F8F9FA',
  '#F3F4F6',
  '#E5E7EB',
  '#D2D6DB',
  '#9DA4AE',
  '#6C737F',
]);

export const indigo = createColor([
  '#F5F7FF',
  '#EBEEFE',
  '#6366F1',
  '#4338CA',
  '#312E81',
  '#FFFFFF',
]);

export const success = createColor([
  '#F0FDF9',
  '#3FC79A',
  '#10B981',
  '#0B815A',
  '#134E48',
  '#FFFFFF',
]);

export const info = createColor([
  '#ECFDFF',
  '#CFF9FE',
  '#06AED4',
  '#0E7090',
  '#164C63',
  '#FFFFFF',
]);

export const warning = createColor([
  '#FFFAEB',
  '#FEF0C7',
  '#F79009',
  '#B54708',
  '#7A2E0E',
  '#FFFFFF',
]);

export const error = createColor([
  '#FEF3F2',
  '#FEE4E2',
  '#F04438',
  '#B42318',
  '#7A271A',
  '#FFFFFF',
]);
