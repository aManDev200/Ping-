import React, { useState } from 'react';
import { 
  Container, 
  TextField, 
  Typography, 
  Paper, 
  Button, 
  Box,
  Switch,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Avatar,
  Stack
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Person, Lock, Visibility, VisibilityOff, CameraAlt, Badge, Description } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducers/auth";
import { server } from "../constants/config";
import { usernameValidator } from "../utils/validators";

const theme = createTheme({
  palette: {
    primary: {
      main: '#8e24aa',
    },
    secondary: {
      main: '#ff9800',
    },
    background: {
      default: '#f3e5f5',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
});

const useInputValidation = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const changeHandler = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    if (validator) {
      const validationError = validator(inputValue);
      setError(validationError || "");
    }
  };

  return { value, changeHandler, error };
};

const useFileHandler = (type) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");

  const changeHandler = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError("");
    }
  };

  return { file, preview, changeHandler, error };
};

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");
  const avatar = useFileHandler("single");

  const dispatch = useDispatch();

  const toggleLogin = () => setIsLogin((prev) => !prev);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging In...");
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        { username: username.value, password: password.value },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Signing Up...");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
      );
      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(45deg, #f3e5f5 30%, #e1bee7 90%)',
        }}
      >
        <Container component="main" maxWidth="xs">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              elevation={10}
              sx={{
                padding: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
              }}
            >
              <Typography
                variant='h4'
                sx={{
                  mb: 3,
                  color: theme.palette.primary.main,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {isLogin ? 'Welcome Back' : 'Join Us'}
              </Typography>
              <Box component="form" noValidate onSubmit={isLogin ? handleLogin : handleSignUp} sx={{ mt: 1, width: '100%' }}>
                <AnimatePresence>
                  {!isLogin && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Stack position={"relative"} width={"10rem"} margin={"auto"} mb={2}>
                        <Avatar
                          sx={{
                            width: "10rem",
                            height: "10rem",
                            objectFit: "contain",
                          }}
                          src={avatar.preview}
                        />
                        <IconButton
                          sx={{
                            position: "absolute",
                            bottom: "0",
                            right: "0",
                            color: "white",
                            bgcolor: "rgba(0,0,0,0.5)",
                            ":hover": {
                              bgcolor: "rgba(0,0,0,0.7)",
                            },
                          }}
                          component="label"
                        >
                          <CameraAlt />
                          <input
                            hidden
                            accept="image/*"
                            type="file"
                            onChange={avatar.changeHandler}
                          />
                        </IconButton>
                      </Stack>
                      {avatar.error && (
                        <Typography color="error" variant="caption" textAlign="center" display="block" mb={2}>
                          {avatar.error}
                        </Typography>
                      )}
                      <TextField
                        fullWidth
                        label="Full Name"
                        margin="normal"
                        variant="outlined"
                        value={name.value}
                        onChange={name.changeHandler}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Badge color="primary" />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <TextField
                        fullWidth
                        label="Bio"
                        margin="normal"
                        variant="outlined"
                        value={bio.value}
                        onChange={bio.changeHandler}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Description color="primary" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                  error={!!username.error}
                  helperText={username.error}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isLoading}
                    sx={{ 
                      mt: 3, 
                      mb: 2,
                      height: '48px',
                      fontSize: '1rem',
                      textTransform: 'none',
                      borderRadius: '24px',
                      background: 'linear-gradient(45deg, #8e24aa 30%, #9c27b0 90%)',
                      boxShadow: '0 3px 5px 2px rgba(156, 39, 176, .3)',
                    }}
                  >
                    {isLogin ? 'Sign In' : 'Sign Up'}
                  </Button>
                </motion.div>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={!isLogin}
                        onChange={toggleLogin}
                        color="secondary"
                      />
                    }
                    label={
                      <Typography variant="body2" color="textSecondary">
                        {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
                      </Typography>
                    }
                  />
                </Box>
              </Box>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Login;