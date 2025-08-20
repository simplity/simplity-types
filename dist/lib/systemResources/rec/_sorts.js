export const _sorts = {
    name: '_sorts',
    isVisibleToClient: true,
    recordType: 'simple',
    description: 'Columns to be sorted on',
    fields: [
        { name: 'name', fieldType: 'requiredData', valueSchema: 'text' },
        {
            name: 'ascending',
            fieldType: 'requiredData',
            valueSchema: 'boolean',
            renderAs: 'check-box',
        },
    ],
};
//# sourceMappingURL=_sorts.js.map