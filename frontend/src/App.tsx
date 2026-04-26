import { Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import HowItWorks from './pages/HowItWorks'
import Plans from './pages/Plans'
import Testimonials from './pages/Testimonials'
import Faq from './pages/Faq'
import GetStarted from './pages/GetStarted'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
