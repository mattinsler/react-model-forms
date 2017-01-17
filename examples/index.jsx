import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { LoginForm } from './LoginForm';

class Examples extends Component {
  render() {
    return (
      <div style={{ width: 900, margin: '0 auto' }}>
        <LoginForm
          onSuccess={ () => console.log('login') }
        />
      </div>
    );
  }
}

ReactDOM.render(<Examples />, document.body);
