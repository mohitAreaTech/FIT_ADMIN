import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../../Common/Layout'
import { getUser } from '../../Services/userService'
import { Col, Row, Table } from 'reactstrap'
import {
  GetData,
  GetDataWithToken,
  PostData
} from '../../../apiHelper/ApiHelper'
import { FaEye, FaRegEdit } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { selectedUser } from '../../../store/actions/userActions'
import { toast } from 'react-toastify'
import { MDBDataTable } from 'mdbreact'

const PendingLeads = () => {
  const [data, setData] = useState()
  const [data2, setData2] = useState([])
  const [callApi, setcallApi] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userDetails = useSelector(state => state?.root?.userDetails)
  
  const [dataTable, setDataTable] = useState({
    columns: [
      {
        label: 'Lead ID',
        field: 'leadId',
        sort: 'asc',
        width: 195
      },
      {
        label: 'Customer Name',
        field: 'customerFullName',
        sort: 'asc',
        width: 195
      },
      {
        label: 'Customer Email',
        field: 'customerEmailAddress',
        sort: 'asc',
        width: 350
      },
      {
        label: 'Vehicle Number',
        field: 'vehicleNumber',
        sort: 'asc',
        width: 360
      },
      {
        label: 'Lead Status',
        field: 'lead_status',
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

  const handleSetDataTable = table => {
    let tableValue = []
    table.map(data => {
      tableValue.push({
        leadId: data?.lead_id,
        customerFullName: data?.lead_data?.customerFullName,
        customerEmailAddress: data?.lead_data?.customerEmailAddress,
        vehicleNumber: data?.lead_data?.vehicleNumber,
        lead_status:
          data?.lead_status === 'requestGenerated'
            ? 'Pending'
            : 'Comp' || 'N/A',
        action: (
          <>
            <span
              onClick={() => handleAssign(data)}
              style={{
                cursor: 'pointer',
                border: '1px solid #2690d0',
                padding: '2px 4px',
                borderRadius: '5px',
                color: '#2690d0',
              }}
            >
              Assign To Me
            </span>
            
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
    // setData(arr);
    GetData('admin/pendingPool').then(response => {
      if (
        response?.success === true &&
        response?.message === 'All Pending Leads Fetched!!'
      ) {
        // console.log('RESPONSE', response.data)
        // const responseData = response?.data
        // const transformedData = transformData(responseData)
        // console.log('transformedData', transformedData)
        setData(response?.data)
        handleSetDataTable(
          response?.data?.sort((d1, d2) => (d1.id > d2.id ? -1 : 1))
        )
      }
    })
  }, [])

  // const transformData = data => {
  //   return data?.map(item => {
  //     const leadData = JSON.parse(item?.lead_data)
  //     return {
  //       id: item?.id,
  //       lead_id: item?.lead_id,
  //       lead_assignedTo: item?.lead_assignedTo,
  //       lead_generatedBy: item?.lead_generatedBy,
  //       lead_generated_for: item?.lead_generated_for,
  //       lead_pending_at: item?.lead_pending_at,
  //       lead_status: item?.lead_status,
  //       lead_type: item?.lead_type,
  //       updatedAt: item?.updatedAt,
  //       createdAt: item?.createdAt,
  //       lead_data: leadData
  //     }
  //   })
  // }

  // const handleAction = item => {
  //   console.log('ITEM', item)
  //   navigate('/mis-details', { state: item })
  // }

  const handleAssign = data => {
    const postData = {
      misEmployeeId: userDetails?.username
    }

    PostData(`admin/leadsAssign/${data?.lead_id}`, postData).then(response => {
      if (
        response?.success === true &&
        response?.message === 'Leads Assign Successfully !!'
      ) {
        toast(response?.message, { type: 'success' })
        navigate('/my-pool')
      }
    })
  }

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
              <li className='item'>Pending Leads</li>
            </ol>
          </div>
          <button className='btn btn-danger' onClick={() => navigate(-1)}>
            <span className='d-none d-md-block'>Back</span>
            <span className='d-block d-md-none'>
              <i className='fa fa-sign-out' aria-hidden='true'></i>
            </span>
          </button>
        </div>

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
                    //       <th>Customer Name</th>
                    //       <th>Customer Email</th>
                    //       <th>Vehicle Number</th>
                    //       <th>Policy Status</th>
                    //       <th>Action</th>
                    //     </tr>
                    //   </thead>
                    //   <tbody>
                    //     {data?.map(item => (
                    //       <>
                    //         <tr>
                    //           <td>
                    //             {item?.lead_data?.customerFullName || 'N/A'}
                    //           </td>
                    //           <td>
                    //             {item?.lead_data?.customerEmailAddress || 'N/A'}
                    //           </td>
                    //           <td>{item?.lead_data?.vehicleNumber || 'N/A'}</td>
                    //           <td>
                    //             {item?.lead_status === 'requestGenerated'
                    //               ? 'Pending'
                    //               : 'Comp' || 'N/A'}
                    //           </td>
                    //           <td
                    //             style={{
                    //               display: 'flex',
                    //               justifyContent: 'space-around'
                    //             }}
                    //           >
                    //             <span
                    //               onClick={() => handleAssign(item)}
                    //               style={{
                    //                 cursor: 'pointer',
                    //                 border: '1px solid #2690d0',
                    //                 padding: '2px 4px',
                    //                 borderRadius: '5px',
                    //                 color: '#2690d0'
                    //               }}
                    //             >
                    //               Assign To Me
                    //             </span>
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

export default PendingLeads
