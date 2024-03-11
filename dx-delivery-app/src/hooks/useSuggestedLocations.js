import {useCallback, useEffect, useState} from 'react';
import {getSuggestedLocations} from '@api/shippings';
import useDebounce from './useDebounce';

const useSuggestedLocation = query => {
  const [result, setResult] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 500);

  const fetchSuggestions = useCallback(async () => {
    try {
      if (!debouncedQuery) {
        return;
      }
      setLoading(true);
      const suggestedLocations = await getSuggestedLocations(debouncedQuery);
      if (suggestedLocations.error) {
        throw suggestedLocations.error;
      }
      let results;
      if (suggestedLocations && suggestedLocations.length > 0) {
        // used for autocomplete component
        results = suggestedLocations.map(e => {
          return {...e, id: e.place_id, title: e.main_text};
        });
      }
      setResult(results);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  return {
    result,
    error,
    loading,
  };
};

export default useSuggestedLocation;
