import { ValidatorOptions } from 'class-validator';
import { registerDecorator } from 'class-validator';

export type ValidatorStringOptions = ValidatorOptions & {
  each?: boolean;
  lengthBetween?: number | [number, number];
  enum?: string[];
  reg?: RegExp;
};

const validString = (options?: ValidatorStringOptions) => (value: unknown) =>
  (options?.each && Array.isArray(value) ? value : [value]).every((v) =>
    typeof v === 'string'
      ? (options?.lengthBetween
          ? Array.isArray(options.lengthBetween)
            ? options.lengthBetween.every((b, i) => (i == 0 ? v.length >= b : v.length <= b))
            : v.length === options.lengthBetween
          : true) &&
        (options?.enum ? options.enum.includes(v) : true) &&
        (options?.reg ? options.reg.test(v) : true)
      : false,
  );

export const validatorString =
  (name: string, options?: ValidatorStringOptions) => (target: Function, propertyName: string) =>
    registerDecorator({
      name,
      target: target.constructor,
      propertyName,
      constraints: [],
      options,
      validator: validString(options),
    });

export const validatorStringMobile = (options: ValidatorStringOptions = {}) =>
  validatorString('validatorStringMobile', { ...options, lengthBetween: 11, reg: /^1[3-9]\d{9}$/ });

export const validatorStringUsername = (options: ValidatorStringOptions = {}) =>
  validatorString('validatorStringUsername', { ...options, lengthBetween: [4, 45], reg: /^[a-zA-Z][a-zA-Z0-9-_]$/ });

export const validatorStringDate = (options: ValidatorStringOptions = {}) =>
  validatorString('validatorStringDate', {
    ...options,
    lengthBetween: 10,
    reg: /^\d{1,4}-[0[1-9]]|[1[0-2]]-[[0-2][0-9]]|3[0,1] [0-1][0-9]|2[0-3]:[0-5][0-9]:[0-5][0-9]$/,
  });

export const validatorStringTime = (options: ValidatorStringOptions = {}) =>
  validatorString('validatorStringTime', {
    ...options,
    lengthBetween: 8,
    reg: /^[0-1][0-9]|2[0-3]:[0-5][0-9]:[0-5][0-9]$/,
  });

export const validatorStringDateTime = (options: ValidatorStringOptions = {}) =>
  validatorString('validatorStringDateTime', {
    ...options,
    lengthBetween: 19,
    reg: /^\d{1,4}-[0[1-9]]|[1[0-2]]-[[0-2][0-9]]|3[0,1] [0-1][0-9]|2[0-3]:[0-5][0-9]:[0-5][0-9]$/,
  });

export const validatorStringUUID = (options: ValidatorStringOptions = {}) =>
  validatorString('validatorStringUUID', { ...options, lengthBetween: 32, reg: /^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/ });

export const validatorStringSMS = (options: ValidatorStringOptions = {}) =>
  validatorString('validatorStringSMS', { ...options, lengthBetween: 6, reg: /^\d{6}$/ });
