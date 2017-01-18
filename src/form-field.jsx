import React, { Component } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

import { FormContextType, FieldType } from './prop-types';

export function formField() {
  return (target, key, descriptor) => {
    class FormField extends Component {
      static displayName = `FormField(${target.displayName || target.name})`;
      static WrappedComponent = target;

      static propTypes = {
        field: FieldType
      };

      static contextTypes = {
        form: FormContextType
      };

      constructor(props, context) {
        super(props, context);

        this.property = context.form.model.properties[props.field];

        if (!this.property) {
          throw new Error(`Property ${props.field} does not exist in Form`);
        }
      }

      render() {
        const { form } = this.context;
        const { field, ...props } = this.props;

        props.errors = (form.errors || []).filter(e => e.property === field);
        props.isValid = props.errors.length === 0;
        props.value = form.value[field];
        props.onChange = (value) => form.setValue(field, value);

        return React.createElement(target, props);
      }
    }

    return hoistNonReactStatics(FormField, target);
  };
}
