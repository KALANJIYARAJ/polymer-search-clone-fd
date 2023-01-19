import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";

function NumericFilter({ values }) {
  const { model, setModel } = useContext(UserContext);
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);

  //   console.log(value1,value2);

  return (
    <div className="row p-3 justify-content-center">
      <div className="col-12 rajmodal bg-white  p-3">
        <h5 className="">Numeric Filter</h5>
        <hr />
        <br />
        <label>
          min &ensp;
          <input
            type="text"
            placeholder="search..."
            className="rounded border border-.5 p-2"
            style={{ width: "5rem" }}
            onChange={(e) => setValue1(e.target.value)}
          />
        </label>

        <label>
          &emsp;max &ensp;
          <input
            type="text"
            placeholder="search..."
            className="rounded border border-.5 p-2"
            style={{ width: "5rem" }}
            onChange={(e) => setValue2(e.target.value)}
          />
        </label>
        <br />
        <br />

        <button
          onClick={() => {
            values(value1, value2);
            setModel(false);
          }}
          className="btn btn-dark me-2"
        >
          Filter
        </button>

        <button onClick={() => setModel(false)} className="btn btn-dark me-2">
          Close
        </button>
      </div>
    </div>
  );
}

export default NumericFilter;
