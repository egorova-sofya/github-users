import React, { useState } from 'react';
import CustomError from '../CustomError/CustomError';

const Loading = () => {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 10000);
  return isLoading ? <p style={{ margin: '20px' }}>Loading...</p> : <CustomError />;
};

export default Loading;
