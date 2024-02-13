import React, { useEffect, useState } from 'react'
import Layout from '../../Common/Layout'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Table
} from 'reactstrap'
import { IoMdClose } from 'react-icons/io'
import { FaEye } from 'react-icons/fa'
import { GetData, PostData } from '../../../apiHelper/ApiHelper'
import { useSelector } from 'react-redux'
import {
  getVehicleMake,
  getVehicleModel,
  getVehiclePreviousInsurer,
  getVehicleVariant
} from '../../../apiHelper/masterService'
import ReactSelect from '../../Tags/ReactSelect'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import moment from 'moment'

const EditLead = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [vType, setVType] = useState('')
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [caseType, setCaseType] = useState('')
  const [variant, setVariant] = useState('')
  const [variantData, setVariantData] = useState([])
  const [editDetails, setEditDetails] = useState(false)
  const toggle = () => setEditDetails(!editDetails)
  const [activeTab, setActiveTab] = useState('1')
  const location = useLocation()
  const [leadStatus, setLeadStatus] = useState('')
  const [makeData, setMakeData] = useState([])
  const [modelData, setModelData] = useState([])
  const [fuelTypes, setFuelTypes] = useState([])
  const [ncb, setNCB] = useState(null)
  const [insurerData, setInsurerData] = useState([])
  const [fuelValue, setFuelValue] = useState(null)
  const [uniquePolicyNumber, setUniquePolicyNumber] = useState(null)
  const userDetails = useSelector(state => state?.root?.userDetails)
  const [leadId, setLeadId] = useState(null)
  const [cpaAmount, setCpaAmount] = useState('')
  const [odNetPremium, setOdNetPremium] = useState()
  const [tpNetPremium, setTpNetPremium] = useState()
  const [policyIssuedDate, setpolicyIssuedDate] = useState('')
  const [ccFuel, setCcFuel] = useState({
    cc: '',
    fuel: ''
  })
  const [gst, setGst] = useState('')

  console.log('Policy Issued Date', policyIssuedDate)

  // Premium Calculation
  useEffect(() => {
    const odNetPremiumNumber = parseFloat(odNetPremium)
    const tpNetPremiumNumber = parseFloat(tpNetPremium)
    const cpaPremium = parseFloat(cpaAmount)

    if (!isNaN(odNetPremiumNumber) && !isNaN(tpNetPremiumNumber)) {
      const netPre = odNetPremiumNumber + tpNetPremiumNumber + cpaPremium
      const gstAmount = parseFloat(gst)

      const finalPremiumNumber = netPre + gstAmount

      setValue('NetPremium', netPre)
      setValue('finalPremium', finalPremiumNumber)
    }
  }, [odNetPremium, tpNetPremium, gst])

  // Policy Date Selection
  const handlePolicyEndDate = date => {
    const calculatedEndDate = moment(date)
      .add(1, 'year')
      .subtract(1, 'day')
      .format('YYYY-MM-DD')
    console.log('Policy End Date', calculatedEndDate)
    setValue('policyEndDate', calculatedEndDate)
  }

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors }
  } = useForm({ mode: 'onBlur' })

  useEffect(() => {
    const arr = []
    arr.push(location.state)
    setData(arr)
    setLeadStatus(location?.state?.lead_status)
    setUniquePolicyNumber(location?.state?.lead_data?.policyUniqueId)
    setLeadId(location?.state?.lead_id)
    console.log('Vehicle Type', arr[0]?.lead_data?.vehicleCategory)
    setVType(arr[0]?.lead_data?.vehicleCategory)
    console.log('Vehicle Type', arr)

    getVehicleMake({ Vehicle_Type: arr[0]?.lead_data?.vehicleCategory }).then(
      response => {
        if (response.status === true) {
          let data = response.data
          let i = 0
          let arr = []
          while (i < data.length) {
            let item = data[i]
            arr.push({
              label: item.Make,
              value: item.Make
            })
            i++
          }
          setMakeData(arr)
        }
      }
    )

    getVehicleModel({
      make: arr[0]?.lead_data?.vehicleMake,
      Vehicle_Type: arr[0]?.lead_data?.vehicleCategory
    }).then(response => {
      if (response.status === true) {
        let data = response.data
        let i = 0
        let arr = []
        while (i < data.length) {
          let item = data[i]
          arr.push({
            label: item.Model,
            value: item.Model
          })
          i++
        }
        setModelData(arr)
      }
    })

    getVehicleVariant({
      make: arr[0]?.lead_data?.vehicleMake,
      model: arr[0]?.lead_data?.vehicleModel,
      Vehicle_Type: arr[0]?.lead_data?.vehicleCategory
    }).then(response => {
      if (response.status === true) {
        let data = response.data
        let fuelTypeArr = data.filter(
          (v, i, a) => a.findIndex(v2 => v2.Fuel_Type === v.Fuel_Type) === i
        )
        let j = 0
        let fuelarr = []
        while (j < fuelTypeArr.length) {
          fuelarr.push(fuelTypeArr[j].Fuel_Type)
          j++
        }
        console.log('fuelTYPE', fuelarr)
        setFuelTypes(fuelarr)
        let i = 0
        let arr = []
        while (i < data.length) {
          let item = data[i]
          arr.push({
            label: item.Variant,
            value: item.Vehicle_Code,
            Fuel_Type: item.Fuel_Type,
            Cubic_Capacity: item.Cubic_Capacity,
            Seating_Capacity: item.Seating_Capacity,
            HDFC: item.HDFC,
            Shriram: item.Shriram,
            Kotak: item.Kotak,
            Reliance: item.Reliance,
            Future: item.Future,
            Royal: item.Royal
          })
          i++
        }
        setVariantData(arr)
      }
    })

    // setVehicleCategory(arr[0]?.lead)
  }, [location.state])

  useEffect(() => {
    console.log('STATE SUSER', leadStatus)
  }, [leadStatus])

  useEffect(() => {
    getVehiclePreviousInsurer().then(response => {
      if (
        response?.status === true &&
        response?.message === 'All Previous Insurers Fetched Successfully'
      ) {
        let i = 0
        let data = response.data
        let arr = []
        while (i < data.length) {
          let item = data[i]
          arr.push({
            option: item.Name,
            value: item.Digit_Code
          })
          i++
        }
        setInsurerData(arr)
      }
    })

    
    
  }, [])

  useEffect(() => {
    console.log('policyNumber', data[0]?.lead_data?.policy_number)
    setValue('policyNumber', data[0]?.lead_data?.policy_number)
    setValue('currentPolicyInsurer', data[0]?.lead_data?.currentInsuerName)
  },[])

  const handleVehicleCategory = value => {
    console.log('VALUE', value)
    getVehicleMake({ Vehicle_Type: value }).then(response => {
      if (
        response?.status === true &&
        response?.message === 'All Make Fetched Successfully'
      ) {
        setMakeData(response?.data)
      }
      console.log('MAKE RESPONSE', response)
    })
  }

  // useEffect(() => {
  //   handleSelectMake();
  //   handleSelectModel();
  // }, [
  //   data[0]?.lead_data?.vehicleMake,
  //   data[0]?.lead_data?.vehicleModel,
  //   data[0]?.lead_data?.vehicleVariant,
  // ]);

  const handleVehicleType = vType => {
    console.log('vType', vType)
    setVType(vType)
    getVehicleMake({ Vehicle_Type: vType }).then(response => {
      if (response.status === true) {
        let data = response.data
        let i = 0
        let arr = []
        while (i < data.length) {
          let item = data[i]
          arr.push({
            label: item.Make,
            value: item.Make
          })
          i++
        }
        setMakeData(arr)
      }
    })
  }

  const handleSelectMake = make => {
    setMake(make)
    getVehicleModel({
      make: make,
      Vehicle_Type: data[0]?.lead_data?.vehicleCategory
    }).then(response => {
      if (response.status === true) {
        let data = response.data
        let i = 0
        let arr = []
        while (i < data.length) {
          let item = data[i]
          arr.push({
            label: item.Model,
            value: item.Model
          })
          i++
        }
        setModelData(arr)
      }
    })
  }

  const handleSelectModel = model => {
    setModel(model)
    getVehicleVariant({
      make: make,
      model: model,
      Vehicle_Type: vType
    }).then(response => {
      if (response.status === true) {
        let data = response.data
        let fuelTypeArr = data.filter(
          (v, i, a) => a.findIndex(v2 => v2.Fuel_Type === v.Fuel_Type) === i
        )
        let j = 0
        let fuelarr = []
        while (j < fuelTypeArr.length) {
          fuelarr.push(fuelTypeArr[j].Fuel_Type)
          j++
        }
        console.log('fuelTYPE', fuelarr)
        setFuelTypes(fuelarr)
        let i = 0
        let arr = []
        while (i < data.length) {
          let item = data[i]
          arr.push({
            label: item.Variant,
            value: item.Vehicle_Code,
            Fuel_Type: item.Fuel_Type,
            Cubic_Capacity: item.Cubic_Capacity,
            Seating_Capacity: item.Seating_Capacity,
            HDFC: item.HDFC,
            Shriram: item.Shriram,
            Kotak: item.Kotak,
            Reliance: item.Reliance,
            Future: item.Future,
            Royal: item.Royal
          })
          i++
        }
        setVariantData(arr)
      }
    })
  }

  const handleSelectVariant = val => {
    setVariant(val?.label)
  }

  const handleSelectPetrolType = val => {
    console.log('FUEL TYPE', val)
    setFuelValue(val)
    if (val == 'CNG' || val == 'LPG') {
      // dispatchQuickQuote("IsInternalCNG", true);
    }
    // dispatchQuickQuote("FuelType", val);
    // dispatchQuickQuote("FuelType", val);
  }

  useEffect(() => {
    if (variantData.length > 0) {
      console.log('variantData', variantData)
      console.log(
        'setCcFuel({ cc: logic[0].Cubic_Capacity, fuel: logic[0].Fuel_Type });',
        variant
      )
      const logic = variantData?.filter(i =>
        i?.label === data[0]?.lead_data?.vehicleVariant ? i.label : variant
      )
      console.log('Logic variantData', logic)
      if (logic.length > 0) {
        setCcFuel({ cc: logic[0].Cubic_Capacity, fuel: logic[0].Fuel_Type })
      }
    }
  }, [variantData, variant])

  console.log('Get Values', data[0])

  const submitDetails = finalData => {
    console.log('Edit Lead Data', finalData)
    let obj = {
      vehicleNumber: data[0]?.lead_data?.vehicleNumber
    }
    const postData = {
      leadId: leadId,
      UniquePolicyId: uniquePolicyNumber,
      customerName: data[0]?.lead_data?.customerFullName,
      customerMobileNumber: data[0]?.lead_data?.customerNumber,
      customerEmailAddress: data[0]?.lead_data?.customerEmailAddress,
      customerPincode: data[0]?.lead_data?.customerPincode,
      customerCity: data[0]?.lead_data?.customerCity,
      customerState: data[0]?.lead_data?.customerState,
      vehicleDetails: obj,
      vehicleMake: make || data[0]?.lead_data?.vehicleMake,
      vehicleModel: model || data[0]?.lead_data?.vehicleModel,
      vehicleVariant: variant || data[0]?.lead_data?.vehicleVariant,
      caseType: caseType || data[0]?.lead_data?.caseType,
      policyType: finalData?.policyType || data[0]?.lead_data?.policyType,
      vehicleCategory: vType || data[0]?.lead_data?.vehicleCategory,
      fuelType: fuelValue,
      sitting_capacity: null,
      vehicle_idv: finalData?.idv,
      vehicle_ncb: finalData?.ncb,
      engine_number: finalData?.engineNumber,
      chassis_number: finalData?.chassisNumber,
      cubic_capacity: finalData?.cubicCapacity,
      policyStatus: finalData?.policyStatus,
      manufacturing_Date: finalData?.ManufaturingDate,
      registration_date: finalData?.regDates,
      policy_issued_date: finalData?.policyIssueDate,
      policy_start_date: finalData?.policyStartDate,
      policy_end_date: finalData?.policyEndDate,
      policy_number:
        finalData?.policyNumber || data[0]?.lead_data?.policy_number,
      cpa: finalData?.CPA,
      od_net_premium: finalData?.odNetPremium,
      tp_premium: finalData?.TPPremium,
      net_premium: finalData?.NetPremium,
      gst_Tax_amount: finalData?.GST,
      final_premium: finalData?.finalPremium,
      MIS_employee_data: userDetails,
      assignedMisName: userDetails?.name,
      insurerName: finalData?.previousInsurerCode,
      currentInsurer: finalData?.currentPolicyInsurer || data[0]?.lead_data?.currentInsuerName,
      userType: 'MIS'
    }

    console.log('Edit Lead Data', finalData)

    PostData(`admin/submit_data`, postData).then(response => {
      if (response?.success) {
        toast(response?.message, { type: 'success' })
        navigate('/my-pool')
      } else {
        toast(response?.message, { type: 'error' })
      }
    })
  }
  return (
    <Layout>
      <div className='page-content-crumb'>
        <div className='breadcrumb-area'>
          <ol className='breadcrumb'>
            <li className='item'>
              <Link to='/dashboard'>
                <i className='fa fa-home' aria-hidden='true' />
              </Link>
            </li>
            <li className='item'>Edit Lead</li>
          </ol>
        </div>
        <button className='btn btn-danger' onClick={() => navigate(-1)}>
          <span className='d-none d-md-block'>Back</span>
          <span className='d-block d-md-none'>
            <i className='fa fa-sign-out' aria-hidden='true'></i>
          </span>
        </button>
      </div>
      <form onSubmit={handleSubmit(submitDetails)}>
        {' '}
        <div className='col-12'>
          <div className='card display-card'>
            <div className='row card-body p-0 mb-2'>
              {/* Customer Name */}
              <div className='col-3 col-lg-4 form-group mb-3'>
                <div className='did-floating-label-content input-group'>
                  <input
                    type='text'
                    id='keyword'
                    name='keyword'
                    {...register('customerName')}
                    className='did-floating-input'
                    defaultValue={data[0]?.lead_data?.customerFullName}
                    placeholder=''
                  />
                  <label className='did-floating-label' htmlFor>
                    Customer Name
                  </label>
                </div>
              </div>

              {/* Customer Mobile */}
              <div className='col-3 col-lg-4 form-group mb-3'>
                <div className='did-floating-label-content input-group'>
                  <input
                    type='number'
                    id='customerNumber'
                    name=''
                    className='did-floating-input'
                    {...register('customerNumber')}
                    defaultValue={data[0]?.lead_data?.customerNumber}
                    placeholder=''
                  />
                  <label className='did-floating-label' htmlFor>
                    Contact Number
                  </label>
                </div>
              </div>

              {/* Customer Email */}
              <div className='col-3 col-lg-4 form-group mb-3'>
                <div className='did-floating-label-content input-group'>
                  <input
                    type='email'
                    id='customerEmailAddress'
                    name='customerEmailAddress'
                    className='did-floating-input'
                    placeholder=''
                    {...register('customerEmailAddress')}
                    defaultValue={data[0]?.lead_data?.customerEmailAddress}
                  />
                  <label className='did-floating-label' htmlFor>
                    Email
                  </label>
                </div>
              </div>

              {/* Policy Status */}
              {/* <div className='col-3 col-lg-4 form-group mb-3'>
                <div className='position-relative'>
                  <div className='did-floating-label-content'>
                    <select
                      className='did-floating-select'
                      id='policyStatus'
                      name='policyStatus'
                      {...register('policyStatus')}
                    >
                      <option selected>Select Policy Status</option>
                      <option value={'NewBusiness'}>New Business</option>
                      <option value={'break-in'}>Break-In</option>
                      <option value={'continue'}>Continue</option>
                    </select>

                    <span className='text-danger'>
                      {errors?.vType?.message}
                    </span>
                  </div>
                </div>
              </div> */}

              {/* Pincode */}
              <div className='col-3 col-lg-4 form-group mb-3'>
                <div className='did-floating-label-content input-group'>
                  <input
                    type='text'
                    id='customerPincode'
                    name='customerPincode'
                    className='did-floating-input'
                    placeholder=''
                    {...register('customerPincode')}
                    defaultValue={data[0]?.lead_data?.customerPincode}
                  />
                  <label className='did-floating-label' htmlFor>
                    Pincode
                  </label>
                </div>
              </div>

              {/* City */}
              <div className='col-3 col-lg-4 form-group mb-3'>
                <div className='did-floating-label-content input-group'>
                  <input
                    type='text'
                    id='customerCity'
                    name='customerCity'
                    className='did-floating-input'
                    placeholder='City'
                    {...register('customerCity')}
                    defaultValue={data[0]?.lead_data?.customerCity}
                  />
                  <label className='did-floating-label' htmlFor>
                    City
                  </label>
                </div>
              </div>

              {/* State */}
              <div className='col-3 col-lg-4 form-group mb-3'>
                <div className='did-floating-label-content input-group'>
                  <input
                    type='text'
                    id='customerState'
                    name='customerState'
                    className='did-floating-input'
                    placeholder='State'
                    {...register('customerState')}
                    defaultValue={data[0]?.lead_data?.customerState}
                  />
                  <label className='did-floating-label' htmlFor>
                    State
                  </label>
                </div>
              </div>

              {/* Vehicle Number */}
              <div className='col-3 col-lg-4 form-group mb-3'>
                <div className='did-floating-label-content'>
                  <input
                    type='text'
                    id='vehicleNumber'
                    name='vehicleNumber'
                    className='did-floating-input'
                    placeholder='Vehicle Number'
                    {...register('vehicleNumber')}
                    defaultValue={data[0]?.lead_data?.vehicleNumber}
                  />
                  <label className='did-floating-label' htmlFor>
                    Vehicle Number
                  </label>
                </div>
              </div>

              {/* Vehicle Type */}
              <div className='col-3 col-lg-4 form-group mb-3'>
                <div className='position-relative'>
                  <div className='did-floating-label-content'>
                    <select
                      className='did-floating-select'
                      id='vType'
                      name='vType'
                      defaultChecked={data[0]?.lead_data?.vehicleCategory}
                      {...register('vType', {
                        required: 'Please Select Vehicle Type',
                        onChange: e => handleVehicleType(e?.target?.value)
                      })}
                    >
                      <option>Select Vehicle Type</option>
                      <option
                        key=''
                        value='Pvt Car'
                        selected={vType === 'Pvt Car' ? true : false}
                      >
                        Pvt Car
                      </option>
                      <option
                        key=''
                        value='MotorBike'
                        selected={vType === 'MotorBike' ? true : false}
                      >
                        Two Wheeler
                      </option>
                      <option
                        key=''
                        value='Passenger Carrying'
                        selected={vType === 'Passenger Carrying' ? true : false}
                      >
                        Passenger Carrying Vehicle (PCV)
                      </option>
                      <option
                        key=''
                        value='Goods Carrying'
                        selected={vType === 'Goods Carrying' ? true : false}
                      >
                        Goods Carrying Vehicle (GCV)
                      </option>
                      <option
                        key=''
                        value='misd'
                        selected={vType === 'misd' ? true : false}
                      >
                        MISD
                      </option>
                      <option
                        key=''
                        value='trailer'
                        selected={vType === 'trailer' ? true : false}
                      >
                        Trailer
                      </option>
                    </select>
                    <label className='did-floating-label' htmlFor>
                      {/* Vehicle Type */}
                    </label>
                  </div>
                  <span className='text-danger'>{errors?.vType?.message}</span>
                </div>
              </div>

              {/* Vehicle Make */}
              <div className='col-3 col-lg-4 form-group mb-3'>
                <div className='position-relative'>
                  <div className='did-floating-label-content'>
                    <ReactSelect
                      options={makeData}
                      className='did-floating-select'
                      name='make'
                      placeholder='Select Manufacturer'
                      defaultValue={data[0]?.lead_data?.vehicleMake}
                      onChange={val => handleSelectMake(val.value)}
                    />
                    {/* <label className='did-floating-label' htmlFor>
                Vehicle Type
                  </label> */}
                  </div>
                  <span className='text-danger'>{errors?.Make?.message}</span>
                </div>
              </div>

              {/* Vehicle Model */}
              <div className='col-3 col-lg-4 form-group mb-3'>
                <div className='position-relative'>
                  <div className='form-floating inother'>
                    <ReactSelect
                      options={modelData}
                      className='form-select'
                      name='model'
                      placeholder='Select vehicle modal'
                      defaultValue={data[0]?.lead_data?.vehicleModel}
                      onChange={val => handleSelectModel(val.value)}
                    />
                  </div>
                  <span className='text-danger'>{errors?.Make?.message}</span>
                </div>
              </div>

              {/* Vehicle Variant */}
              <div className='col-3 col-lg-4 form-group mb-3'>
                <div className='position-relative'>
                  <div className='form-floating inother'>
                    <ReactSelect
                      options={variantData}
                      className='form-select'
                      name='make'
                      placeholder='Select Variant'
                      defaultValue={data[0]?.lead_data?.vehicleVariant}
                      onChange={val => handleSelectVariant(val)}
                    />
                  </div>
                  <span className='text-danger'>{errors?.Make?.message}</span>
                </div>
              </div>

              {/* Cubic Capacity / Sitting Capacity / Gross Weight */}
              {vType === 'Pvt Car' ? (
                <div className='col-3 col-lg-4 form-group mb-3'>
                  <div className='did-floating-label-content input-group'>
                    <input
                      type='text'
                      name='cubicCapacity'
                      className='did-floating-input'
                      placeholder=''
                      {...register('cubicCapacity')}
                      defaultValue={ccFuel?.cc}
                    />
                    <label className='did-floating-label' htmlFor>
                      Cubic Capacity
                    </label>
                  </div>
                </div>
              ) : vType === 'MotorBike' ? (
                <div className='col-3 col-lg-4 form-group mb-3'>
                  <div className='did-floating-label-content input-group'>
                    <input
                      type='text'
                      name='cubicCapacity'
                      className='did-floating-input'
                      placeholder=''
                      {...register('cubicCapacity')}
                    />
                    <label className='did-floating-label' htmlFor>
                      Cubic Capacity
                      <span className='text-danger'>*</span>
                    </label>
                  </div>
                </div>
              ) : vType === 'Passenger Carrying' ? (
                <div className='col-3 col-lg-4 form-group mb-3'>
                  <div className='position-relative'>
                    <div className='did-floating-label-content'>
                      <select
                        className='did-floating-select'
                        onChange={e => handleSelectPetrolType(e.target.value)}
                      >
                        <option>Select Seating Capacity</option>
                        <option value={4 + 1}>4 + 1</option>
                        <option value={5 + 1}>5 + 1</option>
                        <option value={6 + 1}>6 + 1</option>
                        <option value={7 + 1}>7 + 1</option>
                        <option value={8 + 1}>8 + 1</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : vType === 'Goods Carrying' ? (
                <div className='col-3 col-lg-4 form-group mb-3'>
                  <div className='did-floating-label-content input-group'>
                    <input
                      type='text'
                      name='grossWeight'
                      id='grossWeight'
                      className='did-floating-input'
                      placeholder='Gross Weight'
                      {...register('grossWeight')}
                    />
                  </div>
                </div>
              ) : (
                <div className='col-3 col-lg-4 form-group mb-3'>
                  <div className='did-floating-label-content input-group'>
                    <input
                      type='text'
                      name='cubicCapacity'
                      className='did-floating-input'
                      placeholder=''
                      {...register('cubicCapacity')}
                    />
                    <label className='did-floating-label' htmlFor>
                      Cubic Capacity
                    </label>
                  </div>
                </div>
              )}

              {/* Fuel Type */}
              <div className='col-3 col-lg-4 form-group mb-3'>
                <div className='position-relative'>
                  <div className='did-floating-label-content'>
                    <select
                      className='did-floating-select'
                      onChange={e => handleSelectPetrolType(e.target.value)}
                      selected={ccFuel?.fuel}
                    >
                      <option>Select Fuel Type</option>
                      {fuelTypes.includes('Petrol') && (
                        <option
                          value='Petrol'
                          selected={ccFuel?.fuel === 'Petrol' ? true : false}
                        >
                          Petrol
                        </option>
                      )}
                      {fuelTypes.includes('Diesel') && (
                        <option
                          value='Diesel'
                          selected={ccFuel?.fuel === 'Diesel' ? true : false}
                        >
                          Diesel
                        </option>
                      )}
                      {fuelTypes.includes('Battery') && (
                        <option
                          value='Battery'
                          selected={ccFuel?.fuel === 'Battery' ? true : false}
                        >
                          Electric
                        </option>
                      )}
                      {fuelTypes.includes('CNG') && (
                        <option
                          value='CNG'
                          selected={ccFuel?.fuel === 'CNG' ? true : false}
                        >
                          CNG
                        </option>
                      )}
                      {fuelTypes.includes('LPG') && (
                        <option
                          value='LPG'
                          selected={ccFuel?.fuel === 'LPG' ? true : false}
                        >
                          LPG
                        </option>
                      )}
                    </select>
                  </div>
                </div>
              </div>

              {/* Manufacturing Date */}
              <div className='col-3 col-lg-4 form-group mb-3'>
                <div className='did-floating-label-content input-group'>
                  <input
                    {...register('ManufaturingDate', {
                      required: 'Field is required'
                    })}
                    name='ManufaturingDate'
                    type='date'
                    id='ManufaturingDate'
                    className='did-floating-input data_picker'
                  />
                  <label className='did-floating-label' htmlFor>
                    Manufaturing Date
                  </label>
                </div>
                {errors?.ManufaturingDate && (
                  <span className='text-danger'>
                    {errors?.ManufaturingDate?.message}
                  </span>
                )}
              </div>

              {/* Registration Date */}
              <div className='col-3 col-lg-4 form-group mb-3'>
                <div className='did-floating-label-content input-group'>
                  <input
                    type='date'
                    name='regDates'
                    id='regDates'
                    className='did-floating-input data_picker'
                    {...register('regDates', {
                      required: 'Field is required'
                    })}
                    placeholder=''
                  />
                  <label className='did-floating-label' htmlFor>
                    Registeration Date
                  </label>
                </div>
                {errors?.regDates && (
                  <span className='text-danger'>
                    {errors?.regDates?.message}
                  </span>
                )}
              </div>

              {/* Engine Number */}
              <div className='col-3 col-lg-4 form-group mb-3'>
                <div className='did-floating-label-content input-group'>
                  <input
                    type='text'
                    name='engineNumber'
                    className='did-floating-input'
                    maxLength={18}
                    {...register('engineNumber', {
                      required: 'Field is required',
                      pattern: {
                        value: /^[A-Za-z0-9]+$/i,
                        message: 'Invalid value'
                      },
                      minLength: {
                        value: 6,
                        message: 'Value must be minimum of 6 character'
                      }
                    })}
                    placeholder=''
                  />
                  <label className='did-floating-label' htmlFor>
                    Engine Number
                  </label>
                </div>
                {errors?.engineNumber && (
                  <span className='text-danger'>
                    {errors?.engineNumber?.message}
                  </span>
                )}
              </div>

              {/* Chassis Number */}
              <div className='col-3 col-lg-4 form-group mb-3'>
                <div className='did-floating-label-content input-group'>
                  <input
                    type='text'
                    name='chassisNumber'
                    maxLength={18}
                    className='did-floating-input'
                    {...register('chassisNumber', {
                      required: 'Field is required',
                      pattern: {
                        value: /^[A-Za-z0-9]+$/i,
                        message: 'Invalid value'
                      },
                      minLength: {
                        value: 6,
                        message: 'Value must be minimum of 6 character'
                      }
                    })}
                    placeholder=''
                  />
                  <label className='did-floating-label' htmlFor>
                    Chassis Number
                  </label>
                </div>
                {errors?.chassisNumber && (
                  <span className='text-danger'>
                    {errors?.chassisNumber?.message}
                  </span>
                )}
              </div>

              {/* Case Type */}
              <div className='col-3 col-lg-4 form-group mb-3'>
                <div className='position-relative'>
                  <div className='did-floating-label-content'>
                    <select
                      className='did-floating-select'
                      id='caseType'
                      name='caseType'
                      defaultChecked={data[0]?.lead_data?.caseType}
                      {...register('caseType', {
                        required: 'Field is required'
                      })}
                      onChange={e => {
                        setCaseType(e?.target?.value)
                      }}
                    >
                      <option>Select Case Type</option>
                      <option
                        value='new'
                        selected={
                          data[0]?.lead_data?.caseType === 'new' ? true : false
                        }
                      >
                        New
                      </option>
                      <option
                        value='rollover'
                        selected={
                          data[0]?.lead_data?.caseType === 'rollover'
                            ? true
                            : false
                        }
                      >
                        Rollover
                      </option>
                      <option
                        value='rollover-breakin'
                        selected={
                          data[0]?.lead_data?.caseType === 'rollover-breakin'
                            ? true
                            : false
                        }
                      >
                        Rollover Break in
                      </option>
                      <option
                        value='used'
                        selected={
                          data[0]?.lead_data?.caseType === 'used' ? true : false
                        }
                      >
                        Used Vehicle
                      </option>
                    </select>
                  </div>
                </div>
                {errors?.caseType && (
                  <span className='text-danger'>
                    {errors?.caseType?.message}
                  </span>
                )}
              </div>

              {/* Policy Type */}
              <div className='col-3 col-lg-4 form-group mb-3'>
                <div className='position-relative'>
                  <div className='did-floating-label-content'>
                    <select
                      className='did-floating-select'
                      id='policyType'
                      name='policyType'
                      defaultChecked={data[0]?.lead_data?.policyType}
                      {...register('policyType', {
                        required: 'Field is required'
                      })}
                    >
                      <option>Select Policy Type</option>
                      <option
                        value='comprehensive'
                        selected={
                          data[0]?.lead_data?.policyType === 'Comprehensive'
                            ? true
                            : false
                        }
                      >
                        Comprehensive
                      </option>
                      <option
                        value='thirdParty'
                        selected={
                          data[0]?.lead_data?.policyType === 'ThirdParty'
                            ? true
                            : false
                        }
                      >
                        Third Party
                      </option>
                      <option
                        value='ownDamage'
                        selected={
                          data[0]?.lead_data?.policyType === 'ODOnly'
                            ? true
                            : false
                        }
                      >
                        Own Damage
                      </option>
                    </select>
                  </div>
                </div>
                {errors?.policyType && (
                  <span className='text-danger'>
                    {errors?.policyType?.message}
                  </span>
                )}
              </div>

              {caseType === 'new' ? (
                ''
              ) : (
                <>
                  {/* IDV */}
                  <div className='col-3 col-lg-4 form-group mb-3'>
                    <div className='did-floating-label-content input-group'>
                      <input
                        type='text'
                        name='idv'
                        id='idv'
                        {...register('idv', {
                          required: 'Field is required'
                        })}
                        className='did-floating-input'
                        placeholder=''
                      />
                      <label className='did-floating-label' htmlFor>
                        IDV
                      </label>
                    </div>
                    {errors?.idv && (
                      <span className='text-danger'>
                        {errors?.idv?.message}
                      </span>
                    )}
                  </div>

                  {/* NCB */}
                  <div className='col-3 col-lg-4 form-group mb-3'>
                    <div className='position-relative'>
                      <div className='did-floating-label-content'>
                        <select
                          className='did-floating-select'
                          id='ncb'
                          name='ncb'
                          {...register('ncb', {
                            required: 'Field is required',
                            onChange: e=> setNCB(e?.target?.value)
                          })}
                         
                        >
                          <option>Select NCB</option>
                          <option value={0}>0%</option>
                          <option value={20}>20%</option>
                          <option value={25}>25%</option>
                          <option value={35}>35%</option>
                          <option value={45}>45%</option>
                          <option value={50}>50%</option>
                        </select>
                      </div>
                    </div>
                    {errors?.ncb && (
                      <span className='text-danger'>
                        {errors?.ncb?.message}
                      </span>
                    )}
                  </div>

                  {/* Previous Policy Insurer */}
                  <div className='col-3 col-lg-4 form-group mb-3'>
                    <div className='position-relative'>
                      <div className='did-floating-label-content'>
                        <select
                          className='did-floating-select'
                          id='previousInsurerCode'
                          name='previousInsurerCode'
                          {...register('previousInsurerCode', {
                            required: 'Field is required'
                          })}
                        >
                          <option className='d-none' selected>
                            Previous Policy Insurer
                          </option>
                          {insurerData &&
                            insurerData.length > 0 &&
                            insurerData.map((item, i) => (
                              <option key={i} value={item.option}>
                                {item.option}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    {errors?.previousInsurerCode && (
                      <span className='text-danger'>
                        {errors?.previousInsurerCode?.message}
                      </span>
                    )}
                  </div>
                </>
              )}

              {/* Current Policy insurer */}
              <div className='col-3 col-lg-4 form-group mb-3'>
                <div className='position-relative'>
                  <div className='did-floating-label-content'>
                    <select
                      className='did-floating-select'
                      id='currentPolicyInsurer'
                      name='currentPolicyInsurer'
                      defaultChecked={data[0]?.lead_data?.currentInsuerName}
                      {...register('currentPolicyInsurer', {
                        required: 'Field is required'
                      })}
                    >
                      <option className='d-none' selected>
                        Current Policy Insurer
                      </option>
                      {insurerData &&
                        insurerData.length > 0 &&
                        insurerData.map((item, i) => (
                          <option
                            key={i}
                            value={item.option}
                            selected={
                              data[0]?.lead_data?.currentInsuerName ===
                              item?.option
                                ? item?.option
                                : false
                            }
                          >
                            {item.option}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                {errors?.currentPolicyInsurer && (
                  <span className='text-danger'>
                    {errors?.currentPolicyInsurer?.message}
                  </span>
                )}
              </div>

              {/* Policy Issued Date */}
              <div className='col-3 col-lg-4 form-group mb-3'>
                <div className='did-floating-label-content input-group'>
                  <input
                    type='date'
                    name='policyIssueDate'
                    id='policyIssueDate'
                    className='did-floating-input data_picker'
                    {...register('policyIssueDate', {
                      required: 'Field is required',
                      onChange: e => setpolicyIssuedDate(e?.target?.value)
                    })}
                    placeholder=''
                  />
                  <label className='did-floating-label' htmlFor>
                    Policy Issue Date
                  </label>
                </div>
                {errors?.policyIssueDate && (
                  <span className='text-danger'>
                    {errors?.policyIssueDate?.message}
                  </span>
                )}
              </div>

              {/* Policy Start Date */}
              <div className='col-3 col-lg-4 form-group mb-3'>
                <div className='did-floating-label-content input-group'>
                  <input
                    type='date'
                    name='policyStartDate'
                    id='policyStartDate'
                    min={policyIssuedDate}
                    className='did-floating-input data_picker'
                    {...register('policyStartDate', {
                      required: 'Field is required',
                      onChange: e => handlePolicyEndDate(e?.target?.value)
                    })}
                    placeholder='Policy Start Date'
                  />
                  <label className='did-floating-label' htmlFor>
                    Policy Start Date
                  </label>
                </div>
                {errors?.policyStartDate && (
                  <span className='text-danger'>
                    {errors?.policyStartDate?.message}
                  </span>
                )}
              </div>

              {/* Policy End Date */}
              <div className='col-3 col-lg-4 form-group mb-3'>
                <div className='did-floating-label-content input-group'>
                  <input
                    type='date'
                    name='policyEndDate'
                    id='policyEndDate'
                    className='did-floating-input data_picker'
                    {...register('policyEndDate', {
                      required: 'Field is required'
                    })}
                    placeholder='Policy End Date'
                  />
                  <label className='did-floating-label' htmlFor>
                    Policy End Date
                  </label>
                </div>
                {errors?.policyEndDate && (
                  <span className='text-danger'>
                    {errors?.policyEndDate?.message}
                  </span>
                )}
              </div>

              {/* Policy Number */}
              <div className='col-3 col-lg-4 form-group mb-3'>
                <div className='did-floating-label-content input-group'>
                  <input
                    type='text'
                    name='policyNumber'
                    className='did-floating-input'
                    defaultValue={data[0]?.lead_data?.policy_number}
                    {...register('policyNumber', {
                      required: 'Field is required'
                    })}
                    placeholder=''
                  />
                  <label className='did-floating-label' htmlFor>
                    Policy Number
                  </label>
                </div>
                {errors?.policyNumber && (
                  <span className='text-danger'>
                    {errors?.policyNumber?.message}
                  </span>
                )}
              </div>

              {/* CPA */}
              <div className='col-3 col-lg-4 form-group mb-3'>
                <div className='did-floating-label-content input-group'>
                  <input
                    type='number'
                    name='CPA'
                    className='did-floating-input'
                    {...register('CPA', {
                      required: 'Field is required',
                      onChange: e => setCpaAmount(e?.target?.value)
                    })}
                    placeholder=''
                  />
                  <label className='did-floating-label' htmlFor>
                    CPA
                  </label>
                </div>
                {errors?.CPA && (
                  <span className='text-danger'>{errors?.CPA?.message}</span>
                )}
              </div>

              {/* OD Net Premium */}
              <div className='col-3 col-lg-4 form-group mb-3'>
                <div className='did-floating-label-content input-group'>
                  <input
                    type='number'
                    name='odNetPremium'
                    className='did-floating-input'
                    {...register('odNetPremium', {
                      required: 'Field is required',
                      onChange: e => setOdNetPremium(e?.target?.value)
                    })}
                    placeholder=''
                  />
                  <label className='did-floating-label' htmlFor>
                    OD Net Premium
                  </label>
                </div>
                {errors?.odNetPremium && (
                  <span className='text-danger'>
                    {errors?.odNetPremium?.message}
                  </span>
                )}
              </div>

              {/* TP Premium */}
              <div className='col-3 col-lg-4 form-group mb-3'>
                <div className='did-floating-label-content input-group'>
                  <input
                    type='number'
                    name='TPPremium'
                    className='did-floating-input'
                    {...register('TPPremium', {
                      required: 'Field is required',
                      onChange: e => setTpNetPremium(e?.target?.value)
                    })}
                    placeholder=''
                  />
                  <label className='did-floating-label' htmlFor>
                    TP Premium
                  </label>
                </div>
                {errors?.TPPremium && (
                  <span className='text-danger'>
                    {errors?.TPPremium?.message}
                  </span>
                )}
              </div>

              {/* Net Premium */}
              <div className='col-3 col-lg-4 form-group mb-3'>
                <div className='did-floating-label-content input-group'>
                  <input
                    type='number'
                    name='NetPremium'
                    className='did-floating-input'
                    {...register('NetPremium', {
                      required: 'Field is required'
                    })}
                    placeholder=''
                  />
                  <label className='did-floating-label' htmlFor>
                    Net Premium
                  </label>
                </div>
                {errors?.NetPremium && (
                  <span className='text-danger'>
                    {errors?.NetPremium?.message}
                  </span>
                )}
              </div>

              {/* GST */}
              <div className='col-3 col-lg-4 form-group mb-3'>
                <div className='did-floating-label-content input-group'>
                  <input
                    type='number'
                    name='GST'
                    className='did-floating-input'
                    {...register('GST', {
                      required: 'Field is required',
                      onChange: e => setGst(e?.target?.value)
                    })}
                    placeholder=''
                  />
                  <label className='did-floating-label' htmlFor>
                    GST/Tax Amount
                  </label>
                </div>
                {errors?.GST && (
                  <span className='text-danger'>{errors?.GST?.message}</span>
                )}
              </div>

              {/* Final Premium */}
              <div className='col-3 col-lg-4 form-group mb-3'>
                <div className='did-floating-label-content input-group'>
                  <input
                    type='number'
                    name='finalPremium'
                    className='did-floating-input'
                    {...register('finalPremium', {
                      required: 'Field is required'
                    })}
                    placeholder=''
                  />
                  <label className='did-floating-label' htmlFor>
                    Final Premium
                  </label>
                </div>
                {errors?.finalPremium && (
                  <span className='text-danger'>
                    {errors?.finalPremium?.message}
                  </span>
                )}
              </div>
            </div>
            <button
              className='btn btn-primary center'
              type='submit'
              style={{ width: '20%', alignSelf: 'center' }}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </Layout>
  )
}

export default EditLead
