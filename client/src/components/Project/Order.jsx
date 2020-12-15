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
            <th>No</th>
            <th>No</th>
            <th>No</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Order);
