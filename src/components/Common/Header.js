import React, { useState, useEffect } from 'react'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import cookie from 'react-cookies'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userDetails } from '../../store/actions/userActions'

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [dropdownOpen1, setDropdownOpen1] = useState(false)
  const [callApi, setCallApi] = useState(true)
  const [notification, setNotification] = useState([])
  const toggle = () => setDropdownOpen(prevState => !prevState)
  const toggle1 = () => setDropdownOpen1(prevState => !prevState)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutUser = () => {
    cookie.remove('userDetails')
    cookie.remove('token')
    dispatch(userDetails({}))
    navigate('/')
  }

  const profileImg = useSelector(
    state => state?.root?.userDetails?.profile_piture
  )
  const userName = useSelector(state => state?.root?.userDetails?.name)

  // useEffect(() => {
  //   if (callApi) {
  //     getNotification().then((response) => {
  //       if (response.status == true) {
  //         // console.log("noti", response.data);
  //         setNotification(response.data);
  //         setCallApi(false);
  //       }
  //       setCallApi(false);
  //     });
  //   }
  //   console.log('profile picture:-',profileImg)
  // }, [callApi]);

  return (
    <>
      {/* page-content nav start */}
      <nav className='navbar top-navbar navbar-expand top-sticky'>
        <div className='collapse navbar-collapse' id='navbarSupporttoggle'>
          <div className='burger-toggle-responsive d-block d-xl-none'>
            <span className='top-line' />
            <span className='middle-line' />
            <span className='bottom-line' />
          </div>

          {/* right-side navbar start */}
          <ul className='navbar-nav right-nav align-items-center ms-auto'>
            <li className='nav-item profile-nav-item'>
              <Dropdown isOpen={dropdownOpen1} toggle={toggle1}>
                <DropdownToggle className='nav-link dropdown-toggle'>
                  <div className='menu-profile'>
                    <span className='name d-none d-md-inline-block'>
                      Hi! {userName}
                    </span>
                    {profileImg == null ? (
                      <img
                        src='./assets/img/user-default.png'
                        className='rounded-circle'
                        alt='image'
                      />
                    ) : (
                      <img
                        src={profileImg}
                        className='rounded-circle'
                        alt='image'
                      />
                    )}
                  </div>
                </DropdownToggle>
                <DropdownMenu>
                  <Link to='/profile' className='text-dark'>
                    <DropdownItem>Profile</DropdownItem>
                  </Link>
                  <DropdownItem>
                    <Link to='/change-password' className='text-dark'>
                      Change Password
                    </Link>
                  </DropdownItem>
                  <DropdownItem onClick={() => logoutUser()}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>
          </ul>
          {/* right-side navbar end */}
        </div>
      </nav>
      {/* page-content nav end */}
    </>
  )
}

export default Header
