import React from 'react'

type Props = {}

function Footer({ }: Props) {
  return (
    <div>
      <footer className="footer footer__section">
        <div className="container">
          <div className="footer__content">
            <div className="footer__row">
              <div className="footer__col">
                <h2 className="footer__logo">
                  <a href="#">Elanning</a>
                </h2>
                <p>
                  Lorem ipsum viverra feugiat. Pellen tesque libero ut justo,
                  ultrices in ligula. Semper at tempufddfel. Lorem ipsum dolor sit
                  amet Semper at elit.
                </p>
                <div className="footer__social">
                  <a href="#"><i className="fab fa-facebook" /></a>
                  <a href="#"><i className="fab fa-twitter" /></a>
                  <a href="#"><i className="fab fa-instagram" /></a>
                  <a href="#"><i className="fab fa-linkedin" /></a>
                </div>
              </div>
              <div className="footer__col">
                <h2 className="footer__title">Usefull Links</h2>
                <ul className="footer__menu">
                  <li className="footer__link">
                    <a href="#">Home</a>
                  </li>
                  <li className="footer__link">
                    <a href="#">Detail</a>
                  </li>
                  <li className="footer__link">
                    <a href="#">Course</a>
                  </li>
                  <li className="footer__link">
                    <a href="#">Profile</a>
                  </li>
                  <li className="footer__link">
                    <a href="#">Contact us</a>
                  </li>
                </ul>
              </div>
              <div className="footer__col">
                <h2 className="footer__title">More Info</h2>
                <ul className="footer__menu">
                  <li className="footer__link">
                    <a href="#">History</a>
                  </li>
                  <li className="footer__link">
                    <a href="#">Vision &amp; Values</a>
                  </li>
                  <li className="footer__link">
                    <a href="#">Awards</a>
                  </li>
                  <li className="footer__link">
                    <a href="#">Media</a>
                  </li>
                  <li className="footer__link">
                    <a href="#">Support</a>
                  </li>
                </ul>
              </div>
              <div className="footer__col">
                <h2 className="footer__title">Subscribe to our Newsletter</h2>
                <p>
                  Enter your email and receive the latest news, updates and
                  special offers from us.
                </p>
                <div className="footer__subscibe">
                  <input type="text" placeholder="Your Email Address" />
                  <button className="btn btn-primary btn-subscibe">
                    Subscibe Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          <div className="container">
            <div className="copyright__content">
              <p>
                © 2022 Elanning. All rights reserved. Design by <a href="#">Tường Giang & Đức Thắng & Thành Đạt</a>
              </p>
              <div className="copyright-right">
                <a href="#">Careers</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Contact us</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default Footer