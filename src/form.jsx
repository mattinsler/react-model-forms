import React, { Component } from 'react';
import mdl from 'model-lang';
import hoistNonReactStatics from 'hoist-non-react-statics';

import { FormContextType } from './prop-types';

export function form(modelSpec) {
  const model = mdl.model(modelSpec);

  return (target, key, descriptor) => {
    class Form extends Component {
      static displayName = `Form(${target.displayName || target.name})`;
      static WrappedComponent = target;

      static childContextTypes = {
        form: FormContextType
      };

      constructor(props) {
        super(props);

        this.model = model;
        this.state = model.validate(props.value || {});
      }

      getChildContext() {
        return {
          form: {
            setValue: (field, value) => {
              const newFormValue = {
                ...this.state.value,
                [field]: value
              };
              this.setState(model.validate(newFormValue));
            },
            model,
            errors: this.state.errors,
            value: this.state.value
          }
        };
      }

      render() {
        const props = { ...this.props };
        props.errors = this.state.errors;
        props.form = this.model;
        props.isValid = this.state.errors.length === 0;
        props.value = this.state.value;

        return React.createElement(target, { ...props });
      }
    }

    return hoistNonReactStatics(Form, target);
  };
}
