import React from "react";
import { useParams } from "react-router-dom";
import Data from "../../Data/Data.js";
import { Link } from "react-router-dom";
const Booking = () => {
  const { id } = useParams();

  //   Data.find((d) => d.id === id);
  const place = Data.find((element) => element.id == id);
  console.log(place);

  // console.log("place: " + place);

  return (
    <>
      <h1> {place.name}</h1>
      {/* <div>{place.id}</div> */}
      <h4>{place.description}</h4>

      <div class="form-group row">
        <label for="example-text-input" class="col-2 col-form-label">
          Origin
        </label>
        <div class="col-10">
          <input
            class="form-control"
            type="text"
            value="Artisanal kale"
            id="example-text-input"
          />
        </div>
      </div>

      <div class="form-group row">
        <label for="example-text-input" class="col-2 col-form-label">
          Destination
        </label>
        <div class="col-10">
          <input
            class="form-control"
            type="text"
            value="Artisanal kale"
            id="example-text-input"
          />
        </div>
      </div>

      <div class="form-group row">
        <label for="example-date-input" class="col-2 col-form-label">
          From
        </label>
        <div class="col-10">
          <input
            class="form-control"
            type="date"
            value="2011-08-19"
            id="example-date-input"
          />
        </div>
      </div>

      <div class="form-group row">
        <label for="example-date-input" class="col-2 col-form-label">
          To
        </label>
        <div class="col-10">
          <input
            class="form-control"
            type="date"
            value="2011-08-19"
            id="example-date-input"
          />
        </div>
      </div>
      <Link to="/login">
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </Link>
    </>
  );
};

export default Booking;
