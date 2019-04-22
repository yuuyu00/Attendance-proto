import axios from 'apis/axios';
import {
  CREATE_KINTAI,
  FETCH_KINTAIS,
  FETCH_KINTAI,
  DELETE_KINTAI,
  EDIT_KINTAI,
} from 'actions/types';

export const addCount = num => {
  return {
    type: 'ADD_COUNT',
    payload: num,
  };
};

export const createKintai = formValues => async dispatch => {
  const response = await axios.post('/kintai', { ...formValues });

  dispatch({ type: CREATE_KINTAI, payload: response.data });
};

export const fetchKintais = () => async dispatch => {
  const response = await axios.get('/kintai');

  dispatch({ type: FETCH_KINTAIS, payload: response.data });
};

export const fetchKintai = id => async dispatch => {
  const response = await axios.get(`/kintai/${id}`);
  dispatch({ type: FETCH_KINTAI, payload: response.data });
};

export const editKintai = (id, formValues) => async dispatch => {
  const response = await axios.patch(`/kintai/${id}`, formValues);

  dispatch({ type: EDIT_KINTAI, payload: response.data });
};

export const deleteKintai = id => async dispatch => {
  await axios.delete(`/kintai/${id}`);

  dispatch({ type: DELETE_KINTAI, payload: id });
};
