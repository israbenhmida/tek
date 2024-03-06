// context
import { useLayoutUpdate } from '../../../../context/LayoutProvider/LayoutProvider';

// components
import NioButton from '../../../NioButton/NioButton';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

export default function HeaderAction({ className, nioBtnClasses, nioToggleClasses }) {

  const layoutUpdate = useLayoutUpdate();

  return (
    <div className={className}>
      <ul className="nk-btn-group sm justify-content-center">
        <li className="d-none d-md-block">
          {/* Updated Button for Sign In */}
          <Link to="/auth/login">
            <NioButton
              icon="user"  // Change the icon here ('user' is just an example)
              label="Sign In"  // Change the label here
              className={nioBtnClasses}
            />
          </Link>
          <Link to="/logout">
            <NioButton
              icon="user"  // Change the icon here ('user' is just an example)
              label="Sign Out"  // Change the label here
              className={nioBtnClasses}
            />
          </Link>
        </li>


        <li className="nk-navbar-toggle">
          <NioButton
            icon='menu'
            className={nioToggleClasses}
            onClick={layoutUpdate.headerMobile}
          />
        </li>
      </ul>
    </div>
  );
}
