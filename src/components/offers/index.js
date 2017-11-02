import React, {Component} from 'react';
import Proptypes from 'prop-types';
// components
import Preloader from './preloader';
import Header from './components/header';
import Body from './components/body';

class Offers extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  _getContent(data, columns) {
    const {children} = this.props;
    return (
      <div>
        <table>
          <Header columns={columns} />
          <Body data={data} />
        </table>
      </div>
    )
  }

  render () {
    const {initData, columns} = this.props;
    const {value} = this.state;
    const content = initData ? this._getContent(initData, columns) : <Preloader />;
    return (
      <div>
        {content}
      </div>
    )
  }
}

Offers.propTypes = {
  initData: Proptypes.array.isRequired,
  columns: Proptypes.array.isRequired
};

export default Offers;