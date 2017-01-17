import { PropTypes } from 'react';

export const FieldType = PropTypes.string.isRequired;

export const FormContextType = PropTypes.shape({
  setValue: PropTypes.func.isRequired,
  model: PropTypes.shape({
    name: PropTypes.string.isRequired,
    properties: PropTypes.object.isRequired,
    validate: PropTypes.func.isRequired
  }).isRequired,
  errors: PropTypes.array,
  value: PropTypes.object.isRequired
}).isRequired;
