const DetailsWeatherOfTheCountry = ({
  country: city,
}: Readonly<{
  country: String;
}>) => {
  return (
    <div>
      <h1 className="text-3xl text-center">
        This is details of the country: {city}
      </h1>
    </div>
  );
};

export default DetailsWeatherOfTheCountry;
