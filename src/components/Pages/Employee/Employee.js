import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../../Common/Layout'
import { getUser } from '../../Services/userService'
import { Table } from 'reactstrap'
import { GetDataWithToken } from '../../../apiHelper/ApiHelper'
import { FaEye, FaRegEdit } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { selectedUser } from '../../../store/actions/userActions'
import { MDBDataTable } from 'mdbreact'

const Employee = () => {
  const [data, setData] = useState([])
  const [callApi, setcallApi] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [dataTable, setDataTable] = useState({
    columns: [
      {
        label: 'UserName',
        field: 'userName',
        sort: 'asc',
        width: 195
      },
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 350
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 360
      },
      {
        label: 'Mobile',
        field: 'mobile',
        sort: 'asc',
        width: 137
      },
      {
        label: 'Designation',
        field: 'designation',
        sort: 'asc',
        width: 137
      },
      {
        label: 'Department',
        field: 'department',
        sort: 'asc',
        width: 137
      },
      {
        label: 'RM',
        field: 'rm',
        sort: 'asc',
        width: 137
      },
      {
        label: 'Action',
        field: 'action',
        sort: 'asc',
        width: 130
      }
    ],
    row: []
  })

  const getData = () => {
    GetDataWithToken('employee/getAllEmployees').then(res => {
      if (res?.success) {
        setData(res?.data)
        handleSetDataTable(
          res?.data?.sort((d1, d2) => (d1.id > d2.id ? -1 : 1))
        )
      }
    })
  }

  const handleSetDataTable = table => {
    let tableValue = []
    table.map(data => {
      tableValue.push({
        userName: data?.username,
        name: data?.name,
        email: data?.email,
        mobile: data?.phone,
        designation: data?.designation,
        department: data?.department,
        rm: data?.reportingManager,
        action: (
          <>
            <Link
              to='/employee-details'
              onClick={() => dispatch(selectedUser(data))}
              className=''
              style={{ marginRight: '12px' }}
            >
              <FaEye style={{ color: '#2690d0' }} />
            </Link>
            <Link
              to='/edit-employee'
              onClick={() => dispatch(selectedUser(data))}
            >
              <FaRegEdit style={{ color: '#2690d0' }} />
            </Link>
          </>
        )
      })
    })
    setDataTable({
      ...dataTable,
      rows: tableValue
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Layout>
        <div className='page-content-crumb'>
          <div className='breadcrumb-area'>
            <ol className='breadcrumb'>
              <li className='item'>
                <Link to='/dashboard'>
                  <i className='fa fa-home' aria-hidden='true' />
                </Link>
              </li>
              <li className='item'>Employee</li>
            </ol>
          </div>
          <button className='btn btn-danger' onClick={() => navigate(-1)}>
            <span className='d-none d-md-block'>Back</span>
            <span className='d-block d-md-none'>
              <i className='fa fa-sign-out' aria-hidden='true'></i>
            </span>
          </button>
        </div>

        {/* <div className='row mb-2 mt-0'>
          <div className='col-12'>
            <div className='card display-card'>
              <div className='row card-body p-0 mb-2'>
                <div className='col-3 col-lg-3 form-group mb-2'>
                  <input
                    type='text'
                    id='keyword'
                    name='keyword'
                    className='control-form form-select'
                    placeholder='Search by Name'
                  />
                </div>

                <div className='col-3 col-lg-3 form-group mb-2'>
                  <input
                    type='number'
                    id='keyword'
                    name='keyword'
                    className='control-form form-select'
                    placeholder='Search by Mobile'
                  />
                </div>

                <div className='col-3 col-lg-3 form-group mb-2'>
                  <input
                    type='email'
                    id='keyword'
                    name='keyword'
                    className='control-form form-select'
                    placeholder='Search by email'
                  />
                </div>

                <div className='col-3 col-lg-3 form-group mb-2'>
                  <input
                    type='text'
                    id='keyword'
                    name='keyword'
                    className='control-form form-select'
                    placeholder='Search by Designation'
                  />
                </div>

                <div className='col-3 col-lg-3 form-group mb-0'>
                  <input
                    type='text'
                    id='keyword'
                    name='keyword'
                    className='control-form form-select'
                    placeholder='Search by Department'
                  />
                </div>

                <div className='col-3 col-lg-3 form-group mb-0'>
                  <input
                    type='text'
                    id='keyword'
                    name='keyword'
                    className='control-form form-select'
                    placeholder='Search by Reporting Manager'
                  />
                </div>

                <div className='col-3 col-lg-3 form-group mb-0'>
                  <input
                    type='text'
                    id='keyword'
                    name='keyword'
                    className='control-form form-select'
                    placeholder='Search by Role'
                  />
                </div>

                <div className='col-3 col-lg-3 form-group mb-0 pt-2'>
                  <button className='btn btn-warning m-0'>Search</button>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* Breadcrumb area end */}
        {/* page-content main section start */}

        <div className='row'>
          {/* New-Emp table start */}
          <div className='col-12'>
            <div className='card display-card'>
              <div className='card-body p-0'>
                <div className='text-center'>
                  {data?.length !== 0 ? (
                    // <Table bordered>
                    //   <thead>
                    //     <tr>
                    //       <th>Username</th>
                    //       <th>Name</th>
                    //       <th>Mobile</th>
                    //       <th>Email</th>
                    //       <th>Designation</th>
                    //       <th>Department</th>
                    //       <th>RM</th>
                    //       <th>Action</th>
                    //     </tr>
                    //   </thead>
                    //   <tbody>
                    //     {data?.map(item => (
                    //       <>
                    //         <tr>
                    //           <td>{item?.username || 'N/A'}</td>
                    //           <td>{item?.name || 'N/A'}</td>
                    //           <td>{item?.phone || 'N/A'}</td>
                    //           <td>{item?.email || 'N/A'}</td>
                    //           <td>{item?.designation || 'N/A'}</td>
                    //           <td>{item?.department || 'N/A'}</td>
                    //           <td>{item?.reportingManager || 'N/A'}</td>
                    //           <td
                    //             style={{
                    //               display: 'flex',
                    //               justifyContent: 'space-around'
                    //             }}
                    //           >
                    //             <Link
                    //               to='/employee-details'
                    //               onClick={() => dispatch(selectedUser(item))}
                    //             >
                    //               <FaEye style={{ color: '#2690d0' }} />
                    //             </Link>
                    //             <Link
                    //               to='/edit-employee'
                    //               onClick={() => dispatch(selectedUser(item))}
                    //             >
                    //               <FaRegEdit style={{ color: '#2690d0' }} />
                    //             </Link>
                    //           </td>
                    //         </tr>
                    //       </>
                    //     ))}
                    //   </tbody>
                    // </Table>
                    <MDBDataTable
                      hover
                      striped
                      bordered
                      noBottomColumns
                      entriesOptions={[10, 25, 50, 75, 100]}
                      entries={10}
                      data={dataTable}
                      infoLabel={['Showing', 'to', 'of', 'entries']}
                      pagesAmount={10}
                      paginationLabel={['<', '>']}
                    />
                  ) : (
                    <p>No Record Found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* New-POS table end */}
        </div>
      </Layout>
    </>
  )
}

export default Employee
