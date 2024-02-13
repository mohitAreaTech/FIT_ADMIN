import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Layout from '../../Common/Layout'
import { getUser } from '../../Services/userService'
import {
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Table
} from 'reactstrap'
import {
  GetData,
  GetDataWithToken,
  PostData
} from '../../../apiHelper/ApiHelper'
import { FaEye, FaRegEdit } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { selectedUser } from '../../../store/actions/userActions'
import { MDBDataTable } from 'mdbreact'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { CSVLink } from 'react-csv'
import moment from 'moment'

const TotalBooked = () => {
  const [data, setData] = useState([])
  const [callApi, setcallApi] = useState(true)
  const [activeTab, setActiveTab] = useState('1')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const userDetails = useSelector(state => state?.root?.userDetails)
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleDrawer = () => {
    setIsOpen(prevState => !prevState)
  }
  const [drawerData, setDrawerData] = useState()
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

  console.log('Drawer Data', drawerData)

  const [exportData, setExportData] = useState([])
  console.log('ExportData', exportData)

  const headers = [
    { label: 'Issuance Date', key: 'IssuanceDate' },
    { label: 'Registration Number', key: 'RegistrationNumber' },
    { label: 'Customer Name', key: 'CustomerName' },
    { label: 'Insurer', key: 'Insurer' },
    { label: 'Vehicle Type', key: 'VehicleType' },
    { label: 'Case Type', key: 'CaseType' },
    { label: 'Policy Type', key: 'PolicyType' },
    { label: 'Case Mode', key: 'CaseMode' },
    { label: 'Policy Number', key: 'PolicyNumber' }
    // { label: 'Final Premium', key: 'job' },
    // { label: 'OD Premium', key: 'job' },
    // { label: 'Add On Premium', key: 'job' },
    // { label: 'TP Premium', key: 'job' },
    // { label: 'GST', key: 'job' },
    // { label: 'Vehicle Name', key: 'job' },
    // { label: 'Issued By', key: 'job' },
  ]

  const csvData = exportData?.map(item => ({
    IssuanceDate: moment(item?.createdAt).format('DD-MM-YYYY'),
    RegistrationNumber: item?.lead_id?.vehicleNumber,
    CustomerName: item?.lead_data?.customerFullName,
    Insurer: item?.lead_data?.currentInsuerName,
    VehicleType: item?.lead_data?.vehicleCategory,
    CaseType: item?.lead_data?.caseType,
    PolicyType: item?.lead_data?.policyType,
    CaseMode: item?.lead_type === 'offline_SubmitPolicy' ? 'Offline' : 'Online',
    PolicyNumber: item?.lead_data?.policy_number
  }))

  const handleSetDataTable = table => {
    let tableValue = []
    table.map(data => {
      tableValue.push({
        leadId: (
          <span
            onClick={() => {
              toggleDrawer()
              setDrawerData(data)
            }}
            style={{
              cursor: 'pointer',
              border: '1px solid #2690d0',
              padding: '2px 4px',
              borderRadius: '5px',
              color: '#2690d0'
            }}
          >
            {data?.lead_id}
          </span>
        ),
        customerFullName: data?.lead_data?.customerFullName,
        customerEmailAddress: data?.lead_data?.customerEmailAddress,
        vehicleNumber: data?.lead_data?.vehicleNumber,
        lead_status:
          data?.lead_status === 'leadAccepted'
            ? 'Lead Accepted'
            : 'Comp' || 'N/A',
        action: (
          <>
            <span
              onClick={() => handleAfterLeadAccepted(data)}
              style={{
                cursor: 'pointer',
                border: '1px solid #2690d0',
                padding: '2px 4px',
                borderRadius: '5px',
                color: '#2690d0'
              }}
            >
              Action
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
    GetData('admin/generated_policy').then(response => {
      if (
        response?.success === true &&
        response?.message === 'All Generated Policies Fetched!!'
      ) {
        // console.log('RESPONSE', response.data)
        const responseData = response?.data
        const transformedData = transformData(responseData)
        // console.log('transformedData', transformedData)
        setData(transformedData)
        setExportData(transformedData)
        handleSetDataTable(
          transformedData?.sort((d1, d2) => (d1.id > d2.id ? -1 : 1))
        )
      }
    })
  }, [])

  const transformData = data => {
    return data?.map(item => {
      const leadData = JSON.parse(item?.policyData)
      return {
        id: item?.id,
        lead_id: item?.lead_id,
        lead_assignedTo: item?.lead_assignedTo,
        lead_generatedBy: item?.lead_generatedBy,
        lead_generated_for: item?.lead_generated_for,
        lead_pending_at: item?.lead_pending_at,
        lead_status: item?.lead_status,
        lead_type: item?.lead_type,
        updatedAt: item?.updatedAt,
        createdAt: item?.createdAt,
        policyType: item?.policyType,
        policyNumber: item?.policyNumber,
        lead_data: leadData
      }
    })
  }

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

  useEffect(() => {
    console.log('DATAACONSOELE', data)
  }, [data])

  const handleAfterLeadAccepted = item => {
    console.log('ITEM ADTER LEAD', item)
    const newData = { ...item, afterLead: true }
    navigate('/edit-lead', { state: newData })
  }

  // Download File
  // const downloadFile = fileUrl => {
  //   if (fileUrl) {
  //     // Create an anchor element
  //     const link = document.createElement('a')
  //     link.href = fileUrl
  //     link.setAttribute('download', 'Document') // Set desired file name here
  //     document.body.appendChild(link)
  //     // Trigger click event on the anchor element
  //     link.click()
  //     // Clean up
  //     document.body.removeChild(link)
  //     window.open(fileUrl, '_blank')
  //   } else {
  //     console.error('File URL is empty')
  //   }
  // }

  const downloadFile = (fileUrl, fileName) => {
    if (fileUrl) {
      // Create an anchor element
      const link = document.createElement('a')
      link.href = fileUrl

      // Check if the file is an image
      if (/\.(png|jpg|jpeg|gif)$/i.test(fileUrl)) {
        // If it's an image, convert it to a data URI and set it as the href
        fetch(fileUrl)
          .then(response => response.blob())
          .then(blob => {
            const objectURL = URL.createObjectURL(blob)
            link.href = objectURL
            link.setAttribute('download', fileName || 'image') // Set desired file name here
            // Trigger click event on the anchor element
            link.click()
            // Clean up
            URL.revokeObjectURL(objectURL)
          })
          .catch(error => console.error('Error downloading image:', error))
      } else {
        // For non-image files, just set the download attribute
        link.setAttribute('download', fileName || 'file') // Set desired file name here
        document.body.appendChild(link)
        // Trigger click event on the anchor element
        link.click()
        // Clean up
        document.body.removeChild(link)
      }
    } else {
      console.error('File URL is empty')
    }
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
              <li className='item'>Total Booked</li>
            </ol>
          </div>
          <button className='btn btn-danger' onClick={() => navigate(-1)}>
            <span className='d-none d-md-block'>Back</span>
            <span className='d-block d-md-none'>
              <i className='fa fa-sign-out' aria-hidden='true'></i>
            </span>
          </button>
        </div>

        <div className='row mb-2 mt-0'></div>
        {/* Breadcrumb area end */}
        {/* page-content main section start */}

        <div className='row'>
          {/* New-Emp table start */}
          <div className='col-12'>
            <TabContent activeTab={activeTab}>
              <TabPane tabId='1'>
                <div className='card display-card'>
                  <span>
                    <CSVLink
                    className='btn'
                    style={{ backgroundColor: 'orange' }}
                      headers={headers}
                      data={csvData}
                      filename={'All_Booked_Leads.csv'}
                    >
                      Export
                    </CSVLink>
                  </span>
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
                        //           {item?.lead_data?.customerFullName || 'N/A'}
                        //           <td>
                        //             {item?.lead_data?.customerEmailAddress ||
                        //               'N/A'}
                        //           </td>
                        //           <td>
                        //             {item?.lead_data?.vehicleNumber || 'N/A'}
                        //           </td>
                        //           <td>
                        //             {item?.lead_status === 'leadAccepted'
                        //               ? 'Lead Accepted'
                        //               : 'Comp' || 'N/A'}
                        //           </td>
                        //           <td
                        //             style={{
                        //               display: 'flex',
                        //               justifyContent: 'space-around'
                        //             }}
                        //           >
                        //             <span
                        //               onClick={() =>
                        //                 handleAfterLeadAccepted(item)
                        //               }
                        //               style={{
                        //                 cursor: 'pointer',
                        //                 border: '1px solid #2690d0',
                        //                 padding: '2px 4px',
                        //                 borderRadius: '5px',
                        //                 color: '#2690d0'
                        //               }}
                        //             >
                        //               Action
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
              </TabPane>
              <TabPane tabId='2'>
                <div className='card display-card'>
                  <div className='card-body p-0'>
                    <div className='text-center'>
                      {data?.length === 0 ? (
                        <Table bordered>
                          <thead>
                            <tr>
                              <th>Customer Name</th>
                              <th>Customer Email</th>
                              <th>Vehicle Number</th>
                              <th>Policy Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data?.map(item => (
                              <>
                                <tr>
                                  <td>
                                    {' '}
                                    {item?.lead_data?.customerFullName || 'N/A'}
                                  </td>
                                  <td>
                                    {item?.lead_data?.customerEmailAddress ||
                                      'N/A'}
                                  </td>
                                  <td>
                                    {item?.lead_data?.vehicleNumber || 'N/A'}
                                  </td>
                                  <td>{item?.designation || 'N/A'}</td>
                                  <td
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'space-around'
                                    }}
                                  >
                                    <Link
                                      to={{
                                        pathname: '/mis-details',
                                        state: item
                                      }}
                                      style={{
                                        border: '1px solid #2690d0',
                                        padding: '2px 4px',
                                        borderRadius: '5px',
                                        color: '#2690d0'
                                      }}
                                    >
                                      Edit
                                      {/* <FaEye style={{ color: "#2690d0" }} /> */}
                                    </Link>
                                  </td>
                                </tr>
                              </>
                            ))}
                          </tbody>
                        </Table>
                      ) : (
                        <p>No Record Found</p>
                      )}
                    </div>
                  </div>
                </div>
              </TabPane>
            </TabContent>
          </div>
          {/* New-POS table end */}
        </div>
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction='right'
          zIndex={1000}
          lockBackgroundScroll={true}
          size={600}
        >
          <Row style={{ backgroundColor: '#2690d0', margin: 0 }}>
            <Col>
              <h4>Documents</h4>
            </Col>
          </Row>
          <Row>
            <Col className='container mt-2 p-4'>
              {drawerData?.lead_data?.currentIssuedPolicyDocument && (
                <div className='d-flex col-12 mt-4'>
                  <p className='col-4'>Current Issued Policy</p>
                  <button
                    className='btn btn-primary col-3'
                    onClick={() =>
                      downloadFile(
                        drawerData?.lead_data?.currentIssuedPolicyDocument,
                        'Current_Issued_Policy'
                      )
                    }
                  >
                    Download
                  </button>
                </div>
              )}

              {drawerData?.lead_data?.rc_front_document && (
                <div className='d-flex col-12 mt-4'>
                  <p className='col-4'>RC Front</p>
                  <button
                    className='btn btn-primary col-3'
                    onClick={() =>
                      downloadFile(
                        drawerData?.lead_data?.rc_front_document,
                        'RC_Front'
                      )
                    }
                  >
                    Download
                  </button>
                </div>
              )}

              {drawerData?.lead_data?.rc_back_document && (
                <div className='d-flex col-12 mt-4'>
                  <p className='col-4'>RC Back</p>
                  <button
                    className='btn btn-primary col-3'
                    onClick={() =>
                      downloadFile(
                        drawerData?.lead_data?.rc_back_document,
                        'RC_Back'
                      )
                    }
                  >
                    Download
                  </button>
                </div>
              )}

              {drawerData?.lead_data?.previousYearPolicydocument && (
                <div className='d-flex col-12 mt-4'>
                  <p className='col-4'>Previous Year Policy</p>
                  <button
                    className='btn btn-primary col-3'
                    onClick={() =>
                      downloadFile(
                        drawerData?.lead_data?.previousYearPolicydocument,
                        'Previous_Year_Policy'
                      )
                    }
                  >
                    Download
                  </button>
                </div>
              )}

              {drawerData?.lead_data?.form_29_document && (
                <div className='d-flex mt-4 col-12'>
                  <p className='col-4'>Form 29 / Sales Letter</p>
                  <button
                    className='btn btn-primary col-3'
                    onClick={() =>
                      downloadFile(
                        drawerData?.lead_data?.form_29_document,
                        'Form_29_Sales_Letter'
                      )
                    }
                  >
                    Download
                  </button>
                </div>
              )}

              {drawerData?.lead_data?.other && (
                <div className='d-flex col-12 mt-4'>
                  <p className='col-4'>Other Document</p>
                  <button
                    className='btn btn-primary col-3'
                    onClick={() =>
                      downloadFile(drawerData?.lead_data?.other, 'Other_Doc')
                    }
                  >
                    Download
                  </button>
                </div>
              )}
            </Col>
          </Row>
        </Drawer>
      </Layout>
    </>
  )
}

export default TotalBooked
