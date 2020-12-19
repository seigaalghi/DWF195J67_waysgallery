import React from 'react';

const ImageModal = ({ image: { isOpen, image }, close }) => {
  return isOpen ? (
    <div className='image-container'>
      <div className='img'>
        <img src={image} alt='img' />
        <div className='btn btn-secondary' onClick={close}>
          Close
        </div>
        <a href={image} download target='_blank' className='btn btn-success'>
          Download
        </a>
      </div>
    </div>
  ) : null;
};

export default ImageModal;
