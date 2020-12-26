import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Loading from '../Loading';
import Icon from '../iconcomp/Icon';
import { approveHire, rejectHire } from '../../redux/action/auth';
import { Link } from 'react-router-dom';
import Approvement from './Approvement';

const Order = ({ auth: { loading, user }, approveHire, rejectHire }) => {
  const [modal, setModal] = useState({
    isOpen: false,
    message: {},
  });
  const approveHandler = (id) => {
    approveHire(id);
  };
  const rejectHandler = (id) => {
    rejectHire(id);
  };
  const closeHandler = (e) => {
    if (e.target === e.currentTarget) {
      setModal({ message: {}, isOpen: false });
    }
  };
  return loading || !user ? (
    <Loading />
  ) : (
    <div>
      {modal.isOpen ? <Approvement message={modal.message} close={closeHandler} /> : null}
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Vendor</th>
            <th>Order</th>
            <th>Start Project</th>
            <th>End Project</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {user.orders.map((order, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{order.orderedBy.name}</td>
              <td>
                <span onClick={() => setModal({ isOpen: true, message: order })}>
                  {order.title}
                </span>
              </td>
              <td>{new Date(order.start).toLocaleDateString()}</td>
              <td>{new Date(order.end).toLocaleDateString()}</td>
              <td>
                {order.status === 'PENDING' ? (
                  <span className='color-warning'>Pending</span>
                ) : order.status === 'APPROVED' ? (
                  <span className='color-success'>Approved</span>
                ) : order.status === 'WAITING' ? (
                  <span className='color-complete'>Waiting</span>
                ) : order.status === 'COMPLETED' ? (
                  <span className='color-primary'>Completed</span>
                ) : (
                  <span className='color-danger'>Canceled</span>
                )}
              </td>
              <td>
                {order.status === 'PENDING' ? (
                  <Fragment>
                    <button className='btn btn-success' onClick={() => approveHandler(order.id)}>
                      Approve
                    </button>
                    <button className='btn btn-danger' onClick={() => rejectHandler(order.id)}>
                      Cancel
                    </button>
                  </Fragment>
                ) : order.status === 'APPROVED' ? (
                  <Link to={`/project/${order.id}`} className='btn btn-primary'>
                    Send Project
                  </Link>
                ) : order.status === 'WAITING' ? (
                  <span className='color-complete'>
                    <Icon icon='fas fa-hourglass-half' />
                  </span>
                ) : order.status === 'COMPLETED' ? (
                  <span className='color-success'>
                    <Icon icon='fas fa-check-square' />
                  </span>
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

export default connect(mapStateToProps, { approveHire, rejectHire })(Order);
