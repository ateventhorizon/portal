import React, {Fragment, useCallback, useEffect, useMemo, useState} from "react";
import axios from "axios";
import {ProgressBarDiv} from "./ProgressBar.styled";

export const ProgressBar = () => {
  const [progress, setProgress] = useState({});

  const prog = useCallback((ev) => setProgress(ev), [setProgress]);

  const interceptors = useMemo(() => ({
    request: config => {
      return {
        ...config,
        onUploadProgress: ev => prog(ev),
        onDownloadProgress: ev => prog(ev)
      }
    }
  }), [prog]); // create the interceptors

  useEffect(() => {
    axios.interceptors.request.use(interceptors.request);
    return () => {
    }
  }, [interceptors]);

  const isLoading = progress.lengthComputable && (progress.loaded !== progress.total) && progress.type === "progress";
  const perc = isLoading ? Math.ceil((progress.loaded / progress.total) * 100.0) : 0;

  return (
    <Fragment>
      {isLoading && <ProgressBarDiv perc={perc}/>}
    </Fragment>
  )
}
