import _ from 'lodash';
import {
  CREATE_KINTAI,
  FETCH_KINTAIS,
  FETCH_KINTAI,
  DELETE_KINTAI,
  EDIT_KINTAI,
} from 'actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_KINTAIS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case FETCH_KINTAI:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_KINTAI:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_KINTAI:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_KINTAI:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
