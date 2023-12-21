const AddressForm = ({changeHandler, address, city, postalCode, country}) => {
  return (
    <div className="pb-12 mx-auto border-b border-gray-900/10">
      <h2 className="text-base font-semibold leading-7 text-gray-900">Shipping Information</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

      <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-4 sm:grid-cols-6">

        <div className="col-span-full">
          <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">Street address</label>
          <div className="mt-2">
            <input onChange={changeHandler} required value={address} type="text" name="address" id="address" autoComplete="street-address" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div className="sm:col-span-2 sm:col-start-1">
          <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">City</label>
          <div className="mt-2">
            <input onChange={changeHandler} value={city} type="text" name="city" id="city" required autoComplete="address-level2" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

         <div className="sm:col-span-4">
          <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">Country</label>
          <div className="mt-2">
            <select onChange={changeHandler} value={country} required id="country" name="country" autoComplete="country-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
              <option >South Korea</option>
              <option >Japan</option>
              <option >Australia</option>
            </select>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="postalCode" className="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal code</label>
          <div className="mt-2">
            <input onChange={changeHandler} required value={postalCode} type="text" name="postalCode" id="postalCode" autoComplete="postal-code" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddressForm