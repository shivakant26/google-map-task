import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import { AutoComplete, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { locationData } from "../mockData";
import { addLocation } from "../redux/action/Action";

const Home = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [allLocation, setAllLocation] = useState(locationData);
  const currenLocation = useSelector((state) => state?.reducer?.data);

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  const handleSelect = (val) => {
    const valueObject = allLocation.find((item) => item.value === val);
    dispatch(addLocation(valueObject));
  };

  const showHideHandeler = () => {
    if (currenLocation?.length > 0) {
      setShow(!show);
    }
  };

  return (
    <>
      <div className="top_section">
        <div className="autocomplete">
          <AutoComplete
            style={{
              width: 200,
            }}
            options={allLocation}
            placeholder="location"
            filterOption={(inputValue, option) =>
              option?.city?.toUpperCase()?.indexOf(inputValue.toUpperCase()) !==
              -1
            }
            onSelect={handleSelect}
          />
        </div>
        <div className="search_result">
          <Button type="primary" onClick={showHideHandeler}>
            {show ? "Hide Result" : "Show Result"}
          </Button>

          {show && (
            <>
              <div className="result">
                {currenLocation?.map((item, index) => {
                  return <p key={index}>{item.value}</p>;
                })}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="map_section">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "",
          }}
          defaultCenter={defaultProps.center}
          center={currenLocation[currenLocation.length - 1]}
          defaultZoom={defaultProps.zoom}
        >
          {currenLocation?.map(({ lat, lng, id, value }) => {
            return (
              <Marker key={id} lat={lat} lng={lng} text={id} tooltip={value} />
            );
          })}
        </GoogleMapReact>
      </div>
    </>
  );
};

export default Home;
