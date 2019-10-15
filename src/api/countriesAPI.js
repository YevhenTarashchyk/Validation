export const getCountries = async () => {
  const url = "http://restcountries.eu/rest/v2/";
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url} , received ${res.status}`);
  }

  return await res.json();
};
