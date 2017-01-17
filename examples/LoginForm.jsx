import React, { Component } from 'react';
import { form } from '../src/react-model-forms';
import { Input } from './components/Input';
import { Password } from './components/Password';

RegExp.prototype.toJSON = function() {
  return this.toString();
}

@form(`
type LoginForm {
  username String {
    required true
    contains 'a'
    length >= 4 and <= 15
    matches /[a-z][a-z0-9_]*/i
  }
  password String {
    required true
    length >= 8 and <= 30
    matches /[a-z]/ and /[A-Z]/ and /[0-9]/ and /[^a-z0-9 \t]/i
  }
}
`)
export class LoginForm extends Component {
  onSubmit = () => {
    console.log('onSubmit', args);
  }

  render() {
    const { errors, value } = this.props;

    return (
      <form onSubmit={ this.onSubmit }>
        <fieldset>
          <legend>Login</legend>

          <Input field="username" />
          <Password field="password" />

          <input type="submit" />
        </fieldset>

        <div>
          <label><code>this.props.value</code></label>
          <pre>{ JSON.stringify(value, null, 2) }</pre>
        </div>
        <div>
          <label><code>this.props.errors</code></label>
          <pre>{ JSON.stringify(errors, null, 2) }</pre>
        </div>
        <div>
          <label><code>this.props.form</code></label>
          <pre>{ JSON.stringify(form, null, 2) }</pre>
        </div>
      </form>
    );
  }
}
