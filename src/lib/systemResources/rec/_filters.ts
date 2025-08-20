import { SimpleRecord } from '../../..';

export const _filters: SimpleRecord = {
  name: '_filters',
  isVisibleToClient: true,
  recordType: 'simple',
  description: 'Filtering criterion for columns',
  fields: [
    {
      name: 'name',
      fieldType: 'requiredData',
      valueSchema: 'text',
      label: 'Name',
    },
    {
      name: 'comparator',
      fieldType: 'requiredData',
      valueSchema: 'text',
      label: 'Condition',
    },
    { name: 'value', fieldType: 'requiredData', valueSchema: 'text' },
    { name: 'toValue', fieldType: 'optionalData', valueSchema: 'text' },
  ],
};
