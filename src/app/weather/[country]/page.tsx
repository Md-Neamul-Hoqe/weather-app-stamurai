const DetailsWeatherOfTheCountry = ({
  country,
}: Readonly<{
  country: String;
}>) => {
  return (
    <div>
      <h1 className="text-3xl text-center">
        This is details of the country: {country}
      </h1>
    </div>
  );
};

export default DetailsWeatherOfTheCountry;
