import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Modal, ModalBody } from 'reactstrap';
import { UploadImage } from '../form/uploadImage';
export const Footer = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <footer className='bg-light shadow-sm shadow custom-scroll-height__footer d-md-none fixed-bottom'>
      <div className='h-100 d-flex justify-content-around align-items-center'>
        <NavLink exact={true} to='/' activeClassName='text-info'>
          <i className='fas fa-home fa-1x' aria-hidden='true'></i>
        </NavLink>
        <>
          <div onClick={toggle}>
            {' '}
            <i className='fas fa-plus-circle fa-1x' aria-hidden='true'></i>
          </div>
          <Modal
            className='modal-dialog custom-modal-dialog modal-dialog-centered m-0 m-md-auto'
            isOpen={modal}
            toggle={toggle}
          >
            <ModalBody className='py-0'>
              <UploadImage setModal={setModal} />
            </ModalBody>
          </Modal>
        </>
      </div>
    </footer>
  );
};
