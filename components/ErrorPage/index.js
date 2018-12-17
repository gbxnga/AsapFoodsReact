export default ({message=`Sorry, we couldn't find that page. :(`}) =>
    <div className="error-page page-container" style={{display:"block"}}>
        <img className="center-block" style={{marginTop:"40%"}} width="200" height="200" src="../../../../src/icons/empty.png"/>
        <h3 style={{textAlign:"center"}}>{message}</h3>

    </div>
 