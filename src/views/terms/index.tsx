import React from "react";

// Styles
import "./test.scss";
import { Container } from "@mui/material";
import Button from "../../components/button";

const Terms = () => {
  return (
    <div
      className="terms"
      data-testid="terms"
    >
      <Container>
        <div className="terms__header">
          <Button
            variant="icon"
            className="header__logo"
            onClick={() => {
              window.location.href = "/";
              sessionStorage.removeItem("query");
            }}
            testId="header-logo"
          >
            MyMDb
            <span className="sr-only"> - My Movie Database Home page</span>
          </Button>
        </div>
        <h2 className="terms__title">Terms and Conditions</h2>
        <h3>1. Introduction</h3>
        <p>
          Welcome to My Movie Database. By accessing and using our website (my-mdb.co.uk), you agree to comply with and be bound by the following
          terms and conditions (&quot;Terms&quot;). Please read them carefully. If you do not agree with any part of these Terms, you must not use our
          website.
        </p>
        <h3>2. Use of the Website</h3>
        <h4>2.1 Eligibility</h4>
        <p>You must be at least 18 years old to use our website. By using this site, you confirm that you meet this age requirement.</p>
        <h4>2.2 Permitted Use</h4>
        <p>You agree to use our website solely for personal, non-commercial purposes. You must not misuse our website or its content.</p>
        <h4>2.3 Prohibited Conduct</h4>
        <div>
          <ul>
            <li>Violate any applicable laws or regulations.</li>
            <li>Infringe upon the rights of others.</li>
            <li>Distribute harmful software such as viruses or malware.</li>
            <li>Engage in unauthorized data collection activities.</li>
          </ul>
        </div>
        <h3>3. Intellectual Property Rights</h3>
        <h4>3.1 Ownership</h4>
        <p>
          All content on our website, including text, graphics, logos, and images, is owned by us or our licensors and is protected by intellectual
          property laws.
        </p>
        <h4>3.2 Limited License</h4>
        <p>
          You are granted a limited, non-exclusive, non-transferable license to access and use the website for personal purposes. You must not
          reproduce, distribute, or create derivative works from our content without our explicit consent.
        </p>
        <h3>4. User-Generated Content</h3>
        <h4>4.1 Responsibility</h4>
        <p>
          If you submit content to our website, you retain ownership but grant us a worldwide, royalty-free license to use, reproduce, and distribute
          your content in connection with our services.
        </p>
        <h4>4.2 Content Standards</h4>
        <p>You warrant that any content you submit complies with applicable laws and does not infringe on the rights of others.</p>
        <h3>5. Disclaimers and Limitation of Liability</h3>
        <h4>5.1 No Warranty</h4>
        <p>
          Our website is provided on an &quot;as-is&quot; basis without warranties of any kind, either express or implied. We do not guarantee the
          accuracy, completeness, or reliability of any content.
        </p>
        <h4>5.2 Limitation of Liability</h4>
        <p>
          To the extent permitted by law, we shall not be liable for any indirect, incidental, or consequential damages arising from your use of our
          website.
        </p>
        <h3>6. Privacy and Data Protection</h3>
        <h4>6.1 Privacy Policy</h4>
        <p>Your use of our website is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal data.</p>
        <h3>7. Changes to These Terms</h3>
        <h4>7.1 Amendments</h4>
        <p>
          We reserve the right to modify these Terms at any time. Any changes will be posted on this page, and your continued use of the website
          constitutes acceptance of the updated Terms.
        </p>
        <h3>8. Governing Law</h3>
        <h4>8.1 Jurisdiction</h4>
        <p>
          These Terms are governed by the laws of England and Wales. Any disputes arising from these Terms or your use of the website shall be subject
          to the exclusive jurisdiction of the courts of England and Wales.
        </p>
      </Container>
    </div>
  );
};

export default Terms;
