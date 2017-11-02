import React, {Component} from 'react';
import Proptypes from 'prop-types';
//styles
import './main.scss'

const CheckBoxes = ({options, children}) => {
  return(
    options ?
      <div className='react-checkBoxes-item'>
        <h3 className='react-checkBoxes-item__title'>{children}</h3>
        {
          options.map(({name, ...props}, index) => {
            return (
              <div key={index}>
                <label htmlFor={name}>{name}</label>
                <input type='checkbox' id={name} name={name} {...props} />
              </div>
            )
          })
        }
      </div>
      : null
  );
};

CheckBoxes.propTypes = {
  options: Proptypes.array.isRequired
};

export default CheckBoxes;