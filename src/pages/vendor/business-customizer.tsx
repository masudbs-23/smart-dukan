import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import type { Theme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import { Icon } from '@iconify/react';

import { useBusiness } from 'src/contexts/BusinessContext';
import {
  updateBusinessDraft,
  publishBusinessChanges,
  discardDraftChanges,
  getDraftBusinessSettings,
  type Business,
  type BusinessSettings,
} from 'src/_mock/_businesses';
import { useSnackbar } from 'src/components/snackbar';

// ----------------------------------------------------------------------

export default function BusinessCustomizerPage() {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const { selectedBusiness } = useBusiness();
  const [showPreview, setShowPreview] = useState(false);
  const [draftBusiness, setDraftBusiness] = useState<Business | null>(null);

  // Initialize draft from selected business
  useEffect(() => {
    if (selectedBusiness) {
      const draft = getDraftBusinessSettings(selectedBusiness);
      setDraftBusiness(draft);
    }
  }, [selectedBusiness]);

  if (!selectedBusiness || !draftBusiness) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">Please select a business first</Alert>
      </Box>
    );
  }

  const handleFieldChange = (field: keyof BusinessSettings, value: any) => {
    setDraftBusiness((prev) => {
      if (!prev) return prev;
      return { ...prev, [field]: value };
    });
  };

  const handleThemeChange = (colorField: string, value: string) => {
    setDraftBusiness((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        theme: { ...prev.theme, [colorField]: value },
      };
    });
  };

  const handleContactChange = (field: string, value: string) => {
    setDraftBusiness((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        contact: { ...prev.contact, [field]: value },
      };
    });
  };

  const handleSaveDraft = () => {
    if (!selectedBusiness || !draftBusiness) return;

    const draftSettings: Partial<BusinessSettings> = {
      name: draftBusiness.name,
      logo: draftBusiness.logo,
      description: draftBusiness.description,
      theme: draftBusiness.theme,
      contact: draftBusiness.contact,
      social: draftBusiness.social,
      settings: draftBusiness.settings,
    };

    updateBusinessDraft(selectedBusiness.id, draftSettings);
    showSnackbar('Draft saved successfully!', 'success');
  };

  const handlePublish = () => {
    if (!selectedBusiness) return;

    // First save draft
    handleSaveDraft();

    // Then publish
    publishBusinessChanges(selectedBusiness.id);
    showSnackbar('Changes published successfully!', 'success');
    
    // Reload to reflect changes
    window.location.reload();
  };

  const handleDiscard = () => {
    if (!selectedBusiness) return;

    discardDraftChanges(selectedBusiness.id);
    const draft = getDraftBusinessSettings(selectedBusiness);
    setDraftBusiness(draft);
    showSnackbar('Draft discarded', 'info');
  };

  const previewUrl = `/${selectedBusiness.slug}`;

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box
        sx={{
          p: 3,
          bgcolor: 'background.paper',
          borderBottom: (theme: Theme) => `1px solid ${alpha(theme.palette.grey[500], 0.12)}`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h4">Customize Your Business</Typography>
            <Typography variant="body2" color="text.secondary">
              Edit your business design and preview changes in real-time
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            {selectedBusiness.draft && (
              <Chip label="Unsaved Changes" color="warning" size="small" />
            )}
            {selectedBusiness.isPublished && (
              <Chip label="Published" color="success" size="small" />
            )}
            <IconButton onClick={() => setShowPreview(!showPreview)} color="primary">
              <Box sx={{ display: 'flex', color: 'inherit' }}>
                <Icon icon={showPreview ? 'solar:eye-closed-bold' : 'solar:eye-bold'} width={24} />
              </Box>
            </IconButton>
          </Stack>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'row' }}>
        {/* Left Side - Controls */}
        <Box
          sx={{
            width: showPreview ? '50%' : '100%',
            height: '100%',
            overflow: 'auto',
            borderRight: showPreview
              ? (theme: Theme) => `1px solid ${alpha(theme.palette.grey[500], 0.12)}`
              : 'none',
            transition: 'width 0.3s ease',
          }}
        >
          <Box sx={{ p: 3 }}>
              <Stack spacing={3}>
                {/* General Settings */}
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      General Information
                    </Typography>
                    <Stack spacing={2}>
                      <TextField
                        fullWidth
                        label="Business Name"
                        value={draftBusiness.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                      />
                      <TextField
                        fullWidth
                        label="Description"
                        multiline
                        rows={3}
                        value={draftBusiness.description}
                        onChange={(e) => handleFieldChange('description', e.target.value)}
                      />
                      <TextField
                        fullWidth
                        label="Tagline"
                        value={draftBusiness.settings.tagline}
                        onChange={(e) =>
                          handleFieldChange('settings', {
                            ...draftBusiness.settings,
                            tagline: e.target.value,
                          })
                        }
                      />
                    </Stack>
                  </CardContent>
                </Card>

                {/* Theme Colors */}
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Theme Colors
                    </Typography>
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Primary Color
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                          <input
                            type="color"
                            value={draftBusiness.theme.primaryColor}
                            onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
                            style={{ width: 60, height: 40, borderRadius: 4, cursor: 'pointer' }}
                          />
                          <TextField
                            size="small"
                            value={draftBusiness.theme.primaryColor}
                            onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
                          />
                        </Box>
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Secondary Color
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                          <input
                            type="color"
                            value={draftBusiness.theme.secondaryColor}
                            onChange={(e) => handleThemeChange('secondaryColor', e.target.value)}
                            style={{ width: 60, height: 40, borderRadius: 4, cursor: 'pointer' }}
                          />
                          <TextField
                            size="small"
                            value={draftBusiness.theme.secondaryColor}
                            onChange={(e) => handleThemeChange('secondaryColor', e.target.value)}
                          />
                        </Box>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Contact Information
                    </Typography>
                    <Stack spacing={2}>
                      <TextField
                        fullWidth
                        label="Email"
                        value={draftBusiness.contact.email}
                        onChange={(e) => handleContactChange('email', e.target.value)}
                      />
                      <TextField
                        fullWidth
                        label="Phone"
                        value={draftBusiness.contact.phone}
                        onChange={(e) => handleContactChange('phone', e.target.value)}
                      />
                      <TextField
                        fullWidth
                        label="Address"
                        multiline
                        rows={2}
                        value={draftBusiness.contact.address}
                        onChange={(e) => handleContactChange('address', e.target.value)}
                      />
                    </Stack>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <Card>
                  <CardContent>
                    <Stack spacing={2}>
                      <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        startIcon={
                          <Box sx={{ display: 'flex' }}>
                            <Icon icon="solar:check-circle-bold" width={20} />
                          </Box>
                        }
                        onClick={handlePublish}
                      >
                        Publish Changes
                      </Button>
                      <Button
                        fullWidth
                        variant="outlined"
                        size="large"
                        startIcon={
                          <Box sx={{ display: 'flex' }}>
                            <Icon icon="solar:save-bold" width={20} />
                          </Box>
                        }
                        onClick={handleSaveDraft}
                      >
                        Save as Draft
                      </Button>
                      <Button
                        fullWidth
                        variant="text"
                        color="error"
                        startIcon={
                          <Box sx={{ display: 'flex' }}>
                            <Icon icon="solar:trash-bin-bold" width={20} />
                          </Box>
                        }
                        onClick={handleDiscard}
                      >
                        Discard Draft
                      </Button>
                      <Divider />
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={
                          <Box sx={{ display: 'flex' }}>
                            <Icon icon="solar:eye-bold" width={20} />
                          </Box>
                        }
                        onClick={() => window.open(previewUrl, '_blank')}
                      >
                        Open Customer Preview in New Tab
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Box>
          </Box>

        {/* Right Side - Preview */}
        {showPreview && (
          <Box
            sx={{
              width: '50%',
              height: '100%',
              overflow: 'hidden',
              bgcolor: (theme: Theme) => alpha(theme.palette.grey[500], 0.04),
              display: 'flex',
              flexDirection: 'column',
            }}
          >
                <Box
                  sx={{
                    p: 2,
                    bgcolor: 'background.paper',
                    borderBottom: (theme: Theme) => `1px solid ${alpha(theme.palette.grey[500], 0.12)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    Customer Preview
                  </Typography>
                  <Button
                    size="small"
                    startIcon={
                      <Box sx={{ display: 'flex' }}>
                        <Icon icon="solar:refresh-bold" width={16} />
                      </Box>
                    }
                    onClick={() => window.location.reload()}
                  >
                    Refresh
                  </Button>
                </Box>
                <Box sx={{ flex: 1, overflow: 'hidden' }}>
                  <iframe
                    src={previewUrl}
                    title="Business Preview"
                    style={{
                      width: '100%',
                      height: '100%',
                      border: 'none',
                    }}
                  />
                </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

