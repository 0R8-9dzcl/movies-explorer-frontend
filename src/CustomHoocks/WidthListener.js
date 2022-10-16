import React from 'react';

const useWidth = () => {
  // стейт ширины
  const [width, setWidth] = React.useState(window.innerWidth);
  React.useLayoutEffect(() => {
    const handleWidthUpdate = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWidthUpdate);
    return () => window.removeEventListener('resize', handleWidthUpdate);
  }, []);
  return width;
};

export default useWidth;
