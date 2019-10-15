"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServer = require("apollo-server");

const typeDefs = _apolloServer.gql`
  type Query {
    parks(input: NPS_Input): ParksConnection!
    campgrounds(input: NPS_Input): CampgroundsConnection!
    alerts(input: NPS_Input): AlertsConnection!
    visitorcenters(input: NPS_Input): VisitorcentersConnection!
    places(input: NPS_Input): PlacesConnection!
  }

  type ParksConnection {
    total: Int
    limit: Int
    start: Int
    parks: [Park]
  }
  type CampgroundsConnection {
    total: Int
    limit: Int
    start: Int
    campgrounds: [Campground]
  }

  type AlertsConnection {
    total: Int
    limit: Int
    start: Int
    alerts: [Alert]
  }

  type VisitorcentersConnection {
    total: Int
    limit: Int
    start: Int
    visitorcenters: [Visitorcenter]
  }
  type PlacesConnection {
    total: Int
    limit: Int
    start: Int
    places: [Place]
  }

  input NPS_Input {
    parkCodes: [String]
    stateCodes: [String]
    limit: Int
    start: Int
    q: String
  }

  type Park {
    # states in which park is located
    states: [String!]
    weatherInfo: String
    directionsInfo: String!
    addresses: [Address!]
    entranceFees: [Fee]
    operatingHours: OperatingHours
    name: String
    url: String
    contacts: [Contact]
    entrancePasses: [EntrancePass]
    parkCode: String
    designation: String!
    images: [Image!]
    fullName: String!
    latLong: LatLong
    id: ID!
    directionsUrl: String!
    description: String!
    campgrounds: [Campground]
  }

  type Campground {
    regulationsOverview: String
    addresses: [Address!]
    regulationsUrl: String
    reservationsUrl: String
    reservationsSitesReservable: String
    campsites: Campsites
    name: String
    weatherOverview: String
    fees: [Fee]
    directionsOverview: String
    accessibility: Accessibility
    operatingHours: [Hours]
    reservationsSitesFirstCome: String
    contacts: Contact
    reservationsDescription: String
    amenities: Amenities
    images: [Image]
    latLong: LatLong
    id: ID
    directionsUrl: String
    description: String
    park: Park
  }

  type Alert {
    category: AlertType
    description: String
    id: ID
    parkCode: String
    title: String
    url: String
  }

  type Visitorcenter {
    directionsInfo: String
    addresses: [Address]
    name: String
    operatingHours: [Hours]
    url: String
    contacts: [Contact]
    parkCode: String
    latLong: LatLong
    id: ID
    directionsUrl: String
    description: String
  }

  type Place {
    id: ID
    listingDescription: String
    listingImage: Image
    relatedParks: [Park]
    title: String
    url: String
  }
  type Address {
    postalCode: String
    City: String
    stateCode: String
    line1: String
    type: String
    line3: String
    line2: String
  }

  type Fee {
    cost: Float
    description: String
    title: String
  }

  type OperatingHours {
    name: String
    description: String
    standardHours: Hours
    exceptions: [Exception]
  }
  type Hours {
    sunday: String
    monday: String
    tuesday: String
    wednesday: String
    thursday: String
    friday: String
    saturday: String
  }

  type Exception {
    name: String
    startDate: String
    endDate: String
    exceptionHours: Hours
  }

  type Contact {
    phoneNumbers: [PhoneNumber]
    emailAddresses: [EmailAddress]
  }

  type PhoneNumber {
    phoneNumber: String
    description: String
    extension: String
    type: PhoneNumberType
  }
  type EmailAddress {
    emailAddress: String
    description: String
  }

  type EntrancePass {
    cost: Float
    description: String
    title: String
  }
  type Image {
    credit: String
    altText: String
    title: String
    id: Int
    caption: String
    url: String
  }

  type Campsites {
    other: Int
    group: Int
    horse: Int
    totalSite: Int
    tentOnly: Int
    electricalHookups: Int
    rvOnly: Int
    walkBoatTo: Int
  }

  type Accessibility {
    rvAllowed: Boolean
    rvMaxLength: Int
    adaInfo: String
    classifications: [String]
    wheelchairAccess: String
    accessRoads: [String]
    internetInfo: String
    rvInfo: String
    trailerAllowed: Boolean
    additionalInfo: String
    trailerMaxLength: Int
    fireStovePolicy: String
    cellPhoneInfo: String
  }

  type Amenities {
    dumpStation: Boolean
    campStore: Boolean
    cellPhoneReception: Boolean
    toilets: [String]
    potableWater: [String]
    showers: [String]
    ampitheater: String
    amphitheater: Boolean
    firewoodForSale: Boolean
    iceAvailableForSale: Boolean
    staffOrVolunteerHostOnSite: String
    trashRecyclingCollection: String
    internetConnectivity: Boolean
    laundry: Boolean
    foodStorageLockers: String
  }

  type LatLong {
    lat: Float
    long: Float
  }

  enum AlertType {
    DANGER
    CAUTION
    INFORMATION
    PARK_CLOSURE
  }
  enum AddressType {
    PHYSICAL
    MAILING
  }
  enum PhoneNumberType {
    VOICE
    FAX
    TTY
  }
`;
exports.default = typeDefs;