# COVID-19 CHART

This app was made due to have available the data of number of cases and death in different countries. Its made with react, redux, redux-toolkit which includes redux-thunk, and apex-chart.

The API's used were:

- For Venezuela cases: https://coronavirus-cities-api.now.sh/country/venezuela
- For global cases: https://api.covidnow.com/v1/global/countries

The service that provides the data for Venezuela's cases was created by [Alejandro Roa](https://www.linkedin.com/in/alejandroroa/) and for the global cases, we used the data provided by [Covid Now](https://covidnow.docs.apiary.io/#/introduction).

## To use

yarn start

## Project Structure

- src
    - api
        - index.js
    - coomponents
        - ApexChart.js
    - pages
        - home.js
    - slices
        - index.js
    - utils
        - listOfCountries.js

## Conclusion

This app was made with apex-chart to include all the recent data about COVID-19.

**Made by Web Developer Adrian Beria**
