import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  // Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  // const customization = useSelector((state) => state.customization);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('123456');
  }, []);

  return (
    <Formik
      initialValues={{
        fname: '',
        lname: '',
        email: '',
        username: '',
        mobile: '',
        referralCode: '',
        password: '',
        confirmPassword: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        fname: Yup.string().required('First Name is required'),
        lname: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        username: Yup.string().required('Username is required'),
        mobile: Yup.string().required('Mobile number is required'),
        referralCode: Yup.string(),
        password: Yup.string().max(255).required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required')
      })}
      onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
        try {
          e.preventDefault();
          console.log('Form Values:', values);
          setStatus({ success: true });
          setSubmitting(false);

          if (onSubmit) {
            onSubmit(values);
          }
        } catch (err) {
          console.error(err);
          if (scriptedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
          <Grid container spacing={matchDownSM ? 0 : 2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                margin="normal"
                name="fname"
                type="text"
                value={values.fname}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{ ...theme.typography.customInput }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                margin="normal"
                name="lname"
                type="text"
                value={values.lname}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{ ...theme.typography.customInput }}
              />
            </Grid>
          </Grid>
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            name="username"
            type="text"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            required // Added the required attribute
            sx={{ ...theme.typography.customInput }}
          />
          <TextField
            fullWidth
            label="Mobile Number"
            margin="normal"
            name="mobile"
            type="text"
            value={values.mobile}
            onChange={handleChange}
            onBlur={handleBlur}
            required // Added the required attribute
            sx={{ ...theme.typography.customInput }}
          />
          <TextField
            fullWidth
            label="Referral Code"
            margin="normal"
            name="referralCode"
            type="text"
            value={values.referralCode}
            onChange={handleChange}
            onBlur={handleBlur}
            sx={{ ...theme.typography.customInput }}
          />
          <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
            <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email-register"
              type="email"
              value={values.email}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              inputProps={{}}
            />
            {touched.email && errors.email && (
              <FormHelperText error id="standard-weight-helper-text--register">
                {errors.email}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
            <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password-register"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              name="password"
              label="Password"
              onBlur={handleBlur}
              onChange={(e) => {
                handleChange(e);
                changePassword(e.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="large"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              inputProps={{}}
            />
            {touched.password && errors.password && (
              <FormHelperText error id="standard-weight-helper-text-password-register">
                {errors.password}
              </FormHelperText>
            )}
          </FormControl>

          {strength !== 0 && (
            <FormControl fullWidth>
              <Box sx={{ mb: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" fontSize="0.75rem">
                      {level?.label}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </FormControl>
          )}

          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                }
                label={
                  <Typography variant="subtitle1">
                    Agree with &nbsp;
                    <Typography variant="subtitle1" component={Link} to="#">
                      Terms & Condition.
                    </Typography>
                  </Typography>
                }
              />
            </Grid>
          </Grid>
          {errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}

          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                Sign up
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default FirebaseRegister;
