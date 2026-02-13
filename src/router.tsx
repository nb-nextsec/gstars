import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout';
import { AdminLayout } from './components/admin';

// Public Pages
import { Home, OurClub, Programs, Social, PhotoGallery, Sponsors, ClubPolicies, Membership, ThursdayMeals, ShopApparel, PartnerWithUs, Contact, TermsOfService, CookiePolicy, PrivacyPolicy } from './pages';

// Admin Pages
import {
  Login,
  Dashboard,
  Events as AdminEvents,
  Sponsors as AdminSponsors,
  Images as AdminImages,
  Settings as AdminSettings,
} from './pages/admin';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'our-club', element: <OurClub /> },
      { path: 'programs', element: <Programs /> },
      { path: 'social', element: <Social /> },
      { path: 'photo-gallery', element: <PhotoGallery /> },
      { path: 'sponsors', element: <Sponsors /> },
      { path: 'club-policies', element: <ClubPolicies /> },
      { path: 'membership', element: <Membership /> },
      { path: 'thursday-meals', element: <ThursdayMeals /> },
      { path: 'shop-apparel', element: <ShopApparel /> },
      { path: 'partner-with-us', element: <PartnerWithUs /> },
      { path: 'contact', element: <Contact /> },
      { path: 'terms-of-service', element: <TermsOfService /> },
      { path: 'cookie-policy', element: <CookiePolicy /> },
      { path: 'privacy-policy', element: <PrivacyPolicy /> },
    ],
  },
  {
    path: '/admin/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'events', element: <AdminEvents /> },
      { path: 'sponsors', element: <AdminSponsors /> },
      { path: 'images', element: <AdminImages /> },
      { path: 'settings', element: <AdminSettings /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default router;
