import { RESTDataSource } from "apollo-datasource-rest";
import { isArray } from "util";

const PARKS_FIELDS = [
  "states",
  "weatherInfo",
  "directionsInfo",
  "addresses",
  "entranceFees",
  "operatingHours",
  "name",
  "url",
  "contacts",
  "entrancePasses",
  "parkCode",
  "designation",
  "images",
  "fullName",
  "latLong",
  "id",
  "directionsUrl",
  "description"
];

const CAMPGROUND_FIELDS = [
  "regulationsOverview",
  "addresses",
  "regulationsUrl",
  "reservationsUrl",
  "reservationsSitesReservable",
  "campsites",
  "name",
  "weatherOverview",
  "fees",
  "directionsOverview",
  "accessibility",
  "operatingHours",
  "reservationsSitesFirstCome",
  "contacts",
  "parkCode",
  "amenities",
  "images",
  "latLong",
  "id",
  "directionsUrl",
  "description"
];

const EVENT_FIELDS = [
  "contactEmailAddress",
  "contactName",
  "contactTelephoneNumber",
  "category",
  "datesEnd",
  "date",
  "dates",
  "dateStart",
  "description",
  "feeInfo",
  "id",
  "images",
  "infoUrl",
  "isAllDay",
  "isFree",
  "isRecurring",
  "isRegResRequired",
  "latitude",
  "longitude",
  "location",
  "organizationName",
  "parkFullName",
  "portalName",
  "recurrenceDateEnd",
  "recurrenceRule",
  "regResInfo",
  "siteCode",
  "siteType",
  "subjectName",
  "tags",
  "timeDescription",
  "times",
  "title",
  "types"
];

const normalizeFields = obj => {
  let notNullObj = {};
  const notNulllKeys = Object.keys(obj).forEach(key => {
    if (obj[key]) notNullObj[key] = obj[key];
  });
  return notNullObj;
};

