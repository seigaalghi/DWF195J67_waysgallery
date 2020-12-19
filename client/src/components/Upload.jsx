import React from 'react';
import { connect } from 'react-redux';

const Upload = ({ uploadProgress: { progress, isOpen } }) => {
  return isOpen ? (
    <div className='upload-container'>
      <div className='upload'>
        <h2>Uploading...</h2>
        <div className='progress' style={{ width: `${progress}%` }}></div>
        <h4>{progress === 100 ? 'Please wait.. processing file' : `${progress}%`}</h4>
      </div>
    </div>
  ) : null;
};

const mapStateToProps = (state) => ({
  uploadProgress: state.alert.uploadProgress,
});

export default connect(mapStateToProps, null)(Upload);
