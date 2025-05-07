import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const getPasswordStrength = (password) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[\W_]/.test(password)) score++;

  if (score <= 2) return { label: "Weak", color: "red" };
  if (score === 3 || score === 4) return { label: "Medium", color: "orange" };
  return { label: "Strong", color: "green" };
};

const PasswordField = ({ label, name, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const strength = getPasswordStrength(value);

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        required
        fullWidth
        type={showPassword ? "text" : "password"}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete="new-password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {value.length > 0 && (
        <Typography
          variant="caption"
          sx={{ color: strength.color, ml: 1, mt: 0.5, display: "block" }}
        >
          Password Strength: {strength.label}
        </Typography>
      )}
    </Box>
  );
};

export default PasswordField;
