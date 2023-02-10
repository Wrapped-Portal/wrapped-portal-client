/** @format */

const getToken = (store) => (next) => async (action) => {
  if (action.type === 'login/storeToken') {
    try {
      console.log(action.payload.code);
      const results = await axios.get(import.meta.env.VITE_SERVER_URI, {
        code: action.payload.code,
      });
      console.log(results);
    } catch (e) {
      console.error('Error: GetToken Middleware:', e.message);
      next(action);
    }
  }

  next(action);
};

export default getToken;
