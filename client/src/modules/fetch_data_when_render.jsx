import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRequest } from './requests/server_requests';

const FetchDataOnRender = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.app.token);

  useEffect(() => {
    const fetchData = async () => {
      let updateToken;
      let updatedStatus;
      let updatedUser;

      if (token === "") {
        updateToken = localStorage.getItem("token");
        if (!updateToken) {
          let dataRequest = await getRequest(`http://localhost:3000/guest_token`);
          if (dataRequest.ok) {
            localStorage.setItem('token', dataRequest.token);
            dispatch({ type: 'SET_TOKEN', payload: dataRequest.token });
          }
        } else {
          updatedStatus = localStorage.getItem("status");
          updatedUser = localStorage.getItem("currentUser");
          dispatch({ type: 'SET_TOKEN', payload: updateToken });
          dispatch({ type: 'SET_STATUS', payload: updatedStatus });
          dispatch({ type: 'SET_USER', payload: updatedUser });
        }
      }
    };

    fetchData();
  }, [dispatch, token]);

  return null; 
};

export default FetchDataOnRender;
