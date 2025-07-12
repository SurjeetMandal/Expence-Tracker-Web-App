import React from 'react'
import Header from '../../components/Landing/Header'
import Footer from '../../components/Landing/Footer'
import FeaturePage from '../../components/Landing/FeaturePage'

const LandingPage = () => {
  return (
    <div className='min-h-screen' style={{
        background: 'radial-gradient(circle at top left, #FEF9FF, #F2F8FF, #F5F0FF, rgba(135, 92, 245, 0.08))'
      }}>
      <Header />
      <FeaturePage />
      <Footer />
    </div>
  )
}

export default LandingPage
