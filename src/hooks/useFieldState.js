import { useEffect, useState } from 'react';

export default function useFieldState(initialValue) {
  const [input, setInput] = useState(initialValue);
  const [error, setError] = useState('');
  useEffect(() => {
    setError('');
  }, [input]);
  return [input, setInput, error, setError];
}