export default function AddressInputs({adressProps, setAdressProps}) {
    const {phone, streetAdress,postalCode,city, country} = adressProps;
    return (
        <>
        <label>Phone No.</label>
        <input
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(ev) => setAdressProps('phone', ev.target.value)}
        />
        <label htmlFor="">Street Adress</label>
        <input
          type="text"
          placeholder="Street adress"
          value={streetAdress}
          onChange={(ev) => setAdressProps('streetAdress', ev.target.value)}
        />
        <div className="flex gap-4">
          <div className="w-full">
            <label htmlFor="">Postal code</label>
            <input
              type="text"
              placeholder="Postal code"
              value={postalCode}
              onChange={(ev) => setAdressProps('postalCode', ev.target.value)}
            />
          </div>
          <div className="w-full">
            <label htmlFor="">City</label>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(ev) => setAdressProps('city', ev.target.value)}
            />
          </div>
        </div>
        <label htmlFor="">Country</label>
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(ev) => setAdressProps('country', ev.target.value)}
        />
        </>
    )
}