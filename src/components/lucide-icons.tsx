import type { BoxProps } from '@mui/material';

import React from 'react';
import {
  X,
  Eye,
  Bell,
  Menu,
  Plus,
  User,
  Check,
  Clock,
  Share,
  Filter,
  LogOut,
  Search,
  Trash2,
  Upload,
  PenTool,
  Twitter,
  Facebook,
  FileText,
  Settings,
  ArrowLeft,
  RotateCcw,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  MoreVertical,
  ShoppingCart,
  Heart,
  Package,
  Truck,
  ShieldCheck,
  Headphones,
  Star,
  Minus,
  GitCompare,
  PackageX,
  MapPin,
  CreditCard,
  Wallet,
  Banknote,
  ThumbsUp,
  ChevronLeft,
  Grid3X3,
  List,
} from 'lucide-react';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const StyledIcon = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

// ----------------------------------------------------------------------

interface LucideIconProps extends BoxProps {
  icon: string;
  width?: number;
  height?: number;
}

// Icon mapping from Iconify to Lucide React
const iconMap: Record<string, React.ComponentType<any>> = {
  // Navigation
  'eva:arrow-back-fill': ArrowLeft,
  'eva:arrow-ios-back-fill': ArrowLeft,
  'eva:arrow-ios-forward-fill': ArrowRight,
  'eva:chevron-right-fill': ChevronRight,
  'carbon:chevron-sort': ChevronDown,
  
  // Actions
  'eva:plus-fill': Plus,
  'eva:close-fill': X,
  'eva:search-fill': Search,
  'eva:more-vertical-fill': MoreVertical,
  'eva:log-out-fill': LogOut,
  'eva:done-all-fill': Check,
  'eva:checkmark-fill': Check,
  'eva:eye-fill': Eye,
  'eva:file-text-outline': FileText,
  'eva:cloud-upload-fill': Upload,
  'eva:trash-2-fill': Trash2,
  
  // Solar icons
  'solar:user-bold-duotone': User,
  'solar:lock-password-bold-duotone': Settings,
  'solar:close-bold': X,
  'solar:check-circle-bold': CheckCircle,
  'solar:pen-bold': PenTool,
  'solar:trash-bin-trash-bold': Trash2,
  'solar:eye-bold': Eye,
  'solar:bell-bing-bold-duotone': Bell,
  'solar:clock-circle-outline': Clock,
  'solar:cart-3-bold': ShoppingCart,
  'solar:share-bold': Share,
  'solar:restart-bold': RotateCcw,
  
  // Mingcute icons
  'mingcute:add-line': Plus,
  'mingcute:close-line': X,
  
  // Other icons
  'ic:round-filter-list': Filter,
  'custom:menu-duotone': Menu,
  
  // Social icons
  'socials:twitter': Twitter,
  'socials:facebook': Facebook,
  'socials:google': Search, // Using Search as fallback for Google
  'socials:linkedin': Share, // Using Share as fallback for LinkedIn
  
  // Lucide icons (direct mapping)
  'lucide:search': Search,
  'lucide:heart': Heart,
  'lucide:shopping-cart': ShoppingCart,
  'lucide:user': User,
  'lucide:truck': Truck,
  'lucide:shield-check': ShieldCheck,
  'lucide:rotate-ccw': RotateCcw,
  'lucide:headphones': Headphones,
  'lucide:star': Star,
  'lucide:plus': Plus,
  'lucide:minus': Minus,
  'lucide:trash-2': Trash2,
  'lucide:arrow-left': ArrowLeft,
  'lucide:package': Package,
  'lucide:package-x': PackageX,
  'lucide:git-compare': GitCompare,
  'lucide:x': X,
  'lucide:filter': Filter,
  'lucide:check-circle': CheckCircle,
  'lucide:thumbs-up': ThumbsUp,
  'lucide:chevron-right': ChevronRight,
  'lucide:chevron-left': ChevronLeft,
  'lucide:map-pin': MapPin,
  'lucide:credit-card': CreditCard,
  'lucide:wallet': Wallet,
  'lucide:banknote': Banknote,
  'lucide:check': Check,
  'lucide:grid-3x3': Grid3X3,
  'lucide:list': List,
};

export function LucideIcon({ icon, width = 20, height, sx, ...other }: LucideIconProps) {
  const IconComponent = iconMap[icon];
  
  if (!IconComponent) {
    console.warn(`Icon "${icon}" not found in Lucide mapping`);
    return null;
  }
  
  return (
    <StyledIcon
      component={IconComponent}
      sx={{
        width,
        height: height || width,
        ...sx,
      }}
      {...other}
    />
  );
}

// Export both as LucideIcon and Iconify for compatibility
export { LucideIcon as Iconify };
