import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MultiSelect } from "react-multi-select-component";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Common/Layout";
import {
  createPos,
  getPermissions,
  getPosDistrict,
  getPosState,
  getPosZone,
  getUser,
  sendErrorMessage,
  sendSuccessMessage,
} from "../../Services/userService";
import { BankName } from "../../Utility/BankName";
import { GetDataWithToken } from "../../../apiHelper/ApiHelper";
import { toast } from 'react-toastify'

const AddPos = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  console.log("aadhar", getValues());
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [componentLoader, setComponentLoader] = useState(true);
  const [employee, setEmployee] = useState([]);
  const [zoneList, setZoneList] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);
  const [stateList, setStateList] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [districtList, setDitrictList] = useState([]);
  const [permimssions, setPermimssions] = useState([]);
  const [permissionValues, setPermissionValues] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [bank, setBank] = useState("");
  const [callApi, setcallApi] = useState(true);
  const [employeeId, setEmployeeId] = useState(null);
  const [bankName, setBankName] = useState([]);
  const [addFiles, setAddFiles] = useState({
    aadharFront: null,
    aadharFrontPreview: null,
    aadharBack: null,
    aadharBackPreview: null,
    panImage: null,
    panImagePreview: null,
    marksheetImage: null,
    marksheetImagePreview: null,
    passbookCheque: null,
    passbookChequePreview: null,
    profilePic: null,
    profilePicPreview: null,
    otherDocument: null,
    otherDocumentPreview: null,
  });

  useEffect(() => {
    if (callApi) {
      setComponentLoader(true);
      getUser("?type=employee").then((response) => {
        if (response.status === true) {
          // console.log("first", response.data);
          setEmployee(response.data);
          setcallApi(false);
          setComponentLoader(false);
        } else {
          console.log("error", response.data.message);
          setcallApi(false);
        }
      });
      getPosZone().then((response) => {
        if (response.success == true) {
          setZoneList(response.data);
          setSelectedState("");
        } else {
          console.log("error", response.data.message);
          setcallApi(false);
        }
      });
      getPermissions().then((response) => {
        if (response.status == true) {
          let arr = [];
          response.data.map((item) => {
            arr.push({
              label: item.type,
              value: item.id,
            });
          });
          setcallApi(false);
          setPermimssions(arr);
        }
      });
      GetDataWithToken("admin/all-bank-names", "").then((response) => {
        if (response.status == true) {
          setBankName(response?.data);
        }
      });
      setcallApi(false);
    }
  }, [callApi]);

  const handleSelectEmployee = (e) => {
    console.log("first", e);
    setEmployeeId(e);
  };

  const handleSelectBank = (e) => {
    setBank(e);
  };

  const handleSelectZone = (e) => {
    // console.log("value", e?.target?.value);
    // alert()
    setSelectedZone(e);
    getPosState(e).then((response) => {
      if (response.success == true) {
        setStateList(response.data);
      } else {
        console.log("error", response.data.message);
      }
    });
  };

  useEffect(() => {
    getPosDistrict(selectedState).then((response) => {
      if (response.status == true) {
        setDitrictList(response.data);
        console.log("district", response.data);
      } else {
        console.log("error", response.data.message);
      }
    });
  }, [selectedState]);

  const handleSelectState = (e) => {
    // console.log("data", e)
    setSelectedState(e);
  };

  const handleSelectDistrict = (e) => {
    setSelectedCity(e);
  };

  const handleUploadDocs = (e, type) => {
    if (!e.target.files[0].type.includes("image")) {
      console.log("Please Upload Image File");
    }
    if (type === "aadhar_front") {
      setAddFiles({
        ...addFiles,
        aadharFront: e.target.files[0],
        aadharFrontPreview: URL.createObjectURL(e.target.files[0]),
      });
    } else if (type === "aadhar_back") {
      setAddFiles({
        ...addFiles,
        aadharBack: e.target.files[0],
        aadharBackPreview: URL.createObjectURL(e.target.files[0]),
      });
    } else if (type === "pan_image") {
      setAddFiles({
        ...addFiles,
        panImage: e.target.files[0],
        panImagePreview: URL.createObjectURL(e.target.files[0]),
      });
    } else if (type === "marksheet") {
      setAddFiles({
        ...addFiles,
        marksheetImage: e.target.files[0],
        marksheetImagePreview: URL.createObjectURL(e.target.files[0]),
      });
    } else if (type === "passbook") {
      setAddFiles({
        ...addFiles,
        passbookCheque: e.target.files[0],
        passbookChequePreview: URL.createObjectURL(e.target.files[0]),
      });
    } else if (type === "profile_picture") {
      setAddFiles({
        ...addFiles,
        profilePic: e.target.files[0],
        profilePicPreview: URL.createObjectURL(e.target.files[0]),
      });
    } else if (type === "other_document") {
      setAddFiles({
        ...addFiles,
        otherDocument: e.target.files[0],
        otherDocumentPreview: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handlePosSubmit = (data) => {
    let arr = [];
    permissionValues.map((value) => {
      arr.push(value.value);
    });
    console.log("data", data, addFiles.aadharFront, addFiles.aadharBack);
    let posFormData = new FormData();
    posFormData.append("name", data.name);
    posFormData.append("email", data.email);
    posFormData.append("phone", data.phone);
    posFormData.append("aadhar_number", data.aadhar_number);
    posFormData.append("pan_number", data.pan_number);
    posFormData.append("accountNumber", data.accountNumber);
    posFormData.append("employeeId", employeeId);
    posFormData.append("zoneId", selectedZone);
    posFormData.append("stateId", selectedState);
    posFormData.append("districtId", selectedCity);
    posFormData.append("bank_name", bank);
    posFormData.append("ifsc", data.ifsc);
    posFormData.append("aadhar_front", addFiles.aadharFront);
    posFormData.append("aadhar_back", addFiles.aadharBack);
    posFormData.append("pan_image", addFiles.panImage);
    posFormData.append("marksheet_image", addFiles.marksheetImage);
    posFormData.append("passbook_cheque", addFiles.passbookCheque);
    posFormData.append("profile_picture", addFiles.profilePic);
    posFormData.append("other_document", addFiles.otherDocument);
    posFormData.append("address", data.address);
    posFormData.append("address_2", data?.address_2);
    posFormData.append("address_3", data?.address_3);
    posFormData.append("permission", arr);
    console.log("data in adding pos:-", data);
    console.log('addfiles array in creating pos:-',addFiles);
    setLoader(true);
    createPos(posFormData).then(res => {
      if (res?.message=="New Pos Created") {
        toast(res?.message, { type: 'success' })
        navigate('/all-pos')
      } else if(res?.message == "User exists") {
        toast.error(res?.message)
      } else {
        toast('user exist', { type: 'error' })
        setLoader(false)
      }
    })
  };

  // const handleRemoveImg = (type) => {
  //   if (type === "aadhar_front") {
  //     setAddFiles({ aadharFrontPreview: null })
  //   }
  // }

  return (
    <>
      <Layout>
        <div className="page-content-crumb">
          <button
            className="btn btn-danger"
            onClick={() => navigate("/dashboard")}
          >
            <span className="d-none d-md-block">Back</span>
            <span className="d-block d-md-none">
              <i className="fa fa-sign-out" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div></div>
        <div className="card personal-info border-0">
          <div className="personal-information ml-4 mt-4 text-secondary">
            <h2 className="">Personal Information</h2>
          </div>
          <div className="card-body p-0 p-md-3">
            <form onSubmit={handleSubmit(handlePosSubmit)}>
              <div className="row">
                {/* <div className="col-12 col-lg-3 form-group mb-2">
                  <label className="form-label" htmlFor>
                    Select RM
                    <span className="text-danger">*</span>
                  </label>
                  <select
                    {...register("employeeId", {
                      required: "Employee is required",
                    })}
                    className="control-form form-select"
                    name="employee"
                    id="employee"
                    placeholder="Enter RM Name"
                    onChange={(e) => handleSelectEmployee(e?.target?.value)}
                  >
                    <option className="d-none" value>
                      Select RM
                    </option> 
                    {employee &&
                      employee?.length > 0 &&
                      employee?.map((list, index) => (
                        <>
                          <option value={list?.id} key={index}>
                            {list.name}
                          </option>
                        </>
                      ))}
                  </select>
                  <span className="text-danger">
                    {errors.employeeId && errors.employeeId.message}
                  </span>
                </div> */}
                <div className="col-12 col-lg-3 form-group mb-2">
                <div className='did-floating-label-content input-group'>
                  <input
                    type="text"
                    className="did-floating-input"
                    placeholder=""
                    name="employeeId"
                    id="employeeId"
                    {...register("employeeId", {
                      required: "RM Name is required",
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: "Numbers are not allowed",
                      },
                    })}
                  />
                <label className="did-floating-label" htmlFor>
                    Enter RM Name
                    <span className="text-danger">*</span>
                  </label>
                  </div>
                  <span className="text-danger">
                    {errors.employeeId && errors.employeeId.message}
                  </span>
                </div>
                <div className="col-12 col-lg-3 form-group mb-2">
                <div className='did-floating-label-content input-group'>
            
                  <input
                    type="text"
                    className='did-floating-input'
                    placeholder=""
                    name
                    id
                    {...register("name", {
                      required: "Name is required",
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: "Numbers are not allowed",
                      },
                    })}
                    maxLength={30}
                    onText={(e) => {
                      e.target.Text = e.target.Text.slice(0, 10);
                    }}
                  />
                        <label className="did-floating-label" htmlFor>
                    Name
                    <span className="text-danger">*</span>
                  </label>
                  </div>
                  <span className="text-danger">
                    {errors.name && errors.name.message}
                  </span>
                </div>
                <div className="col-12 col-lg-3 form-group mb-2 maxlength-10">
                <div className='did-floating-label-content input-group'>
                  <input
                    type="number"
                    className="did-floating-input mm-10"
                    placeholder=""
                    name
                    id
                    pattern="[0-9]{10}"
                    maxLength={10}
                    {...register("phone", {
                      required: "Mobile number is required",
                      minLength: {
                        value: 10,

                        message: "Incorrect length of mobile number",
                      },
                    })}
                    onInput={(e) => {
                      e.target.value = e.target.value.slice(0, 10);
                    }}
                  />
                <label className="did-floating-label" htmlFor>
                    Mobile Number
                    <span className="text-danger">*</span>
                  </label>
                  </div>
                  <span className="text-danger">
                    {errors.phone && errors.phone.message}
                  </span>
                </div>
                <div className="col-12 col-lg-3 form-group mb-2">
                  <div className="did-floating-label-content input-group">
                    <input
                      type="email"
                      placeholder=""
                      className="did-floating-input"
                      aria-describedby="basic-addon2"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    <label className="did-floating-label" htmlFor>
                    Email
                    <span className="text-danger">*</span>
                  </label>
                    {/* <span
                      className="input-group-text primary-bg text-dark"
                      id="basic-addon2"
                    >
                      @
                    </span> */}
                  </div>
                  <span className="text-danger">
                    {errors.email && errors.email.message}
                  </span>
                </div>
                <div className="col-12 col-lg-3 form-group mb-2">
                  <div className='did-floating-label-content input-group'>
                  <input
                    type="number"
                    className="did-floating-input"
                    placeholder=""
                    name
                    id
                    maxLength={12}
                    {...register("aadhar_number", {
                      required: "Aadhar number is required",
                      pattern: {
                        value: /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/,
                        message: "Invalid Aadhar number",
                      },
                    })}
                    onInput={(e) => {
                      e.target.value = e.target.value.slice(0, 12);
                    }}
                  />
                   <label className="did-floating-label" htmlFor>
                    Aadhar Number
                    <span className="text-danger">*</span>
                  </label>
                  </div>.
                  <span className="text-danger">
                    {errors.aadhar_number && errors.aadhar_number.message}
                  </span>
                </div>
                <div className="col-12 col-lg-3 form-group mb-2">
                <div className='did-floating-label-content input-group'>
                  <input
                    type="text"
                    className="did-floating-input text-uppercase"
                    placeholder=""
                    name
                    id
                    {...register("pan_number", {
                      required: "Pan number is required",
                      pattern: {
                        value: /^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/,
                        message: "Invalid Pan number",
                      },
                    })}
                    maxLength={10}
                  />
                   <label className="did-floating-label" htmlFor>
                    PAN Number
                    <span className="text-danger">*</span>
                  </label>
                  </div>
                  <span className="text-danger">
                    {errors.pan_number && errors.pan_number.message}
                  </span>
                </div>
                <div className="col-12 col-lg-3 form-group mb-2">
                <div className='did-floating-label-content'>
                  <select
                    {...register("zoneId", {
                      // required: "Zone is required",
                    })}
                    className="did-floating-select"
                    name="zone"
                    id="zone"
                    onChange={(e) => handleSelectZone(e?.target?.value)}
                  >
                    <option className="d-none" value="" selected>
                      Select Zone <span className="text-danger">*</span>
                    </option>
                    {zoneList &&
                      zoneList?.length > 0 &&
                      zoneList?.map((list, index) => (
                        <>
                          <option value={list?.id} key={index}>
                            {list.zone}
                          </option>
                        </>
                      ))}
                  </select>
                  {/* <label className="did-floating-label" htmlFor>
                    Select Zone
                    <span className="text-danger">*</span>
                  </label> */}
                  <span className="text-danger">
                    {errors.zoneId && errors.zoneId.message}
                  </span>
                  </div>
                </div>
                <div className="col-12 col-lg-3 form-group mb-2">
                <div className='did-floating-label-content'>
                  <select
                    {...register("stateId", {
                      // required: "State is required"
                    })}
                    className="did-floating-select"
                    name="state"
                    id="state"
                    value={selectedState}
                    onChange={(e) => handleSelectState(e?.target?.value)}
                  >
                    <option className="d-none" value="" selected>
                      Select State <span className="text-danger">*</span>
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
                  {/* <label className="did-floating-label" htmlFor>
                    Select State
                    <span className="text-danger">*</span>
                  </label> */}
                  </div>
                  <span className="text-danger">
                    {errors.stateId && errors.stateId.message}
                  </span>
                </div>
                <div className="col-12 col-lg-3 form-group mb-2">
                <div className='did-floating-label-content'>
                  <select
                    {...register("districtId", {
                      // required: "District is required"
                    })}
                    className="did-floating-select"
                    name="district"
                    id="district"
                    // value={districtList}
                    onChange={(e) => handleSelectDistrict(e?.target?.value)}
                  >
                    <option className="d-none" value="" selected>
                      Select District <span className="text-danger">*</span>
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
                  {/* <label className="did-floating-label" htmlFor>
                    Select District
                    <span className="text-danger">*</span>
                  </label> */}
                  </div>
                  <span className="text-danger">
                    {errors.districtId && errors.districtId.message}
                  </span>
                </div>
                {/* <div className="col-12 col-lg-3 form-group mb-2">
                  <label className="form-label" htmlFor>
                    Select Permission
                    <span className="text-danger">*</span>
                  </label>
                  <MultiSelect
                    options={permimssions}
                    value={permissionValues}
                    onChange={setPermissionValues}
                    labelledBy={"Select Permission"}
                    isCreatable={true}
                  />
                </div> */}
                <div className="personal-information ml-4 mt-4 text-secondary">
                  <h2>Account Details</h2>

                  <div className="addres-cantainer col-12">
                    <div className="col-12 col-lg-3 form-group mb-2">
                    <div className='did-floating-label-content'>
                      <select
                        {...register("bank_name", {
                          required: "Bank is required",
                          onChange: (e) => handleSelectBank(e?.target?.value)
                        })}
                        className="did-floating-select"
                        name="bank_name"
                        id="bank_name"
                      >
                        <option className="d-none" value>
                          Select Bank Name
                        </option>
                        {bankName &&
                          bankName?.length > 0 &&
                          bankName?.map((bankName, index) => (
                            <>
                              <option value={bankName?.bank_name} key={index}>
                                {bankName.bank_name}
                              </option>
                            </>
                          ))}
                      </select>
                      {/* <label className="did-floating-label" htmlFor>
                        Select Bank Name
                        <span className="text-danger">*</span>
                      </label> */}
                    </div>   
                   <span className="text-danger">
                        {errors.bank_name && errors.bank_name.message}
                      </span>
                    </div>
                    <div className="col-12 col-lg-3 form-group mb-2">
                    <div className='did-floating-label-content input-group'>
                      <input
                        type="number"
                        placeholder=""
                        className="did-floating-input"
                        name
                        id
                        {...register("accountNumber", {
                          required: "Account number is required",
                        })}
                        onInput={(e) => {
                          e.target.value = e.target.value.slice(0, 17);
                        }}
                      />
                       <label className="did-floating-label" htmlFor>
                        Account Number
                        <span className="text-danger">*</span>
                      </label>
                      </div>
                      <span className="text-danger">
                        {errors.accountNumber && errors.accountNumber.message}
                      </span>
                    </div>
                    <div className="col-12 col-lg-3 form-group mb-2">
                    <div className='did-floating-label-content input-group'>
                      <input
                        type="text"
                        placeholder=""
                        className="did-floating-input text-uppercase"
                        name
                        id
                        {...register("ifsc", {
                          required: "IFSC code is required",
                        })}
                        maxLength={11}
                      />
                       <label className="did-floating-label" htmlFor>
                        IFSC
                        <span className="text-danger">*</span>
                      </label>
                      </div>
                      <span className="text-danger">
                        {errors.ifsc && errors.ifsc.message}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="personal-information ml-4 mt-4 text-secondary">
                  <h2>Address</h2>
                  <div className="addres-cantainer col-12">
                    <div className="col-12 col-lg-3 form-group mb-2">
                    <div className='did-floating-label-content input-group'>
                      <input
                        type="text"
                        placeholder=""
                        className="did-floating-input"
                        name
                        id
                        {...register("address", {
                          required: "Address is required",
                          maxLength: {
                            value: 100,
                            message:
                              "Maximum letter of address is 50 characters",
                          },
                        })}
                        maxLength={100}
                      />
                       <label className="did-floating-label" htmlFor>
                        Address-1
                        <span className="text-danger">*</span>
                      </label>
                      </div>
                      <span className="text-danger">
                        {errors.address && errors.address.message}
                      </span>
                    </div>
                    <div className="col-12 col-lg-3 form-group mb-2">
                    <div className='did-floating-label-content input-group'>
                      <input
                        type="text"
                        placeholder=""
                        className="did-floating-input"
                        name
                        id
                        {...register("address_2", {
                          required: "Address code is required",
                          maxLength: {
                            value: 50,
                            message: "Maximum letter of address is 50 characters",
                          },
                        })}
                        maxLength={100}
                      />
                           <label className="did-floating-label" htmlFor>
                        Address-2
                        <span className="text-danger">*</span>
                      </label>
                      {/* <span className="text-danger">
                    {errors.address && errors.address.message}
                  </span> */}
                  </div>
                    </div>
                    <div className="col-12 col-lg-3 form-group mb-2">
                    <div className='did-floating-label-content input-group'>
                      <input
                        type="text"
                        placeholder=""
                        className="did-floating-input"
                        name
                        maxLength={100}
                        id
                        {...register("address_3", {
                          // required: "Address code is required",
                          maxLength: {
                            value: 50,
                            message: "Maximum letter of address is 50 characters",
                          },
                        })}
                      />
                      <label className="did-floating-label" htmlFor>
                        Address-3
                        <span className="text-danger">*</span>
                      </label>
                      </div>
                      {/* <span className="text-danger">
                    {errors.address && errors.address.message}
                  </span> */}
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="personal-information ml-4 mt-4 text-secondary">
                    <h2>Document Upload</h2>
                  </div>
                  <div className="col-12 col-md-4 col-lg-3">
                    <div className="form-group form-group-2 mt-3">
                      <h6 className="mb-2 text-uppercase">Aadhar-Front</h6>
                      
                      <input
                        type="file"
                        className="form-control"
                        name="aadhar_front"
                        id="aadhar_front"
                        {...register("aadhar_front", {
                          required: "Aadhar card front is required",
                          onChange: (e) => handleUploadDocs(e, "aadhar_front"),
                        })}
                      />
                      <span className="text-danger">
                        {errors.aadhar_front && errors.aadhar_front.message}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-md-4 col-lg-3">
                    <div className="form-group form-group-2 mt-3">
                      <h6 className="mb-2 text-uppercase">Aadhar-back</h6>
                    
                      <input
                        type="file"
                        className="form-control"
                        name="aadhar_back"
                        id="aadhar_back"
                        {...register("aadhar_back", {
                          required: "Aadhar card back is required",
                          onChange: (e) => handleUploadDocs(e, "aadhar_back"),
                        })}
                      />
                      <span className="text-danger">
                        {errors.aadhar_back && errors.aadhar_back.message}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-md-4 col-lg-3">
                    <div className="form-group form-group-2 mt-3">
                      <h6 className="mb-2 text-uppercase">pan-card</h6>
                      
                      <input
                        type="file"
                        className="form-control"
                        name="pan_image"
                        id="pan_image"
                        {...register("pan_image", {
                          required: "Pan card is required",
                          onChange: (e) => handleUploadDocs(e, "pan_image"),
                        })}
                      />
                      <span className="text-danger">
                        {errors.pan_image && errors.pan_image.message}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-md-4 col-lg-3">
                    <div className="form-group form-group-2 mt-3">
                      <h6 className="mb-2 text-uppercase">marksheet</h6>
                    
                      <input
                        type="file"
                        name="marksheet"
                        id="marksheet"
                        className="form-control"
                        {...register("marksheet_image", {
                          required: "Marksheet is required",
                          onChange: (e) => handleUploadDocs(e, "marksheet"),
                        })}
                      />
                      <span className="text-danger">
                        {errors.marksheet_image &&
                          errors.marksheet_image.message}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-md-4 col-lg-3">
                    <div className="form-group form-group-2 mt-3">
                      <h6 className="mb-2 text-uppercase">
                        Passbook/Cheque/statement
                      </h6>
                      
                      <input
                        type="file"
                        name="passbook"
                        id="passbook"
                        className="form-control"
                        {...register("passbook_cheque", {
                          required: "Passbook Cheque is required",
                          onChange: (e) => handleUploadDocs(e, "passbook"),
                        })}
                      />
                      <span className="text-danger">
                        {errors.passbook_cheque &&
                          errors.passbook_cheque.message}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-md-4 col-lg-3">
                    <div className="form-group form-group-2 mt-3">
                      <h6 className="mb-2 text-uppercase">Profile Picture</h6>
                      
                      <input
                        type="file"
                        name="profilePiture"
                        id="profilePiture"
                        className="form-control"
                        {...register("profile_picture", {
                          required: "Profile Picture is required",
                          onChange: (e) =>
                            handleUploadDocs(e, "profile_picture"),
                        })}
                      />
                      <span className="text-danger">
                        {errors.profile_picture &&
                          errors.profile_picture.message}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-md-4 col-lg-3">
                    <div className="form-group form-group-2 mt-3">
                      <h6 className="mb-2 text-uppercase">Other Document</h6>
                      
                      <input
                        type="file"
                        name="OtherDocument"
                        id="OtherDocument"

                        className="form-control"
                        {...register("other_dcument", {})}

                        onChange={(e) => handleUploadDocs(e, "other_document")}
                      />
                      {/* <span className="text-danger">
                        {errors.other_document && errors.other_document.message}
                      </span> */}
                    </div>
                  </div>
                </div>
                {/* <div className="form-group mt-4">
                  <div className="input-group mb-3">
                    <input
                      type="file"
                      name="aadhar_front"
                      id="aadhar_front"
                      className="form-control"
                      // {...register('aadhar_front', {
                      //   required: "Aadhar card front is required"
                      // })}
                      onChange={(e) => handleUploadDocs(e, "aadhar_front")}
                    />

                    <input
                      type="file"
                      name="aadhar_back"
                      id="aadhar_back"
                      className="form-control"
                      // {...register('aadhar_back', {
                      //   required: "Aadhar card back is required"
                      // })}
                      onChange={(e) => handleUploadDocs(e, "aadhar_back")}
                    />
                    <span className="text-danger">
                      {errors.aadhar_back && errors.aadhar_back.message}
                    </span>
                    <input
                      type="file"
                      name="pan_image"
                      id="pan_image"
                      className="form-control"
                      // {...register('pan_image', {
                      //   required: "Pan card is required"
                      // })}
                      onChange={(e) => handleUploadDocs(e, "pan_image")}
                    />
                    <span className="text-danger">
                      {errors.pan_image && errors.pan_image.message}
                    </span>
                    <input
                      type="file"
                      name="marksheet"
                      id="marksheet"
                      className="form-control"
                      // {...register('marksheet_image', {
                      //   required: "Marksheet is required"
                      // })}
                      onChange={(e) => handleUploadDocs(e, "marksheet")}
                    />
                    <span className="text-danger">
                      {errors.marksheet_image && errors.marksheet_image.message}
                    </span>
                    <input
                      type="file"
                      name="passbook"
                      id="passbook"
                      className="form-control"
                      // {...register('passbook_cheque', {
                      //   required: "Passbook Cheque is required"
                      // })}
                      onChange={(e) => handleUploadDocs(e, "passbook")}
                    />
                    <span className="text-danger">
                      {errors.passbook_cheque && errors.passbook_cheque.message}
                    </span>
                  </div>
                </div> */}
                <div className="d-flex flex-column-reverse d-md-block text-end">
                  <button
                    className="btn btn-danger me-0 me-md-2"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-primary mb-2 mb-md-0">
                    {loader == true ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      "Add POS"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AddPos;
