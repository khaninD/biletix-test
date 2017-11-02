import React, {Component} from 'react';
import '../../main.scss';
import Proptypes from 'prop-types';
// components
import ListItem from '../../components/list';

class Body extends Component {
  constructor(props) {
    super(props);
  }

  _getListItems(data) {
    return data.map((item, index) =>
      <ListItem {...item} key={index} />
    )
  }

  render() {
    const {data} = this.props;
    const content = data ? this._getListItems(data) : null;
    return (
      <tbody>
        {content}
      </tbody>
    )
  }

}

Body.propTypes = {
  data: Proptypes.array.isRequired
};

export default Body;


