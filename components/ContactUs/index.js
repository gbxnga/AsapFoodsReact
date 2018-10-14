import React from 'react'  
import ComponentWithHeader from '../componentWithHeader'

export default _ => 
    <div>
        <ComponentWithHeader 
            headerProps={{
                title:"Contact Us",
                showBack:false   
            }}
            Component={ _ =>                 
                        <div className="contact-page page-container" style={{display:"block"}}>

                            <div className="container">
                                <div className="row">

                                    <ul id="contact-list">
                                        <li>
                                            <a className="" href='tel:09031576102'>
                                                <span className="fa fa-phone"></span> 0903 157 6102
                                            </a>
                                        </li>
                                        <li>
                                            <a className="" href='mailto:help@asapfoods.com.ng'>
                                                <span className="fa fa-envelope"></span> help@asapfoods.com.ng
                                            </a>
                                        </li>
                                        <li>
                                            <a className="" target="_blank" href='https://www.facebook.com/ASAPFoods-161333281048296/'>
                                                <span className="fa fa-facebook-official"></span> AsapFoods
                                            </a>
                                        </li>
                                        <li>
                                            <a className="" target="_blank" href='https://twitter.com/asapfoodsng'>
                                                <span className="fa fa-twitter"></span> @AsapFoodsNg
                                            </a>
                                        </li>
                                        <li>
                                            <a className="" target="_blank" href='https://instagram.com/asapfoods'>
                                                <span className="fa fa-instagram"></span> @AsapFoods
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        }
            />
        

    </div>
        
    


 