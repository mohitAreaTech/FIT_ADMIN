import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Layout from "../../Common/Layout";
import {
  actionOnPosRequest,
  getPosDetails,
  sendErrorMessage,
  sendSuccessMessage,
} from "../../Services/userService";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import ModalImage from "react-modal-image";
import { MDBDataTable } from "mdbreact";
import { GetDataWithToken, mainUrl } from "../../../apiHelper/ApiHelper";
import moment from "moment";


const PosDetails = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [loader, setLoader] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [buttonVisible, setButtonVisible] = useState(false);
  const [examAttempts, setExamAttempts] = useState([]);
  const [callApi, setCallApi] = useState(true);
  const [imgOpen, setImgOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [rejectReason, setRejectReason] = useState("");
  const [modal, setModal] = useState(false);
  const [inCompleteModal, setInCompleteModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const toggleInComplete = () => setInCompleteModal(!inCompleteModal);
  useEffect(() => {
    const userId = location?.state?.userId;
    if (callApi === true) {
      getPosDetails(userId).then((response) => {
        if (response.status === true) {
          // console.log("basjg", response.data);
          setUserDetails(response.data);
          // handleSetDataTable(response.data);
          // handleAttemptTable(response.data?.user?.exam_attempts);
          setExamAttempts(response.data?.user?.exam_attempts);
          // console.log("attemp", response.data);
        }
      });
      setCallApi(false);
    }
  }, [callApi]);

  console.log("user details =========", userDetails)

  const getDocumentVal = (docType) => {
    let docArr = userDetails?.user?.documents;
    if (docArr) {
      const index = docArr.findIndex((item) => item.DocumentType == docType);
      if (index > -1) {
        return docArr[index];
      }
    }
  };

  const handleActionOnRequest = (status, statusDetails) => {
    // console.log('status from request ', status);
    setLoader(true);
    let postData = {
      status,
      remark: rejectReason ? rejectReason : null,
    };
    actionOnPosRequest(userDetails?.user?.id, postData).then((response) => {
      if (response.status === true) {
        setLoader(false);
        setRejectReason("");
        setModal(false);
        setInCompleteModal(false);
        setCallApi(true);
        sendSuccessMessage(response);
        // if (response?.status == "accepted") {
        //   navigate("/pos-underTraining", {
        //     state: { status: "underTraining" }
        //   });
        // }
        // navigate(-1);
      } else {
        sendErrorMessage(response);
        setLoader(false);
      }
    });
  };

  const [dataTable, setDataTable] = useState({
    columns: [
      {
        label: "Customer Name",
        field: "customerName",
        sort: "asc",
        width: 270,
      },
      {
        label: "Insurance Type",
        field: "insuranceType",
        sort: "asc",
        width: 200,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 100,
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 100,
      },
    ],
    row: [],
  });

  // const handleSetDataTable = (table) => {
  //   let tableValue = [];
  //   table.map((data) => {
  //     tableValue.push({
  //       customerName: data?.customerName,
  //       insuranceType: data?.insuranceType,
  //       status: data?.status,
  //       action: (
  //         <a href="javascript:void(0)" className="btn btn-primary px-2 py-1">
  //           <i className="fa fa-eye" aria-hidden="true" />
  //         </a>
  //       ),
  //     });
  //   });
  //   setDataTable({
  //     ...dataTable,
  //     rows: tableValue,
  //   });
  // };

  const [attemptTable, setAttemptTable] = useState({
    columns: [
      {
        label: "Attempt",
        field: "attempt",
        sort: "asc",
        width: 270,
      },
      {
        label: "Score",
        field: "score",
        sort: "asc",
        width: 200,
      },
      {
        label: "Result",
        field: "result",
        sort: "asc",
        width: 100,
      },
      {
        label: "Exam Status",
        field: "examStatus",
        sort: "asc",
        width: 100,
      },
    ],
    row: [],
  });

  const handleAttemptTable = (table) => {
    let tableValue = [];
    table.map((data) => {
      tableValue.push({
        attempt: data.attempt_number,
        score: data?.score,
        result: data?.result,
        examStatus: data?.examStatus,
      });
    });
    setAttemptTable({
      ...attemptTable,
      rows: tableValue,
    });
    // console.log("attemptTable", attemptTable);
  };

  const handleDonloadCertificate = () => {
    console.log('userDetails',userDetails)
    const userId = location?.state?.userId;
    // console.log("${userId}", userId);
    window.open(`${mainUrl}exam/certificate/${userId}`);
    // return (
    //   <a href={`https://api.flaskitsolutions.com/api/v1/exam/certificate/${userId}`} target="_blank">asda</a>
    // )
    // GetDataWithToken(`exam/certificate/${userId}`, '')
    //   .then((response) => {
    //     navigate(`/pos-certificate`, {
    //       state: { data: response }
    //     })
    //   })
  };


  const visiblebuttonFunction = () => {
    // console.log('1');

    if (userDetails?.user?.addedPos?.buttonVisibleTime) {
      // current time
    const currentTime = moment().toString();

    // console.log('currentTime', currentTime)
    // console.log('userDetails', userDetails)
    // button visible time
    const buttonVisibleTIme = userDetails?.user?.addedPos?.buttonVisibleTime.toString();
    // console.log('button visible time', buttonVisibleTIme)
    const trimmedCurrentTime = currentTime.substring(16, 24);
    const trimmedButtonVisibleTime = buttonVisibleTIme.substring(11,19);
    // console.log('trimmed current time', trimmedCurrentTime);
    // console.log('trimmed visible time', trimmedButtonVisibleTime)


    if ( trimmedCurrentTime >= trimmedButtonVisibleTime) {
      // console.log('button visibility to true');
      setButtonVisible(true);
    } 
    }
    else {
      // console.log('button visibility to false')
      setButtonVisible(false);
    }
  }

  useEffect(() => {
    visiblebuttonFunction()
  },[userDetails])

  return (
    <Layout>
      <div className="page-content-crumb">
        <div className="breadcrumb-area">
          {/* <h1>Trainee Detail</h1> */}
          <ol className="breadcrumb">
            <li className="item">
              <Link to="/dashboard">
                <i className="fa fa-home" aria-hidden="true" />
              </Link>
            </li>
            <li className="item">Trainee Detail</li>
          </ol>
        </div>
        <button className="btn btn-danger" onClick={() => navigate(-1)}>
          <span className="d-none d-md-block">Back</span>
          <span className="d-block d-md-none">
            <i className="fa fa-sign-out" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      {/* Breadcrumb area end */}
      {/* page-content main section start */}
      {/* Data-tables leads and Policy start */}
      <div className="row">
        {/* New-POS table start */}
        <div className="col-12">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={activeTab == "1" ? "active" : ""}
                onClick={() => setActiveTab("1")}
              >
                Details
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab == "2" ? "active" : ""}
                onClick={() => setActiveTab("2")}
              >
                Documents
              </NavLink>
            </NavItem>
            {userDetails?.user?.addedPos?.reject_remark != null && (
              <NavItem>
                <NavLink
                  className={activeTab == "3" ? "active" : ""}
                  onClick={() => setActiveTab("3")}
                >
                  Remark
                </NavLink>
              </NavItem>
            )}
            {examAttempts?.length > 0 && (
              <NavItem>
                <NavLink
                  className={activeTab == "4" ? "active" : ""}
                  onClick={() => setActiveTab("4")}
                >
                  Exam Attempts
                </NavLink>
              </NavItem>
            )}
            {(examAttempts?.length > 0 ||
              userDetails?.user?.addedPos?.status == "certified") && (
              <NavItem>
                <NavLink
                  className={activeTab == "5" ? "active" : ""}
                  target={"_blank"}
                  onClick={() => handleDonloadCertificate()}
                >
                  Download Certificate
                </NavLink>
              </NavItem>
            )}
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <div className="card mt-3">
                <div className="card-header d-flex justify-content-between align-items-center px-0 px-md-3">
                  <h6 className="mb-0">Detail</h6>
                  <Link
                    to="/edit-pos"
                    state={{ userDetails: userDetails }}
                    className="btn btn-primary"
                  >
                    Edit POS
                  </Link>
                </div>
                <div className="card-body p-0 p-md-3">
                  <div className="my-3">
                    <ul className="row list-unstyled">
                      <li className="col-12 col-md-6 col-lg-4 ">
                        <p className="text-capitalize">
                          User Name<span className="mx-1">-</span>
                          <span className="text-capitalize mb-1 text-muted fs-7">
                            {userDetails?.user?.addedPos?.userName}
                          </span>
                        </p>
                      </li>
                      <li className="col-12 col-md-6 col-lg-4 ">
                        <p className="text-capitalize">
                          Name<span className="mx-1">-</span>
                          <span className="text-capitalize mb-1 text-muted fs-7">
                            {userDetails?.user?.name}
                          </span>
                        </p>
                      </li>
                      <li className="col-12 col-md-6 col-lg-4 ">
                        <p>
                          Email<span className="mx-1">-</span>
                          <span className="mb-1 text-muted fs-7">
                            <a
                              href={`mailto:${userDetails?.user?.email}`}
                              className="fw-bold text-primary text-wrap"
                            >
                              {userDetails?.user?.email}
                            </a>
                          </span>
                        </p>
                      </li>
                      <li className="col-12 col-md-6 col-lg-4 ">
                        <p className="text-capitalize">
                          Phone No.<span className="mx-1">-</span>
                          <span className="text-capitalize mb-1 text-muted fs-7">
                            <a
                              href={`tel:${userDetails?.user?.phone}`}
                              className="fw-bold text-primary"
                            >
                              {userDetails?.user?.phone}
                            </a>
                          </span>
                        </p>
                      </li>
                      <li className="col-12 col-md-6 col-lg-4 ">
                        <p className="text-capitalize">
                          Aadhar No.<span className="mx-1">-</span>
                          <span className="text-capitalize mb-1 text-muted fs-7">
                            {userDetails?.user?.adhar_number}
                          </span>
                        </p>
                      </li>
                      <li className="col-12 col-md-6 col-lg-4 ">
                        <p className="text-uppercase">
                          Pan No.<span className="mx-1">-</span>
                          <span className="text-capitalize mb-1 text-muted fs-7">
                            {userDetails?.user?.pan?.documentNumber}
                          </span>
                        </p>
                      </li>
                      <li className="col-12 col-md-6 col-lg-4 ">
                        <p className="text-capitalize">
                          Bank Name<span className="mx-1">-</span>
                          <span className="text-capitalize mb-1 text-muted fs-7">
                            {userDetails?.user?.bank?.bank_name}
                          </span>
                        </p>
                      </li>
                      <li className="col-12 col-md-6 col-lg-4">
                        <p className="text-capitalize">
                          Account No.<span className="mx-1">-</span>
                          <span className="text-capitalize mb-1 text-muted fs-7">
                            {userDetails?.user?.bank?.accountNumber}
                          </span>
                        </p>
                      </li>
                      <li className="col-12 col-md-6 col-lg-4">
                        <p className="text-uppercase">
                          IFSC<span className="mx-1">-</span>
                          <span className="mb-1 text-muted fs-7">
                            {userDetails?.user?.bank?.ifsc}
                          </span>
                        </p>
                      </li>
                      <li className="col-12 col-md-6 col-lg-4">
                        <p className="text-capitalize">
                          Status<span className="mx-1">-</span>
                          <span className="text-capitalize mb-1 text-muted fs-7">
                            {userDetails?.user?.addedPos?.status}
                          </span>
                        </p>
                      </li>
                      {userDetails?.user?.addedPos?.status == "certified" && (
                        <li className="col-12 col-md-6 col-lg-4">
                          <p className="text-capitalize">
                            Certification Date<span className="mx-1">-</span>
                            <span className="text-capitalize mb-1 text-muted fs-7">
                              {
                                userDetails?.user?.addedPos?.updatedAt?.split(
                                  "T"
                                )?.[0]
                              }
                            </span>
                          </p>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tabId="2">
              <div className="card mt-3">
                <div className="card-header d-flex justify-content-between align-items-center px-0 px-md-3">
                  <h6 className="mb-0">Documents</h6>
                  <Link
                    to="/edit-pos"
                    state={{ userDetails: userDetails }}
                    className="btn btn-primary"
                  >
                    Edit POS
                  </Link>
                </div>
                <div className="card-body p-0 p-md-3">
                  <div className="row gy-3">
                    <div className="col-12 col-md-6 col-lg-4 col-xl-3">
                      <p className="mt-3 fs-7">Passbook/Cheque</p>
                      <div className="ops-docs-img">
                        {userDetails?.user?.bank?.passbookOrCheque?.includes(
                          "pdf"
                        ) ? (
                          <a
                            href={userDetails?.user?.bank?.passbookOrCheque}
                            target="_blank"
                          >
                            <img
                              src="./assets/img/pdf.png"
                              className="docprev detail-img-2"
                              alt="img"
                            />
                          </a>
                        ) : (
                          <ModalImage
                            small={userDetails?.user?.bank?.passbookOrCheque}
                            large={userDetails?.user?.bank?.passbookOrCheque}
                            alt="Passbook/Cheque"
                            className="detail-img-2"
                          />
                        )}
                        {/* <img src={img?.image} alt="Doc-img" /> */}
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 col-xl-3">
                      <p className="mt-3 fs-7">Aadhar Card Front</p>
                      <div className="ops-docs-img">
                        {userDetails?.user?.aadhar?.image?.includes("pdf") ? (
                          <a
                            href={userDetails?.user?.aadhar?.image}
                            target="_blank"
                          >
                            <img
                              src="./assets/img/pdf.png"
                              className="docprev detail-img-2"
                              alt="img"
                            />
                          </a>
                        ) : (
                          <ModalImage
                            small={userDetails?.user?.aadhar?.image}
                            large={userDetails?.user?.aadhar?.image}
                            alt="Aadhar Card Front"
                            className="detail-img-2"
                          />
                        )}
                        {/* <img src={img?.image} alt="Doc-img" /> */}
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 col-xl-3">
                      <p className="mt-3 fs-7">Aadhar Card Back</p>
                      <div className="ops-docs-img">
                        {userDetails?.user?.aadhar?.image_back?.includes(
                          "pdf"
                        ) ? (
                          <a
                            href={userDetails?.user?.aadhar?.image_back}
                            target="_blank"
                          >
                            <img
                              src="./assets/img/pdf.png"
                              className="docprev detail-img-2"
                              alt="img"
                            />
                          </a>
                        ) : (
                          <ModalImage
                            small={userDetails?.user?.aadhar?.image_back}
                            large={userDetails?.user?.aadhar?.image_back}
                            alt="Aadhar Card Back"
                            className="detail-img-2"
                          />
                        )}

                        {/* <img src={img?.image} alt="Doc-img" /> */}
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 col-xl-3">
                      <p className="mt-3 fs-7">PAN Card</p>
                      <div className="ops-docs-img">
                        {userDetails?.user?.pan?.image?.includes("pdf") ? (
                          <a
                            href={userDetails?.user?.pan?.image}
                            target="_blank"
                          >
                            <img
                              src="./assets/img/pdf.png"
                              className="docprev detail-img-2"
                              alt="img"
                            />
                          </a>
                        ) : (
                          <ModalImage
                            small={userDetails?.user?.pan?.image}
                            large={userDetails?.user?.pan?.image}
                            alt="PAN Card"
                            className="detail-img-2"
                          />
                        )}

                        {/* <img src={img?.image} alt="Doc-img" /> */}
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 col-xl-3">
                      <p className="mt-3 fs-7">Marksheet</p>
                      <div className="ops-docs-img">
                        {userDetails?.user?.marksheet?.image?.includes(
                          "pdf"
                        ) ? (
                          <a
                            href={userDetails?.user?.marksheet?.image}
                            target="_blank"
                          >
                            <img
                              src="./assets/img/pdf.png"
                              className="docprev detail-img-2"
                              alt="img"
                            />
                          </a>
                        ) : (
                          <ModalImage
                            small={userDetails?.user?.marksheet?.image}
                            large={userDetails?.user?.marksheet?.image}
                            alt="Marksheet"
                            className="detail-img-2"
                          />
                        )}
                        {/* <img src={img?.image} alt="Doc-img" /> */}
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 col-xl-3">
                      <p className="mt-3 fs-7">Profile Picture</p>
                      <div className="ops-docs-img">
                        {userDetails?.user?.profile_picture?.image?.includes(
                          "pdf"
                        ) ? (
                          <a
                            href={userDetails?.user?.profile_picture?.image}
                            target="_blank"
                          >
                            <img
                              src="./assets/img/pdf.png"
                              className="docprev detail-img-2"
                              alt="img"
                            />
                          </a>
                        ) : (
                          <ModalImage
                            small={userDetails?.user?.profile_picture?.image}
                            large={userDetails?.user?.profile_picture?.image}
                            alt="Profile Piture"
                            className="detail-img-2"
                          />
                        )}
                        {/* <img src={img?.image} alt="Doc-img" /> */}
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 col-xl-3">
                      <p className="mt-3 fs-7">Other Document</p>
                      <div className="ops-docs-img">
                        {userDetails?.user?.other_document?.image?.includes(
                          "pdf"
                        ) ? (
                          <a
                            href={userDetails?.user?.other_document?.image}
                            target="_blank"
                          >
                            <img
                              src="./assets/img/pdf.png"
                              className="docprev detail-img-2"
                              alt="img"
                            />
                          </a>
                        ) : (
                          <ModalImage
                            small={userDetails?.user?.other_document?.image}
                            large={userDetails?.user?.other_document?.image}
                            alt="other document"
                            className="detail-img-2"
                          />
                        )}
                        {/* <img src={img?.image} alt="Doc-img" /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tabId="3">
              <div className="card mt-3">
                <h6>Remark</h6>
                <div className="row gy-3 my-3">
                  <h5 className="text-danger">
                    {userDetails?.user?.addedPos?.reject_remark}
                  </h5>
                </div>
              </div>
            </TabPane>
            <TabPane tabId="4">
              <div className="card mt-3">
                <h6>Exam Attempt</h6>
                <div className="table-responsive">
                  <table
                    id="newPOS"
                    className="display nowrap table text-center table-bordered"
                  >
                    <thead>
                      <tr className="mt-3">
                        <th className="border-start-0">No. of Attempt</th>
                        <th>Marks Obtained</th>
                        <th>Result</th>
                        <th className="border-end-0">Correct Answer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {examAttempts &&
                        examAttempts?.length > 0 &&
                        examAttempts?.map((list, index) => (
                          <tr key={index}>
                            <td className>{index + 1}</td>
                            <td>{list?.attempt_result?.obtained_marks}</td>
                            <td className="text-capitalize">{list?.result}</td>
                            <td>{list?.attempt_result?.correct}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabPane>
          </TabContent>
          <div className="d-grid d-md-flex justify-content-md-end">
            {userDetails?.user?.addedPos?.status == "underTraining" && (
              <>

                {/* complete training section here */}
                <button className="btn btn-primary mt-3 me-2"
                  onClick={() => handleActionOnRequest("complete-training")}> 
                  {loader === true ? (
                    <span className="spinner-border spinner-border-sm"></span>
                  ) : (
                      "Complete Training"
                  )}
                </button>

                {/* complete exam section here */}
                {buttonVisible && (
                  <>
                <button className="btn btn-primary mt-3 me-2"
                  onClick={() => handleActionOnRequest("complete-exam")}>
                  {loader === true ? (
                    <span className="spinner-border spinner-border-sm"></span>
                  ) : (
                      "Complete Exam"
                  )}
                </button>
                  </>
                )}
                

                {/* complete whole certication */}
                {/* <button
                  className="btn btn-primary mt-3 me-2"
                  onClick={() => handleActionOnRequest("certified")}
                >
                  {loader == true ? (
                    <span className="spinner-border spinner-border-sm"></span>
                  ) : (
                    "Complete Certification"
                  )}
              
                </button> */}
              </>
            )}
            {userDetails?.user?.addedPos?.status == "accepted" && (
              <>
                <p className="mt-3">
                  Status -
                  <span
                    className="badge bg-success px-3 ms-2 rounded-pill"
                    title="POS Certification has been Started"
                  >
                    Certification Started
                  </span>
                </p>
                {/* 
                <button disabled className="btn btn-primary mt-3 me-2">
                  Certification Start
                </button> */}
              </>
            )}
            {userDetails?.user?.addedPos?.status == "pending" && (
              <>
                {userDetails?.user?.aadhar != 0 &&
                  userDetails?.user?.bank != null &&
                  userDetails?.user?.pan != 0 &&
                  userDetails?.user?.marksheet != 0 && (
                    <button
                      className="btn btn-success mt-3 me-2"
                      onClick={() => handleActionOnRequest("underTraining")}
                    >
                      {loader == true ? (
                        <span className="spinner-border spinner-border-sm"></span>
                      ) : (
                        "Accept"
                      )}
                    </button>
                  )}

                <button
                  className="btn btn-danger mt-3 me-2"
                  onClick={() => setModal(true)}
                >
                  Reject
                </button>

                <button
                  className="btn btn-process mt-3 me-2"
                  onClick={() => setInCompleteModal(true)}
                >
                  Incomplete Document
                </button>
              </>
            )}
          </div>
        </div>
        {/* New-POS table end */}
        <Modal
          Modal
          className="modal-dialog-centered"
          isOpen={modal}
          toggle={toggleModal}
        >
          <ModalHeader toggle={toggleModal}>Reject Reason For POS</ModalHeader>
          <ModalBody>
            <div className="form-group mb-2">
              <label className="form-label" htmlFor>
                Reject Reason
                <span className="text-danger">*</span>
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                type="text"
                className="form-control control-form"
                name="reject"
              />
              <div className="text-end mt-2">
                <button
                  onClick={() => setModal(false)}
                  className="btn btn-danger"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleActionOnRequest("rejected")}
                  disabled={rejectReason.length < 5 ? "disabled" : ""}
                  className="btn btn-success mx-2"
                >
                  Submit
                </button>
              </div>
            </div>
          </ModalBody>
        </Modal>
        {/* In-Complete modal */}
        <Modal
          Modal
          className="modal-dialog-centered"
          isOpen={inCompleteModal}
          toggle={toggleInComplete}
        >
          <ModalHeader toggle={toggleInComplete}>
            Incompelete Document Reason for POS
          </ModalHeader>
          <ModalBody>
            <div className="form-group mb-2">
              <label className="form-label" htmlFor>
                Incompelete Document Reason
                <span className="text-danger">*</span>
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                type="text"
                className="form-control control-form"
                name="reject"
              />
              <div className="text-end mt-2">
                <button
                  onClick={() => setInCompleteModal(false)}
                  className="btn btn-danger"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleActionOnRequest("incomplete")}
                  disabled={rejectReason.length < 5 ? "disabled" : ""}
                  className="btn btn-success mx-2"
                >
                  Submit
                </button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </Layout>
  );
};

export default PosDetails;
