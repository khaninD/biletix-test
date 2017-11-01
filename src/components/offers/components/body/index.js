import React, {Component} from 'react';
import CSSModules from 'react-css-modules';
import styles from '../../main.scss';
import Proptypes from 'prop-types';
// components
import ListItem from '../../components/list';
import Preloader from '../../preloader';

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
    const content = data ? this._getListItems(data) : <Preloader />;
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

Body = CSSModules(Body, styles);

export default Body;


