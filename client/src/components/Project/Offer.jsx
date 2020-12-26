import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Icon from '../iconcomp/Icon';
import Loading from '../Loading';
import Approvement from './Approvement';
import { approvement } from '../../redux/action/auth';

const Offer = ({ auth: { loading, user }, approvement }) => {
  const [approve, setApprove] = useState({
    message: {},
    isOpen: false,
    approve: null,
    status: '',
  });
  const closeHandler = (e) => {
    if (e.target === e.currentTarget) {
      setApprove({ message: {}, isOpen: false });
    }
  };
  return loading || !user ? (
    <Loading />
  ) : (
    <div>
      {approve.isOpen ? (
        <Approvement message={approve.message} approve={approve.approve} close={closeHandler} />
      ) : null}
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Client</th>
            <th>Order</th>
            <th>Start Project</th>
            <th>End Project</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {user.offers.map((offer, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{offer.offeredTo.name}</td>
              <td>
                <span
                  className='color-complete'
                  onClick={() =>
                    setApprove({
                      message: offer,
                      isOpen: true,
                      approve: offer.status !== 'WAITING' ? null : () => approvement(offer.id),
                    })
                  }>
                  {offer.title}
                </span>
              </td>
              <td>{new Date(offer.start).toLocaleDateString()}</td>
              <td>{new Date(offer.end).toLocaleDateString()}</td>
              <td>
                {offer.status === 'PENDING' ? (
                  <span className='color-warning'>Pending</span>
                ) : offer.status === 'APPROVED' ? (
                  <span className='color-success'>Approved</span>
                ) : offer.status === 'WAITING' ? (
                  <span className='color-complete'>Waiting</span>
                ) : offer.status === 'COMPLETED' ? (
                  <span className='color-primary'>Completed</span>
                ) : (
                  <span className='color-danger'>Canceled</span>
                )}
              </td>
              <td>
                {offer.status === 'PENDING' ? (
                  <span className='color-warning'>
                    <Icon icon='fas fa-hourglass-half' />
                  </span>
                ) : offer.status === 'APPROVED' ? (
                  <span className='color-success'>
                    <Icon icon='fas fa-check-circle' />
                  </span>
                ) : offer.status === 'WAITING' ? (
                  <Link to={`/view-project/${offer.id}`} className='btn bg-primary'>
                    View Project
                  </Link>
                ) : offer.status === 'COMPLETED' ? (
                  <Link to={`/view-project/${offer.id}`} className='btn bg-primary'>
                    View Project
                  </Link>
                ) : (
                  <span className='color-danger'>
                    <Icon icon='fas fa-times-circle' />
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { approvement })(Offer);
