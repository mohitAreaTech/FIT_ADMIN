import React, { useEffect, useState } from "react";
import Layout from "../../Common/Layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Table,
} from "reactstrap";
import { IoMdClose } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { GetData, PostData } from "../../../apiHelper/ApiHelper";
import { useSelector } from "react-redux";
import {
  getVehicleMake,
  getVehicleModel,
  getVehiclePreviousInsurer,
  getVehicleVariant,
} from "../../../apiHelper/masterService";
import ReactSelect from "../../Tags/ReactSelect";
import { useForm } from "react-hook-form";

const MisDetails = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [vType, setVType] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [caseType, setCaseType] = useState("");
  const [variant, setVariant] = useState("");
  const [variantData, setVariantData] = useState([]);
  const [editDetails, setEditDetails] = useState(false);
  const toggle = () => setEditDetails(!editDetails);
  const [activeTab, setActiveTab] = useState("1");
  const location = useLocation();
  const [leadStatus, setLeadStatus] = useState("");
  const [makeData, setMakeData] = useState([]);
  const [modelData, setModelData] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [ncb, setNCB] = useState(null);
  const [insurerData, setInsurerData] = useState([]);
  const [fuelValue, setFuelValue] = useState(null);
  const [uniquePolicyNumber, setUniquePolicyNumber] = useState(null);
  const userDetails = useSelector((state) => state?.root?.userDetails);
  const [leadId, setLeadId] = useState(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  console.log("LOCATION", location.state);
  useEffect(() => {
    const arr = [];
    arr.push(location.state);
    setData(arr);
    setLeadStatus(location?.state?.lead_status);
    setUniquePolicyNumber(location?.state?.lead_data?.policyUniqueId);
    setLeadId(location?.state?.lead_id);

    getVehicleMake({ Vehicle_Type: arr[0]?.lead_data?.vehicleCategory }).then(
      (response) => {
        if (response.status === true) {
          let data = response.data;
          let i = 0;
          let arr = [];
          while (i < data.length) {
            let item = data[i];
            arr.push({
              label: item.Make,
              value: item.Make,
            });
            i++;
          }
          setMakeData(arr);
        }
      }
    );
    // setVehicleCategory(arr[0]?.lead)
  }, [location.state]);

  useEffect(() => {
    console.log("STATE SUSER", leadStatus);
  }, [leadStatus]);

  useEffect(() => {
    getVehicleMake({ Vehicle_Type: vType }).then((response) => {
      if (response.status === true) {
        let data = response.data;
        let i = 0;
        let arr = [];
        while (i < data.length) {
          let item = data[i];
          arr.push({
            label: item.Make,
            value: item.Make,
          });
          i++;
        }
        setMakeData(arr);
      }
    });
  }, [vType]);

  useEffect(() => {
    getVehiclePreviousInsurer().then((response) => {
      if (
        response?.status === true &&
        response?.message === "All Previous Insurers Fetched Successfully"
      ) {
        let i = 0;
        let data = response.data;
        let arr = [];
        while (i < data.length) {
          let item = data[i];
          arr.push({
            option: item.Name,
            value: item.Digit_Code,
          });
          i++;
        }
        setInsurerData(arr);
      }
      console.log("RESPONSE", response);
    });
  }, []);

  const handleAssign = (data) => {
    console.log("HANDLE ASSIGN", data);
    const postData = {
      misEmployeeId: userDetails?.username,
    };

    PostData(`admin/leadsAssign/${data[0]?.lead_id}`, postData).then(
      (response) => {
        console.log("RESPONSE ASSIGN", response);
        if (
          response?.success === true &&
          response?.message === "Leads Assign Successfully !!"
        ) {
          navigate("/my-pool", { state: data });
        }
      }
    );
  };
  console.log("MODAL", editDetails);

  const handleVehicleCategory = (value) => {
    console.log("VALUE", value);
    getVehicleMake({ Vehicle_Type: value }).then((response) => {
      if (
        response?.status === true &&
        response?.message === "All Make Fetched Successfully"
      ) {
        setMakeData(response?.data);
      }
      console.log("MAKE RESPONSE", response);
    });
  };

  const handleSelectMake = (make) => {
    setMake(make);
    getVehicleModel({
      make: make,
      Vehicle_Type: vType ? vType : data[0]?.lead_data?.vehicleCategory,
    }).then((response) => {
      if (response.status === true) {
        let data = response.data;
        let i = 0;
        let arr = [];
        while (i < data.length) {
          let item = data[i];
          arr.push({
            label: item.Model,
            value: item.Model,
          });
          i++;
        }
        setModelData(arr);
      }
    });
  };

  const handleSelectModel = (model) => {
    setModel(model);
    getVehicleVariant({
      make: make,
      model: model,
      Vehicle_Type: vType ? vType : data[0]?.lead_data?.vehicleCategory,
    }).then((response) => {
      if (response.status === true) {
        let data = response.data;
        let fuelTypeArr = data.filter(
          (v, i, a) => a.findIndex((v2) => v2.Fuel_Type === v.Fuel_Type) === i
        );
        let j = 0;
        let fuelarr = [];
        while (j < fuelTypeArr.length) {
          fuelarr.push(fuelTypeArr[j].Fuel_Type);
          j++;
        }
        console.log("fuelTYPE", fuelarr);
        setFuelTypes(fuelarr);
        let i = 0;
        let arr = [];
        while (i < data.length) {
          let item = data[i];
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
            Royal: item.Royal,
          });
          i++;
        }
        setVariantData(arr);
      }
    });
  };

  const handleSelectVariant = (val) => {
    setVariant(val?.label);
  };

  const handleSelectPetrolType = (val) => {
    console.log("FUEL TYPE", val);
    setFuelValue(val);
    if (val == "CNG" || val == "LPG") {
      // dispatchQuickQuote("IsInternalCNG", true);
    }
    // dispatchQuickQuote("FuelType", val);
    // dispatchQuickQuote("FuelType", val);
  };

  useEffect(() => {
    console.log("make", makeData);
  }, [makeData]);

  const handleEditLead = (item) => {
    navigate('/edit-lead', { state: item})
  }

  const submitDetails = (finalData) => {
    console.log("STA finalDataAA", finalData);
    const postData = {
      UniquePolicyId: uniquePolicyNumber,
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
      policy_number: finalData?.policyNumber,
      cpa: finalData?.CPA,
      od_net_premium: finalData?.odNetPremium,
      tp_premium: finalData?.TPPremium,
      net_premium: finalData?.NetPremium,
      gst_Tax_amount: finalData?.GST,
      final_premium: finalData?.finalPremium,
      MIS_employee_data: userDetails,
      assignedMisName: userDetails?.name,
      insurerName: finalData?.previousInsurerCode,
      userType: "MIS",
    };
    console.log("Post Data", postData);

    PostData(`admin/add_submit_data/${leadId}`, postData).then((response) => {
      console.log("RESPonse", response);
    });
  };

  return (
    <>
      <Layout>
        <div className="page-content-crumb">
          <div className="breadcrumb-area">
            <ol className="breadcrumb">
              <li className="item">
                <Link to="/dashboard">
                  <i className="fa fa-home" aria-hidden="true" />
                </Link>
              </li>
              <li className="item">MIS Details</li>
            </ol>
          </div>
          <button className="btn btn-danger" onClick={() => navigate(-1)}>
            <span className="d-none d-md-block">Back</span>
            <span className="d-block d-md-none">
              <i className="fa fa-sign-out" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div className="row">
          <div className="col-12">
            <Nav tabs className="d-flex justify-content-between">
              <div className="d-flex">
                <NavItem>
                  <NavLink
                    className={activeTab == "1" ? "active" : ""}
                    onClick={() => setActiveTab("1")}
                  >
                    Customer Details
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab == "2" ? "active" : ""}
                    onClick={() => setActiveTab("2")}
                  >
                    Vehicle Details
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab == "3" ? "active" : ""}
                    onClick={() => setActiveTab("3")}
                  >
                    Documents
                  </NavLink>
                </NavItem>
              </div>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <div className="card display-card">
                  <div className="card-body p-0">
                    <div className="text-center">
                      {data?.length !== 0 ? (
                        <tbody className="d-flex justify-content-between w-100">
                          {data?.map((item) => (
                            <thead
                              className="d-flex justify-content-between w-100 flex-wrap"
                              style={{ gap: "20px" }}
                            >
                              <tr className="d-flex justify-content-between w-100">
                                <div>
                                  <th>Name:</th>
                                  <td className="ps-1">
                                    {" "}
                                    {item?.lead_data?.customerFullName || "N/A"}
                                  </td>
                                </div>
                                <div>
                                  <th className="custum-heading">Email: </th>
                                  <td className="ps-1">
                                    {" "}
                                    {item?.lead_data?.customerEmailAddress ||
                                      "N/A"}
                                  </td>
                                </div>
                                <div>
                                  <th>Mobile:</th>
                                  <td className="ps-1">
                                    {item?.lead_data?.customerNumber || "N/A"}
                                  </td>
                                </div>
                              </tr>
                              <tr className="d-flex justify-content-between w-100">
                                <div>
                                  <th>Pincode:</th>
                                  <td className="ps-1">
                                    {" "}
                                    {item?.lead_data?.customerPincode || "N/A"}
                                  </td>
                                </div>
                                <div className="text-start">
                                  <th>City: </th>
                                  <td className="ps-1">
                                    {" "}
                                    {item?.lead_data?.customerCity || "N/A"}
                                  </td>
                                </div>
                                <div>
                                  <th>State:</th>
                                  <td className="ps-1">
                                    {item?.lead_data?.customerState || "N/A"}
                                  </td>
                                </div>
                              </tr>
                            </thead>
                          ))}
                        </tbody>
                      ) : (
                        <p>No Record Found</p>
                      )}
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane tabId="2">
                <div className="card display-card">
                  <div className="card-body p-0">
                    <div className="text-center">
                      {data?.length !== 0 ? (
                        <tbody className="d-flex justify-content-between w-100">
                          {data?.map((item) => (
                            <thead className="d-flex justify-content-between w-100 flex-wrap">
                              <tr className="d-flex justify-content-between w-100">
                                <div>
                                  <th>Vehicle Category:</th>
                                  <td className="ps-1">
                                    {" "}
                                    {item?.lead_data?.vehicleCategory || "N/A"}
                                  </td>
                                </div>
                                <div>
                                  <th>Vehicle Make: </th>
                                  <td className="ps-1">
                                    {" "}
                                    {item?.lead_data?.vehicleMake || "N/A"}
                                  </td>
                                </div>
                                <div>
                                  <th>Vehicle Model:</th>
                                  <td className="ps-1">
                                    {item?.lead_data?.vehicleModel || "N/A"}
                                  </td>
                                </div>
                              </tr>
                              <tr className="d-flex justify-content-between w-100">
                                <div>
                                  <th>Vehicle Variant: </th>
                                  <td className="ps-1">
                                    {" "}
                                    {item?.lead_data?.vehicleVariant || "N/A"}
                                  </td>
                                </div>
                                <div className="text-start">
                                  <th>Vehicle Number: </th>
                                  <td className="ps-1">
                                    {" "}
                                    {item?.lead_data?.vehicleNumber || "N/A"}
                                  </td>
                                </div>
                                <div>
                                  <th></th>
                                  <td className="ps-1"></td>
                                </div>
                              </tr>
                            </thead>
                          ))}
                        </tbody>
                      ) : (
                        <p>No Record Found</p>
                      )}
                    </div>
                  </div>
                </div>
              </TabPane>
            </TabContent>
          </div>
        </div>
        {leadStatus === "requestGenerated" ? (
          <div className="my-3 d-flex justify-content-end">
            <button
              style={{
                border: "none",
                backgroundColor: "#2690D0",
                color: "#fff",
                padding: "0.5rem 1.5rem",
                borderRadius: "0.3rem",
              }}
              onClick={() => handleAssign(data)}
            >
              Assign To Me
            </button>
          </div>
        ) : (
          <div className="my-3 d-flex justify-content-end">
            <button
              style={{
                border: "none",
                backgroundColor: "#2690D0",
                color: "#fff",
                padding: "0.5rem 1.5rem",
                borderRadius: "0.3rem",
              }}
              onClick={() => handleEditLead(location?.state)}
            >
              Proceed
            </button>
          </div>
        )}
      </Layout>
      <Modal isOpen={editDetails} toggle={toggle} backdrop="static" size="lg">
        <ModalHeader>
          <div className="d-flex justify-content-between align-items-center">
            <span>Add more Details</span>
            <IoMdClose onClick={() => toggle()} />
          </div>
        </ModalHeader>
        <ModalBody>
          <>
            <form onSubmit={handleSubmit(submitDetails)}>
              {" "}
              <div className="col-12">
                <div className="card display-card">
                  <div className="row card-body p-0 mb-2">
                    <div className="col-3 col-lg-6 form-group mb-3">
                      <input
                        type="text"
                        id="keyword"
                        name="keyword"
                        {...register("customerName")}
                        className="control-form form-select"
                        defaultValue={data[0]?.lead_data?.customerFullName}
                        placeholder="Customer Name"
                      />
                    </div>
                    <div className="col-3 col-lg-6 form-group mb-3">
                      <input
                        type="number"
                        id="keyword"
                        name="keyword"
                        className="control-form form-select"
                        {...register("customerNumber")}
                        defaultValue={data[0]?.lead_data?.customerNumber}
                        placeholder="Contact Number"
                      />
                    </div>
                    <div className="col-3 col-lg-6 form-group mb-3">
                      <input
                        type="email"
                        id="keyword"
                        name="keyword"
                        className="control-form form-select"
                        placeholder="Email Address"
                        {...register("customerEmailAddress")}
                        defaultValue={data[0]?.lead_data?.customerEmailAddress}
                      />
                    </div>
                    <div className="col-3 col-lg-6 form-group mb-3">
                      <div className="position-relative mb-3">
                        <div className="form-floating inother">
                          <select
                            className="form-select"
                            name="policyStatus"
                            {...register("policyStatus")}
                          >
                            <option selected>Select Policy Status</option>
                            <option value={"NewBusiness"}>New Business</option>
                            <option value={"break-in"}>Break-In</option>
                            <option value={"continue"}>Continue</option>
                          </select>
                          {/* <label htmlFor="Cusname">
                                        Vehicle Type
                                        <span className="text-danger">*</span>
                                      </label> */}
                        </div>
                        <span className="text-danger">
                          {errors?.vType?.message}
                        </span>
                      </div>
                    </div>
                    <div className="col-3 col-lg-6 form-group mb-3">
                      <input
                        type="text"
                        id="keyword"
                        name="keyword"
                        className="control-form form-select"
                        placeholder="Pincode"
                        {...register("customerPincode")}
                        defaultValue={data[0]?.lead_data?.customerPincode}
                      />
                    </div>
                    <div className="col-3 col-lg-6 form-group mb-3">
                      <input
                        type="text"
                        id="keyword"
                        name="keyword"
                        className="control-form form-select"
                        placeholder="City"
                        {...register("customerCity")}
                        defaultValue={data[0]?.lead_data?.customerCity}
                      />
                    </div>
                    <div className="col-3 col-lg-6 form-group mb-3">
                      <input
                        type="text"
                        id="keyword"
                        name="keyword"
                        className="control-form form-select"
                        placeholder="State"
                        {...register("customerState")}
                        defaultValue={data[0]?.lead_data?.customerState}
                      />
                    </div>
                    <div className="col-3 col-lg-6 form-group mb-3">
                      <input
                        type="text"
                        id="keyword"
                        name="keyword"
                        className="control-form form-select"
                        placeholder="Vehicle Number"
                        {...register("vehicleNumber")}
                        defaultValue={data[0]?.lead_data?.vehicleNumber}
                      />
                    </div>
                    <div className="col-3 col-lg-6 form-group mb-3">
                      <div className="position-relative mb-3">
                        <div className="form-floating inother">
                          <select
                            className="form-select"
                            id="vType"
                            name="vType"
                            defaultValue={data[0]?.lead_data?.vehicleCategory}
                            {...register("vType", {
                              required: "Please Select Vehicle Type",
                              onChange: (e) => setVType(e?.target?.value),
                            })}
                          >
                            <option>Select Vehicle Type</option>
                            <option key="" value="Pvt Car">
                              Pvt Car
                            </option>
                            <option key="" value="MotorBike">
                              Two Wheeler
                            </option>
                            <option key="" value="Passenger Carrying">
                              Passenger Carrying Vehicle (PCV)
                            </option>
                            <option key="" value="Goods Carrying">
                              Goods Carrying Vehicle (GCV)
                            </option>
                            <option key="" value="misd">
                              MISD
                            </option>
                            <option key="" value="trailer">
                              Trailer
                            </option>
                          </select>
                          {/* <label htmlFor="Cusname">
                                        Vehicle Type
                                        <span className="text-danger">*</span>
                                      </label> */}
                        </div>
                        <span className="text-danger">
                          {errors?.vType?.message}
                        </span>
                      </div>
                    </div>
                    <div className="col-3 col-lg-6 form-group mb-3">
                      <div className="position-relative mb-3">
                        <div className="form-floating inother">
                          <ReactSelect
                            options={makeData}
                            // className="form-select"
                            name="make"
                            placeholder="Select Manufacturer"
                            defaultValue={"ashwin"}
                            onChange={(val) => handleSelectMake(val.value)}
                          />
                        </div>
                        <span className="text-danger">
                          {errors?.Make?.message}
                        </span>
                      </div>
                    </div>
                    <div className="col-3 col-lg-6 form-group mb-3">
                      <div className="position-relative mb-3">
                        <div className="form-floating inother">
                          <ReactSelect
                            options={modelData}
                            className="form-select"
                            name="model"
                            placeholder="Select vehicle modal"
                            onChange={(val) => handleSelectModel(val.value)}
                          />
                        </div>
                        <span className="text-danger">
                          {errors?.Make?.message}
                        </span>
                      </div>
                    </div>
                    <div className="col-3 col-lg-6 form-group mb-3">
                      <div className="position-relative mb-3">
                        <div className="form-floating inother">
                          <ReactSelect
                            options={variantData}
                            className="form-select"
                            name="make"
                            placeholder="Select Variant"
                            onChange={(val) => handleSelectVariant(val)}
                          />
                        </div>
                        <span className="text-danger">
                          {errors?.Make?.message}
                        </span>
                      </div>
                    </div>
                    {vType === "Pvt Car" ? (
                      <div className="col-3 col-lg-6 form-group mb-3">
                        <input
                          type="text"
                          name="cubicCapacity"
                          className="control-form form-select"
                          placeholder="Cubic Capacity"
                          {...register("cubicCapacity")}
                        />
                      </div>
                    ) : vType === "MotorBike" ? (
                      <input
                        type="text"
                        name="cubicCapacity"
                        className="control-form form-select"
                        placeholder="Cubic Capacity"
                        {...register("cubicCapacity")}
                      />
                    ) : vType === "Passenger Carrying" ? (
                      <div className="col-3 col-lg-6 form-group mb-3">
                        <div className="position-relative mb-3">
                          <div className="form-floating inother">
                            <select
                              className="form-select"
                              onChange={(e) =>
                                handleSelectPetrolType(e.target.value)
                              }
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
                    ) : vType === "Goods Carrying" ? (
                      <div className="col-3 col-lg-6 form-group mb-3">
                        <input
                          type="text"
                          name="cubicCapacity"
                          className="control-form form-select"
                          placeholder="Gross Weight"
                          {...register("grossWeight")}
                        />
                      </div>
                    ) : (
                      <div className="col-3 col-lg-6 form-group mb-3">
                        <input
                          type="text"
                          name="cubicCapacity"
                          className="control-form form-select"
                          placeholder="Cubic Capacity"
                          {...register("cubicCapacity")}
                        />
                      </div>
                    )}
                    <div className="col-3 col-lg-6 form-group mb-3">
                      <div className="position-relative mb-3">
                        <div className="form-floating inother">
                          <select
                            className="form-select"
                            onChange={(e) =>
                              handleSelectPetrolType(e.target.value)
                            }
                          >
                            <option>Select Fuel Type</option>
                            {fuelTypes.includes("Petrol") && (
                              <option value="Petrol">Petrol</option>
                            )}
                            {fuelTypes.includes("Diesel") && (
                              <option value="Diesel">Diesel</option>
                            )}
                            {fuelTypes.includes("Battery") && (
                              <option value="Battery">Electric</option>
                            )}
                            {fuelTypes.includes("CNG") && (
                              <option value="CNG">CNG</option>
                            )}
                            {fuelTypes.includes("LPG") && (
                              <option value="LPG">LPG</option>
                            )}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-3 col-lg-6 form-group mb-3">
                      <div className="position-relative mb-3">
                        <div className="form-floating inother">
                          <select
                            className="form-select"
                            {...register("caseType")}
                            onChange={(e) => {
                              setCaseType(e?.target?.value);
                            }}
                          >
                            <option>Select Case Type</option>
                            <option value="new">New</option>
                            <option value="rollover">Rollover</option>
                            <option value="rollover-breakin">
                              Rollover Break in
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="col-3 col-lg-6 form-group mb-3">
                      <input
                        type="text"
                        name="IDV"
                        {...register("idv")}
                        className="control-form form-select"
                        placeholder="IDV"
                      />
                    </div>

                    <div className="col-3 col-lg-6 form-group mb-3">
                      <div className="position-relative mb-3">
                        <div className="form-floating inother">
                          <select
                            className="form-select"
                            {...register("ncb")}
                            onChange={(e) => {
                              setNCB(e?.target?.value);
                            }}
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
                    </div>

                    <div className="col-3 col-lg-6 form-group mb-3">
                      <div className="position-relative mb-3">
                        <div className="form-floating inother">
                          <select
                            className="form-select"
                            {...register("previousInsurerCode")}
                          >
                            <option className="d-none" selected>
                              Previous Policy Insurer
                            </option>
                            {insurerData &&
                              insurerData.length > 0 &&
                              insurerData.map((item, i) => (
                                <option key={i} value={item.value}>
                                  {item.option}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="col-3 col-lg-6 form-group mb-3">
                      <input
                        type="number"
                        name="engineNumber"
                        className="control-form form-select"
                        {...register("engineNumber")}
                        placeholder="Engine Number"
                      />
                    </div>

                    <div className="col-3 col-lg-6 form-group mb-3">
                      <input
                        type="number"
                        name="chassisNumber"
                        className="control-form form-select"
                        {...register("chassisNumber")}
                        placeholder="Chassis Number"
                      />
                    </div>

                    <div className="col-3 col-lg-6 form-group mb-3">
                      <input
                        {...register("ManufaturingDate", {
                          required: "Field is required",
                        })}
                        name="ManufaturingDate"
                        type="date"
                        id="idxx4"
                        className="control-form form-select"
                      />
                    </div>

                    <div className="col-3 col-lg-6 form-group mb-3">
                      <input
                        type="date"
                        name="regDate"
                        className="control-form form-select"
                        {...register("regDates")}
                        placeholder="Registeration Date"
                      />
                    </div>

                    <div className="col-3 col-lg-6 form-group mb-3">
                      <input
                        type="date"
                        name="policyIssueDate"
                        className="control-form form-select"
                        {...register("policyIssueDate")}
                        placeholder="Policy Issue Date"
                      />
                    </div>
                    <div className="col-3 col-lg-6 form-group mb-3">
                      <input
                        type="date"
                        name="policyStartDate"
                        className="control-form form-select"
                        {...register("policyStartDate")}
                        placeholder="Policy Start Date"
                      />
                    </div>

                    <div className="col-3 col-lg-6 form-group mb-3">
                      <input
                        type="date"
                        name="policyEndDate"
                        className="control-form form-select"
                        {...register("policyEndDate")}
                        placeholder="Policy End Date"
                      />
                    </div>

                    <div className="col-3 col-lg-6 form-group mb-3">
                      <input
                        type="number"
                        name="policyNumber"
                        className="control-form form-select"
                        {...register("policyNumber")}
                        placeholder="Policy Number"
                      />
                    </div>

                    <div className="col-3 col-lg-6 form-group mb-3">
                      <input
                        type="number"
                        name="CPA"
                        className="control-form form-select"
                        {...register("CPA")}
                        placeholder="CPA"
                      />
                    </div>

                    <div className="col-3 col-lg-6 form-group mb-3">
                      <input
                        type="number"
                        name="odNetPremium"
                        className="control-form form-select"
                        {...register("odNetPremium")}
                        placeholder="OD Net Premium"
                      />
                    </div>

                    <div className="col-3 col-lg-6 form-group mb-3">
                      <input
                        type="number"
                        name="TPPremium"
                        className="control-form form-select"
                        {...register("TPPremium")}
                        placeholder="TP Premium"
                      />
                    </div>

                    <div className="col-3 col-lg-6 form-group mb-3">
                      <input
                        type="number"
                        name="NetPremium"
                        className="control-form form-select"
                        {...register("NetPremium")}
                        placeholder="Net Premium"
                      />
                    </div>

                    <div className="col-3 col-lg-6 form-group mb-3">
                      <input
                        type="number"
                        name="GST"
                        className="control-form form-select"
                        {...register("GST")}
                        placeholder="GST/Tax Amount"
                      />
                    </div>
                    <div className="col-3 col-lg-6 form-group mb-3">
                      <input
                        type="number"
                        name="finalPremium"
                        className="control-form form-select"
                        {...register("finalPremium")}
                        placeholder="Final Premium"
                      />
                    </div>
                  </div>
                  <button className="" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </>
        </ModalBody>
      </Modal>
    </>
  );
};

export default MisDetails;
