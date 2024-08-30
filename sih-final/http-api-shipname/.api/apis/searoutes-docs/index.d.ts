import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    auth(...values: string[] | number[]): this;
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    server(url: string, variables?: {}): void;
    /**
     * This endpoint does forward geocoding: given a name, a locode or IATA code, it returns
     * airports matching the request with their name, locode, IATA code, country, subdivision
     * and coordinates.
     *
     * This endpoint can be used for exact matching using `locode` or `iataCode` parameter or
     * for partial matching using `query` parameter. Only one of these fields must be used in a
     * request.
     *
     *
     * @summary Find airport by name, locode or IATA
     * @throws FetchError<404, types.GetGeocodingAirportResponse404> Location not found for type airport.
     * @throws FetchError<503, types.GetGeocodingAirportResponse503> Geocoding service unavailable.
     */
    getGeocodingAirport(metadata?: types.GetGeocodingAirportMetadataParam): Promise<FetchResponse<200, types.GetGeocodingAirportResponse200>>;
    /**
     * This endpoint does forward geocoding: given a partial string, for instance `panam`, it
     * returns a given number of routing areas which name contains `panam`. It also returns the
     * `id`, `name` and `geolocation`.
     *
     *
     * @summary Find routing area by name
     * @throws FetchError<400, types.GetGeocodingAreaResponse400> Bad request
     * @throws FetchError<404, types.GetGeocodingAreaResponse404> Not Found
     */
    getGeocodingArea(metadata: types.GetGeocodingAreaMetadataParam): Promise<FetchResponse<200, types.GetGeocodingAreaResponse200>>;
    /**
     * This endpoint does forward geocoding: given a name or a locode, it returns ports
     * matching the request with their name, locode, country, size, coordinates and whether the
     * port is in an eca zone or not.
     *
     * Use either `locode` or `query`, not both in the same query.
     *
     *
     * @summary Find port by name or locode
     * @throws FetchError<404, types.GetGeocodingPortResponse404> Location not found for type port.
     * @throws FetchError<503, types.GetGeocodingPortResponse503> Geocoding service unavailable.
     */
    getGeocodingPort(metadata?: types.GetGeocodingPortMetadataParam): Promise<FetchResponse<200, types.GetGeocodingPortResponse200>>;
    /**
     * Given a point as a coordinates pair, this endpoint checks if it is on sea or not. If on
     * sea, it returns the coordinate pair `{longitude},{latitude}` as GeoJSON. If on land, it
     * returns the closest coordinate pair on sea.
     *
     * The field 'valid' tells whether the given point is on sea or not.
     *
     * The response also contains information about the point : `isSeca` if the point is in an
     * ECA zone and `isCoastal` if the point is close to the coast.
     *
     *
     * @summary Find closest sea point at location
     * @throws FetchError<400, types.GetGeocodingPlaceResponse400> Bad request
     */
    getGeocodingPlace(metadata: types.GetGeocodingPlaceMetadataParam): Promise<FetchResponse<200, types.GetGeocodingPlaceResponse200>>;
    /**
     * This endpoint does forward geocoding: given a postal code and a list of countries, it
     * returns both coordinates and information about that particular location.
     *
     *
     * @summary Find the geocoordinates of a zipcode
     * @throws FetchError<404, types.GetGeocodingZipResponse404> Not found
     * @throws FetchError<503, types.GetGeocodingZipResponse503> Geocoding service unavailable.
     */
    getGeocodingZip(metadata?: types.GetGeocodingZipMetadataParam): Promise<FetchResponse<200, types.GetGeocodingZipResponse200>>;
    /**
     * This endpoint can be used to retrieve the closest locations from a point ordered by
     * distance or the locations around a point (inside a geographical circle with a given
     * radius (in meters)). You can also choose the number of results. By default, the endpoint
     * only returns the closest location.
     *
     * The `coordinates` of the point (or center of the circle) must be passed as path
     * parameter as coordinates pair `longitude,latitude`.
     *
     * The query parameter `locationTypes` allows to filter the types returned. A list of
     * values can be passed among `port,airport,zipcode,railTerminal, roadTerminal`.
     * If this parameter is not passed in the query, all the types will be searched.
     *
     * The query parameter `sizes` allows to filter the sizes of the locations returned for
     * ports and airports.
     *
     * For each location found, geometry (coordinates) is returned as well as a `properties`
     * field that contains different information according to the type of the location.
     *
     * For ports : `name`, `locode`, `country`, `countryName`, `size` and `distance` (in
     * meters) from the point passed in the query.
     *
     * For airports : `name`, `locode`, `size`, `iataCode`, `countryName`, `countryCode` (as a
     * two letters code), `subdivisionName`, `city`.
     *
     * For zipcodes : `name`, `countryCode`, `countryName`, `postalCode` and `distance` (in
     * meters) from the point passed in the query.
     *
     * For rail terminals and road terminals : `name`, `locode`, `countryCode`, `countryName`
     * and `distance` (in meters) from the point passed in the query.
     *
     *
     * @summary Find the closest locations
     * @throws FetchError<400, types.GetGeocodingClosestResponse400> Bad Request
     * @throws FetchError<503, types.GetGeocodingClosestResponse503> Geocoding service unavailable.
     */
    getGeocodingClosest(metadata: types.GetGeocodingClosestMetadataParam): Promise<FetchResponse<200, types.GetGeocodingClosestResponse200>>;
    /**
     * This endpoint returns the locations that match a partial string passed as query
     * parameter (`query`) or matches exactly a specific field (`locode`, `iataCode` or
     * `postalCode`). Only one of these fields must be used in a request.
     * Locations returned can be either `airport`, `port`, `zipcode`, `railTerminal` or
     * `roadTerminal`.
     *
     * The query parameter `locationTypes` allows to filter the types returned. A list of
     * values can be passed among `port,airport,zipcode,railTerminal, roadTerminal`.
     * If this parameter is not passed in the query, all the types will be searched.
     *
     * The query parameter `sizes` allows to filter the sizes of the locations returned for
     * ports and airports.
     *
     * The results are returned with this priority order : `port` > `airport` > `railTerminal`
     * > `zipcode` > `roadTerminal`.
     *
     * For each location, geometry (coordinates) is returned as well as `properties` fields.
     * These fields differ according to the type of the location.
     *
     * For airports : `name`, `locode`, `size`, `iataCode`, `countryName`, `countryCode` (as a
     * two letters code).
     *
     * For zipcodes : `name`, `country`, `countryName`, `postalCode`, `stateCode`, `stateName`,
     * `countyCode`, `countyName`.
     *
     * For ports : `name`, `locode`, `size`, `country`, `countryName`, `subdivisionCode`,
     * `subdivisionName`.
     *
     * For ports, rail terminals and road terminals : `name`, `locode`, `country`,
     * `countryName`, `subdivisionCode`, `subdivisionName`.
     *
     *
     * @summary Find all types of locations
     * @throws FetchError<400, types.GetGeocodingAllResponse400> Bad Request
     * @throws FetchError<503, types.GetGeocodingAllResponse503> Geocoding service unavailable.
     */
    getGeocodingAll(metadata?: types.GetGeocodingAllMetadataParam): Promise<FetchResponse<200, types.GetGeocodingAllResponse200>>;
    /**
     * This endpoint allows to get carrier information by id.
     *
     *
     * @summary Find a carrier by id
     * @throws FetchError<404, types.GetCarrierByIdResponse404> Carrier not found.
     */
    getCarrierById(metadata: types.GetCarrierByIdMetadataParam): Promise<FetchResponse<200, types.GetCarrierByIdResponse200>>;
    /**
     * This endpoint allows to get carrier information by name or SCAC. The API returns a list
     * of carriers matching the request.
     *
     *
     * @summary Find a carrier by name or SCAC
     * @throws FetchError<400, types.GetCarrierByNameOrScacResponse400> Bad request.
     * @throws FetchError<404, types.GetCarrierByNameOrScacResponse404> Carrier not found.
     */
    getCarrierByNameOrScac(metadata?: types.GetCarrierByNameOrScacMetadataParam): Promise<FetchResponse<200, types.GetCarrierByNameOrScacResponse200>>;
    /**
     * This endpoint allows to get service information by id including the name, the ids of the
     * carriers which operate the service, the designation of the service per carrier, the
     * intermediate port calls and the IMOs of the vessels operating these services.
     *
     * Note that `carrierIds`, `portLocodes` and `vesselImos` in the response are deprecated.
     *
     *
     * @summary Find a service by id
     * @throws FetchError<404, types.GetServiceByIdResponse404> Service not found.
     */
    getServiceById(metadata: types.GetServiceByIdMetadataParam): Promise<FetchResponse<200, types.GetServiceByIdResponse200>>;
    /**
     * This endpoint allows to search for services by name or partial name and retrieve the
     * matching services and their information including the name, the ids of the carriers that
     * operate the service, the designation of the service per carrier, the intermediate port
     * calls and the IMOs of the vessels operating these services.
     * You can also pass a carrier SCAC to filter on the services operated by this carrier.
     *
     *
     * @summary Find a service by name
     * @throws FetchError<400, types.GetServiceByNameResponse400> Bad request.
     * @throws FetchError<404, types.GetServiceByNameResponse404> Service not found.
     */
    getServiceByName(metadata: types.GetServiceByNameMetadataParam): Promise<FetchResponse<200, types.GetServiceByNameResponse200>>;
    /**
     * This endpoint returns basic vessel information (imo, width (in m), length (in m),
     * maximum draft (in m)). You can search vessels by name. If several vessels match the
     * given string, up to 5 vessels can be returned.
     *
     *
     * @summary Get vessel information, by name.
     * @throws FetchError<404, types.GetVesselsByNameResponse404> Not found
     */
    getVesselsByName(metadata: types.GetVesselsByNameMetadataParam): Promise<FetchResponse<200, types.GetVesselsByNameResponse200>>;
}
declare const createSDK: SDK;
export = createSDK;
