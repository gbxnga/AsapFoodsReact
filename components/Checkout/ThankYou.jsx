import React from 'react';
import {NavLink, Redirect} from 'react-router-dom';


const ThankYou = ({ order_number, total_amount, payment_method }) => (

  <div className="thank-you-page page-container" id=" " className="col-md-12" style={{marginTop:100, diplay:"block"}}>

    <div id="thank-you-page-banner ">
      <img width="150" height="150" className="center-block " alt="Thank you" src="src/icons/thankyou.png" />
      <h2 className="text-center ">Thank you!</h2>
      <p className="text-center ">Your order is confirmed and on the way</p>
    </div>

    <div id="processed-order-details " className="center-block " style={{width:"90%",height:"auto"}}>
      <div style={{backgroundColor:"white"}} className="table ">
        <div className="table-row ">
          <div className="table-col right ">
            <strong>Order No</strong>
          </div>
          <div className="table-col left" id="thank-you-order-id">{order_number}</div>

        </div>
        <div className="table-row ">
          <div className="table-col right ">Total Amount</div>
          <div className="table-col left" id="thank-you-total">&#8358;{total_amount}</div>
        </div>
        <div className="table-row ">
          <div className="table-col right " />
          <div className="table-col left " />
        </div>
        <div className="table-row ">
          <div className="table-col right ">Payment Method</div>
          <div className="table-col left" id="thank-you-method">{payment_method}</div>
        </div>
      </div>
    </div>
    <NavLink to={`view-order/${order_number}`} id="thank-you-view-order" className="text-center center-block">View order</NavLink>
    <NavLink className="landing-page-btn center-block text-center " style={{ backgroundColor: "#FF4C00", clear: "both" }} id="email-login-btn " to="./">FINISH</NavLink>
  </div>
);

export default ThankYou;
