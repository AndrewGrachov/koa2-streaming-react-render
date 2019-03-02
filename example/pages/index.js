const React = require('react');

class Hello extends React.Component {
  render() {
    return <div>Hello{this.props.toWhat}</div>;
  }
}

module.exports = Hello;