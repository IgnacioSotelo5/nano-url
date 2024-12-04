import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { RequireAuth } from './RequiereAuth'
import ProtectedRoutes from './ProtectedRoutes'

const Home = lazy(() => import('@/pages/Home/Home'))
const Links = lazy(() => import('@/pages/Links/LinksContainer'))
const CreateQRCodePage = lazy(() => import('@/pages/QRCodes/CreateQRCodePage.tsx'))
const LinkInBio = lazy(() => import('@/pages/LinkInBio/LinkInBio'))
const Login = lazy(() => import('@/pages/Login/Login'))
const Register = lazy(() => import('@/pages/Register/Register'))
const OnboardingProfile = lazy(() => import('@/pages/Onboarding/Onboarding'))
const ProfileImageUpload = lazy(() => import('@/pages/Onboarding/ProfileImageUpload'))
const LinkDetail = lazy(() => import('@/pages/Links/components/LinkDetail'))
const FormLink = lazy(() => import('@/pages/Links/CreateLinkPage'))
const Error = lazy(() => import('@/pages/Error/Error'))
const EditLinkPage = lazy(() => import('@/pages/Links/EditLinkPage'))
const QrCodeContainer = lazy(() => import('@/pages/QRCodes/QRCodesContainer'))
const QrCodeDetail = lazy(() => import('@/pages/QRCodes/components/QRCodeDetail'))
const EditQRPage = lazy(() => import('@/pages/QRCodes/EditQRPage'))
const CustomizePage = lazy(() => import('@/pages/QRCodes/CustomizeCodePage'))

export function AppRoutes ({ isLogged }: {isLogged: boolean | null}) {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/onboarding' element={<OnboardingProfile />} />
        <Route path='/onboarding/profile-image' element={<ProfileImageUpload />} />
        <Route path='*' element={<Error />} />
        <Route element={<RequireAuth isLogged={isLogged} />}>
          <Route element={<ProtectedRoutes />}>
              <Route path='/' element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/links' element={<Links />} />
              <Route path='/links/create' element={<FormLink />} />
              <Route path='/links/details/:shortUrl' element={<LinkDetail />} />
              <Route path='/links/:shortUrl/edit' element={<EditLinkPage />} />
              <Route path='/qr-codes' element={<QrCodeContainer />} />
              <Route path='/qr-codes/create' element={<CreateQRCodePage />} />
              <Route path='/qr-codes/:shortUrl/details' element={<QrCodeDetail />} />
              <Route path='/qr-codes/:shortUrl/edit' element={<EditQRPage />} />
              <Route path='/qr-codes/:shortUrl/customize' element={<CustomizePage />} />
              <Route path='/pages' element={<LinkInBio />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  )
}
