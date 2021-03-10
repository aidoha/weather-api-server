const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=083291d74739228b55a67bb46b26f368&query=${encodeURIComponent(
    latitude
  )},${encodeURIComponent(longitude)}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('something went wrong', undefined);
    } else if (body.error) {
      callback(body.error, undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions.map((x) => x)} It's currently ${
          body.current.temperature
        } degrees out. Feels like ${body.current.feelslike}`
      );
    }
  });
};

module.exports = { forecast };
