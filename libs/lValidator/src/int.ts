import { ValidatorOptions } from 'class-validator';
import { registerDecorator } from 'class-validator';

export type ValidatorIntOptions = ValidatorOptions & {
  each?: boolean;
  between?: number | [number, number];
  reg?: RegExp;
};

const validInt =
  (options?: ValidatorIntOptions) =>
  (value: unknown): boolean =>
    (options?.reg && Array.isArray(value) ? value : [value]).every((v) =>
      Number.isInteger(v)
        ? options?.between
          ? Array.isArray(options.between)
            ? options.between.every((b, i) => (i === 0 ? v >= b : v <= b))
            : v >= options.between
          : true
        : false,
    );

export const validatorInt = (name: string, options?: ValidatorIntOptions) => (target: Function, propertyName: string) =>
  registerDecorator({
    name,
    target: target.constructor,
    propertyName,
    constraints: [],
    options,
    validator: validInt(options),
  });

export const validatorIntUnSigned = validatorInt('validatorIntUnSigned', { between: 0 });

export const validatorIntPositive = validatorInt('validatorIntPositive', { between: 1 });

export const validatorIntUid = validatorIntUnSigned;

export const validatorIntAmount = validatorIntUnSigned;
