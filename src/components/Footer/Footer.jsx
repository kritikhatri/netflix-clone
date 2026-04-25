import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer__inner">
      <p className="footer__social">
        Questions? Call 000-800-919-1694
      </p>

      <ul className="footer__links">
        {[
          'FAQ', 'Help Centre', 'Account', 'Media Centre',
          'Investor Relations', 'Jobs', 'Ways to Watch',
          'Terms of Use', 'Privacy', 'Cookie Preferences',
          'Corporate Information', 'Contact Us',
          'Speed Test', 'Legal Notices',
        ].map(link => (
          <li key={link}>
            <a href="#" className="footer__link">{link}</a>
          </li>
        ))}
      </ul>

      <div className="footer__lang">
        <button className="footer__lang-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:14}}>
            <circle cx="12" cy="12" r="10"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          English
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:12}}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
      </div>

      <p className="footer__copy">Netflix India</p>
    </div>
  </footer>
);

export default Footer;