import { useDispatch, useSelector } from 'react-redux';
import { getRequest } from './requests/server_requests';



export async function fatchDataOnRender() {
    const dispatch = useDispatch();
    const token = useSelector(state => state.app.token);

    let updateToken;
    let updatedStatus;
    let updatedUser;
    if (token == "") {
      updateToken = localStorage.getItem("token");
      if (!updateToken) {
        let dataRequest = await getRequest(`http://localhost:3000/guest_token`);
        if (dataRequest.ok) {
          localStorage.setItem('token', dataRequest.token);
          await dispatch({ type: 'SET_TOKEN', payload: dataRequest.token });
        }
      }
      else {
        updatedStatus = localStorage.getItem("status");
        updatedUser = localStorage.getItem("currentUser");
        await dispatch({ type: 'SET_TOKEN', payload: updateToken });
        await dispatch({ type: 'SET_STATUS', payload: updatedStatus });
        await dispatch({ type: 'SET_USER', payload: updatedUser });
      }
    }
  }