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
import { useSelector } from 'react-redux'

const EditEmployee = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({ mode: 'onBlur' })
  const selectedUser = useSelector(state => state?.root?.selectedUser)
  console.log('selectedUser', selectedUser)
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()
  const [designation, setDesignation] = useState('')
  const [designationData, setDesignationData] = useState([])
  const [zoneData, setZoneData] = useState([])
  const [zoneID, setZoneID] = useState('')
  const [stateData, setStateData] = useState([])
  const [departmentData, setDepartmentData] = useState([])
  const [roleData, setRoleData] = useState([])
  const [reportingManagerData, setReportingManagerData] = useState('')
  const location = useLocation()
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
    if (selectedUser?.zoneid) {
      getState()
    }
  }, [zoneID])

  useEffect(()=> {
    setValue('name', selectedUser?.name)
    setValue('phoneNumber', selectedUser?.phone)
    setValue('emailId', selectedUser?.email)
    setValue('designationName', selectedUser?.designation)
    setValue('zoneId', selectedUser?.zoneid)
    setValue('stateId', selectedUser?.stateid)
    setValue('departmentName', selectedUser?.department)
    setValue('roleName', selectedUser?.role)
    setValue('reportingManager', selectedUser?.reportingManager)
  },[])

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
    GetDataWithToken(`admin/state/${zoneID || selectedUser?.zoneid}`).then(res => {
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

  // Reporting Manager
  const getReportingManager = () => {
    GetDataWithToken('employee/getAllEmployees').then(res => {
      if (res?.success) {
        setReportingManagerData(res?.data)
      }
    })
  }

  // Status Change
  const handleStatus = () => {
    let obj = {
      status: selectedUser?.status === 'active' ? 'deactivate' : 'active'
    }
    PostDataWithToken(`employee/activateOrDeactivate/${selectedUser?.id}`, obj).then((res)=> {
      if(res?.success){
        toast(res?.message, {type: 'success'})
        navigate('/employee')
      }else{
        toast(res?.message, {type: 'error'})
      }
    })
  }

  // Add Employee
  const handleEditEmployee = data => {
    console.log('Form Data', data)
    PostDataWithToken(`employee/update-employee/${selectedUser?.id}`, {
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
              <li className='item'>Edit Employee</li>
            </ol>
          </div>
          <button className='btn btn-danger' onClick={() => navigate(-1)}>
            <span className='d-none d-md-block'>Back</span>
            <span className='d-block d-md-none'>
              <i className='fa fa-sign-out' aria-hidden='true'></i>
            </span>
          </button>
        </div>
        <div className='card border-0'>
          <div className='card-body p-0 p-md-3'>
            <form onSubmit={handleSubmit(handleEditEmployee)}>
              <div className='row'>
                <div className='col-12 col-lg-3 form-group mb-2'>
                  <label className='form-label' htmlFor>
                    Select Designation
                    <span className='text-danger'>*</span>
                  </label>
                  <select
                    className='control-form form-select'
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
                          <option
                            value={item?.designation_name}
                            key={index}
                            selected={
                              item?.designation_name ===
                              selectedUser?.designation
                            }
                          >
                            {item?.designation_name}
                          </option>
                        </>
                      ))}
                  </select>
                  <span className='text-danger'>
                    {errors?.designationName &&
                      errors?.designationName?.message}
                  </span>
                </div>
                <div className='col-12 col-lg-3 form-group mb-2'>
                  <label className='form-label' htmlFor>
                    Name
                    <span className='text-danger'>*</span>
                  </label>
                  <input
                    type='text'
                    placeholder='Name'
                    className='form-control control-form'
                    name='name'
                    id='name'
                    {...register('name', {
                      required: 'Name is required'
                    })}
                  />
                  <span className='text-danger'>
                    {errors.name && errors.name.message}
                  </span>
                </div>
                <div className='col-12 col-lg-3 form-group mb-2'>
                  <label className='form-label' htmlFor>
                    Mobile Number
                    <span className='text-danger'>*</span>
                  </label>
                  <input
                    type='number'
                    placeholder='Mobile Number'
                    className='form-control control-form'
                    name='phoneNumber'
                    id='phoneNumber'
                    {...register('phoneNumber', {
                      required: 'Mobile number is required',
                      minLength: {
                        value: 10,
                        message: 'Incorrect length of mobile number'
                      }
                    })}
                  />
                  <span className='text-danger'>
                    {errors.phoneNumber && errors.phoneNumber.message}
                  </span>
                </div>
                <div className='col-12 col-lg-3 form-group mb-2'>
                  <label className='form-label' htmlFor>
                    Email
                    <span className='text-danger'>*</span>
                  </label>
                  <div className='input-group'>
                    <input
                      id='emailId'
                      type='emailId'
                      placeholder='Email'
                      className='form-control control-form'
                      {...register('emailId', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i,
                          message: 'Invalid Email address'
                        }
                      })}
                    />
                  </div>
                  <span className='text-danger'>
                    {errors.emailId && errors.emailId.message}
                  </span>
                </div>
                {selectedUser?.designation === 'CEO / Principal Officer' ||
                selectedUser?.designation === 'National Head' ? (
                  ''
                ) : (
                  <><div className='col-12 col-lg-3 form-group mb-2'>
                  <label className='form-label' htmlFor>
                    Select Zone
                  </label>
                  <select
                    className='control-form form-select'
                    name='zoneId'
                    id='zoneId'
                    {...register('zoneId', {
                      onChange: e => setZoneID(e?.target?.value),
                    })}
                  >
                    <option className='d-none' value='' selected>
                      Select Zone
                    </option>
                    {zoneData &&
                      zoneData?.length > 0 &&
                      zoneData?.map((item, index) => (
                        <>
                          <option
                            value={item?.id}
                            key={index}
                            selected={item?.id === selectedUser?.zoneid}
                          >
                            {item?.zone}
                          </option>
                        </>
                      ))}
                  </select>
                  <span className='text-danger'>
                    {errors.zoneId && errors.zoneId.message}
                  </span>
                </div>
                <div className='col-12 col-lg-3 form-group mb-2'>
                  <label className='form-label' htmlFor>
                    Select State
                  </label>
                  <select
                    className='control-form form-select'
                    name='stateId'
                    id='stateId'
                    {...register('stateId', {
                    })}
                  >
                    <option className='d-none' value='' selected>
                      Select State
                    </option>
                    {stateData &&
                      stateData?.length > 0 &&
                      stateData?.map((item, index) => (
                        <>
                          <option
                            value={item?.state}
                            key={index}
                            selected={item?.state === selectedUser?.stateid}
                          >
                            {item?.state}
                          </option>
                        </>
                      ))}
                  </select>
                  <span className='text-danger'>
                    {errors?.stateId && errors?.stateId?.message}
                  </span>
                </div></>
                )}
                <div className='col-12 col-lg-3 form-group mb-2'>
                  <label className='form-label' htmlFor>
                    Select Department
                    <span className='text-danger'>*</span>
                  </label>
                  <select
                    className='control-form form-select'
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
                          <option
                            value={item?.department_name}
                            key={index}
                            selected={
                              item?.department_name === selectedUser?.department
                            }
                          >
                            {item?.department_name}
                          </option>
                        </>
                      ))}
                  </select>
                  <span className='text-danger'>
                    {errors?.departmentName && errors?.departmentName?.message}
                  </span>
                </div>

                <div className='col-12 col-lg-3 form-group mb-2 mt-4'>
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
                          <option
                            value={item?.role_name}
                            key={index}
                            selected={item?.role_name === selectedUser?.role}
                          >
                            {item?.role_name}
                          </option>
                        </>
                      ))}
                  </select>
                  <span className='text-danger'>
                    {errors?.roleName && errors?.roleName?.message}
                  </span>
                </div> */}
                {selectedUser?.designation !== 'CEO / Principal Officer' && (
                  <div className='col-12 col-lg-3 form-group mb-2'>
                    <label className='form-label' htmlFor>
                      Select Reporting Manager
                      <span className='text-danger'>*</span>
                    </label>
                    <select
                      className='control-form form-select'
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
                            <option value={item?.name} key={index} selected={
                              item?.name === selectedUser?.reportingManager
                            }>
                              {item?.name} ({item?.designation})
                            </option>
                          </>
                        ))}
                    </select>
                    <span className='text-danger'>
                      {errors?.reportingManager &&
                        errors?.reportingManager?.message}
                    </span>
                  </div>
                )}

                <div className='d-flex flex-column-reverse d-md-block text-end mt-3'>
                  <button
                    className='btn btn-danger me-0 me-md-2'
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </button>
                  <button className='btn btn-secondary' style={{ marginRight: 7 }} onClick={()=> handleStatus()}>{selectedUser?.status === 'active' ? 'De-Activate' : 'Activate'}</button>
                  <button className='btn btn-primary mb-2 mb-md-0'>
                    {loader == true ? (
                      <span className='spinner-border spinner-border-sm'></span>
                    ) : (
                      'Edit Employee'
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

export default EditEmployee
