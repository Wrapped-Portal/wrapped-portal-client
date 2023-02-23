/** @format */

import axios from 'axios';

const searchMiddleware = (store) => (next) => async (action) => {
  if (action.type === 'search/getResults') {
    const token = store.getState().login.token.accessToken;
    const queryString = action.payload;
    try {
      const searchResponse = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URI
        }search?token=${token}&search=${queryString}`,
      );
      const results = searchResponse.data;
      const newAction = {
        type: 'search/getResults',
        results,
      };
      next(newAction);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }
  return next(action);
};

export default searchMiddleware;
