import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Snackbar, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// // assets
// import EarningIcon from 'assets/images/icons/earning.svg';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));

const EarningCard = ({ isLoading }) => {
  const theme = useTheme();

  // const [anchorEl, setAnchorEl] = useState(null);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  const handleCopyToClipboard = (textToCopy) => {
    try {
      navigator.clipboard.writeText(textToCopy);
      setSnackbarOpen(true); // Show the snackbar on successful copy
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handlePasteFromClipboard = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      console.log('Pasted text:', clipboardText);
    } catch (error) {
      console.error('Error reading from clipboard:', error);
    }
  };

  // Dummy data (replace with actual data from your backend)
  const earningData = {
    balance: '₦500.00',
    accountName: 'John Doe',
    accountNumber: '1234567890',
    bankName: 'Example Bank'
  };

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Snackbar open={isSnackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
            <MuiAlert elevation={6} variant="filled" severity="success" onClose={handleSnackbarClose}>
              Account number copied successfully!
            </MuiAlert>
          </Snackbar>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Avatar
                      onClick={() => handleCopyToClipboard(earningData.accountNumber)}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        handlePasteFromClipboard();
                      }}
                      sx={{
                        cursor: 'pointer',
                        ...theme.typography.smallAvatar,
                        backgroundColor: theme.palette.secondary[200],
                        color: theme.palette.secondary.dark
                      }}
                    >
                      <ContentPasteIcon fontSize="inherit" />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>{earningData.balance}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 1.25 }}>
                <Typography sx={{ fontSize: '1rem', color: theme.palette.secondary[200] }}>
                  Account Name: {earningData.accountName}
                </Typography>
              </Grid>
              <Grid item sx={{ mb: 1.25 }}>
                <Typography sx={{ fontSize: '1rem', color: theme.palette.secondary[200] }}>
                  Account Number: {earningData.accountNumber}
                </Typography>
              </Grid>
              <Grid item sx={{ mb: 1.25 }}>
                <Typography sx={{ fontSize: '1rem', color: theme.palette.secondary[200] }}>Bank Name: {earningData.bankName}</Typography>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

EarningCard.propTypes = {
  isLoading: PropTypes.bool
};

export default EarningCard;
