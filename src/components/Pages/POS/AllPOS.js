import React, { useState, useEffect } from 'react'
import Layout from '../../Common/Layout'
import { allPos } from '../../Services/userService'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import Loader from '../../Common/Loader'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

const AllPOS = () => {
  const [activeTab, setActiveTab] = useState('1')
  // const [posList, setPosList] = useState([]);
  const [callApi, setCallApi] = useState(true)
  const [loader, setLoader] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()
  const [status, setStatus] = useState('')
  const posType = location?.state?.type
  console.log('posType', posType)
  useEffect(() => {
    const que =
      location.pathname == '/all-pos'
        ? ''
        : `?status=${location?.state?.status}`
    setStatus(que)
    setCallApi(true)
    // console.log("path changessssss",)
  }, [location.pathname])
  useEffect(() => {
    if (callApi) {
      setLoader(true)
      allPos(`?status=`).then(response => {
        console.log('POS', response.data)
        handleSetDataTable(
          response.data?.sort((d1, d2) => (d1.id > d2.id ? -1 : 1))
        )
        setLoader(false)
        // setPosList(response.data);
      })
      setCallApi(false)
    }
  }, [callApi, status])

  const goToPos = id => {
    navigate('/pos-details', {
      state: { userId: id }
    })
  }

  const [dataTable, setDataTable] = useState({
    columns: [
      {
        label: 'User Name',
        field: 'userName',
        sort: 'asc',
        width: 195
      },
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 350
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 360
      },
      {
        label: 'Contact Number',
        field: 'contactNumber',
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

  const handleSetDataTable = table => {
    let tableValue = []
    table.map(data => {
      tableValue.push({
        userName: data?.userName,
        name: data?.addedPos?.name,
        email: data?.addedPos?.email,
        contactNumber: data?.addedPos?.phone,
        action: (
          <a
            href='javascript:void(0)'
            className='btn btn-primary px-2 py-1'
            onClick={() => goToPos(data?.addedPos?.id)}
          >
            <i className='fa fa-eye' aria-hidden='true' />
          </a>
        )
      })
    })
    setDataTable({
      ...dataTable,
      rows: tableValue
    })
  }

  const handlePOS = (tab, status) => {
    setActiveTab(tab)
    setLoader(true)
    allPos(`?status=${status}`).then(response => {
      console.log('POS', response.data)
      handleSetDataTable(
        response.data?.sort((d1, d2) => (d1.id > d2.id ? -1 : 1))
      )
      setLoader(false)
      // setPosList(response.data);
    })
    setCallApi(false)
  }

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <Layout>
          <div className='page-content-crumb'>
            <div className='breadcrumb-area'>
              {/* <h1>POS Desk</h1> */}
              <ol className='breadcrumb'>
                <li className='item'>
                  <Link to='/dashboard'>
                    <i className='fa fa-home' aria-hidden='true' />
                  </Link>
                </li>
                <li className='item'>{posType} POS</li>
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
          {/* Breadcrumb area end */}
          {/* page-content main section start */}

          <div className='card display-card p-2'>
            <div className='card-body p-0 p-md-3'>
              <div className='row'>
                <div className='col-lg-10 col-12'>
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        className={activeTab == '1' ? 'active' : ''}
                        onClick={() => handlePOS('1', '')}
                      >
                        All POS
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={activeTab == '2' ? 'active' : ''}
                        onClick={() => handlePOS('2', 'pending')}
                      >
                        POS Request
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={activeTab == '3' ? 'active' : ''}
                        onClick={() => handlePOS('3', 'underTraining')}
                      >
                        Under Training
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={activeTab == '4' ? 'active' : ''}
                        onClick={() => handlePOS('4', 'certified')}
                      >
                        Certified
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={activeTab == '5' ? 'active' : ''}
                        onClick={() => handlePOS('5', 'rejected')}
                      >
                        Rejected
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={activeTab == '6' ? 'active' : ''}
                        onClick={() => handlePOS('6', 'incomplete')}
                      >
                        Incompelete
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>

                <div className='col-lg-2 col-12 text-end'>
                  <Link to='/add-pos' className='btn btn-primary'>
                    Add POS
                  </Link>
                </div>

                {/* New-POS table start */}
                <div className='col-12'>
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId='1'>
                      <div className='text-center'>
                        <MDBDataTable
                          hover
                          // scrollX={false}
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
                      </div>
                    </TabPane>

                    <TabPane tabId='2'>
                      <MDBDataTable
                        // scrollX
                        noBottomColumns
                        striped
                        bordered
                        hover
                        entriesOptions={[10, 25, 50, 75, 100]}
                        entries={10}
                        data={dataTable}
                        infoLabel={['Showing', 'to', 'of', 'entries']}
                        pagesAmount={10}
                        paginationLabel={['<', '>']}
                      />
                    </TabPane>

                    <TabPane tabId='3'>
                      <MDBDataTable
                        noBottomColumns
                        striped
                        bordered
                        // scrollX
                        hover
                        entriesOptions={[10, 25, 50, 75, 100]}
                        entries={10}
                        data={dataTable}
                        infoLabel={['Showing', 'to', 'of', 'entries']}
                        pagesAmount={10}
                        paginationLabel={['<', '>']}
                      />
                    </TabPane>

                    <TabPane tabId='4'>
                      <MDBDataTable
                        // scrollX
                        noBottomColumns
                        striped
                        bordered
                        hover
                        entriesOptions={[10, 25, 50, 75, 100]}
                        entries={10}
                        data={dataTable}
                        infoLabel={['Showing', 'to', 'of', 'entries']}
                        pagesAmount={10}
                        paginationLabel={['<', '>']}
                      />
                    </TabPane>

                    <TabPane tabId='5'>
                      <MDBDataTable
                        noBottomColumns
                        striped
                        bordered
                        // scrollX
                        hover
                        entriesOptions={[10, 25, 50, 75, 100]}
                        entries={10}
                        data={dataTable}
                        infoLabel={['Showing', 'to', 'of', 'entries']}
                        pagesAmount={10}
                        paginationLabel={['<', '>']}
                      />
                    </TabPane>

                    <TabPane tabId='6'>
                      <MDBDataTable
                        noBottomColumns
                        striped
                        bordered
                        // scrollX
                        hover
                        entriesOptions={[10, 25, 50, 75, 100]}
                        entries={10}
                        data={dataTable}
                        infoLabel={['Showing', 'to', 'of', 'entries']}
                        pagesAmount={10}
                        paginationLabel={['<', '>']}
                      />
                    </TabPane>
                  </TabContent>
                </div>
                {/* New-POS table end */}
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  )
}

export default AllPOS
