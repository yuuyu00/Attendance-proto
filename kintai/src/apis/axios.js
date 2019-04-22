import axios from 'axios';

// export default axios.create({
//   baseURL: 'http://172.17.20.75:3001',
// });
export default axios.create({
  baseURL: 'https://ueayy3jow5.execute-api.ap-northeast-1.amazonaws.com/default',
  headers: 'x-api-key:Y3QGoyy7VT8wr0kXW25viaivtb6B0s7a6dOLFmTf'
});