import React, {Component} from 'react';
import Proptypes from 'prop-types';
// components
import Header from './components/header';
import Body from './components/body';

class Offers extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const {data, columns} = this.props;
    return (
      <table>
        <Header columns={columns} />
        <Body data={data} />
      </table>
    )
  }
}

Offers.propTypes = {
  data: Proptypes.array.isRequired
};

export default Offers;