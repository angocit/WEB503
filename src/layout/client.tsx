import React from 'react'
import ClientHeader from '../components/client/header'
import ClientFooter from '../components/client/footer'
import { Outlet } from 'react-router-dom'

const ClientLayout = () => {
  return (
    <>
        <ClientHeader/>
        <Outlet/>
        <ClientFooter/>
    </>
  )
}

export default ClientLayout