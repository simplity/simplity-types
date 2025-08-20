import { SimpleRecord } from '../../..';

export const _columnSelection: SimpleRecord = {
  name: '_columnSelection',
  isVisibleToClient: true,
  recordType: 'simple',
  description: 'Column/Field to be included in the report',
  fields: [
    { name: 'seqNo', fieldType: 'optionalData', valueSchema: 'integer' },
    { name: 'name', fieldType: 'requiredData', valueSchema: 'text' },
    { name: 'label', fieldType: 'requiredData', valueSchema: 'text' },
  ],
};
