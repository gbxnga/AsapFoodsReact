import React from 'react';
import PropTypes from 'prop-types';
import Kitchen from './Kitchen';
import constants from '../../constants/constants';

const KitchensList = ({ replaceAll, kitchens }) => (
  <div>
    <div className="pick-kitchen-page page-container col-lg-6 col-lg-offset-3" style={{ backgroundColo: "white", display: "block" }}>
      <div className="container">
        <div className="row">
          <div id="kitchen-con-new" style={{padding:0}} className="col-xs-12 ">
            {(kitchens.length === 0)
            ? console.log(kitchens)
            : kitchens.map(kitchen => <Kitchen key={kitchen.id} kitchen={kitchen} />)
            }
          </div>

          <p className="text-center" style={{ marginTop: 30 }}>Cant find your choice resturant?</p>
          <p>
            <a href="tel:09031576102">
              <img className="center-block" style={{ display: "block", cursor: "pointer" }} src={`${constants.site}/src/icons/call.png`} alt="call us" width="45" height="45" />
            </a>
          </p>
          <p className="text-center" style={{ color: "rgb(255, 112, 51)", float: "right", width: "100%" }}>Call us</p>
        </div>
      </div>
    </div>
  </div>
);
KitchensList.propTypes = {
    replaceAll: PropTypes.bool,
    kitchens: PropTypes.instanceOf(Array),
};
KitchensList.defaultProps = {
    replaceAll: false,
    kitchens: [],
};

export default KitchensList;
