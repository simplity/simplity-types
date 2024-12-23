import { StringMap } from '../..';
import { ValueSchema } from '../..';

export const systemValueSchemas: StringMap<ValueSchema> = {
  _name: {
    name: '_name',
    valueType: 'text',
    maxLength: 50,
    messageName: '_invalidName',
  },
};
