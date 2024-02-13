import React from "react";

const Footer = () => {
  return (
    <>
      {/* footer-area start */}
      <footer className="footer-area">
        <div className="row align-items-center justify-content-center">
          <div className="col-sm-6 col-md-6 col-lg-6 text-center">
            <p>
              Copyright © Designed &amp; Developed by
              <a
                href="https://www.flaskitsolutions.com/"
                className="ms-1 fw-bold"
                target="blank"
              >
                Flask IT Solutions{" "}
              </a>
            </p>
          </div>
        </div>
      </footer>
      {/* footer-area end */}
    </>
  );
};

export default Footer;
