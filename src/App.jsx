import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'

// Pages secondaires chargées à la demande pour alléger le premier affichage.
const Buy = lazy(() => import('./pages/Buy'))
const Rent = lazy(() => import('./pages/Rent'))
const Sell = lazy(() => import('./pages/Sell'))
const SearchResults = lazy(() => import('./pages/SearchResults'))
const PropertyDetails = lazy(() => import('./pages/PropertyDetails'))
const Agency = lazy(() => import('./pages/Agency'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Contact = lazy(() => import('./pages/Contact'))
const Estimate = lazy(() => import('./pages/Estimate'))
const Favorites = lazy(() => import('./pages/Favorites'))
const Faq = lazy(() => import('./pages/Faq'))
const Legal = lazy(() => import('./pages/Legal'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Simulator = lazy(() => import('./pages/Simulator'))
const Compare = lazy(() => import('./pages/Compare'))

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-label="Chargement de la page">
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-coral" />
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="acheter" element={<Buy />} />
          <Route path="louer" element={<Rent />} />
          <Route path="vendre" element={<Sell />} />
          <Route path="recherche" element={<SearchResults />} />
          <Route path="biens/:slug" element={<PropertyDetails />} />
          <Route path="agence" element={<Agency />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="contact" element={<Contact />} />
          <Route path="estimation" element={<Estimate />} />
          <Route path="favoris" element={<Favorites />} />
          <Route path="faq" element={<Faq />} />
          <Route path="simulateur" element={<Simulator />} />
          <Route path="comparer" element={<Compare />} />
          <Route path="mentions-legales" element={<Legal page="mentions" />} />
          <Route path="confidentialite" element={<Legal page="confidentialite" />} />
          <Route path="cookies" element={<Legal page="cookies" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
