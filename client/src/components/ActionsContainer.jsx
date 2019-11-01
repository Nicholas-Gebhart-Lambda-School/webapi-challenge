import React, { useEffect, useState } from "react";
import fetchActions from "../services/getActions";

export default () => {
  const [actions, setActions] = useState([]);
  useEffect(() => {
    fetchActions().then(res => setActions(res.data));
  }, []);

  return (
    <>
      <pre>{JSON.stringify(actions, null, 4)}</pre>
    </>
  );
};
