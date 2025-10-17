import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import { Icon } from '@iconify/react';

import { useBusiness } from 'src/contexts/BusinessContext';
import type { Business } from 'src/_mock/_businesses';

// ----------------------------------------------------------------------

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function BusinessSettingsPage() {
  const { selectedBusiness } = useBusiness();
  const [tabValue, setTabValue] = useState(0);
  const [saveMessage, setSaveMessage] = useState('');
  
  // Form states
  const [businessData, setBusinessData] = useState<Business | null>(null);

  useEffect(() => {
    if (selectedBusiness) {
      setBusinessData({ ...selectedBusiness });
    }
  }, [selectedBusiness]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSave = () => {
    // In real app, this would call an API to save
    setSaveMessage('Settings saved successfully! (Demo - changes not persisted)');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  if (!businessData) {
    return (
      <Card>
        <CardContent sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No Business Selected
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Business Settings
      </Typography>

      {saveMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {saveMessage}
        </Alert>
      )}

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="General" icon={<Icon icon="solar:settings-bold" width={20} />} iconPosition="start" />
            <Tab label="Header & Footer" icon={<Icon icon="solar:layers-bold" width={20} />} iconPosition="start" />
            <Tab label="Theme Colors" icon={<Icon icon="solar:palette-bold" width={20} />} iconPosition="start" />
            <Tab label="Contact Info" icon={<Icon icon="solar:phone-bold" width={20} />} iconPosition="start" />
          </Tabs>
        </Box>

        <CardContent>
          {/* General Settings */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Business Name"
                  value={businessData.name}
                  onChange={(e) => setBusinessData({ ...businessData, name: e.target.value })}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Tagline"
                  value={businessData.settings.tagline}
                  onChange={(e) =>
                    setBusinessData({
                      ...businessData,
                      settings: { ...businessData.settings, tagline: e.target.value },
                    })
                  }
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  value={businessData.description}
                  onChange={(e) =>
                    setBusinessData({ ...businessData, description: e.target.value })
                  }
                />
              </Grid>
            </Grid>
          </TabPanel>

          {/* Header & Footer */}
          <TabPanel value={tabValue} index={1}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Header Settings
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Customize how your business appears in the header
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Business Name (Header)"
                  value={businessData.name}
                  onChange={(e) => setBusinessData({ ...businessData, name: e.target.value })}
                  helperText="This will be displayed in the header"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Header Tagline"
                  value={businessData.settings.tagline}
                  onChange={(e) =>
                    setBusinessData({
                      ...businessData,
                      settings: { ...businessData.settings, tagline: e.target.value },
                    })
                  }
                  helperText="Short tagline shown below business name"
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" sx={{ mb: 2 }}>
              Footer Settings
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Customize your footer content
            </Typography>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Footer Description"
                  value={businessData.description}
                  onChange={(e) =>
                    setBusinessData({ ...businessData, description: e.target.value })
                  }
                  helperText="Description shown in footer"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Footer Copyright Text"
                  value={businessData.settings.footerText}
                  onChange={(e) =>
                    setBusinessData({
                      ...businessData,
                      settings: { ...businessData.settings, footerText: e.target.value },
                    })
                  }
                  helperText="Copyright text at bottom of footer"
                />
              </Grid>
            </Grid>
          </TabPanel>

          {/* Theme Colors */}
          <TabPanel value={tabValue} index={2}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Choose colors that represent your brand
            </Typography>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Primary Color
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 1,
                        bgcolor: businessData.theme.primaryColor,
                        border: '1px solid rgba(0,0,0,0.12)',
                      }}
                    />
                    <TextField
                      fullWidth
                      value={businessData.theme.primaryColor}
                      onChange={(e) =>
                        setBusinessData({
                          ...businessData,
                          theme: { ...businessData.theme, primaryColor: e.target.value },
                        })
                      }
                      helperText="Used for buttons, links"
                    />
                  </Box>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Secondary Color
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 1,
                        bgcolor: businessData.theme.secondaryColor,
                        border: '1px solid rgba(0,0,0,0.12)',
                      }}
                    />
                    <TextField
                      fullWidth
                      value={businessData.theme.secondaryColor}
                      onChange={(e) =>
                        setBusinessData({
                          ...businessData,
                          theme: { ...businessData.theme, secondaryColor: e.target.value },
                        })
                      }
                      helperText="Secondary accents"
                    />
                  </Box>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Accent Color
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 1,
                        bgcolor: businessData.theme.accentColor,
                        border: '1px solid rgba(0,0,0,0.12)',
                      }}
                    />
                    <TextField
                      fullWidth
                      value={businessData.theme.accentColor}
                      onChange={(e) =>
                        setBusinessData({
                          ...businessData,
                          theme: { ...businessData.theme, accentColor: e.target.value },
                        })
                      }
                      helperText="Highlights, badges"
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Contact Info */}
          <TabPanel value={tabValue} index={3}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Contact information displayed in footer
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={businessData.contact.email}
                  onChange={(e) =>
                    setBusinessData({
                      ...businessData,
                      contact: { ...businessData.contact, email: e.target.value },
                    })
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={businessData.contact.phone}
                  onChange={(e) =>
                    setBusinessData({
                      ...businessData,
                      contact: { ...businessData.contact, phone: e.target.value },
                    })
                  }
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Address"
                  multiline
                  rows={2}
                  value={businessData.contact.address}
                  onChange={(e) =>
                    setBusinessData({
                      ...businessData,
                      contact: { ...businessData.contact, address: e.target.value },
                    })
                  }
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" sx={{ mb: 2 }}>
              Social Media Links
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Facebook URL"
                  value={businessData.social.facebook || ''}
                  onChange={(e) =>
                    setBusinessData({
                      ...businessData,
                      social: { ...businessData.social, facebook: e.target.value },
                    })
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Twitter URL"
                  value={businessData.social.twitter || ''}
                  onChange={(e) =>
                    setBusinessData({
                      ...businessData,
                      social: { ...businessData.social, twitter: e.target.value },
                    })
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Instagram URL"
                  value={businessData.social.instagram || ''}
                  onChange={(e) =>
                    setBusinessData({
                      ...businessData,
                      social: { ...businessData.social, instagram: e.target.value },
                    })
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="LinkedIn URL"
                  value={businessData.social.linkedin || ''}
                  onChange={(e) =>
                    setBusinessData({
                      ...businessData,
                      social: { ...businessData.social, linkedin: e.target.value },
                    })
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="YouTube URL"
                  value={businessData.social.youtube || ''}
                  onChange={(e) =>
                    setBusinessData({
                      ...businessData,
                      social: { ...businessData.social, youtube: e.target.value },
                    })
                  }
                />
              </Grid>
            </Grid>
          </TabPanel>

          {/* Save Button */}
          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => setBusinessData(selectedBusiness ? { ...selectedBusiness } : null)}
            >
              Cancel
            </Button>
            <Button variant="contained" size="large" onClick={handleSave}>
              Save Changes
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

