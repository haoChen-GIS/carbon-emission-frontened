// src/components/common/SuccessSnackbar.jsx
import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/**
 * 通用成功提示组件
 * @param {boolean} open 是否显示
 * @param {function} onClose 关闭函数
 * @param {string} message 提示内容
 * @param {number} duration 自动关闭时间（毫秒），默认2000ms
 */
export default function SuccessSnackbar({
  open,
  onClose,
  message,
  duration = 2000,
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      message={message}
    >
      <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
