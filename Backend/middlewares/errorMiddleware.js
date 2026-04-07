const errorHandler = (err, req, res, next) => {
  console.error('API error:', err);

  if (res.headersSent) {
    return next(err);
  }

  if (err.name === 'MulterError') {
    return res.status(400).json({ message: err.message });
  }

  if (err.message === 'Only image files are allowed') {
    return res.status(400).json({ message: err.message });
  }

  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({ message: err.message || 'Server Error' });
};

export default errorHandler;
