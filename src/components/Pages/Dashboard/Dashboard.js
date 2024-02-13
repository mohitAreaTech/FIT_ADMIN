import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Layout from '../../Common/Layout'
import Loader from '../../Common/Loader'

const Dashboard = () => {
  const user = useSelector(state => state?.root?.userDetails?.type)

  const [dashboardDetails, setDashboardDetails] = useState([])

  // useEffect(() => {
  //   // callDataTable();
  //   if (callApi) {
  //     setLoader(true);
  //     getDashboard().then((response) => {
  //       if (response.status == true) {
  //         console.log("first", response.data);
  //         setDashboardDetails(response.data);
  //         setCallApi(false);
  //         setLoader(false);
  //       }
  //       setCallApi(false);
  //     });
  //   }
  // }, [callApi]);

  return (
    <>
      <Layout>
        <div className='page-content-crumb'>
          <div className='breadcrumb-area'>
            {/* <h1>Dashboard</h1> */}
            <ol className='breadcrumb'>
              <li className='item'>
                <Link to='/dashboard'>
                  <i className='fa fa-home' aria-hidden='true' />
                </Link>
              </li>
              <li className='item'>Dashboard</li>
            </ol>
          </div>
        </div>
        {/* Breadcrumb area end */}
        {/* page-content main section start */}

        {/* <div className='row'>
          <h5 className='mb-3'>
            <span className='text-heading px-4'>POS</span>
          </h5>
          <div className='col-12 col-md-6 col-lg-3'>
            <div className='dash-card-box'>
              <div className='icon-box'>
                <i>
                  <img
                    src={'./assets/img/no-of-pos-removebg-preview.png'}
                    alt='No-POS'
                  />
                </i>
              </div>
              <span className='sub-title'>No. of POS</span>
              <h3>
                <CountUp end={dashboardDetails?.totalPos} duration={5} />
              </h3>
            </div>
          </div>
        </div> */}
      </Layout>
    </>
  )
}

export default Dashboard
