import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MultiSelect } from 'react-multi-select-component'
import Layout from '../../Common/Layout'
import {
  GetData,
  GetDataWithToken,
  PostDataWithToken
} from '../../../apiHelper/ApiHelper'
import { toast } from 'react-toastify'

const AddEmployee = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: 'onBlur' })
  const [loader, setLoader] = useState(false)
  const [callApi, setCallApi] = useState(true)
  const navigate = useNavigate()
  const [designation, setDesignation] = useState('')
  const [designationData, setDesignationData] = useState([])
  const [zoneData, setZoneData] = useState([])
  const [zoneID, setZoneID] = useState('')
  const [stateData, setStateData] = useState([])
  const [departmentData, setDepartmentData] = useState([])
  const [roleData, setRoleData] = useState([])
  const [reportingManagerData, setReportingManagerData] = useState('')
  const [selected, setSelected] = useState([])

  // UseEffect for all Functions
  useEffect(() => {
    getDesignation()
    getZone()
    getDepartment()
    getRole()
    getReportingManager()
  }, [])

  // UseEffect For State
  useEffect(() => {
    getState()
  }, [zoneID])

  // Designation
  const getDesignation = () => {
    GetDataWithToken('employee/get_designation').then(res => {
      if (res?.success) {
        setDesignationData(res?.data)
      } else {
        toast('Designation Not Fetched', { type: 'error' })
      }
    })
  }

  // Zone
  const getZone = () => {
    GetDataWithToken('admin/zone').then(res => {
      if (res?.success) {
        setZoneData(res?.data)
      } else {
        toast('Zone Not Fetched', { type: 'error' })
      }
    })
  }

  // State
  const getState = () => {
    GetDataWithToken(`admin/state/${zoneID}`).then(res => {
      if (res?.success) {
        setStateData(res?.data)
      }
    })
  }

  // Department
  const getDepartment = () => {
    GetDataWithToken('employee/all_department').then(res => {
      if (res?.success) {
        setDepartmentData(res?.data)
      } else {
        toast('Department Not Fetched', { type: 'error' })
      }
    })
  }

  // Role
  const getRole = () => {
    GetDataWithToken('employee/read_role').then(res => {
      let i = 0
      let data = res?.data
      let arr = []
      if (res?.success) {
        while (i < data?.length) {
          let item = data[i]
          arr.push({
            label: item?.role_name,
            value: item?.role_name
          })
          i++
        }
        setRoleData(arr)
      } else {
        toast('Role Not Fetched', { type: 'error' })
      }
    })
  }

  console.log('Selected', selected)

  // Reporting Manager
  const getReportingManager = () => {
    GetDataWithToken('employee/getAllEmployees').then(res => {
      if (res?.success) {
        setReportingManagerData(res?.data)
      }
    })
  }

  // Add Employee
  const handleAddEmployee = data => {
    if (selected?.length !== 0) {
      PostDataWithToken('employee/create-employee', {
        ...data,
        roleName: selected?.map(i => i?.value)
      }).then(res => {
        if (res?.success) {
          toast(res?.message, { type: 'success' })
          navigate('/employee')
        } else {
          toast.error(res?.message)
        }
      })
    } else {
      toast('Please Select Role', { type: 'error' })
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
              <li className='item'>Add Employee</li>
            </ol>
          </div>
          <button
            className='btn btn-danger'
            onClick={() => navigate('/dashboard')}
          >
            <span className='d-none d-md-block'>Back</span>
            <span className='d-block d-md-none'>
              <i className='fa fa-sign-out' aria-hidden='true'></i>
            </span>
          </button>
        </div>
        <div className='card border-0'>
          <div className='card-body p-0 p-md-3'>
            <form onSubmit={handleSubmit(handleAddEmployee)}>
              <div className='row'>
                <div className='col-12 col-lg-3 form-group mb-2'>
                  <div className="did-floating-label-content">
                  <select
                    className='did-floating-select'
                    name='designationName'
                    id='designationName'
                    {...register('designationName', {
                      required: 'Designation is Required',
                      onChange: e => setDesignation(e?.target?.value)
                    })}
                  >
                    <option className='d-none' value='' selected>
                      Select Designation
                    </option>
                    {designationData &&
                      designationData?.length > 0 &&
                      designationData?.map((item, index) => (
                        <>
                          <option value={item?.designation_name} key={index}>
                            {item?.designation_name}
                          </option>
                        </>
                      ))}
                  </select>
                  <label className='did-floating-label' htmlFor>
                    Select Designation
                    <span className='text-danger'>*</span>
                  </label>
                  <span className='text-danger'>
                    {errors.designationName && errors.designationName.message}
                  </span>
                  </div>
                </div>
                <div className='col-12 col-lg-3 form-group mb-2'>
                  <div className='did-floating-label-content input-group'>
                  
                  <input
                    type='text'
                    placeholder=''
                    className='did-floating-input'
                    name='name'
                    id='name'
                    {...register('name', {
                      required: 'Name is required'
                    })}
                  />
                  <label className='did-floating-label' htmlFor>
                    Name
                    <span className='text-danger'>*</span>
                  </label>
                  <span className='text-danger'>
                    {errors.name && errors.name.message}
                  </span>
                  </div>
                </div>
                <div className='col-12 col-lg-3 form-group mb-2'>
                  <div className='did-floating-label-content input-group'>
                  <input
                    type='number'
                    placeholder=''
                    className='did-floating-input'
                    name='phoneNumber'
                    id='phoneNumber'
                    {...register('phoneNumber', {
                      required: 'Mobile number is required',
                      pattern: {
                        value:
                          /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/,
                        message: 'Invalid Mobile Number'
                      }
                    })}
                    onInput={(e) =>
                      (e.target.value =
                        e.target.value.slice(0, 10))
                    }
                  />
                     <label className='did-floating-label' htmlFor>
                    Mobile Number
                    <span className='text-danger'>*</span>
                  </label>
                  <span className='text-danger'>
                    {errors.phoneNumber && errors.phoneNumber.message}
                  </span>
                  </div>
                </div>
                <div className='col-12 col-lg-3 form-group mb-2'>
                  <div className='did-floating-label-content input-group'>
                    <input
                      id='emailId'
                      type='emailId'
                      placeholder=''
                      className='did-floating-input'
                      aria-describedby='basic-addon2'
                      {...register('emailId', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: 'Invalid Email address'
                        }
                      })}
                    />
                
                  <label className='did-floating-label' htmlFor>
                    Email
                    <span className='text-danger'>*</span>
                  </label>
                  <span className='text-danger'>
                    {errors.emailId && errors.emailId.message}
                  </span>
                  </div>
                </div>
                {designation === 'CEO / Principal Officer' ||
                designation === 'National Head' ? (
                  ''
                ) : (
                  <>
                    <div className='col-12 col-lg-3 form-group mb-2'>
                      <div className="did-floating-label-content mt-2">
                      <select
                        className='did-floating-select'
                        name='zoneId'
                        id='zoneId'
                        {...register('zoneId', {
                          onChange: e => setZoneID(e?.target?.value)
                        })}
                      >
                        <option className='d-none' value='' selected>
                          Select Zone
                        </option>
                        {zoneData &&
                          zoneData?.length > 0 &&
                          zoneData?.map((item, index) => (
                            <>
                              <option value={item?.id} key={index}>
                                {item?.zone}
                              </option>
                            </>
                          ))}
                      </select>
                      <label className='did-floating-label' htmlFor>
                        Select Zone
                      </label>
                      </div>
                    </div>
                    <div className='col-12 col-lg-3 form-group mb-2'>
                    <div className="did-floating-label-content mt-2">
                      <select
                        className='did-floating-select'
                        name='stateId'
                        id='stateId'
                        {...register('stateId', {})}
                      >
                        <option className='d-none' value='' selected>
                          Select State
                        </option>
                        {stateData &&
                          stateData?.length > 0 &&
                          stateData?.map((item, index) => (
                            <>
                              <option value={item?.state} key={index}>
                                {item?.state}
                              </option>
                            </>
                          ))}
                      </select>
                      <label className='did-floating-label' htmlFor>
                        Select State
                      </label>
                      </div>
                    </div>
                  </>
                )}

                <div className='col-12 col-lg-3 form-group mb-2'>
                <div className="did-floating-label-content mt-2">
                  <select
                    className='did-floating-select'
                    name='departmentName'
                    id='departmentName'
                    {...register('departmentName', {
                      required: 'Please Select Department'
                    })}
                  >
                    <option className='d-none' value='' selected>
                      Select Department
                    </option>
                    {departmentData &&
                      departmentData?.length > 0 &&
                      departmentData?.map((item, index) => (
                        <>
                          <option value={item?.department_name} key={index}>
                            {item?.department_name}
                          </option>
                        </>
                      ))}
                  </select>
                  <label className='did-floating-label' htmlFor>
                    Select Department
                    <span className='text-danger'>*</span>
                  </label>
                  <span className='text-danger'>
                    {errors?.departmentName && errors?.departmentName?.message}
                  </span>
                  </div>
                </div>

                <div className='col-12 col-lg-3 form-group mb-2 mt-2'>
                  <label className='form-label lebal_sec' htmlFor>
                    Select Role
                    <span className='text-danger'>*</span>
                  </label>
                  <MultiSelect
                    options={roleData}
                    value={selected}
                    onChange={setSelected}
                    labelledBy='Select Role'
                  />
                </div>

                {/* <div className='col-12 col-lg-3 form-group mb-2'>
                  <label className='form-label' htmlFor>
                    Select Role
                    <span className='text-danger'>*</span>
                  </label>
                  <select
                    className='control-form form-select'
                    name='roleName'
                    id='roleName'
                    {...register('roleName', {
                      required: 'Please select Role'
                    })}
                  >
                    <option className='d-none' value='' selected>
                      Select Role
                    </option>
                    {roleData &&
                      roleData?.length > 0 &&
                      roleData?.map((item, index) => (
                        <>
                          <option value={item?.role_name} key={index}>
                            {item?.role_name}
                          </option>
                        </>
                      ))}
                  </select>
                  <span className='text-danger'>
                    {errors?.roleName && errors?.roleName?.message}
                  </span>
                </div> */}

                {designation !== 'CEO / Principal Officer' && (
                  <div className='col-12 col-lg-3 form-group mb-2'>
                    <div className="did-floating-label-content mt-2">
                    <select
                      className='did-floating-select'
                      name='reportingManager'
                      id='reportingManager'
                      {...register('reportingManager', {
                        required: 'Please Select Reporting Manager'
                      })}
                    >
                      <option className='d-none' value='' selected>
                        Select Reporting Manager
                      </option>
                      {reportingManagerData &&
                        reportingManagerData?.length > 0 &&
                        reportingManagerData?.map((item, index) => (
                          <>
                            <option value={item?.name} key={index}>
                              {item?.name} ({item?.designation})
                            </option>
                          </>
                        ))}
                    </select>
                    <label className='did-floating-label' htmlFor>
                      Select Reporting Manager
                      <span className='text-danger'>*</span>
                    </label>
                    <span className='text-danger'>
                      {errors?.reportingManager &&
                        errors?.reportingManager?.message}
                    </span>
                    </div>
                  </div>
                )}

                <div className='d-flex flex-column-reverse d-md-block text-end mt-3'>
                  <button
                    className='btn btn-danger me-0 me-md-2'
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </button>
                  <button className='btn btn-primary mb-2 mb-md-0'>
                    {loader == true ? (
                      <span className='spinner-border spinner-border-sm'></span>
                    ) : (
                      'Add Employee'
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default AddEmployee
