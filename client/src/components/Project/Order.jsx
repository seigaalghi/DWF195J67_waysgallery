import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Loading from '../Loading';
import Icon from '../iconcomp/Icon';
import { approveHire, rejectHire } from '../../redux/action/auth';
import { Link } from 'react-router-dom';

const Order = ({ auth: { loading, user }, approveHire, rejectHire }) => {
  const approveHandler = (id) => {
    approveHire(id);
  };
  const rejectHandler = (id) => {
    rejectHire(id);
  };
  return loading || !user ? (
    <Loading />
  ) : (
    <div>
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
              <td>{order.title}</td>
              <td>{new Date(order.start).toLocaleDateString()}</td>
              <td>{new Date(order.end).toLocaleDateString()}</td>
              <td>
                {order.status === 'PENDING' ? (
                  <span className='color-warning'>Pending</span>
                ) : order.status === 'APPROVED' ? (
                  <span className='color-success'>Approved</span>
                ) : order.status === 'COMPLETED' ? (
                  <span className='color-primary'>Completed</span>
                ) : (
                  <span className='color-danger'>Canceled</span>
                )}
              </td>
              <td>
                {order.status === 'PENDING' ? (
                  <Fragment>
                    <button className='btn bg-success' onClick={() => approveHandler(order.id)}>
                      Approve
                    </button>
                    <button className='btn bg-danger' onClick={() => rejectHandler(order.id)}>
                      Cancel
                    </button>
                  </Fragment>
                ) : order.status === 'APPROVED' ? (
                  <Link to={`/project/${order.id}`} className='btn bg-primary'>
                    Send Project
                  </Link>
                ) : order.status === 'COMPLETED' ? (
                  <Icon icon='fas fa-check-square' />
                ) : (
                  <span className='color-danger'>X</span>
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
