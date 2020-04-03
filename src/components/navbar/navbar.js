import React, { useState, useContext } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalBody
} from 'reactstrap';
import { UploadImage } from '../form/uploadImage';
import { GlobalContext } from '../../context/GlobalContext';
import { useHistory, Link, NavLink as RRNavLink } from 'react-router-dom';
import { ASSETS } from '../../config/assetConfig';

export const Appbar = () => {
  const [modal, setModal] = useState(false);
  const { state, logout } = useContext(GlobalContext);
  const history = useHistory();
  const toggle = () => setModal(!modal);
  const Logout = () => {
    logout();
    history.push('/sign-up');
  };

  return (
    <>
      <Navbar color='light' light expand='md' className='shadow-sm' fixed='top'>
        <NavbarBrand to='/' tag={Link}>
          <img
            style={{
              width: '90px'
            }}
            src={ASSETS.LOGO}
            alt='logo'
          />
        </NavbarBrand>

        <Nav className='ml-auto' navbar>
          <NavItem className='cursor-pointer sm-d-none'>
            <NavLink onClick={toggle}>New Post</NavLink>
            <Modal
              className='modal-dialog custom-modal-dialog modal-dialog-centered m-0 m-md-auto'
              isOpen={modal}
              toggle={toggle}
            >
              <ModalBody className='py-0'>
                <UploadImage setModal={setModal} />
              </ModalBody>
            </Modal>
          </NavItem>

          {state.isAuthenticated ? (
            <>
              {state.type === 'guest' ? (
                <>
                  {/* <NavItem className='cursor-pointer'>
                    <NavLink exact={true} to='/sign-in' tag={RRNavLink}>
                      Signin
                    </NavLink>
                  </NavItem> */}
                  <NavItem className='cursor-pointer sm-d-none'>
                    <NavLink exact={true} to='/sign-up' tag={RRNavLink}>
                      Signup
                    </NavLink>
                  </NavItem>
                  <NavItem className='cursor-pointer'>
                    <NavLink>
                      Logged In As Guest{' '}
                      <img
                        className='custom-user-pic-small'
                        src={ASSETS.defaultImg}
                        alt='Guest'
                      />
                    </NavLink>
                  </NavItem>
                </>
              ) : (
                <>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav>
                      <img
                        className='img-fluid rounded-circle
                         custom-nav-user-pic custom-shadow-box'
                        src={state.user?.imageUrl}
                        alt={state.user?.name}
                      />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={Logout}>Logout</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </>
              )}
            </>
          ) : (
            ''
          )}
        </Nav>
      </Navbar>
    </>
  );
};
