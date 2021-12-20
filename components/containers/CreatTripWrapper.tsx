import { ReactChild, ReactChildren, useEffect } from 'react';

interface CreateTripWrapper {
  children: ReactChild | ReactChildren;
}

const CreateTripWrapper = ({ children }: CreateTripWrapper) => {
  const browserTabcloseHandler = (e: any) => {
    e.preventDefault();
    e.returnValue = '';
  };

  useEffect(() => {
    window.onbeforeunload = browserTabcloseHandler;
    return () => {
      if (window) {
        window.onbeforeunload = null;
      }
    };
  }, []);

  return <>{children}</>;
};

export default CreateTripWrapper;
