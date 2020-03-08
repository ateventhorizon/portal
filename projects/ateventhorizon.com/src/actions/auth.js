import {setAlert} from "./alert";
import {CLEAR_ENTITIES, LOGOFF_FROM_PROJECT} from "./types";
import axios from "axios";

export const logoffFromProject = () => dispatch => {
  dispatch({ type: LOGOFF_FROM_PROJECT });
  dispatch({ type: CLEAR_ENTITIES });
};

export const acceptInvitation = (projectName, userEmail) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = {
      email: userEmail,
      roles: ["user"]
    };
    await axios.put(
      "/api/user/addRolesFor/" + projectName,
      JSON.stringify(body),
      config
    );

    // delete invitation as last step so we are sure if something goes wrong the invitation is still on
    const bodyDelete = {
      persontoadd: userEmail,
      project: projectName
    };
    await axios.delete("user/invitetoproject/", bodyDelete, config);

    // dispatch({
    //   type: LOGIN_SUCCESS,
    //   payload: res.data
    // });

    // dispatch(loadUser());
  } catch (err) {
    dispatch(setAlert("Cannot join project, investigating why...", "danger"));
  }
};

export const declineInvitation = (projectName, userEmail) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const bodyDelete = {
      persontoadd: userEmail,
      project: projectName
    };
    await axios.delete(
      "user/invitetoproject/",
      JSON.stringify(bodyDelete),
      config
    );

    // dispatch({
    //   type: LOGIN_SUCCESS,
    //   payload: res.data
    // });

    // dispatch(loadUser());
  } catch (err) {
    dispatch(
      setAlert(
        "Cannot remove invitation to project, investigating why...",
        "danger"
      )
    );
  }
};

export const setCurrentProject = async projectName => {
  // try {
    // Make sure we re-login with project set, otherwise most of the entity rest api req will fail
    return await axios.post("/api/refreshtoken/" + projectName);

    // dispatch({
    //   type: LOGIN_SUCCESS,
    //   payload: res.data
    // });
    //
  // } catch (err) {
  //   console.log("login project error: ", err);
  //   // dispatch({
  //   //   type: LOGIN_FAIL
  //   // });
  //   // dispatch(setAlert("Cannot login to new project", "danger"));
  // }
};
