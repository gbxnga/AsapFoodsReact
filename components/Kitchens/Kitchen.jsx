import React from 'react';
import PropTypes from 'prop-types';
import constants from '../../constants/constants';
import { Link } from 'react-router-dom';
const Kitchen = ({ kitchen }) => (

  <Link style={{ color: "#666666" }} className={`kitchen-link ${kitchen.id}`} to={`kitchen/${kitchen.id}/${kitchen.name.split(' ').join('-')}`}>
    <div className="has-shadow" style={{ backgroundColor: "white", border: "1px solid #e2e6e9", height: 80, marginBottom: 2, borderRadius: 4, padding: 4 }}>
      <img width="75" style={{ float: "left"}} height="70" src={`${constants.site}/src/images/${kitchen.description}-out.jpeg`} alt={kitchen.name} />
      <div className="name-n-review" style={{ float: "left", marginLeft: 15 }}>
        <h4 style={{ marginTop: 0 }}>{kitchen.name}</h4>
        <span className="glyphicon glyphicon-star" />
        <span className="glyphicon glyphicon-star" />
        <span className="glyphicon glyphicon-star" />

      </div>
      <div className="forward" style={{ float: "right", marginLeft: 15, marginRight: 5, paddingTop: 30 }}>
        <span style={{ color: "#FF4C00" }} className="glyphicon glyphicon-menu-right"></span>
      </div>
      </div>
  </Link>);

Kitchen.propTypes = {
    kitchen: PropTypes.instanceOf(Object),
};
Kitchen.defaultProps = {
    kitchen: {},
};


export default Kitchen;
