import React, { useState } from 'react'
import Layout from '../../Common/Layout'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import ModalImage from 'react-modal-image'
import { GetData, GetDataWithToken } from '../../../apiHelper/ApiHelper'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import moment from 'moment'

const EmployeeDetails = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('1')
  const selectedUser = useSelector(state => state?.root?.selectedUser)
  const [employeeDetail, setEmployeeDetail] = useState({})

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    GetData(`employee/employee_details/${selectedUser?.id}`).then(res => {
      if (res?.success) {
        setEmployeeDetail(res?.data)
      } else {
        toast(res?.message, { type: 'error' })
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
              <li className='item'>Employee Detail</li>
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
        {/* Data-tables leads and Policy start */}
        <div className='card display-card p-2'>
          <div className='card-body p-0 p-md-3'></div>
          <div className='row'>
            {/* New-POS table start */}
            <div className='col-lg-10 col-12'>
              {/* <Nav tabs>
                <NavItem>
                  <NavLink
                    className={activeTab == '1' ? 'active' : ''}
                    onClick={() => setActiveTab('1')}
                  >
                    Details
                  </NavLink>
                </NavItem> */}
              {/* <NavItem>
                  <NavLink
                    className={activeTab == '2' ? 'active' : ''}
                    onClick={() => setActiveTab('2')}
                  >
                    Under POS
                  </NavLink>
                </NavItem> */}
              {/* </Nav> */}
            </div>
            {/* <div className='col-lg-2 col-12 text-end'>
              <Link
                to='/edit-employee'
                state={{ employeeDetail: employeeDetail }}
                className='btn btn-primary'
              >
                Edit Employee
              </Link>
            </div> */}
            <div className='col-12'>
              <TabContent activeTab={activeTab}>
                <TabPane tabId='1'>
                  <div className='card mt-0'>
                    {/* <h6>SP Detail</h6> */}
                    <div className='my-1'>
                      <ul className='row list-unstyled'>
                        <li className='col-12 col-md-6 col-lg-4 '>
                          <p className='text-capitalize'>
                            Username<span className='mx-1'>-</span>
                            <span className='text-capitalize mb-1 text-muted fs-7'>
                              {employeeDetail?.username || 'N/A'}
                            </span>
                          </p>
                        </li>
                        <li className='col-12 col-md-6 col-lg-4 '>
                          <p className='text-capitalize'>
                            Name<span className='mx-1'>-</span>
                            <span className='text-capitalize mb-1 text-muted fs-7'>
                              {employeeDetail?.name}
                            </span>
                          </p>
                        </li>
                        <li className='col-12 col-md-6 col-lg-4 '>
                          <p className=''>
                            Email<span className='mx-1'>-</span>
                            <span className='mb-1 text-muted fs-7'>
                              {employeeDetail?.email}
                            </span>
                          </p>
                        </li>
                        <li className='col-12 col-md-6 col-lg-4 '>
                          <p className='text-capitalize'>
                            Phone No.<span className='mx-1'>-</span>
                            <span className='text-capitalize mb-1 text-muted fs-7'>
                              {employeeDetail?.phone}
                            </span>
                          </p>
                        </li>
                        <li className='col-12 col-md-6 col-lg-4 '>
                          <p className='text-capitalize'>
                            Designation<span className='mx-1'>-</span>
                            <span className='text-capitalize mb-1 text-muted fs-7'>
                              {employeeDetail?.designation}
                            </span>
                          </p>
                        </li>
                        <li className='col-12 col-md-6 col-lg-4 '>
                          <p className='text-capitalize'>
                            Department<span className='mx-1'>-</span>
                            <span className='text-capitalize mb-1 text-muted fs-7'>
                              {employeeDetail?.department}
                            </span>
                          </p>
                        </li>
                        <li className='col-12 col-md-6 col-lg-4 '>
                          <p className='text-capitalize'>
                            Role<span className='mx-1'>-</span>
                            <span className='text-capitalize mb-1 text-muted fs-7'>
                              {employeeDetail?.role}
                            </span>
                          </p>
                        </li>
                        <li className='col-12 col-md-6 col-lg-4 '>
                          <p className='text-capitalize'>
                            Reporting Manager<span className='mx-1'>-</span>
                            <span className='text-capitalize mb-1 text-muted fs-7'>
                              {employeeDetail?.reportingManager}
                            </span>
                          </p>
                        </li>
                        <li className='col-12 col-md-6 col-lg-4 '>
                          <p className='text-capitalize'>
                            Zone<span className='mx-1'>-</span>
                            <span className='text-capitalize mb-1 text-muted fs-7'>
                              {employeeDetail?.zoneid === '1'
                                ? 'North'
                                : employeeDetail?.zoneid === '2'
                                ? 'East'
                                : employeeDetail?.zoneid === '3'
                                ? 'West'
                                : employeeDetail?.zoneid === '4'
                                ? 'South'
                                : employeeDetail?.zoneid}
                            </span>
                          </p>
                        </li>
                        <li className='col-12 col-md-6 col-lg-4 '>
                          <p className='text-capitalize'>
                            State<span className='mx-1'>-</span>
                            <span className='text-capitalize mb-1 text-muted fs-7'>
                              {employeeDetail?.stateid}
                            </span>
                          </p>
                        </li>
                        <li className='col-12 col-md-6 col-lg-4 '>
                          <p className='text-capitalize'>
                            Status<span className='mx-1'>-</span>
                            <span className='text-capitalize mb-1 text-muted fs-7'>
                              {employeeDetail?.status}
                            </span>
                          </p>
                        </li>
                        <li className='col-12 col-md-6 col-lg-4 '>
                          <p className='text-capitalize'>
                            Created At<span className='mx-1'>-</span>
                            <span className='text-capitalize mb-1 text-muted fs-7'>
                              {moment(employeeDetail?.createdAt).format('LLL')}
                            </span>
                          </p>
                        </li>
                        <li className='col-12 col-md-6 col-lg-4 '>
                          <p className='text-capitalize'>
                            Updated At<span className='mx-1'>-</span>
                            <span className='text-capitalize mb-1 text-muted fs-7'>
                            {moment(employeeDetail?.updatedAt).format('LLL')}
                            </span>
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId='2'>
                  <div className='card mt-3'>
                    <p>Under POS</p>
                    <div className='text-center'>
                      <table></table>
                    </div>
                  </div>
                </TabPane>
              </TabContent>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default EmployeeDetails
