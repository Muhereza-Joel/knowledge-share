import React, { useEffect, useRef, useMemo, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import $ from 'jquery';
import 'datatables.net-bs4';
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Import Bootstrap's JS

const DataTable = ({ data }) => {
  const tableRef = useRef(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState('');

  const handleActionClick = (e, action, userId) => {
    e.preventDefault();
    const user = data.find((u) => u.id === userId);
    setSelectedUser(user);
    setModalType(action);
    if (action === 'profile') {
      window.location.href = `/knowledge-share/users/profile/${userId}`;
    } else {
      $('#actionModal').modal('show');
    }
  };

  const columns = useMemo(() => [
    { title: 'Username', data: 'username' },
    { title: 'Email', data: 'email' },
    { title: 'Role', data: 'role' },
    {
      title: 'Actions',
      data: null,
      render: (data, type, row) => `
        <button class="btn btn-link btn-sm" data-id="${row.id}" data-action="profile">View Profile</button>
        
      `,
    },
  ], []);

  useEffect(() => {
    const table = $(tableRef.current).DataTable({
      data: data,
      columns: columns,
      drawCallback: function () {
        // Handle button actions
        $('button[data-action]').on('click', function (e) {
          const action = $(this).data('action');
          const userId = $(this).data('id');
          handleActionClick(e, action, userId);
        });
      },
    });

    return () => {
      table.destroy();
    };
  }, [data, columns]);

  const handleModalAction = () => {
    if (modalType === 'changeRole') {
      // Handle changing the role
      console.log('Changing role for user:', selectedUser);
    } else if (modalType === 'delete') {
      // Handle deleting the user
      console.log('Deleting user:', selectedUser);
    }
    $('#actionModal').modal('hide');
  };

  return (
    <div className="card py-2 px-0 mt-4 ms-2">
      <div className="container">
        <div className="">
          <div className="card-body">
            <table id="dataTable" ref={tableRef} className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td>{row.username}</td>
                    <td>{row.email}</td>
                    <td>{row.role}</td>
                    <td dangerouslySetInnerHTML={{
                      __html: `
                        <button class="btn btn-link btn-sm" data-id="${row.id}" data-action="profile">View Profile</button>
                      ` }}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Action Modal */}
      <div className="modal fade" id="actionModal" tabIndex="-1" role="dialog" aria-labelledby="actionModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="actionModalLabel">
                {modalType === 'changeRole' ? 'Change Role' : 'Delete User'}
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {modalType === 'changeRole' ? (
                <div>
                  <label htmlFor="roleSelect">Select new role:</label>
                  <select id="roleSelect" className="form-control">
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                    {/* Add more roles as needed */}
                  </select>
                </div>
              ) : (
                <p>Are you sure you want to delete the user: {selectedUser?.username}?</p>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleModalAction}>
                {modalType === 'changeRole' ? 'Change Role' : 'Delete User'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
