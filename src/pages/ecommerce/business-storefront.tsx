import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';

import { getBusinessBySlug, getEffectiveBusinessSettings } from 'src/_mock/_businesses';
import { useBusiness } from 'src/contexts/BusinessContext';

import HomePage from './home';

// ----------------------------------------------------------------------

export default function BusinessStorefront() {
  const { businessSlug } = useParams<{ businessSlug: string }>();
  const { setSelectedBusiness } = useBusiness();

  useEffect(() => {
    if (businessSlug) {
      const business = getBusinessBySlug(businessSlug);
      if (business) {
        // Apply published settings if available, otherwise use default
        const effectiveBusiness = getEffectiveBusinessSettings(business);
        setSelectedBusiness(effectiveBusiness);
        
        // Store in localStorage
        localStorage.setItem('selectedBusinessId', business.id);
      }
    }
  }, [businessSlug, setSelectedBusiness]);

  // Check if business exists
  const business = businessSlug ? getBusinessBySlug(businessSlug) : null;

  if (!business) {
    return <Navigate to="/404" replace />;
  }

  // Render the home page with the selected business context
  return <HomePage />;
}

