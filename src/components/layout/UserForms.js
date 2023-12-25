"use client";
import { useState } from "react";
import EditableImage from "./EditableImage";
import { UseProfile } from "../UseProfile";
import AddressInputs from "./AddressInput";

export default function UserForm({ user, handleChange }) {
  const [userName, setUserName] = useState(user?.name || "");
  const [userImage, setUserImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [streetAdress, setStreetAdress] = useState(user?.streetAdress || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");
  const [admin, setAdmin] = useState(user?.admin || false);
  const { data } = UseProfile();

  function handleAddressChange(propName, value) {
    if(propName === 'city') setCity(value);
    if(propName === 'streetAdress') setStreetAdress(value);
    if(propName === 'postalCode') setPostalCode(value);
    if(propName === 'phone') setPhone(value);
    if(propName === 'country') setCountry(value);
  }

  return (
    <div className=" md:flex gap-8 max-w-xl mx-auto mt-4">
      <form className="p-2 rounded-lg mt-10">
        <div className="md:w-24 w-44 rounded-2xl mb-4 mx-auto">
          <EditableImage link={userImage} setLink={setUserImage} />
        </div>
      </form>
      <form
        onSubmit={(ev) =>
          handleChange(ev, {
            name: userName,
            image: userImage,
            phone,
            streetAdress,
            postalCode,
            city,
            country,
            admin,
          })
        }
        className="grow mt-6"
      >
        <label>First and Last name</label>
        <input
          type="text"
          value={userName}
          onChange={(ev) => setUserName(ev.target.value)}
          placeholder="First and Last name"
        />
        <label>Email</label>
        <input type="email" disabled={true} value={user?.email || ""} />
        <AddressInputs adressProps={{phone, streetAdress,postalCode, city, country}} 
        setAdressProps={handleAddressChange}
        />
        {data.admin && (
          <div>
            <label
              className="p-2 inline-flex items-center gap-2 mb-2"
              htmlFor="adminCb"
            >
              <input
                value={admin}
                checked={admin}
                id="adminCb"
                type="checkbox"
                onChange={(ev) => setAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
