import { combineReducers } from 'redux';
import kintaiReducer from 'reducers/kintaiReducer';
import numReducer from 'reducers/numReducer';

export default combineReducers({
  kintais: kintaiReducer,
  count: numReducer,
});
