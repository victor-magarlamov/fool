import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function () {
  const [redirectTo, setRedirectTo] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (redirectTo) {
      history.push(redirectTo);
    }
  }, [redirectTo, history]);

  return setRedirectTo;
};
