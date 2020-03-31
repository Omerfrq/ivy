import React, { useState, useContext } from 'react';
import { usePlaceHolder } from '../hooks/usePlaceholder';
import { Form, Label, FormGroup, Input, Button } from 'reactstrap';
import { FilterList } from './filterList';
import { TagList } from './tagList';
import { Placeholder } from './placeholder';
import { useForm } from 'react-hook-form';
import { GlobalContext } from '../../context/GlobalContext';
import axios from 'axios';
import Notification from '../../utils/notification';
import { NotificationContainer } from 'react-notifications';

export const UploadImage = ({ setModal }) => {
  const {
    placeholder,
    file,
    inputFile,
    onChange,
    onImageClick,
    resetPlaceholder
  } = usePlaceHolder();

  const { state } = useContext(GlobalContext);
  const [isLoading, setLoading] = useState(false);

  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = data => {
    setLoading(true);
    const { tags, activeFilter } = state;
    const { description, title } = data;
    if (file === undefined) {
      Notification('error', 'No Image Selected', 'Error', 1000);
      setLoading(false);
    } else {
      const formdata = new FormData();
      const id = state.type === 'guest' ? state.guest.id : state.user._id;
      formdata.append('postBy', id);
      formdata.append('mediaUrl', file);
      formdata.append('description', description);
      formdata.append('title', title);
      formdata.append('tags', tags);
      formdata.append('filter', activeFilter);

      axios
        .post('/post/add', formdata)
        .then(res => {
          setLoading(false);
          Notification(
            'success',
            'Image Uploaded Successfully.',
            'Success',
            1000
          );
          reset();
          resetPlaceholder();
        })
        .catch(err => {
          setLoading(false);
          Notification('error', 'Unable to Upload Image.', 'Error', 1000);
        });
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className='flex-column-reverse flex-md-row row'
    >
      <NotificationContainer />
      <div className='col col-md-5 custom-shadow-right py-5'>
        <div>
          <Label className='pb-2 text-capitalize'>
            Give your image a title
          </Label>
          <FormGroup>
            <Input
              name='title'
              className='w-100 custom-rounded-1rem border-white shadow-sm pl-4 mb-2'
              innerRef={register({ required: true })}
            />
            {errors.title && (
              <span className='text-danger'>* Title is Required.</span>
            )}
          </FormGroup>
        </div>

        <div>
          <Label className='pb-2 text-capitalize'>Add description here</Label>
          <div className='pb-4'>
            <textarea
              name='description'
              ref={register({ required: true })}
              className='w-100 custom-rounded-1rem border-white shadow-sm pl-4'
              rows='4'
            ></textarea>
            {errors.description && (
              <span className='text-danger'>* Description is Required.</span>
            )}
          </div>
        </div>

        <div className='pb-4'>
          <div className='pb-2'>Choose Filters</div>
          <div>
            {placeholder ? (
              <>
                <FilterList image={placeholder} />
              </>
            ) : (
              ''
            )}
          </div>
        </div>

        <div>
          <div className='pb-2'>Populars tags</div>
          <div className='row mx-0'>
            <TagList />
          </div>
        </div>
      </div>

      <div className='col custom-60vh'>
        <button
          type='button'
          className='close'
          onClick={() => {
            setModal(false);
          }}
        >
          <span className='h3' aria-hidden='true'>
            ×
          </span>
        </button>
        <div className='h-100 py-5 ml-4 mr-2'>
          <div className='pb-2 text-capitalize'>Click to add your file</div>

          <Placeholder
            placeholder={placeholder}
            onImageClick={onImageClick}
            inputFile={inputFile}
            onChange={onChange}
            borderRadius='custom-rounded-1rem'
          />

          <div className='text-center mt-4'>
            <Button
              type='submit'
              className='btn btn-block btn-dark mb-2'
              disabled={isLoading}
            >
              <span
                className={
                  isLoading ? 'mr-2 spinner-border spinner-border-sm' : ''
                }
                role='status'
                aria-hidden='true'
              ></span>
              {isLoading ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};
