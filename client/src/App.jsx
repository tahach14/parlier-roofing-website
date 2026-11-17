import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import OurWorks from './pages/OurWorks'
import Gallery from './pages/Gallery'
import Services from './pages/Services'
import Contact from './pages/Contact'
import { LanguageProvider } from './context/LanguageContext'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <LanguageProvider>
       <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/our-works" element={<OurWorks />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </LanguageProvider>
  )
}
