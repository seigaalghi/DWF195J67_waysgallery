import React from 'react';
import NumberFormat from 'react-number-format';

const Approvement = ({ message, close, approve }) => {
  return (
    <div className='approvement-container' onClick={close}>
      <div className='approvement'>
        <h3 className='color-primary'>Title : {message.title}</h3>
        <p>Description : {message.description}</p>
        <h3 className='color-success'>
          Price :{' '}
          <NumberFormat
            value={message.price}
            prefix='Rp.'
            suffix=',-'
            thousandSeparator='.'
            decimalSeparator=','
            displayType={'text'}
          />
        </h3>
        <div className='action'>
          <div className='btn btn-secondary' onClick={close}>
            Close
          </div>
          {approve ? (
            <div
              className='btn btn-primary'
              onClick={() => {
                approve();
                close();
              }}>
              Approve
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Approvement;
