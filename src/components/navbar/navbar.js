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
import { useHistory, Link, useLocation } from 'react-router-dom';

export const Appbar = () => {
  const [modal, setModal] = useState(false);
  const { state, logout } = useContext(GlobalContext);
  const { pathname } = useLocation();
  const history = useHistory();

  const toggle = () => setModal(!modal);

  const showAppbar = pathname === '/' || pathname === '/signup' ? false : true;

  const Logout = () => {
    logout();
    history.push('/');
  };

  return (
    <>
      {showAppbar ? (
        <Navbar color='light' light expand='md' fixed='top'>
          <NavbarBrand to='/' tag={Link}>
            IVY Nemesis
          </NavbarBrand>

          <Nav className='ml-auto' navbar>
            {/* <NavItem className='d-flex align-items-center'>
              <Form>
                <Input
                  type='search'
                  className='border-0 shadow-sm'
                  placeholder='Search...'
                  name='search'
                />
              </Form>
              <i className='fas fa-search ml-2'></i>
            </NavItem> */}

            <NavItem className='cursor-pointer'>
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
                  <NavItem className='cursor-pointer'>
                    <NavLink>Logged In As Model</NavLink>
                  </NavItem>
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
                      <DropdownMenu right>
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
      ) : (
        ''
      )}
    </>
  );
};
