const getBaseUrl = () => {
  let BASE_URL: string;
  if (process.env.NODE_ENV === 'development') {
    BASE_URL = 'http://mock-api.com/7gPY2Pnl.mock';
  } else {
    BASE_URL = '';
  }
  return BASE_URL;
}

export default getBaseUrl;
