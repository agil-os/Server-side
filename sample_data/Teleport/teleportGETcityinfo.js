// Full Path: https://api.teleport.org/api/cities/geonameid%3A5506956%2F/
// Path: https://api.teleport.org/api/cities/
// params: {
//  geonameid: 5506956
// }

module.exports.cityInfo = {
  "_links": {
    "city:admin1_division": {
      "href": "https://api.teleport.org/api/countries/iso_alpha2:US/admin1_divisions/geonames:NV/",
      "name": "Nevada"
    },
    "city:alternate-names": {
      "href": "https://api.teleport.org/api/cities/geonameid:5506956/alternate_names/"
    },
    "city:country": {
      "href": "https://api.teleport.org/api/countries/iso_alpha2:US/",
      "name": "United States"
    },
    "city:timezone": {
      "href": "https://api.teleport.org/api/timezones/iana:America%2FLos_Angeles/",
      "name": "America/Los_Angeles"
    },
    "city:urban_area": {
      "href": "https://api.teleport.org/api/urban_areas/slug:las-vegas/",
      "name": "Las Vegas"
    },
    "curies": [
      {
        "href": "https://developers.teleport.org/api/resources/Location/#!/relations/{rel}/",
        "name": "location",
        "templated": true
      },
      {
        "href": "https://developers.teleport.org/api/resources/City/#!/relations/{rel}/",
        "name": "city",
        "templated": true
      },
      {
        "href": "https://developers.teleport.org/api/resources/UrbanArea/#!/relations/{rel}/",
        "name": "ua",
        "templated": true
      },
      {
        "href": "https://developers.teleport.org/api/resources/Country/#!/relations/{rel}/",
        "name": "country",
        "templated": true
      },
      {
        "href": "https://developers.teleport.org/api/resources/Admin1Division/#!/relations/{rel}/",
        "name": "a1",
        "templated": true
      },
      {
        "href": "https://developers.teleport.org/api/resources/Timezone/#!/relations/{rel}/",
        "name": "tz",
        "templated": true
      }
    ],
    "self": {
      "href": "https://api.teleport.org/api/cities/geonameid:5506956/"
    }
  },
  "full_name": "Las Vegas, Nevada, United States",
  "geoname_id": 5506956,
  "location": {
    "geohash": "9qqjgcrwkr4jx8ntqhhd",
    "latlon": {
      "latitude": 36.17497,
      "longitude": -115.13722
    }
  },
  "name": "Las Vegas",
  "population": 623747
}