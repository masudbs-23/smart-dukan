import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

import type { Business } from '../_mock/_businesses';
import { getUserBusinesses, getBusinessById } from '../_mock/_businesses';

interface BusinessContextType {
  selectedBusiness: Business | null;
  userBusinesses: Business[];
  selectBusiness: (businessId: string) => void;
  setSelectedBusiness: (business: Business | null) => void;
  isBusinessSelectorOpen: boolean;
  openBusinessSelector: () => void;
  closeBusinessSelector: () => void;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
};

interface BusinessProviderProps {
  children: ReactNode;
}

export const BusinessProvider = ({ children }: BusinessProviderProps) => {
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [userBusinesses, setUserBusinesses] = useState<Business[]>([]);
  const [isBusinessSelectorOpen, setIsBusinessSelectorOpen] = useState(false);

  // Initialize business data and listen for auth changes
  useEffect(() => {
    const checkBusinessData = () => {
      const storedBusinessId = localStorage.getItem('selectedBusinessId');
      const userData = localStorage.getItem('userData');
      const authToken = localStorage.getItem('authToken');

      if (userData && authToken) {
        try {
          const user = JSON.parse(userData);
          const businesses = getUserBusinesses(user.email);
          setUserBusinesses(businesses);

          // If there's a stored business, select it
          if (storedBusinessId) {
            const business = getBusinessById(storedBusinessId);
            if (business && businesses.some(b => b.id === business.id)) {
              setSelectedBusiness(business);
            } else {
              // Stored business not valid for this user, open selector
              localStorage.removeItem('selectedBusinessId');
              if (businesses.length > 0) {
                setIsBusinessSelectorOpen(true);
              }
            }
          }
          // If no business is selected but user has businesses, open selector
          else if (businesses.length > 0) {
            setIsBusinessSelectorOpen(true);
          }
        } catch (error) {
          console.error('Error loading business data:', error);
        }
      } else {
        // User logged out, clear business data
        setSelectedBusiness(null);
        setUserBusinesses([]);
        setIsBusinessSelectorOpen(false);
      }
    };

    // Check on mount
    checkBusinessData();

    // Listen for storage changes (e.g., from login in another tab or after login)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'userData' || e.key === 'authToken') {
        checkBusinessData();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also check periodically for same-tab changes (e.g., right after login)
    const intervalId = setInterval(checkBusinessData, 500);

    // Cleanup after 5 seconds (to catch post-login changes)
    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
    }, 5000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  const selectBusiness = (businessId: string) => {
    const business = getBusinessById(businessId);
    if (business) {
      setSelectedBusiness(business);
      localStorage.setItem('selectedBusinessId', businessId);
      setIsBusinessSelectorOpen(false);
    }
  };

  const openBusinessSelector = () => {
    setIsBusinessSelectorOpen(true);
  };

  const closeBusinessSelector = () => {
    // Only close if a business is already selected
    if (selectedBusiness) {
      setIsBusinessSelectorOpen(false);
    }
  };

  const value: BusinessContextType = {
    selectedBusiness,
    userBusinesses,
    selectBusiness,
    setSelectedBusiness,
    isBusinessSelectorOpen,
    openBusinessSelector,
    closeBusinessSelector,
  };

  return <BusinessContext.Provider value={value}>{children}</BusinessContext.Provider>;
};

