import moment from 'moment/moment';
import { ValueTransformer } from 'typeorm/decorator/options/ValueTransformer';
import { dateFormat } from './date';

export const transformerDateTime: ValueTransformer = {
  to: (v: string) => v,
  from: (v: Date) => moment(v).format(dateFormat),
};

export const transformerJSON: ValueTransformer = {
  to: (v: Record<string, unknown>): string => JSON.stringify(v),
  from: (v: string): Record<string, unknown> => JSON.parse(v),
};
