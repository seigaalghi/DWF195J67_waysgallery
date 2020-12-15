import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
                {offer.status === 'PENDING' ? (
                  <span className='color-warning'>Pending</span>
                ) : offer.status === 'APPROVED' ? (
                  <span className='color-success'>Approved</span>
                ) : offer.status === 'COMPLETED' ? (
                  <span className='color-primary'>Completed</span>
                ) : (
                  <span className='color-danger'>Canceled</span>
                )}
              </td>
              <td>
                {offer.status === 'PENDING' ? (
                  <span className='color-warning'>Pending</span>
                ) : offer.status === 'APPROVED' ? (
                  <span className='color-success'>Approved</span>
                ) : offer.status === 'COMPLETED' ? (
                  <Link to={`/view-project/${offer.id}`} className='btn bg-primary'>
                    View Project
                  </Link>
                ) : (
                  <span className='color-danger'>Canceled</span>
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

export default connect(mapStateToProps)(Offer);
