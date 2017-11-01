import React, {Component} from 'react';
import Proptypes from 'prop-types';

const Header = ({columns}) => (
  <thead>
    <tr>
      {
        columns.map((item, index) =>
          <th key={index}>{item}</th>
        )
      }
    </tr>
  </thead>
);

Header.propTypes = {
  columns: Proptypes.array.isRequired
};

export default Header;