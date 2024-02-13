import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../../Common/Layout'
import { getUser } from '../../Services/userService'
import { Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap'
import {
  GetDataWithToken,
  PostDataWithToken
} from '../../../apiHelper/ApiHelper'
import { FaEye, FaRegEdit } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { selectedUser } from '../../../store/actions/userActions'
import { toast } from 'react-toastify'
import { MDBDataTable } from 'mdbreact'

const Department = () => {
  const [data, setData] = useState([])
  const [callApi, setcallApi] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [slug, setSlug] = useState('')
  const [department, setDepartment] = useState('')
  const [departmentId, setDepartmentId] = useState('')
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)
  const [dataTable, setDataTable] = useState({
    columns: [
      {
        label: 'Department',
        field: 'department_name',
        sort: 'asc',
        width: 195
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

  const getData = () => {
    GetDataWithToken('employee/all_department').then(res => {
      if (res?.success) {
        setData(res?.data)
        handleSetDataTable(
          res?.data?.sort((d1, d2) => (d1.id > d2.id ? -1 : 1))
        )
      }
    })
  }

  const handleSetDataTable = table => {
    let tableValue = []
    table.map(data => {
      tableValue.push({
        department_name: data?.department_name,
        action: (
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setModal(true)
              setSlug('edit')
              setDepartmentId(data)
            }}
          >
            <FaRegEdit style={{ color: '#2690d0' }} />
          </span>
        )
      })
    })
    setDataTable({
      ...dataTable,
      rows: tableValue
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const handleAdd = () => {
    let obj = {
        departmentName: department
    }
    PostDataWithToken('employee/create_department', obj).then(res => {
      if (res?.success) {
        toggle()
        getData()
        setDepartment('')
        toast(res?.message, { type: 'success' })
      } else {
        toast(res?.message, { type: 'error' })
      }
    })
  }

  const handleEdit = () => {
    let obj = {
        departmentName: department
      }
    PostDataWithToken(
      `employee/update_department/${departmentId?.id}`,
      obj
    ).then(res => {
      if (res?.success) {
        toggle()
        getData()
        toast(res?.message, { type: 'success' })
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
              <li className='item'>Department</li>
            </ol>
          </div>
          <div>
            <button className='btn btn-danger' onClick={() => navigate(-1)}>
              <span className='d-none d-md-block'>Back</span>
              <span className='d-block d-md-none'>
                <i className='fa fa-sign-out' aria-hidden='true'></i>
              </span>
            </button>
            <button
              className='btn btn-success'
              onClick={() => {
                setModal(true)
                setSlug('add')
              }}
              style={{ marginLeft: 5 }}
            >
              <span className='d-none d-md-block'>Add</span>
            </button>
          </div>
        </div>

       
        {/* Breadcrumb area end */}
        {/* page-content main section start */}

        <div className='row'>
          {/* New-Emp table start */}
          <div className='col-12'>
            <div className='card display-card'>
              <div className='card-body p-0'>
                <div className='text-center'>
                  {data?.length !== 0 ? (
                    <MDBDataTable
                    hover
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
                  ) : (
                    <p>No Record Found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* New-POS table end */}
        </div>
      </Layout>
      <Modal isOpen={modal} toggle={toggle} centered backdrop={true}>
        <ModalHeader>{slug === 'add' ? 'Add' : 'Edit'} Department</ModalHeader>
        <ModalBody>
          <input
            type='text'
            className='control-form form-select'
            placeholder='Department'
            onChange={e => setDepartment(e?.target?.value)}
            defaultValue={slug === 'edit' && departmentId?.department_name || ''}
          />
        </ModalBody>
        <ModalFooter>
          {slug === 'add' ? (
            <button className='btn btn-success' onClick={() => handleAdd()}>
              Add
            </button>
          ) : (
            <button className='btn btn-success' onClick={() => handleEdit()}>
              Edit
            </button>
          )}
        </ModalFooter>
      </Modal>
    </>
  )
}

export default Department
