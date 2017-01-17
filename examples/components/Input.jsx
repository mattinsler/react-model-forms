import React, { Component } from 'react';
import { formField } from '../../src/react-model-forms';

@formField()
export class Input extends Component {
  render() {
    const {
      label,
      errors,
      onChange,
      type = 'text',
      value = '',
      ...props
    } = this.props;

    let err;
    if (errors.length > 0) {
      err = (
        <div className="error">
        {
          errors.map(e => <div key={ e.mmessage }>{ e.message }</div>)
        }
        </div>
      );
    }

    return (
      <div>
        { label && <label>{ label }</label> }
        <input
          { ...props }
          type={ type }
          onChange={ (e) => onChange(e.target.value) }
          value={ value }
        />
        
        { err }
      </div>
    )
  }
}
