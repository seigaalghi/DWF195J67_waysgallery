import React from 'react';
import { connect } from 'react-redux';
import Loading from '../Loading';

const Order = ({ auth: { loading, user } }) => {
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
                {order.offeredStatus === null ? (
                  <span className='color-warning'>Pending</span>
                ) : order.offeredStatus === <span>APPROVED</span> ? (
                  <span className='color-success'>Approved</span>
                ) : (
                  <span className='color-danger'>Canceled</span>
                )}
              </td>
              <td>
                <button className='btn bg-primary'>Approve</button>
                <button className='btn bg-danger'>Cancel</button>
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

export default connect(mapStateToProps)(Order);
