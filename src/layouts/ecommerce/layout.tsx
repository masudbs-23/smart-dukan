import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import Box from '@mui/material/Box';

import { Header } from './header';
import { Footer } from './footer';

// ----------------------------------------------------------------------

export type LayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  headerLayoutQuery?: Breakpoint;
};

export function EcommerceLayout({ sx, children, headerLayoutQuery = 'md' }: LayoutProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header layoutQuery={headerLayoutQuery} />
      
      <Box
        component="main"
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          ...sx,
        }}
      >
        {children}
      </Box>

      <Footer />
    </Box>
  );
}

