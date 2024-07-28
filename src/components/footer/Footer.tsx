import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-10">
        <footer className="footer text-neutral-content py-10">
          <nav>
            <h6 className="footer-title">Services</h6>
            <Link to="linksPage" className="link link-hover">
              Branding
            </Link>
            <Link to="linksPage" className="link link-hover">
              Design
            </Link>
            <Link to="linksPage" className="link link-hover">
              Marketing
            </Link>
            <Link to="linksPage" className="link link-hover">
              Advertisement
            </Link>
          </nav>
          <nav>
            <h6 className="footer-title">Company</h6>
            <Link to="linksPage" className="link link-hover">
              About us
            </Link>
            <Link to="linksPage" className="link link-hover">
              Contact
            </Link>
            <Link to="linksPage" className="link link-hover">
              Jobs
            </Link>
            <Link to="linksPage" className="link link-hover">
              Press kit
            </Link>
          </nav>
          <nav>
            <h6 className="footer-title">Legal</h6>
            <Link to="linksPage" className="link link-hover">
              Terms of use
            </Link>
            <Link to="linksPage" className="link link-hover">
              Privacy policy
            </Link>
            <Link to="linksPage" className="link link-hover">
              Cookie policy
            </Link>
          </nav>
        </footer>
        <hr />
        <p className="py-5 flex justify-center items-center ">
          <small>
            Copyright © {new Date().getFullYear()} - All Right Reserved By
            Dr-Fatiha Sultana
          </small>
        </p>
      </div>
    </>
  );
};
export default Footer;
