import React from 'react';
import PropTypes from 'prop-types';
// import Tooltip from '@ids-beta/tooltip';

export default function Card(props) {
  return (
    <div className="tile">
      <p
        style={{
          textAlign: 'center',
          color: props.color ? props.color : 'rgb(0, 119, 197)',
          fontSize: '5vw',
          fontWeight: 'bold',
        }}
      >
        {props.value}
      </p>
      <p
        style={{
          color: props.color ? props.color : 'rgb(0, 119, 197)',
          textAlign: 'center',
          fontSize: '16px',
        }}
      >
        <strong>{props.name}</strong>
      </p>
    </div>
  );
}

Card.propTypes = {
  value: PropTypes.number,
  name: PropTypes.string,
  color: PropTypes.string,
};

Card.defaultProps = {
  value: PropTypes.number,
  name: PropTypes.string,
  color: null,
};