class NPS_API extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://developer.nps.gov/api/v1/";
  }

  async getParks({ parkCodes, api_key, start, limit, q, stateCodes }) {
    const _queryParams = {
      parkCode: parkCodes ? parkCodes.join(",") : null,
      stateCode: stateCodes ? stateCodes.join(",") : null,
      limit,
      start,
      q,
      api_key,
      fields: PARKS_FIELDS.join(",")
    };

    const queryParams = normalizeFields(_queryParams);

    const response = await this.get("parks", queryParams);
    return response
      ? {
          total: response.total || 0,
          limit: response.limit || 0,
          start: response.start || 0,
          parks:
            response.data && isArray(response.data)
              ? this.reduceParks(response.data)
              : []
        }
      : null;
  }

  async getCampgrounds({ parkCodes, api_key, start, limit, q, stateCodes }) {
    const _queryParams = {
      parkCode: parkCodes ? parkCodes.join(",") : null,
      stateCode: stateCodes ? stateCodes.join(",") : null,
      limit,
      start,
      q,
      api_key: api_key,
      fields: CAMPGROUND_FIELDS.join(",")
    };

    const queryParams = normalizeFields(_queryParams);

    const response = await this.get("campgrounds", queryParams);

    return response
      ? {
          total: response.total || 0,
          limit: response.limit || 0,
          start: response.start || 0,
          campgrounds:
            response.data && isArray(response.data)
              ? this.reduceCampgrounds(response.data)
              : []
        }
      : null;
  }

  async getAlerts({ parkCodes, api_key, start, limit, q, stateCodes }) {
    const _queryParams = {
      parkCode: parkCodes ? parkCodes.join(",") : null,
      stateCode: stateCodes ? stateCodes.join(",") : null,
      limit,
      start,
      q,
      api_key,
      fields: [
        "category",
        "description",
        "id",
        "parkCode",
        "title",
        "url"
      ].join(",")
    };

    const queryParams = normalizeFields(_queryParams);

    const response = await this.get("alerts", queryParams);
    return response
      ? {
          total: response.total || 0,
          limit: response.limit || 0,
          start: response.start || 0,
          alerts: response.data && isArray(response.data) ? response.data : []
        }
      : null;
  }

  async getVisitorcenters({ parkCodes, api_key, start, limit, q, stateCodes }) {
    const _queryParams = {
      parkCode: parkCodes ? parkCodes.join(",") : null,
      stateCode: stateCodes ? stateCodes.join(",") : null,
      limit,
      start,
      q,
      api_key,
      fields: [
        "directionsInfo",
        "addresses",
        "name",
        "operatingHours",
        "url",
        "contacts",
        "parkCode",
        "latLong",
        "id",
        "directionsUrl",
        "description"
      ].join(",")
    };

    const queryParams = normalizeFields(_queryParams);

    const response = await this.get("visitorcenters", queryParams);
    return response
      ? {
          total: response.total || 0,
          limit: response.limit || 0,
          start: response.start || 0,
          visitorcenters:
            response.data && isArray(response.data) ? response.data : []
        }
      : null;
  }

  async getPlaces({ parkCodes, api_key, start, limit, q, stateCodes }) {
    const _queryParams = {
      parkCode: parkCodes ? parkCodes.join(",") : null,
      stateCode: stateCodes ? stateCodes.join(",") : null,
      limit,
      start,
      q,
      api_key,
      fields: [
        "id",
        "listingDescription",
        "listingImage",
        "relatedParks",
        "title",
        "url"
      ].join(",")
    };

    const queryParams = normalizeFields(_queryParams);

    const response = await this.get("places", queryParams);
    return response
      ? {
          total: response.total || 0,
          limit: response.limit || 0,
          start: response.start || 0,
          places: response.data && isArray(response.data) ? response.data : []
        }
      : null;
  }

  reduceEntranceFees(fees) {
    return fees.map(({ cost, description, title }) => ({
      cost,
      description,
      title
    }));
  }

  reduceOperatingHours(operatingHours) {
    return operatingHours;
    // return operatingHours.map(
    //   ({ name, description, standardHours, exceptions }) => ({
    //     name,
    //     description,
    //     standardHours,
    //     exceptions: this.reduceExceptions(exceptions)
    //   })
    // );
  }

  reduceExceptions(exceptions) {
    return exceptions;
    // return exceptions.map(({ name, startDate, endDate, exceptionHours }) => ({
    //   name,
    //   startDate,
    //   endDate,
    //   exceptionHours
    // }));
  }

  reduceContacts(contacts) {
    return contacts;
    // return exceptions.map(({ name, startDate, endDate, exceptionHours }) => ({
    //   name,
    //   startDate,
    //   endDate,
    //   exceptionHours
    // }));
  }

  reduceParks(parks) {
    return parks.map(
      ({
        states,
        weatherInfo,
        directionsInfo,
        addresses,
        entranceFees,
        name,
        operatingHours,
        url,
        contacts,
        entrancePasses,
        parkCode,
        designation,
        images,
        fullName,
        latLong,
        id,
        directionsUrl,
        description
      }) => ({
        states: states && states.split(","),
        weatherInfo,
        directionsInfo,
        addresses,
        entranceFees:
          entranceFees &&
          isArray(entranceFees) &&
          this.reduceEntranceFees(entranceFees),
        name,
        operatingHours:
          operatingHours &&
          isArray(operatingHours) &&
          this.reduceOperatingHours(operatingHours),
        url,
        contacts:
          contacts && isArray(contacts) && this.reduceContacts(contacts),
        entrancePasses: entrancePasses,

        parkCode,
        designation,
        images: images,
        fullName,
        latLong: latLong &&
          isArray(latLong.split(",")) && {
            lat: parseFloat(latLong.split(",")[0].replace("lat:", "")),
            long: parseFloat(latLong.split(",")[1].replace("long:", ""))
          },
        id,
        directionsUrl,
        description
      })
    );
  }

  reduceCampgrounds(campgrounds) {
    return campgrounds.map(
      ({
        regulationsOverview,
        addresses,
        regulationsUrl,
        reservationsUrl,
        reservationsSitesReservable,
        campsites,
        name,
        parkCode,
        weatherOverview,
        fees,
        directionsOverview,
        accessibility,
        operatingHours,
        reservationsSitesFirstCome,
        contacts,
        reservationsDescription,
        amenities,
        images,
        latLong,
        id,
        directionsUrl,
        description
      }) => ({
        regulationsOverview,
        addresses,
        regulationsUrl,
        reservationsUrl,
        reservationsSitesReservable,
        campsites,
        parkCode,
        name,
        weatherOverview,
        fees,
        directionsOverview,
        accessibility,
        operatingHours,
        reservationsSitesFirstCome,
        contacts,
        reservationsDescription,
        amenities,
        images,
        latLong: latLong &&
          isArray(latLong.split(",")) && {
            lat: parseFloat(latLong.split(",")[0].replace("{lat:", "")),
            long: parseFloat(
              latLong
                .split(",")[1]
                .replace("lng:", "")
                .replace("}", "")
            )
          },
        id,
        directionsUrl,
        description
      })
    );
  }

  parksLoaderFunction(api_key) {
    return parkCodeList => {
      return new Promise(async (resolve, reject) => {
        const result = await this.getParks({
          parkCodes: parkCodeList,
          api_key
        });
        const parks = result ? result.parks : [];
        resolve(parks);
      });
    };
  }

  campgroundsLoaderFunction(api_key) {
    return parkCodeList => {
      return new Promise(async (resolve, reject) => {
        const result = await this.getCampgrounds({
          parkCodes: parkCodeList,
          api_key
        });
        let parks = [];
        for (const p in parkCodeList) {
          parks.push([]);
        }

        for (const c of result.campgrounds) {
          parks[parkCodeList.findIndex(p => p === c.parkCode)].push(c);
        }

        resolve(parks);
      });
    };
  }
}

export { NPS_API as default };
