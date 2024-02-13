import React, { useState, useEffect } from 'react'
import Layout from '../../Common/Layout'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import { BankName } from '../../Utility/BankName'
import {
  editAddhar,
  editBank,
  editMarksheet,
  editPan,
  editProfilePiture,
  editUser,
  editUserProfilePicture,
  getPosDistrict,
  sendErrorMessage,
  sendSuccessMessage
} from '../../Services/userService'
import {
  GetDataWithToken,
  PostDataWithToken
} from '../../../apiHelper/ApiHelper'
import { toast } from 'react-toastify'

const EditPos = () => {
  const [loader, setLoader] = useState(false)
  const todayDate = new Date().toISOString().split('T')[0]
  const [activeTab, setActiveTab] = useState('1')
  const [userDetails, setUserDetails] = useState()
  const [panImg, setPanImg] = useState()
  const [panImgPreview, setPanImgPreview] = useState(null)
  const [marksheet, setMarksheet] = useState()
  const [marksheetPreview, setMarksheetPreview] = useState(null)
  const [marksheetId, setMarksheetId] = useState('')
  const [passbook, setPassbook] = useState()
  const [passbookPreview, setpassbookPreview] = useState(null)
  const [profilePiture, setProfilePiture] = useState()
  const [profilePiturePreview, setProfilePiturePreview] = useState(null)
  const [aadharFront, setAadharFront] = useState()
  const [aadharBack, setAadharBack] = useState()
  const [aadharFrontPreview, setAadharFrontPreview] = useState(null)
  const [aadharBackPreview, setAadharBackPreview] = useState(null)
  const [bankNameArr, setBankNameArr] = useState([])
  const [selectedCity, setSelectedCity] = useState(null)
  const [districtList, setDitrictList] = useState([])
  const [stateList, setStateList] = useState([])
  const [selectedState, setSelectedState] = useState(null)

  const handleSelectState = e => {
    setSelectedState(e)
    getPosDistrict(e).then(response => {
      if (response.status == true) {
        setDitrictList(response.data)
        // console.log('district', response.data)
      } else {
        // console.log('error', response.data.message)
      }
    })
  }

  const [bankName, setBankName] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ mode: 'onBlur' })
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    reset: reset1,
    formState: { errors: errors1 }
  } = useForm({ mode: 'onBlur' })
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    reset: reset2,
    formState: { errors: errors2 }
  } = useForm({ mode: 'onBlur' })
  const {
    register: register3,
    handleSubmit: handleSubmit3,
    reset: reset3,
    formState: { errors: errors3 }
  } = useForm({ mode: 'onBlur' })
  // console.log("///////=====///",handleSubmit3)
  const {
    register: register5,
    handleSubmit: handleSubmit5,
    reset: reset5,
    formState: { errors: errors5 }
  } = useForm({ mode: 'onBlur' })
  const {
    register: register6,
    handleSubmit: handleSubmit6,
    formState: { errors: errors6 }
  } = useForm({ mode: 'onBlur' })
  console.log("2222222")
  const {
    register: register7,
    handleSubmit: handleSubmit7,
    formState: { errors: errors7 }
  } = useForm({ mode: 'onBlur' })
  const {
    register: register8,
    handleSubmit: handleSubmit8,
    formState: { errors: errors8 }
  } = useForm({ mode: 'onBlur' })
  const {
    register: register9,
    handleSubmit: handleSubmit9,
    formState: { errors: errors9 }
  } = useForm({ mode: 'onBlur' })
  const {
    register: register10,
    handleSubmit: handleSubmit10,
    reset: reset10,
    formState: { errors: errors10 }
  } = useForm({ mode: 'onBlur' })
  console.log("handlefirst1")
  const {
    register: register11,
    handleSubmit: handleSubmit11,
    reset: reset11,
    formState: { errors: errors11 }
  } = useForm({ mode: 'onBlur' })
  const details = location?.state?.userDetails?.user
  // console.log('first===', details)
  // console.log("details", details)

  useEffect(() => {
    setUserDetails(details)
    reset({
      name: details?.name,
      phone: details?.phone,
      email: details?.email,
      dob: details?.dob,
      address: details?.address,
      city: details?.city,
      state: details?.state
    })
    reset1({
      pan_number: details?.pan?.documentNumber
    })
    reset3({
      adhar_number: details?.adhar_number
    })
    reset5({
      accountNumber: details?.bank?.accountNumber,
      ifsc: details?.bank?.ifsc
    })

    GetDataWithToken('admin/states', '').then(response => {
      if (response.status == true) {
        setStateList(response?.data)
        reset5({
          bank_name: details?.bank?.bank_name
        })
      }
    })

    GetDataWithToken('admin/all-bank-names', '').then(response => {
      if (response.status == true) {
        setBankNameArr(response?.data)
        reset5({
          bank_name: details?.bank?.bank_name
        })
      }
    })
  }, [])

  const panId = details?.documents?.filter(
    type => type.DocumentType == 'pan_image'
  )
  const aadharId = details?.documents?.filter(
    type => type.DocumentType == 'aadhar_image'
  )

  const handleDetailSubmit = data => {
    console.log('data', data)
    let userFormData = new FormData()
    userFormData.append('userId', details?.id)
    userFormData.append('name', data.name)
    userFormData.append('phone', data.phone)
    userFormData.append('email', data.email)
    userFormData.append('dob', data.dob)
    userFormData.append('address', data.address)
    userFormData.append('state', selectedState)
    userFormData.append('city', selectedCity)

    setLoader(true)
    editUser(userFormData).then(response => {
      if (response?.message=="Data updated") {
        toast(response?.message, { type: 'success' })
        navigate('/all-pos')
      } else {
        sendErrorMessage(response)
        setLoader(false)
      }
    })
  }

  const handleMarksheetUpload = data => {
    console.log('marksheet0', marksheet)
    const marksheetFormData = new FormData()
    marksheetFormData.append('docId', userDetails?.marksheet?.id)
    marksheetFormData.append('userId', userDetails?.id)
    marksheetFormData.append('marksheet', marksheet)

    setLoader(true)
    editMarksheet(marksheetFormData).then(response => {
      if (response?.message=="Data updated") {
        toast(response?.message, { type: 'success' })
        navigate('/all-pos')
      } else {
        sendErrorMessage(response)
        setLoader(false)
      }
    })
  }

  const handlePanDetails = data => {
    console.log('data', data)
    const panFormData = new FormData()
    panFormData.append('docId', details?.pan?.id)
    panFormData.append('userId', details?.id)
    panFormData.append('pan_number', data.pan_number.toUpperCase())
    panFormData.append('pan_image', panImg)

    setLoader(true)
    editPan(panFormData).then(response => {
      if (response?.message=="Data updated") {
        toast(response?.message, { type: 'success' })
        navigate('/all-pos')
      } else {
        sendErrorMessage(response)
        setLoader(false)
      }
    })
  }

  const handleUploadDocs = (e, type, id) => {
    // console.log("marksheet", type, e.target.files[0]);
    if (type == 'marksheet') {
      setMarksheet(e.target.files[0])
      setMarksheetPreview(URL.createObjectURL(e.target.files[0]))
      setMarksheetId(id)
    } else if (type == 'pan_image') {
      setPanImg(e.target.files[0])
      setPanImgPreview(URL.createObjectURL(e.target.files[0]))
    } else {
      setPassbook(e.target.files[0])
      setpassbookPreview(URL.createObjectURL(e.target.files[0]))
    }
  }

  const handleUploadProfileImg = e => {
    console.log('upload second Handle====:-')
    setProfilePiture(e.target.files[0])
    setProfilePiturePreview(URL.createObjectURL(e.target.files[0]))
  }

  const handleUploadAadharFront = e => {
    // console.log('qwert', e.target.files)
    setAadharFront(e.target.files[0])
    setAadharFrontPreview(URL.createObjectURL(e.target.files[0]))
  }

  const handleUploadAadharBack = e => {
    // console.log('zxcvbn', e.target.files)

    setAadharBack(e.target.files[0])
    setAadharBackPreview(URL.createObjectURL(e.target.files[0]))
  }

  const handleSelectBank = e => {
    setBankName(e.target.value)
  }

  const handleBankDetails = data => {
    // console.log('data', data)
    const bankFormData = new FormData()
    bankFormData.append('userId', details?.id)
    bankFormData.append('bankId', details?.bank?.id)
    bankFormData.append('accountNumber', data.accountNumber)
    bankFormData.append('ifsc', data.ifsc)
    bankFormData.append('bank_name', bankName)
    bankFormData.append('passbook_cheque', passbook)

    setLoader(true)
    editBank(bankFormData).then(response => {
      if (response?.message=="Data updated") {
        toast(response?.message, { type: 'success' })
        navigate('/all-pos')
      } else {
        sendErrorMessage(response)
        setLoader(false)
      }
    })
  }

  const handleAadharUpload = data => {
    // console.log("+++++////++++",handleAadharUpload)
    console.log("form data :-", data);
    const addharFormData = new FormData()
    addharFormData.append('docId', details?.aadhar?.id)
    addharFormData.append('userId', details?.id)
    addharFormData.append('adhar_number', data.adhar_number)
    addharFormData.append('aadhar_front', aadharFront)
    addharFormData.append('aadhar_back', aadharBack)
    console.log("Form data keys and values:");
    addharFormData.forEach(({ name, value }) => {
      console.log(`${name}: ${value}`);
    });

    setLoader(true)
    editAddhar(addharFormData).then(response => {
      if (response?.message=="Data updated") {
        toast(response?.message, { type: 'success' })
        navigate('/all-pos')
      } else {
        sendErrorMessage(response)
        setLoader(false)
      }
    })
  }

  const handleAddAadhar = data => {
    console.log("1111111")
    const addharFormData = new FormData()
    addharFormData.append('aadhar_number', data.adhar_number)
    addharFormData.append('id', details?.id)
    addharFormData.append('DocumentType', 'aadhar_image')
    addharFormData.append('aadhar_front', aadharFront)
    addharFormData.append('aadhar_back', aadharBack)

    setLoader(true)
    PostDataWithToken(`admin/add-document`, addharFormData).then(response => {
      if (response?.message=="Data updated") {
        toast(response?.message, { type: 'success' })
        navigate('/all-pos')
      } else {
        sendErrorMessage(response)
        setLoader(false)
      }
    })
  }

  const handleAddPan = data => {
    console.log('data', data)
    const panFormData = new FormData()
    panFormData.append('id', details?.id)
    panFormData.append('DocumentType', 'pan_image')
    panFormData.append('pan_number', data.pan_number)
    panFormData.append('pan_image', panImg)

    setLoader(true)
    PostDataWithToken(`admin/add-document`, panFormData).then(response => {
      if (response?.message=="Data updated") {
        toast(response?.message, { type: 'success' })
        navigate('/all-pos')
      } else {
        sendErrorMessage(response)
        setLoader(false)
      }
    })
  }

  const handleAddMarksheet = data => {
    const marksheetFormData = new FormData()
    marksheetFormData.append('id', details?.id)
    marksheetFormData.append('DocumentType', 'marksheet')
    marksheetFormData.append('marksheet', marksheet)

    setLoader(true)
    PostDataWithToken(`admin/add-document`, marksheetFormData).then(response => {
      if (response?.message=="Data updated") {
        toast(response?.message, { type: 'success' })
        navigate('/all-pos')
      } else {
        sendErrorMessage(response)
        setLoader(false)
      }
    })
  }

  const handleAddBank = data => {
    const bankFormData = new FormData()
    bankFormData.append('id', details?.id)
    bankFormData.append('accountNumber', data.accountNumber)
    bankFormData.append('ifsc', data.ifsc)
    bankFormData.append('bank_name', bankName)
    bankFormData.append('passbookOrCheque', passbook)
    setLoader(true)
    PostDataWithToken(`admin/add-document`, bankFormData).then(response => {
      if (response?.message=="Data updated") {
        toast(response?.message, { type: 'success' })
        navigate('/all-pos')
      } else {
        sendErrorMessage(response)
        setLoader(false)
      }
    })
  }

  const handleAddProfileImage = data => {
    console.log("first111")
    const profilePitureFormData = new FormData()
    profilePitureFormData.append('id', details?.id)
    profilePitureFormData.append('DocumentType', 'profile_picture')
    profilePitureFormData.append('profile_picture', profilePiture)

    setLoader(true)
    PostDataWithToken(`admin/add-document`, profilePitureFormData).then(response => {
      if (response?.message=="Data updated") {
        toast(response?.message, { type: 'success' })
        navigate('/all-pos')
      } else {
        sendErrorMessage(response)
        setLoader(false)
      }
    })
  }

  const handleUpdateProfilePicture = data => {
    console.log("third handle====")
    const updateProfilePitureFormData = new FormData()
    updateProfilePitureFormData.append('docId', details?.profile_picture?.id)
    updateProfilePitureFormData.append('userId', userDetails?.id)
    updateProfilePitureFormData.append('profile_picture', profilePiture)

    setLoader(true)
    editUserProfilePicture(updateProfilePitureFormData).then(response => {
      if (response?.message=="Data updated") {
        toast(response?.message, { type: 'success' })
        navigate('/all-pos')
      } else {
        sendErrorMessage(response)
        setLoader(false)
      }
    })
  }

  return (
    <Layout>
      <div className='page-content-crumb'>
        <div className='breadcrumb-area'>
          {/* <h1>Edit Detail</h1> */}
          <ol className='breadcrumb'>
            <li className='item'>
              <Link to='/dashboard'>
                <i className='fa fa-home' aria-hidden='true' />
              </Link>
            </li>
            <li className='item'>Edit Detail</li>
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
      {/* Data-tables leads and Policy start */}
      <div className='row'>
        {/* New-POS table start */}
        <div className='col-12'>
          <div className='default-tab'>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={activeTab == '1' ? 'active mb-2 mb-md-0' : ''}
                  onClick={() => setActiveTab('1')}
                >
                  General Details
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab == '2' ? 'active mb-2 mb-md-0' : ''}
                  onClick={() => setActiveTab('2')}
                >
                  Aadhar Details
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab == '3' ? 'active mb-2 mb-md-0' : ''}
                  onClick={() => setActiveTab('3')}
                >
                  PAN Details
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab == '4' ? 'active mb-2 mb-md-0' : ''}
                  onClick={() => setActiveTab('4')}
                >
                  Marksheet Details
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab == '5' ? 'active mb-2 mb-md-0' : ''}
                  onClick={() => setActiveTab('5')}
                >
                  Bank Details
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab == '6' ? 'active mb-2 mb-md-0' : ''}
                  onClick={() => setActiveTab('6')}
                >
                  Profile Picture
                </NavLink>
              </NavItem>
            </Nav>
          </div>
          <div className='card display-card detail-page'>
            <div className='card-body p-0 p-md-3'>
              <div className='default-tabs'>
                <div className='tab-content'>
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId='1'>
                      <form onSubmit={handleSubmit(handleDetailSubmit)}>
                        <div className='row'>
                          <div className='col-12 col-lg-6 form-group mb-2'>
                            <label className='form-label' htmlFor>
                              Name
                              <span className='text-danger'>*</span>
                            </label>
                            <input
                              type='text'
                              className='form-control control-form'
                              placeholder='Name'
                              name
                              id
                              {...register('name', {
                                required: 'Name is required'
                              })}
                            />
                            <span className='text-danger'>
                              {errors.name && errors.name.message}
                            </span>
                          </div>
                          <div className='col-12 col-lg-6 form-group mb-2'>
                            <label className='form-label' htmlFor>
                              Mobile Number
                              <span className='text-danger'>*</span>
                            </label>
                            <input
                              type='number'
                              className='form-control control-form'
                              placeholder='Mobile Number'
                              name
                              id
                              
                              {...register('phone', {
                                required: 'Mobile number is required',
                                minLength: {
                                  value: 10,
                                  message: 'Incorrect length of mobile number'
                                },
                                maxLength: {
                                  value: 10,
                                  message: 'Incorrect length of mobile number'
                                }
                              
                              })}
                              onInput={(e) => {
                                e.target.value = e.target.value.slice(0, 10);
                              }}
                            />
                            <span className='text-danger'>
                              {errors.phone && errors.phone.message}
                            </span>
                          </div>
                          <div className='col-12 col-lg-6 form-group mb-2'>
                            <label className='form-label' htmlFor>
                              Email
                              <span className='text-danger'>*</span>
                            </label>
                            <input
                              type='email'
                              className='form-control control-form'
                              placeholder='Email'
                              name = "email"
                              id = "email"
                              {...register('email', {
                                required: 'email is required'
                              })}
                            />
                            <span className='text-danger'>
                              {errors.email && errors.email.message}
                            </span>
                          </div>
                          <div className='col-12 col-lg-6 form-group position-relative mb-2'>
                            <label for='dob' className='form-label'>
                              DOB
                              <span className='text-danger'>*</span>
                            </label>
                            <input
                              type='Date'
                              className='form-control'
                              id='dob'
                              {...register('dob', {
                                required: 'DOB is required'
                              })}
                              max={todayDate}
                            />
                            <span className='text-danger'>
                              {errors.dob && errors.dob.message}
                            </span>
                          </div>
                          {/* DOB */}
                          <div className='col-12 col-lg-6 form-group mb-2'>
                            <label className='form-label' htmlFor>
                              Select State
                              <span className='text-danger'>*</span>
                            </label>
                            <select
                              {...register('stateId', {
                                // required: "State is required"
                              })}
                              className='control-form form-select'
                              name='state'
                              id='state'
                              value={selectedState}
                              onChange={e =>
                                handleSelectState(e?.target?.value)
                              }
                            >
                              <option className='d-none' value='' selected>
                                Select State
                              </option>
                              {stateList &&
                                stateList?.length > 0 &&
                                stateList?.map((list, index) => (
                                  <>
                                    <option value={list?.id} key={index}>
                                      {list.state}
                                    </option>
                                  </>
                                ))}
                            </select>
                            <span className='text-danger'>
                              {errors.stateId && errors.stateId.message}
                            </span>
                          </div>
                          <div className='col-12 col-lg-6 form-group mb-2'>
                            <label className='form-label' htmlFor>
                              Select District
                              <span className='text-danger'>*</span>
                            </label>
                            <select
                              {...register('districtId', {
                                // required: "District is required"
                              })}
                              className='control-form form-select'
                              name='district'
                              id='district'
                              onChange={e => setSelectedCity(e?.target?.value)}
                            >
                              <option className='d-none' value='' selected>
                                Select District
                              </option>
                              {districtList &&
                                districtList?.length > 0 &&
                                districtList?.map((list, index) => (
                                  <>
                                    <option value={list?.id} key={index}>
                                      {list.district}
                                    </option>
                                  </>
                                ))}
                            </select>
                            <span className='text-danger'>
                              {errors.districtId && errors.districtId.message}
                            </span>
                          </div>
                          <div className='col-12 col-lg-6 form-group mb-2'>
                            <label className='form-label' htmlFor>
                              Address
                              <span className='text-danger'>*</span>
                            </label>
                            <input
                              type='text'
                              className='form-control control-form'
                              placeholder='Address'
                              name
                              id
                              {...register('address', {
                                required: 'Address is required'
                              })}
                            />
                            <span className='text-danger'>
                              {errors.address && errors.address.message}
                            </span>
                          </div>
                          <div className='d-grid d-md-inline-block text-end mt-3'>
                            <button type='submit' className='btn btn-primary'>
                              {loader == true ? (
                                <span className='spinner-border spinner-border-sm'></span>
                              ) : (
                                'Save POS'
                              )}
                            </button>
                          </div>
                        </div>
                      </form>
                    </TabPane>
                  </TabContent>

                  <TabContent activeTab={activeTab}>
                    <TabPane tabId='2'>
                      {details?.aadhar == 0 ? (
                        <form onSubmit={handleSubmit6(handleAddAadhar)}>
                          <div className='row'>
                            <div className='col-12 col-lg-6 form-group mb-2'>
                              <label className='form-label' htmlFor>
                                Aadhar Number
                                <span className='text-danger'>*</span>
                              </label>
                              <input
                                type='number'
                                className='form-control control-form'
                                placeholder='Aadhar Number'
                                name="aadhar_number"
                                id
                                {...register6('adhar_number', {
                                  required: 'Aadhar number is required',
                                  pattern: {
                                    value: /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/,
                                    message: 'Invalid Aadhar number'
                                  }
                                })}
                              />
                              <span className='text-danger'>
                                {errors6.aadhar_number &&
                                  errors6.aadhar_number.message}
                              </span>
                            </div>
                            <div className='row mb-3'>
                              <div className='col-12 col-md-4 col-lg-3'>
                                <div className='form-group form-group-2 mt-3'>
                                  <h6 className='mb-2 text-uppercase'>
                                    Aadhar-Front
                                  </h6>
                                  <label
                                    for='aadhar_front'
                                    className='btn btn-white ops-docs-img rounded btn-block'
                                  >
                                    <figure>
                                      {aadharFront &&
                                      aadharFront?.type?.includes('pdf') ? (
                                        <img
                                          src='./assets/img/pdf.png'
                                          className='docprev'
                                          alt='img'
                                        />
                                      ) : aadharFront ? (
                                        <img
                                          src={aadharFrontPreview}
                                          className='edit-profile-img'
                                          alt=''
                                        />
                                      ) : (
                                        <img
                                          src='./assets/img/default-img.webp'
                                          className='edit-profile-img'
                                          alt=''
                                        />
                                      )}
                                    </figure>
                                  </label>
                                  <input
                                    type='file'
                                    className='form-control d-none'
                                    name='aadhar_front'
                                    id='aadhar_front'
                                    onChange={e =>
                                      handleUploadAadharFront(e, 'aadhar_front')
                                    }
                                  />
                                </div>
                              </div>
                              <div className='col-12 col-md-4 col-lg-3'>
                                <div className='form-group form-group-2 mt-3'>
                                  <h6 className='mb-2 text-uppercase'>
                                    Aadhar-back
                                  </h6>
                                  <label
                                    for='aadhar_back'
                                    className='btn btn-white ops-docs-img rounded btn-block'
                                  >
                                    <figure>
                                      {aadharBack &&
                                      aadharBack?.type?.includes('pdf') ? (
                                        <img
                                          src='./assets/img/pdf.png'
                                          className='docprev'
                                          alt='img'
                                        />
                                      ) : aadharBack ? (
                                        <img
                                          src={aadharBackPreview}
                                          className=''
                                          alt=''
                                        />
                                      ) : (
                                        <img
                                          src='./assets/img/default-img.webp'
                                          className='edit-profile-img'
                                          alt=''
                                        />
                                      )}
                                    </figure>
                                  </label>
                                  <input
                                    type='file'
                                    className='form-control d-none'
                                    name='aadhar_back'
                                    id='aadhar_back'
                                    onChange={e =>
                                      handleUploadAadharBack(e, 'aadhar_back')
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className='d-grid d-md-inline-block text-end mt-3'>
                              <button type='submit' className='btn btn-primary'>
                                {loader == true ? (
                                  <span className='spinner-border spinner-border-sm'></span>
                                ) : (
                                  'Save POS'
                                )}
                              </button>
                            </div>
                          </div>
                        </form>
                      ) : (
                        <form onSubmit={handleSubmit3(handleAadharUpload)}>
                          <div className='row'>
                            <div className='col-12 col-lg-6 form-group mb-2'>
                              <label className='form-label' htmlFor>
                                Aadhar Number
                                <span className='text-danger'>*</span>
                              </label>
                              <input
                                type='number'
                                className='form-control control-form'
                                placeholder='Aadhar Number'
                                name
                                id
                                
                                {...register3('adhar_number', {
                                  required: 'Aadhar number is required',
                                  pattern: {
                                    value: /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/,
                                    message: 'Invalid Aadhar number'
                                  }
                                })}
                              />
                              <span className='text-danger'>
                                {errors3.aadhar_number &&
                                  errors3.aadhar_number.message}
                              </span>
                            </div>
                            <div className='row mb-3'>
                              <div className='col-12 col-md-4 col-lg-3'>
                                <div className='form-group form-group-2 mt-3'>
                                  <h6 className='mb-2 text-uppercase'>
                                    Aadhar-Front
                                  </h6>
                                  <label
                                    for='aadhar_front'
                                    className='btn btn-white ops-docs-img rounded btn-block'
                                  >
                                    <figure>
                                      {aadharFront &&
                                      aadharFront?.type?.includes('pdf') ? (
                                        <img
                                          src='./assets/img/pdf.png'
                                          className='docprev'
                                          alt='img'
                                        />
                                      ) : aadharFront ? (
                                        <img
                                          src={aadharFrontPreview}
                                          className='edit-profile-img'
                                          alt=''
                                        />
                                      ) : (
                                        <img
                                          src={details?.aadhar?.image}
                                          className='edit-profile-img'
                                          alt=''
                                        />
                                      )}
                                    </figure>
                                  </label>
                                  <input
                                    type='file'
                                    className='form-control d-none'
                                    name='aadhar_front'
                                    id='aadhar_front'
                                    onChange={e =>
                                      handleUploadAadharFront(e, 'aadhar_front')
                                    }
                                  />
                                </div>
                              </div>
                              <div className='col-12 col-md-4 col-lg-3'>
                                <div className='form-group form-group-2 mt-3'>
                                  <h6 className='mb-2 text-uppercase'>
                                    Aadhar-back
                                  </h6>
                                  <label
                                    for='aadhar_back'
                                    className='btn btn-white ops-docs-img rounded btn-block'
                                  >
                                    <figure>
                                      {aadharBack &&
                                      aadharBack?.type?.includes('pdf') ? (
                                        <img
                                          src='./assets/img/pdf.png'
                                          className='docprev'
                                          alt='img'
                                        />
                                      ) : aadharBack ? (
                                        <img
                                          src={aadharBackPreview}
                                          className=''
                                          alt=''
                                        />
                                      ) : (
                                        <img
                                          src={details?.aadhar?.image_back}
                                          className=''
                                          alt=''
                                        />
                                      )}
                                    </figure>
                                  </label>
                                  <input
                                    type='file'
                                    className='form-control d-none'
                                    name='aadhar_back'
                                    id='aadhar_back'
                                    onChange={e =>
                                      handleUploadAadharBack(e, 'aadhar_back')
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className='d-grid d-md-inline-block text-end mt-3'>
                              <button type='submit' className='btn btn-primary'>
                                {loader == true ? (
                                  <span className='spinner-border spinner-border-sm'></span>
                                ) : (
                                  'Save POS'
                                )}
                              </button>
                            </div>
                          </div>
                        </form>
                      )}
                    </TabPane>
                  </TabContent>

                  <TabContent activeTab={activeTab}>
                    <TabPane tabId='3'>
                      {/* {console.log("qwertyuytrewq", details?.documents?.filter((type) => type?.DocumentType == "aadhar_image")?.map((img) => img.img) == true)} */}
                      {details?.pan == 0 ? (
                        <form onSubmit={handleSubmit7(handleAddPan)}>
                          <div className='row'>
                            <div className='col-12 col-lg-6 form-group mb-2'>
                              <label className='form-label' htmlFor>
                                PAN Number
                                <span className='text-danger'>*</span>
                              </label>
                              <input
                                type='text'
                                className='form-control control-form text-uppercase'
                                placeholder='PAN Number'
                                name
                                id
                                {...register7('pan_number', {
                                  required: 'Pan number is required',
                                  pattern: {
                                    value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                                    message: 'Invalid Pan number'
                                  }
                                })}
                              />
                              <span className='text-danger'>
                                {errors7.pan_number &&
                                  errors7.pan_number.message}
                              </span>
                            </div>
                            <div className='row mb-3'>
                              <div className='col-12 col-md-4 col-lg-3'>
                                <div className='form-group form-group-2 mt-3'>
                                  <h6 className='mb-2 text-uppercase'>
                                    pan-card
                                  </h6>
                                  <label
                                    for='pan_image'
                                    className='btn btn-white ops-docs-img rounded btn-block'
                                  >
                                    <figure>
                                      {panImg &&
                                      panImg?.type?.includes('pdf') ? (
                                        <img
                                          src='./assets/img/pdf.png'
                                          className='docprev'
                                          alt='img'
                                        />
                                      ) : panImg ? (
                                        <img
                                          src={panImgPreview}
                                          className='edit-profile-img'
                                          alt=''
                                        />
                                      ) : (
                                        <img
                                          src='./assets/img/default-img.webp'
                                          className='edit-profile-img'
                                          alt=''
                                        />
                                      )}
                                    </figure>
                                  </label>
                                  <input
                                    type='file'
                                    className='form-control d-none'
                                    name='pan_image'
                                    id='pan_image'
                                    // {...register1('pan_image', {
                                    //   required: "Pan card is required"
                                    // })}
                                    onChange={e =>
                                      handleUploadDocs(e, 'pan_image')
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className='d-grid d-md-inline-block text-end mt-3'>
                              <button type='submit' className='btn btn-primary'>
                                {loader == true ? (
                                  <span className='spinner-border spinner-border-sm'></span>
                                ) : (
                                  'Save POS'
                                )}
                              </button>
                            </div>
                          </div>
                        </form>
                      ) : (
                        <form onSubmit={handleSubmit1(handlePanDetails)}>
                          <div className='row'>
                            <div className='col-12 col-lg-6 form-group mb-2'>
                              <label className='form-label' htmlFor>
                                PAN Number
                                <span className='text-danger'>*</span>
                              </label>
                              <input
                                type='text'
                                className='form-control control-form text-uppercase'
                                placeholder='PAN Number'
                                name
                                id
                                {...register1('pan_number', {
                                  required: 'Pan number is required',
                                  pattern: {
                                    value: /^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/,
                                    message: 'Invalid Pan number'
                                  }
                                })}
                                maxLength={10}
                              />
                              <span className='text-danger'>
                                {errors1.pan_number &&
                                  errors1.pan_number.message}
                              </span>
                            </div>
                            <div className='row mb-3'>
                              <div className='col-12 col-md-4 col-lg-3'>
                                <div className='form-group form-group-2 mt-3'>
                                  <h6 className='mb-2 text-uppercase'>
                                    pan-card
                                  </h6>
                                  <label
                                    for='pan_image'
                                    className='btn btn-white ops-docs-img rounded btn-block'
                                  >
                                    <figure>
                                      {panImg &&
                                      panImg?.type?.includes('pdf') ? (
                                        <img
                                          src='./assets/img/pdf.png'
                                          className='docprev'
                                          alt='img'
                                        />
                                      ) : panImg ? (
                                        <img
                                          src={panImgPreview}
                                          className='edit-profile-img'
                                          alt=''
                                        />
                                      ) : (
                                        <img
                                          src={details?.pan?.image}
                                          className='edit-profile-img'
                                          alt=''
                                        />
                                      )}
                                    </figure>
                                  </label>
                                  <input
                                    type='file'
                                    className='form-control d-none'
                                    name='pan_image'
                                    id='pan_image'
                                    // {...register1('pan_image', {
                                    //   required: "Pan card is required"
                                    // })}
                                    onChange={e =>
                                      handleUploadDocs(
                                        e,
                                        'pan_image'
                                        // img.id
                                      )
                                    }
                                  />
                                  {/* <span className="text-danger">
                                              {errors1.pan_image && errors1.pan_image.message}
                                            </span> */}
                                </div>
                              </div>
                            </div>
                            <div className='d-grid d-md-inline-block text-end mt-3'>
                              <button type='submit' className='btn btn-primary'>
                                {loader == true ? (
                                  <span className='spinner-border spinner-border-sm'></span>
                                ) : (
                                  'Save POS'
                                )}
                              </button>
                            </div>
                          </div>
                        </form>
                      )}
                    </TabPane>
                  </TabContent>

                  <TabContent activeTab={activeTab}>
                    <TabPane tabId='4'>
                      {details?.marksheet == 0 ? (
                        <form onSubmit={handleSubmit8(handleAddMarksheet)}>
                          <div className='row'>
                            <div className='col-12 col-md-4 col-lg-3'>
                              <div className='form-group form-group-2 mt-3'>
                                <h6 className='mb-2 text-uppercase'>
                                  marksheet
                                </h6>
                                <label
                                  for='marksheet'
                                  className='btn btn-white ops-docs-img rounded btn-block'
                                >
                                  <figure>
                                    {marksheet &&
                                    marksheet?.type?.includes('pdf') ? (
                                      <img
                                        src='./assets/img/pdf.png'
                                        className='docprev'
                                        alt='img'
                                      />
                                    ) : marksheet ? (
                                      <img
                                        src={marksheetPreview}
                                        className='edit-profile-img'
                                        alt=''
                                      />
                                    ) : (
                                      <img
                                        src='./assets/img/default-img.webp'
                                        className='edit-profile-img'
                                        alt=''
                                      />
                                    )}
                                  </figure>
                                </label>
                                <input
                                  type='file'
                                  name='marksheet'
                                  id='marksheet'
                                  className='form-control d-none'
                                  {...register8('marksheet', {
                                    required: 'Marksheet is required'
                                  })}
                                  onChange={e =>
                                    handleUploadDocs(e, 'marksheet')
                                  }
                                />
                                <span className='text-danger'>
                                  {errors8.marksheet_image &&
                                    errors8.marksheet_image.message}
                                </span>
                              </div>
                            </div>
                            <div className='d-grid d-md-inline-block text-end mt-3'>
                              <button type='submit' className='btn btn-primary'>
                                {loader == true ? (
                                  <span className='spinner-border spinner-border-sm'></span>
                                ) : (
                                  'Save POS'
                                )}
                              </button>
                            </div>
                          </div>
                        </form>
                      ) : (
                        <form onSubmit={handleSubmit2(handleMarksheetUpload)}>
                          <div className='row'>
                            <div className='col-12 col-md-4 col-lg-3'>
                              <div className='form-group form-group-2 mt-3'>
                                <h6 className='mb-2 text-uppercase'>
                                  marksheet
                                </h6>
                                <label
                                  for='marksheet'
                                  className='btn btn-white ops-docs-img rounded btn-block'
                                >
                                  <figure>
                                    {marksheet &&
                                    marksheet?.type?.includes('pdf') ? (
                                      <img
                                        src='./assets/img/pdf.png'
                                        className='docprev'
                                        alt='img'
                                      />
                                    ) : marksheet ? (
                                      <img
                                        src={marksheetPreview}
                                        className='edit-profile-img'
                                        alt=''
                                      />
                                    ) : (
                                      <img
                                        src={details?.marksheet?.image}
                                        className='edit-profile-img'
                                        alt=''
                                      />
                                    )}
                                  </figure>
                                  {/* <img
                                              src={img?.image}
                                              className="edit-profile-img"
                                              alt=""
                                            /> */}
                                </label>
                                <input
                                  type='file'
                                  name='marksheet'
                                  id='marksheet'
                                  className='form-control d-none'
                                  {...register2('marksheet', {
                                    required: 'Marksheet is required'
                                  })}
                                  onChange={e =>
                                    handleUploadDocs(
                                      e,
                                      'marksheet'
                                      // img?.id
                                    )
                                  }
                                />
                                <span className='text-danger'>
                                  {errors2.marksheet_image &&
                                    errors2.marksheet_image.message}
                                </span>
                              </div>
                            </div>
                            <div className='d-grid d-md-inline-block text-end mt-3'>
                              <button type='submit' className='btn btn-primary'>
                                {loader == true ? (
                                  <span className='spinner-border spinner-border-sm'></span>
                                ) : (
                                  'Save POS'
                                )}
                              </button>
                            </div>
                          </div>
                        </form>
                      )}
                    </TabPane>
                  </TabContent>

                  <TabContent activeTab={activeTab}>
                    <TabPane tabId='5'>
                      {details?.bank == null ? (
                        <form onSubmit={handleSubmit9(handleAddBank)}>
                          <div className='row'>
                            <div className='col-12 col-lg-6 form-group mb-2'>
                              <label className='form-label' htmlFor>
                                Select Bank Name
                                <span className='text-danger'>*</span>
                              </label>
                              <select
                                className='control-form form-select'
                                name='bank'
                                id='bank'
                                onChange={e => handleSelectBank(e)}
                              >
                                <option className='d-none' value>
                                  Select Bank Name
                                </option>
                                {bankNameArr &&
                                  bankNameArr?.length > 0 &&
                                  bankNameArr?.map((bankName, index) => (
                                    <>
                                      <option
                                        value={bankName?.bank_name}
                                        key={index}
                                      >
                                        {bankName.bank_name}
                                      </option>
                                    </>
                                  ))}
                              </select>
                              <span className='text-danger'>
                                {errors9.bank_name && errors9.bank_name.message}
                              </span>
                            </div>
                            <div className='col-12 col-lg-6 form-group mb-2'>
                              <label className='form-label' htmlFor>
                                Account Number
                                <span className='text-danger'>*</span>
                              </label>
                              <input
                                type='number'
                                placeholder='Account Number'
                                className='form-control control-form'
                                name
                                id
                           
                                {...register("accountNumber", {
                                  required: "Account number is required",
                                })}
                   
                                onInput={(e) => {
                                  e.target.value = e.target.value.slice(0, 17);
                                }}
                              />
                              <span className='text-danger'>
                                {errors9.accountNumber &&
                                  errors9.accountNumber.message}
                              </span>
                            </div>
                            <div className='col-12 col-lg-6 form-group mb-2'>
                              <label className='form-label' htmlFor>
                                IFSC
                                <span className='text-danger'>*</span>
                              </label>
                              <input
                                type='text'
                                placeholder='IFSC'
                                className='form-control control-form text-uppercase'
                                name
                                id
                                {...register9('ifsc', {
                                  required: 'IFSC code is required'
                                })}
                                maxLength={11}
                              />
                              <span className='text-danger'>
                                {errors9.ifsc && errors9.ifsc.message}
                              </span>
                            </div>
                            <div className='col-12 col-md-4 col-lg-3'>
                              <div className='form-group form-group-2'>
                                <h6 className='mb-2 text-uppercase'>
                                  Passbook
                                </h6>
                                <label
                                  for='passbook'
                                  className='btn btn-white ops-docs-img rounded btn-block'
                                >
                                  <figure>
                                    {passbook &&
                                    passbook?.type?.includes('pdf') ? (
                                      <img
                                        src='./assets/img/pdf.png'
                                        className='docprev'
                                        alt='img'
                                      />
                                    ) : passbook ? (
                                      <img
                                        src={passbookPreview}
                                        className='edit-profile-img'
                                        alt=''
                                      />
                                    ) : (
                                      <img
                                        src='./assets/img/default-img.webp'
                                        className='edit-profile-img'
                                        alt=''
                                      />
                                    )}
                                  </figure>
                                </label>
                                <input
                                  type='file'
                                  name='passbook'
                                  id='passbook'
                                  className='form-control d-none'
                                  onChange={e =>
                                    handleUploadDocs(e, 'passbook')
                                  }
                                />
                                <span className='text-danger'>
                                  {errors9.passbook_cheque &&
                                    errors9.passbook_cheque.message}
                                </span>
                              </div>
                            </div>
                            <div className='d-grid d-md-inline-block text-end mt-3'>
                              <button type='submit' className='btn btn-primary'>
                                {loader == true ? (
                                  <span className='spinner-border spinner-border-sm'></span>
                                ) : (
                                  'Save POS'
                                )}
                              </button>
                            </div>
                          </div>
                        </form>
                      ) : (
                        <form onSubmit={handleSubmit5(handleBankDetails)}>
                          <div className='row'>
                            <div className='col-12 col-lg-6 form-group mb-2'>
                              <label className='form-label' htmlFor>
                                Select Bank Name
                                <span className='text-danger'>*</span>
                              </label>
                              <select
                                className='control-form form-select'
                                name='bank'
                                id='bank'
                                onChange={e => handleSelectBank(e)}
                              >
                                <option className='d-none' value>
                                  Select Bank Name
                                </option>
                                {bankNameArr &&
                                  bankNameArr?.length > 0 &&
                                  bankNameArr?.map((bankName, index) => (
                                    <>
                                      <option
                                        value={bankName?.bank_name}
                                        key={index}
                                      >
                                        {bankName.bank_name}
                                      </option>
                                    </>
                                  ))}
                              </select>
                              <span className='text-danger'>
                                {errors5.bank_name && errors5.bank_name.message}
                              </span>
                            </div>
                            <div className='col-12 col-lg-6 form-group mb-2'>
                              <label className='form-label' htmlFor>
                                Account Number
                                <span className='text-danger'>*</span>
                              </label>
                              <input
                                type='number'
                                placeholder='Account Number'
                                className='form-control control-form'
                                name
                                id
                                {...register5('accountNumber', {
                                  // required: "Account number is required",
                                })}
                                onInput={(e) => {
                                  e.target.value = e.target.value.slice(0, 17);
                                }}
                              />
                              <span className='text-danger'>
                                {errors5.accountNumber &&
                                  errors5.accountNumber.message}
                              </span>
                            </div>
                            <div className='col-12 col-lg-6 form-group mb-2'>
                              <label className='form-label' htmlFor>
                                IFSC
                                <span className='text-danger'>*</span>
                              </label>
                              <input
                                type='text'
                                placeholder='IFSC'
                                className='form-control control-form'
                                name
                                id
                                {...register5('ifsc', {
                                  required: 'IFSC code is required'
                                })}
                                maxLength={11}
                              />
                              <span className='text-danger'>
                                {errors5.ifsc && errors5.ifsc.message}
                              </span>
                            </div>
                            <div className='col-12 col-md-4 col-lg-3'>
                              <div className='form-group form-group-2 mt-2'>
                                <h6 className='mb-2 text-uppercase'>
                                  Passbook
                                </h6>
                                <label
                                  for='passbook'
                                  className='btn btn-white ops-docs-img rounded btn-block'
                                >
                                  <figure>
                                    {passbook &&
                                    passbook?.type?.includes('pdf') ? (
                                      <img
                                        src='./assets/img/pdf.png'
                                        className='docprev'
                                        alt='img'
                                      />
                                    ) : passbook ? (
                                      <img
                                        src={passbookPreview}
                                        className='edit-profile-img'
                                        alt=''
                                      />
                                    ) : (
                                      <img
                                        src={details?.bank?.passbookOrCheque}
                                        className='edit-profile-img'
                                        alt=''
                                      />
                                    )}
                                  </figure>
                                </label>
                                <input
                                  type='file'
                                  name='passbook'
                                  id='passbook'
                                  className='form-control d-none'
                                  onChange={e =>
                                    handleUploadDocs(e, 'passbook')
                                  }
                                />
                                <span className='text-danger'>
                                  {errors5.passbook_cheque &&
                                    errors5.passbook_cheque.message}
                                </span>
                              </div>
                            </div>
                            <div className='d-grid d-md-inline-block text-end mt-3'>
                              <button type='submit' className='btn btn-primary'>
                                {loader == true ? (
                                  <span className='spinner-border spinner-border-sm'></span>
                                ) : (
                                  'Save POS'
                                )}
                              </button>
                            </div>
                          </div>
                        </form>
                      )}
                    </TabPane>
                  </TabContent>

                  <TabContent activeTab={activeTab}>
                    <TabPane tabId='6'>
                      {details?.profile_picture == null ? (
                        <form onSubmit={handleSubmit10(handleAddProfileImage)}>
                          <div className='row'>
                            <div className='col-12 col-md-4 col-lg-3'>
                              <div className='form-group form-group-2 mt-3'>
                                <h6 className='mb-2 text-uppercase'>
                                  Profile Piture
                                </h6>
                                <label
                                  for='profile_picture'
                                  className='btn btn-white ops-docs-img rounded btn-block'
                                >
                                  <figure>
                                    {profilePiture &&
                                    profilePiture?.type?.includes('pdf') ? (
                                      <img
                                        src='./assets/img/pdf.png'
                                        className='docprev'
                                        alt='img'
                                      />
                                    ) : profilePiture ? (
                                      <img
                                        src={profilePiturePreview}
                                        className='edit-profile-img'
                                        alt=''
                                      />
                                    ) : (
                                      <img
                                        src='./assets/img/default-img.webp'
                                        className='edit-profile-img'
                                        alt=''
                                      />
                                    )}
                                  </figure>
                                </label>
                                <input
                                  type='file'
                                  name='profile_picture'
                                  id='profile_picture'
                                  className='form-control d-none'
                                  {...register10('profile_picture', {
                                    required: 'Profile piture is required'
                                  })}
                                  onChange={e => handleUploadProfileImg(e)}
                                />
                                <span className='text-danger'>
                                  {errors10.profile_picture &&
                                    errors10.profile_picture.message}
                                </span>
                              </div>
                            </div>
                            <div className='d-grid d-md-inline-block text-end mt-3'>
                              <button type='submit' className='btn btn-primary'>
                                {loader == true ? (
                                  <span className='spinner-border spinner-border-sm'></span>
                                ) : (
                                  'Save POS'
                                )}
                              </button>
                            </div>
                          </div>
                        </form>
                      ) : (
                        <form
                          onSubmit={handleSubmit11(handleUpdateProfilePicture)}
                        >
                          <div className='row'>
                            <div className='col-12 col-md-4 col-lg-3'>
                              <div className='form-group form-group-2 mt-3'>
                                <h6 className='mb-2 text-uppercase'>
                                  Profile Picture
                                </h6>
                                <label
                                  for='profile_picture'
                                  className='btn btn-white ops-docs-img rounded btn-block'
                                >
                                  <figure>
                                    {profilePiture &&
                                    profilePiture?.type?.includes('pdf') ? (
                                      <img
                                        src='./assets/img/pdf.png'
                                        className='docprev'
                                        alt='img'
                                      />
                                    ) : profilePiture ? (
                                      <img
                                        src={profilePiturePreview}
                                        className='edit-profile-img'
                                        alt=''
                                      />
                                    ) : (
                                      <img
                                        src={details?.profile_picture?.image}
                                        className='edit-profile-img'
                                        alt=''
                                      />
                                    )}
                                  </figure>
                                    <img
                                                src={details?.profilePiture}
                                                className="edit-profile-img"
                                                alt=""
                                              />
                                </label>
                                <input
                                  type='file'
                                  name='profile_picture'
                                  id='profile_picture'
                                  className='form-control d-none'
                                  {...register11('profile_picture', {
                                    required: 'Profile piture is required'
                                  })}
                                  onChange={e => handleUploadProfileImg(e)}
                                />
                                <span className="text-danger">
                                  {errors11.profile_picture &&
                                    errors11.profile_picture.message}
                                </span>
                              </div>
                            </div>
                            <div className='d-grid d-md-inline-block text-end mt-3'>
                              <button type='submit' className='btn btn-primary'>
                                {loader == true ? (
                                  <span className='spinner-border spinner-border-sm'></span>
                                ) : (
                                  'Save POS'
                                )}
                              </button>
                            </div>
                          </div>
                        </form>
                      )}
                    </TabPane>
                  </TabContent>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default EditPos
