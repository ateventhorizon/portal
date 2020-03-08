import {apiStatusResponse, isStatusCodeAny400, isStatusCodeSuccessful} from "./apiStatus";
import {useGlobal} from "reactn";
import {getRandomMovieQuote} from "./apiMovieQuotes";

export const setAlert = (store, title, text, type) => {
  store({
    title: title,
    text: text,
    alertType: type
  });
}

export const movieWarning = (store, title) => {
  store({
    title: title,
    text: getRandomMovieQuote(),
    alertType: "warning"
  });
}

const tryToGetRealStatusCodeFromException = msg => {
  let code = 500;
  const checker = " status code ";
  const statusCodeIndex = msg.indexOf(checker);
  if (statusCodeIndex !== -1) {
    code = parseInt(msg.substring(statusCodeIndex + checker.length, msg.length));
    code = isNaN(code) ? 500 : code;
  }
  return code;
};

export const api = async (apiEntry, func, ...args) => {
  const storeData = apiEntry[0];
  const store = apiEntry[1];
  const alertStore = apiEntry[3];
  try {
    const res = await func(...args);
    let statusMessage = "OK";
    if (isStatusCodeSuccessful(res.status)) {
      if (store) {
        if ( alertStore ) {
          alertStore(null);
        }
        // 204 it's basically a "reset" code.
        if (res.status === 204) {
          store(null);
        } else {
          // Now 200s-300s will thread them as aggregate results
          store({
            ...storeData,
            ...res.data
          });
        }
      }
    } else if (isStatusCodeAny400(res.status)) {
      // 400s are basically errors so the store won't change but we'll spawn an error and alert
      // the reason of the error will be the res.data itself, at least we can assume so
      statusMessage = res.data;
      setAlert(alertStore, getRandomMovieQuote(), statusMessage, "warning");
    }

    return apiStatusResponse(res.status, statusMessage);
  } catch (e) {
    const msg = e.message;
    return apiStatusResponse(tryToGetRealStatusCodeFromException(msg), msg);
  }
};

export const useApi = (name) => {
  const q1 = useGlobal(name);
  const q2 = useGlobal('notificationAlert');
  return [q1[0], q1[1], q2[0], q2[1]];
};

export const alertIfSuccessful = (res, alertStore, title, text) => {

  if (res.isSuccessful) {
    return setAlert(alertStore, title, text, "success")
  }

};
