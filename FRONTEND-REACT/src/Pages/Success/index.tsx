import { useContext } from 'react';
import Logo from '../../Component/Svgs/Logo';
import MailIcon from '../../Component/Svgs/MailIcon';
import { UserContext } from '../../Utils/ContextAPI';
import './index.css';

const Success = () => {
  const { state: { user: { email, phone, firstName } } } = useContext(UserContext);

  return (
    <div className="homeContainer">
      <Logo />

      <div className="successMainDiv">
        <div className="successMainIconDiv">

          <div className="successIconTextDiv">
            <div className="mainIconDiv">
              <MailIcon />
            </div>
            <div className="thanksDiv">
              <p className="thanksH3">
                <span style={{ marginRight: '4px ' }}> Thanks,</span>
                {firstName}
                !
              </p>
              <p className="thanksH3">We&apos;ve recieved your application.</p>
            </div>
          </div>
        </div>
        <br />
        <div className="successPDiv">
          <p className="successP" data-testid="process_text">
            We’ll process your application as soon as possible and send you a decision within
            30 days
            to&nbsp;
            {!!(phone) && phone}
            {!!(phone) && ' or '}
            {!!(email) && email}
            . We will contact you in case
            more information is needed.
            <br />
            <br />
            While we’re reviewing your application, please don’t submit another
            application for the uPet’s breeder program.
          </p>
        </div>
      </div>

    </div>
  );
};

export default Success;
