export const successResponse = (res, statusCode, data) => {
  return res.status(statusCode).json({
    success: true,
    data: data,
  });
};

export const errorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    error: {
      message: message,
      statusCode: statusCode,
    },
  });
};
