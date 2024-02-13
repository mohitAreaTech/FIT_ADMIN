import React from 'react'
import { useLocation, Link } from 'react-router-dom'

const UtilitySidebar = () => {
  const location = useLocation()
  const PermissionLinks = ['/designations', '/roles', '/department']

  const checkUtilitySideBarActive = () => {
    let check = PermissionLinks.includes(location.pathname)
    if (check) {
      return true
    } else {
      return false
    }
  }
  const checkAddDesignationSideBarActive = () => {
    let check = location.pathname
    if (check == '/designations') {
      return true
    } else {
      return false
    }
  }
  const checkRolesActive = () => {
    let check = location.pathname
    if (check == '/roles') {
      return true
    } else {
      return false
    }
  }

  const checkDepartmentActive = () => {
    let check = location.pathname
    if (check == '/department') {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      <li className='nav-item nav-item-2' aria-expanded='false'>
        <a
          href='javascript:void(0)'
          className={
            checkUtilitySideBarActive() === true
              ? 'collapsed-nav-link nav-link active'
              : 'collapsed-nav-link nav-link'
          }
        >
          <span className='nav-icon'>
            <img src={'./assets/img/utility.png'} alt='Employee Desk' />
          </span>
          <span className='nav-title'>Utility</span>
        </a>
        <ul
          className='sidemenu-nav-second-level mm-collapse'
          style={
            checkUtilitySideBarActive() === true
              ? { display: 'block' }
              : { display: 'none' }
          }
        >
          <li className='nav-item'>
            <Link
              to='/designations'
              className={
                checkAddDesignationSideBarActive() === true
                  ? 'nav-link active'
                  : 'nav-link'
              }
            >
              <span className='nav-title'>Designations</span>
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/roles'
              className={
                checkRolesActive() === true ? 'nav-link active' : 'nav-link'
              }
            >
              <span className='nav-title'>Roles</span>
            </Link>
          </li>

          <li className='nav-item'>
            <Link
              to='/department'
              className={
                checkDepartmentActive() === true
                  ? 'nav-link active'
                  : 'nav-link'
              }
            >
              <span className='nav-title'>Department</span>
            </Link>
          </li>
        </ul>
      </li>
    </>
  )
}

export default UtilitySidebar
