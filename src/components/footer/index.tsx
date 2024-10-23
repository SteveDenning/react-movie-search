// Styles
import "./footer.scss";

const Footer = () => {
  const baseClass = "footer";

  const classes = [baseClass].filter(Boolean).join(" ");

  return (
    <footer
      className={classes}
      data-testid="footer"
    >
      <div className="footer__inner">
        <p data-testid="footer-text">Built by Steve Denning</p>
      </div>
    </footer>
  );
};

export default Footer;
