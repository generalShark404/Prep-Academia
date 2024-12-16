import {Link} from 'react-router-dom'
function Pricing(){
 return(
 <div>
  <div>
  <header id="fh5co-header" className="fh5co-cover fh5co-cover-sm" role="banner" style={{backgroundImage: 'url(../../assets/images/img_bg_2.jpg)'}} data-stellar-background-ratio="0.5">
    <div className="overlay" />
    <div className="container">
      <div className="row">
        <div className="col-md-8 col-md-offset-2 text-center">
          <div className="display-t">
            <div className="display-tc animate-box" data-animate-effect="fadeIn">
              <h1>Pricing Plan</h1>
              <h2>Free html5 templates Made by <Link to="http://freehtml5.co" target="_blank">freehtml5.co</Link></h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <div id="fh5co-pricing">
    <div className="container">
      <div className="row">
        <div className="pricing">
          <div className="col-md-3 animate-box">
            <div className="price-box">
              <h2 className="pricing-plan">Starter</h2>
              <div className="price"><sup className="currency">$</sup>9<small>/month</small></div>
              <ul className="classes">
                <li>15 English 101</li>
                <li className="color">10 Web Development</li>
                <li>10 Yoga Classes</li>
                <li className="color">20 Virtual Assistant</li>
                <li>10 System Analyst</li>
                <li className="color">5 WordPress</li>
                <li>10 Programming</li>
              </ul>
              <Link to="#" className="btn btn-select-plan btn-sm">Select Plan</Link>
            </div>
          </div>
          <div className="col-md-3 animate-box">
            <div className="price-box">
              <h2 className="pricing-plan">Basic</h2>
              <div className="price"><sup className="currency">$</sup>27<small>/month</small></div>
              <ul className="classes">
                <li>15 English 101</li>
                <li className="color">10 Web Development</li>
                <li>10 Yoga Classes</li>
                <li className="color">20 Virtual Assistant</li>
                <li>10 System Analyst</li>
                <li className="color">5 WordPress</li>
                <li>10 Programming</li>
              </ul>
              <Link to="#" className="btn btn-select-plan btn-sm">Select Plan</Link>
            </div>
          </div>
          <div className="col-md-3 animate-box">
            <div className="price-box popular">
              <h2 className="pricing-plan pricing-plan-offer">Pro <span>Best Offer</span></h2>
              <div className="price"><sup className="currency">$</sup>74<small>/month</small></div>
              <ul className="classes">
                <li>15 English 101</li>
                <li className="color">10 Web Development</li>
                <li>10 Yoga Classes</li>
                <li className="color">20 Virtual Assistant</li>
                <li>10 System Analyst</li>
                <li className="color">5 WordPress</li>
                <li>10 Programming</li>
              </ul>
              <Link to="#" className="btn btn-select-plan btn-sm">Select Plan</Link>
            </div>
          </div>
          <div className="col-md-3 animate-box">
            <div className="price-box">
              <h2 className="pricing-plan">Unlimited</h2>
              <div className="price"><sup className="currency">$</sup>140<small>/month</small></div>
              <ul className="classes">
                <li>15 English 101</li>
                <li className="color">10 Web Development</li>
                <li>10 Yoga Classes</li>
                <li className="color">20 Virtual Assistant</li>
                <li>10 System Analyst</li>
                <li className="color">5 WordPress</li>
                <li>10 Programming</li>
              </ul>
              <Link to="#" className="btn btn-select-plan btn-sm">Select Plan</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="fh5co-started" style={{backgroundImage: 'url(../../assets/images/img_bg_2.jpg)'}}>
    <div className="overlay" />
    <div className="container">
      <div className="row animate-box">
        <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
          <h2>Lets Get Started</h2>
          <p>Dignissimos asperiores vitae velit veniam totam fuga molestias accusamus alias autem provident. Odit ab aliquam dolor eius.</p>
        </div>
      </div>
      <div className="row animate-box">
        <div className="col-md-8 col-md-offset-2 text-center">
          <p><Link to="#" className="btn btn-default btn-lg">Create A Free Course</Link></p>
        </div>
      </div>
    </div>
  </div>
  </div>
 </div>        
    )
}
export default Pricing