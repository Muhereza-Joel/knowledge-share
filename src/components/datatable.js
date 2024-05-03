import React from 'react';
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';

const DataTable = ({ data }) => {
  const columns = [
    {
      label: 'Username',
      field: 'username',
      width: 150,
      
    },
    {
      label: 'Email',
      field: 'email',
      width: 270,
    },
    {
      label: 'Role',
      field: 'role',
      width: 200,
    }
  ];

  return (
    <div className='card py-4 px-2 mt-4 ms-2'>
    <CDBContainer>
      <CDBCard>
        <CDBCardBody>
          <CDBDataTable
            striped
            bordered
            hover
            scrollY
            maxHeight="50vh"
            data={{ columns: columns, rows: data }}
            materialSearch
          />
        </CDBCardBody>
      </CDBCard>
    </CDBContainer>

    </div>
  );
};

export default DataTable;
