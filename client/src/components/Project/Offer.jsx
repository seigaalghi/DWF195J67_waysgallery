import React from 'react';
import { connect } from 'react-redux';
import Loading from '../Loading';

const Offer = ({ auth: { loading, user } }) => {
  return loading || !user ? (
    <Loading />
  ) : (
    <div>
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
              <td>{offer.title}</td>
              <td>{new Date(offer.start).toLocaleDateString()}</td>
              <td>{new Date(offer.end).toLocaleDateString()}</td>
              <td>
                {offer.hiredStatus === null ? (
                  <span className='color-warning'>Pending</span>
                ) : offer.hiredStatus === <span>APPROVED</span> ? (
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

export default connect(mapStateToProps)(Offer);
