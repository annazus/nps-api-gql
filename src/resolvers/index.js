const Query = {
  parks: (parent, { input }, { dataSources, api_key }, info) => {
    return dataSources.npsAPI.getParks({ ...input, api_key });
  },
  campgrounds: async (parent, { input }, { dataSources, api_key }, info) => {
    return dataSources.npsAPI.getCampgrounds({ ...input, api_key });
  },
  alerts: async (parent, { input }, { dataSources, api_key }, info) => {
    return dataSources.npsAPI.getAlerts({ ...input, api_key });
  },
  visitorcenters: async (parent, { input }, { dataSources, api_key }, info) => {
    return dataSources.npsAPI.getVisitorcenters({ ...input, api_key });
  }
};

const AlertType = {
  DANGER: "Danger",
  CAUTION: "Caution",
  INFORMATION: "Information",
  PARK_CLOSURE: "Park Closure"
};

const AddressType = {
  PHYSICAL: "Physical",
  MAILING: "Mailing"
};
const PhoneNumberType = {
  VOICE: "Voice",
  FAX: "Fax",
  TTY: "Tty"
};

const Campground = {
  park: ({ parkCode }, args, { parksLoader }) => {
    return parksLoader.load(parkCode);
  }
};

const Park = {
  campgrounds: async (
    { parkCode },
    args,
    { dataSources, api_key, campgroundsLoader }
  ) => {
    const response = await campgroundsLoader.load(parkCode);
    return response;
    // const response = await dataSources.npsAPI.getCampgrounds({
    //   parkCodes: [parkCode],
    //   api_key
    // });
    // return response.campgrounds;
  }
};

const getRequestedFields = (fieldNodes, node) => {
  let nodeSearch = fieldNodes;
  let result;
  for (const elem of node.split(",")) {
    result = nodeSearch.find(e => e.name.value === elem);
    nodeSearch = result.selectionSet.selections;
  }

  let list = [];
  for (const field of result.selectionSet.selections) {
    list.push(field.name.value);
  }

  return list;
};

export { Query, Campground, Park, AlertType, AddressType, PhoneNumberType };
