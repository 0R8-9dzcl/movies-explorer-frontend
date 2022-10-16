import React from 'react';

const useWidth = () => {
  // стейт ширины
  const [width, setWidth] = React.useState(0);
  React.useEffect(() => {
    const handleWidthUpdate = () => {
      setWidth(window.innerWidth);
    };
    let resizeWidth;
    const resizeWidthTimer = setTimeout(() => !resizeWidth && handleWidthUpdate(), 1000);
    console.log('я обновился - вешайся');
    window.addEventListener('resize', resizeWidthTimer);
    return () => window.removeEventListener('resize', handleWidthUpdate);
  }, []);
  return width;
};

export default useWidth;
