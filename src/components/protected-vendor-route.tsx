import { Navigate } from 'react-router-dom';

import { useAuth } from 'src/contexts/AuthContext';
import { Preloader } from 'src/components/preloader';

// ----------------------------------------------------------------------

type ProtectedVendorRouteProps = {
  children: React.ReactNode;
};

export function ProtectedVendorRoute({ children }: ProtectedVendorRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Preloader isLoading onComplete={() => {}} />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/vendor/login" replace />;
  }

  return <>{children}</>;
}

