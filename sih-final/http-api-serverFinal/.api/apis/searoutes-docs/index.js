"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var oas_1 = __importDefault(require("oas"));
var core_1 = __importDefault(require("api/dist/core"));
var openapi_json_1 = __importDefault(require("./openapi.json"));
var SDK = /** @class */ (function () {
    function SDK() {
        this.spec = oas_1.default.init(openapi_json_1.default);
        this.core = new core_1.default(this.spec, 'searoutes-docs/2.10.0 (api/6.1.2)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    SDK.prototype.config = function (config) {
        this.core.setConfig(config);
    };
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
    SDK.prototype.auth = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        (_a = this.core).setAuth.apply(_a, values);
        return this;
    };
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
    SDK.prototype.server = function (url, variables) {
        if (variables === void 0) { variables = {}; }
        this.core.setServer(url, variables);
    };
    /**
     * > **Warning :**
     * > this endpoint is a beta version, input and output contracts might change.
     *
     * ## Description
     *
     * This endpoint computes and assigns the right emissions to each order for a pickup and
     * delivery collection by road (also called milk run).
     * It uses a road freight CO2 model which is taking into account empty running distances
     * along with load factor between each pickup/delivery location.
     * This endpoint takes as input : locations and sequencing of the run, origin/destination
     * and weight for each order, and details about the asset (fuel type).
     *
     * ## Locations (run)
     *
     * A run is the itinerary taken, representing the sequence of stops made during the pickup
     * and delivery collection.
     * It is made of a list of locations which can either be coordinates (longitude, latitude)
     * or UNLOCODES.
     * The order of the location in the list is important and is used for order definition. The
     * first element in the list is the first stop and has the index 1.
     *
     * Example : FRMRS has the index 2. The location with index 4 is described as coordinates
     * (longitude, latitude)
     * ```JSON
     *  "locations": [
     *     "-1.26617431640625,50.79551936692376",
     *     "FRMRS",
     *     "FRQXB",
     *     "8.8330078125,53.88491634606499",
     *     "FRVAF"
     * ]
     * ```
     *
     * ## Orders
     *
     * Orders define the goods transported. Each order represents a parcel (`type = PARCEL`)
     * transported from a location to another during the run. It is mandatory to precise the
     * locations where the parcel is loaded and unloaded.
     * We use the index (position in the list of locations) for that purpose.
     * An order must also have a weight (in kilograms).
     *
     * Example of a parcel of 1500 kg moved from Marseille (FRMRS) to Valence (FRVAF) :
     *
     * ```JSON
     * {
     *   "fromIndex": 2,
     *   "toIndex": 5,
     *   "weight": 1500,
     *   "id": "ABC123",
     *   "type": "PARCEL"
     * }
     * ```
     *
     * The endpoint takes a list of orders (1 or more orders). This list must describe all the
     * goods moved during the run.
     *
     * ## Details
     *
     * Details of the truck can be passed. The CO2e calculation currently takes into account
     * the fuel type passed (`DIESEL`, `PETROL` or `LPG`) and the truck size (4 to 60 = GWV 4t
     * to 60t). If not pass, the fuel is by default `DIESEL` and the truck size is chosen to be
     * the smallest truck that can contain the orders.
     *
     * ## Metadata
     *
     * You can add any information you want to metadata object and it will be returned to you
     * in the response. Contents of metadata do not influence CO2e calculation.
     *
     * ## Response
     *
     * The response contains co2e emissions (in g) for the entire run (`co2e`) and for each
     * individual order (`orders`). The emissions are split into WTT and TTW.
     * The definition of each order is returned back (`parameters`) along with the CO2e
     * allocation (percentage of total CO2e).
     *
     * The response contains an object `parameters` which returns back the definition of the
     * run (with indices) and the details of the asset as given.
     *
     * It also contains an object `properties` which details the parameters taken into account
     * during the calculation.
     * For instance, the distance and the load factor of the truck between each stop are
     * returned as well as the total distance and the allocation method used.
     *
     * ## Methodology
     *
     * The CO2e emissions are computed along the run, for each part of it (leg). We know the
     * weight of the goods transported for each leg and can then compute precise emissions of
     * the truck with a model.
     *
     * The allocation method we use is described in the norm EN 16258. We use great circle
     * distances between the terminal location (theoretically located at an equidistant point
     * of the first and last location) and the stops of the run.
     *
     *
     * @summary Get CO2 for a complete run (Beta)
     */
    SDK.prototype.getCO2ForARun = function (body) {
        return this.core.fetch('/asset/v2/run/co2', 'post', body);
    };
    /**
     * This endpoint computes CO2e emissions (i.e CO2 equivalent emissions) for a given
     * shipment. Shipment API allows you to define multiple route legs with multiple containers
     * or parcels. The response contains CO2e per route leg as well as per order and total CO2e
     * of the shipment.
     *
     * Shipment request is a nested json on the root level, it consists of required properties
     * - `orders`, `legs` and optional properties - `metadata` and `details`.
     *
     * You can specify `details` of shipment that will be displayed on the certificate (pdf).
     * The following `details` are allowed: `id`, `referenceNumber`, `status`, `carrier.id`,
     * `carrier.scac`, `carrier.name` and `client.name`. Where `status` can be `BOOKED` or
     * `ARRIVED` and `client.name` is the name of your client. Provided carrier id, name or
     * scac are the only parameters taken into account when computing CO2e. However,
     * `legs[0].details.carrier` id, scac or name will take precedence if has been provided. To
     * be more specific, `/search/v2/carriers` endpoint can be used to retrieve a carrier
     * object by its name or scac and can be used in `details.carrier` or
     * `legs[0].details.carrier`.
     *
     * You can define list of `orders` that belong to your shipment with maximum number of 5.
     * All orders must include the `type` value. You can differentiate between container and
     * parcel shipments using different `type` values.
     *
     * The different types are `FCL` (or `CONTAINER`), `LCL` and `PARCEL` (with `PALLET` and
     * `UNIT_LOAD` as aliases).
     *
     * Each order must have at least one of the following properties: `weight` (weight of
     * orders in kg) or `quantity` (number of containers for containerized shipping). You can
     * optionally define `sizeTypeCode` (size and type of your container).
     * The supported values and their meanings are:
     * 20GP, 22G1, 2200, 22G0, 2202, 2210 (20ft, General purpose (Standard)) [Default]
     * 40GP, 42G1, 42G0, 40G1 (40ft, General purpose (Standard)),
     * 40HC, 45G1, 45G0, 4500, 4510 (40ft High cube, General Purpose),
     * 22R1, 2231 (20ft, Reefer),
     * 40NOR, 42R1, 4531 (40ft, Reefer),
     * 40REHC, 45R1, 45R8 (40ft High cube, Reefer),
     * 53GP (53ft High cube).
     * You can also optionally provide `id` of your order.
     *
     * Field `legs` is a list of routes that are part of the shipment. Maximum number of legs
     * is 10.
     * Each _leg_ requires `from` and `to` (origin and destination). The value could be
     * coordinates `"59.11;6.14"` or a string that could be geolocated `"hamburg"`.
     * Each _leg_ requires a `mode`. The following modes are supported: `sea`, `road`, `rail`,
     * `inland-water` and `air`.
     * Each _leg_ can have an optional `details`. For all _modes_ you can specify `dateTime`
     * with `arrival` and `departure` properties in ISO_8601 format, preferrably with timezone
     * `YYYY-MM-DDTHH-mm-ssTZD` (`2022-02-22T15:00:00+01:00`). if you want to use different
     * distance than the one we calculate you can specify optional `distance` property.
     * - For **mode sea** you can specify `details.voyageNumber` and `details.vessel`. Object
     * `vessel` has two properties `name` and `imo`. Specifying `imo` of the `vessel` increases
     * accuracy of CO2e values. Different way of improving accuracy of CO2e values is defining
     * a carrier or `details.fuelType`. You can define `details.carrier.id`,
     * `details.carrier.name` or `details.carrier.scac` per leg. In this case, you receive CO2e
     * values that are calculated as average values of all the itineraries for given carrier on
     * given route. If you define `details.carrier.scac` you are required to use UNLOCODES for
     * origin (`from`) and destination (`to`) of your leg. Passing coordinates or location
     * string will not pass our validation. If you provide both a vessel imo and a carrier id,
     * scac or name the imo will take the precedence over the carrier.
     *
     * - For **modes road and rail** you can specify `details.fuelType` to get a more accurate
     * CO2e. Furthermore, you can specify `details.truckSize` (integer) for mode `road`. If you
     * don't pass the trucksize we will choose appropriate truckSize for you. To improve
     * accuracy of CO2e values for mode `road` you can define `details.carrier.id`,
     * `details.carrier.name` or `details.carrier.scac`. This works only for North America
     * region and the computation uses SmartWay carrier data (Dray (CONTAINER) and Mix
     * (AVERAGE_MIXED)). If the SCAC passed is not valid or we don't have enough data to
     * compute CO2e, the computation will be based on GLEC defaults.
     *
     * - For **mode inland-water** you can specify `vesselType` with one of the following
     * values: `MOTOR_VESSEL`, `COUPLED_CONVOY`, `PUSHED_CONVOY`, `CONTAINER_VESSEL_110`,
     * `CONTAINER_VESSEL_135` or `CONTAINER_COUPLED`. Default value is `MOTOR_VESSEL.`
     *
     * - For **mode air** you can specify `details.aircraft` with two optional properties:
     * `iata` (IATA designator of the aircraft type) and `type` (either `PASSENGER` or
     * `CARGO`). `air` mode can be used only for LCL shipment
     *
     * Each _leg_ can have optional `metadata`. You can add any information you want to
     * `metadata` object and it will be returned to you in the response. Contents of `metadata`
     * do not influence CO2e calculation.
     *
     * You can generate a certificate document (pdf) by setting the optional query parameter
     * `generateCertificate` to `true`.
     *
     * ### Hubs
     *
     * Logistics hubs are locations where freight is stored and processed, and handled from one
     * vehicle or transport mode to another.
     *
     * Hubs are an integral part of a shipment transport flow, and as such, their impact is not
     * to be overlooked. Our Shipment API allows you to define hubs for your shipment. You can
     * define hub as a leg with mode `hub`. This type of leg does not have common leg
     * properties which we mentioned above. You can define `detail` object with property
     * `hubType`. HubType must be one of the following value: `WAREHOUSE`, `TRANSHIPMENT_SITE`,
     * `STORAGE_TRANSHIPMENT`, `LIQUID_BULK_TERMINAL`, `MARITIME_CONTAINER_TERMINAL`.
     *
     * This is an example of such a leg:
     * ```JSON
     * ...
     * {
     *   "mode": "hub",
     *   "details": {
     *     "hubType": "TRANSHIPMENT_SITE"
     *     }
     * }
     * ...
     * ```
     *
     *
     *
     *
     *
     *
     *
     * ### Container shipment
     *
     * For a container shipment the `type` of `orders` is required. The type can be
     * `CONTAINER`, `FCL` or `LCL`. Result depends on `sizeTypeCode` and `quantity` of `orders`
     * (1 by default), and if you provide the `weight` of the goods, this value will take
     * priority over the `quantity` for the CO2 calculation in road and rail but also in sea
     * and inland waters mode for LCL only.
     * See list of available `sizeTypeCodes` above. Container shipment cannot be used in
     * combination with `air` transport.
     *
     * Example of defined orders for container shipment:
     *
     * ```JSON
     * "orders": [{
     *   "type": "CONTAINER",
     *   "quantity": 2,
     * }, {
     *   "type": "CONTAINER",
     *   "quantity": 1,
     *   "sizeTypeCode": "40GP"
     * }]
     * ```
     *
     * ### Parcel shipment
     *
     * For a parcel shipment the `weight` of `orders` and `type` are required. See list of
     * available parcel aliases above. Defining `quantity` of `orders` makes the request a
     * container shipment.
     *
     * Example of defined order for parcel shipment:
     *
     * ```JSON
     * orders: [{
     *   type: "PALLET",
     *   weight: 7000, // in kilograms
     * }]
     * ```
     *
     * ## Response
     *
     * The response contains `parameters` object which consist of `orders` and `type` specified
     * in the request. `co2e` object stands for CO2e of entire shipment. You can also find
     * `co2e` object in each `leg`. It has following properties: `co2e.total` (value in grams),
     * `co2e.ttw` (Tank to Wheel - value in grams), `co2e.wtt` (Well to Tank - value in grams)
     * and `co2e.intensity` (value in Kg CO2e / t.km).
     *
     * Legs also have `properties` field with data that were used to compute CO2e. You can find
     * common properties for all leg - order CO2e requests in the root of the properties and
     * order specific data in particular order object for instance `properties.orders[0]`. Each
     * order contains CO2e object and has a common structure accross the whole shipment which
     * is located in `legs[0].properties.orders[0].co2e`. `Parameters` property inside a leg
     * holds `details` that were used in the request. `from` and `to` are objects containing
     * `coordinates`, `locode` (if exists), `country` and `city`.
     *
     * The `certificateUrl` is where you can download certificate for your shipment in pdf
     * format. We recommend saving this pdf right after receiving the response.
     *
     *
     * @summary Get CO2 for given shipment
     * @throws FetchError<400, types.GetCo2ForShipmentResponse400> Bad request
     * @throws FetchError<404, types.GetCo2ForShipmentResponse404> Not Found
     * @throws FetchError<418, types.GetCo2ForShipmentResponse418> Multiple errors
     */
    SDK.prototype.getCO2ForShipment = function (body, metadata) {
        return this.core.fetch('/shipment/v2/report/co2', 'post', body, metadata);
    };
    /**
     * This endpoint returns CO2e emissions (i.e CO2 equivalent emissions) in grams (g) for the
     * shortest path between a port of origin (from) and a port of destination (to).
     *
     * ### Origin and destination
     *
     * You must provide either `fromLocode` or `fromCoordinates` for the origin and either
     * `toLocode` or `toCoordinates` for the destination.
     * You can use the parameter `distance` (in meters) to pass your own distance (the origin
     * and destination remain mandatory because the co2 computation is region dependent).
     *
     *
     * ### Vessel information
     *
     * You can obtain accurate CO2 values for a specific vessel by passing its IMO as a query
     * parameter. If we cannnot find enough data on the IMO you passed as a parameter, if you
     * pass a wrong IMO number or if you pass no IMO, we estimate the CO2e emissions based on
     * the trade lane (with 30 trade lanes supported) using the GLEC coefficients.
     *
     * #### Fuel types
     *
     * When a vessel IMO number is provided, we use its fuel type for emission factors, taking
     * into account if necessary fuel switches within SECA zones (ie VLSFO -> LSMDO).
     * Presence of a scrubber is also taken into account for emissions within SECA zones.
     *
     * If the fuel type for the vessel is missing from our dataset, we will use VLSFO as
     * default value since it is IMO 2020 compatible. The optional customer parameter
     * `fuelType` will overwrite the vessel’s default fuel if it is physically compatible with
     * the structure of the vessel.
     * For example, ULSFO or UCO for ships running on HFO, or VLSFO or BIOLNG for LNG ships
     * using dual engines will be taken into account, but METHANOL for a HFO vessel will not.
     * The fuel type taken into account for CO2 calculation is specified in the response
     * (`fuelType` in properties).
     *
     * When no IMO number is provided, the response will use GLEC emission factors and
     * `fuelType` parameter will not have an impact on the result.
     *
     * ### Cargo specifications (container only)
     *
     * We provide CO2 calculation for FCL and LCL. We support dry and reefer container types
     * (`containerSizeTypeCode`).
     * The following types are supported by our API :
     * 20GP, 22G1, 2200, 22G0, 2202, 2210 (20ft, General purpose (Standard)) [Default]
     * 40GP, 42G1, 42G0, 40G1 (40ft, General purpose (Standard)),
     * 40HC, 45G1, 45G0, 4500, 4510 (40ft High cube, General Purpose),
     * 22R1, 2231 (20ft, Reefer),
     * 40NOR, 42R1, 4531 (40ft, Reefer),
     * 40REHC, 45R1, 45R8 (40ft High cube, Reefer),
     * 53GP (53ft High cube).
     *
     *
     * ### Routing parameters
     *
     * #### Avoid zones
     *
     * ECA zones can be avoided by using the parameter `avoidSeca`. In that case, the distance
     * travelled in the ECA zone is minimized.
     * The HRA (high risk area) zone can be avoided using parameter `avoidHRA`. If no points
     * from the query are in the HRA zones, the zone will be totally avoided, if at least one
     * point is in the HRA zone, the route will go through it but minimize the distance
     * navigated in it.
     *
     * #### Ice areas and block areas
     *
     * By default, the seas that are difficult to sail due to the presence of ice are not
     * allowed (for example the Bering Sea, the Northern Sea Route, etc). You can allow the
     * route to go through these zones by using the `allowIceAreas` parameter.
     * It is possible to block some areas by using the parameter `blockAreas` which takes a
     * list of ids (Panama Canal : 11112 , Suez Canal : 11117). In that case, the route won't
     * cross the areas blocked.
     *
     * ### Impact of the weight and number of containers on CO2e emissions and intensity
     * calculation
     *
     * #### For CO2e emissions:
     * The CO2e emissions only depend on the number of containers (`nContainers`). If you don't
     * know the `nContainers` but you know the total weight of the goods, our algorithm will
     * estimate the `nContainers` based on the `weight`.
     * If neither `nContainers` nor `weight` are provided, by default, we return emissions for
     * one TEU (20G1, Dry).
     *
     * #### For CO2e intensity:
     * The CO2e intensity depends on the `weight`. If you don't know the `weight` but you know
     * the `nContainers`, our algorithm will estimate the `weight` based on the `nContainers`.
     *
     * *Note that you can give a non integer number of containers that allows you to calculate
     * CO2e for LCL.*
     *
     *
     * ### Response
     *
     * The response contains CO2e WTW (well-to-wheels) emissions in grams (g) for the shortest
     * route between origin and destination ports. We also provide detailed emissions with TTW
     * (tank-to-wheels) emissions and WTT (well-to-tank) emissions. The method takes into
     * account the emissions caused by the fuel consumption of the main engines, the auxiliary
     * engines and the boilers.
     *
     * The response also returns the intensity factor (kg of CO2e per ton.kilometer) which is
     * calculated based on the CO2e WTW, distance and the weight provided. If no weight has
     * been provided, we estimate the weight based on the number of containers and their type
     * (`weight` in `properties`)
     *
     * The `parameters` field in the response contains all the parameters that were given in
     * the request.
     *
     * The `properties` field in the response gives some data that was used to calculate the
     * CO2 based on the parameters for example the distance, the distance in ECA zones, some
     * data about the vessel, the trade lane, etc. The property `dataType` precise if the data
     * used to calculate the CO2 emissions is `default` data (representative of average
     * operating practices) or `modeled` data (taking into account vehicle information).
     *
     * Note that the distance we use to calculate CO2e is 15% higher than the shortest distance
     * (returned in the response in meters (m)) as recommended by the GLEC framework to take
     * into account the stops in other ports, the weather and all other deviations from the
     * shortest route.
     *
     * ### Methodology references
     *
     * The method used to calculate emissions is based on the following references:
     * - Third IMO Greenhouse Gas Study 2014;
     * - Fourth IMO Greenhouse Gas Study 2020;
     * - EMEP/EEA air pollutant emission inventory guidebook 2019;
     * - GLEC Framework 2020.
     *
     *
     * @summary Get CO2 for a given vessel
     * @throws FetchError<400, types.GetCo2ForVesselResponse400> Bad request
     * @throws FetchError<404, types.GetCo2ForVesselResponse404> Not found
     */
    SDK.prototype.getCO2ForVessel = function (metadata) {
        return this.core.fetch('/co2/v2/direct/sea', 'get', metadata);
    };
    /**
     * This endpoint returns CO2e emissions (i.e CO2 equivalent emissions) in grams (g) for a
     * direct flight between a source airport (origin) and a target airport (destination)
     *
     * ### Origin and destination
     *
     * You can pass either a Locode (`fromLocode`, `toLocode`), coordinates (`fromCoordinates`,
     * `toCoordinates`) or a IATA airport code (`fromIata`, `toIata`) to specify the origin and
     * the destination.
     * You can use the parameter `distance` (in meters) to pass your own distance (the origin
     * and destination remain mandatory because the co2 computation is region dependent).
     *
     * ### Aircraft and methodology
     *
     * You can either pass an aircraft IATA code to get the CO2 emissions of this specific
     * aircraft or only the aircraft type. In case the IATA code is given, the emissions are
     * calculated using EEA/EMEP methodology and EUROCONTROL data. They take into account
     * take-off, landing, climbing, descent and cruising phases. In case the aircraft IATA is
     * not given, we use the GLEC emission factors based on the length (short, medium, long
     * haul) of the flight and the aircraft type (passenger, cargo or unknown).
     *
     * ### Weight
     *
     * You can pass the weight of the goods carried (in kg). The default weight is 1000 kg (1
     * metric ton)
     *
     * ### Response
     *
     * The response contains total CO2e WTW emissions and detailed emissions (in grams) : CO2e
     * WTT (well-to-tank) emissions and CO2e TTW (tank-to-wheels) for the amount of goods
     * carried.
     *
     * The response also contains the intensify factor (kg of CO2e per ton.kilometer) which is
     * calculated based on the CO2e WTW emissions, the distance and the weight passed.
     *
     * The response contains the parameters passed in the request and the used values of the
     * parameters if they were not passed.
     *
     * The `properties` field contains useful information about the data that was used for the
     * calculation. For example the name, and model of the aircraft, the distance, etc. The
     * property `dataType` precise if the data used to calculate the CO2 emissions is `default`
     * data (representative of average operating practices) or `modeled` data (taking into
     * account vehicle information).
     *
     * ### Methodology references
     *
     * The method uses CO2e emission factors from fuel consumption and distance calculation in
     * accordance with EN 16258.
     *
     *
     * @summary Get CO2 for a given aircraft
     * @throws FetchError<400, types.GetCo2ForAircraftResponse400> Bad request
     * @throws FetchError<404, types.GetCo2ForAircraftResponse404> Not found
     */
    SDK.prototype.getCO2ForAircraft = function (metadata) {
        return this.core.fetch('/co2/v2/direct/air', 'get', metadata);
    };
    /**
     * This endpoint returns CO2e emissions (i.e CO2e equivalent emissions) in grams (g) for a
     * voyage from a given inland port to another using the inland waterways network.
     *
     * ### Origin and destination
     *
     * The origin and destination ports can be given either as locodes or as coordinates.
     * You must provide either `fromLocode` or `fromCoordinates` and either `toLocode` or
     * `toCoordinates`.
     * You can use the parameter `distance` (in meters) to pass your own distance (the origin
     * and destination remain mandatory because the co2 computation is region dependent).
     *
     * ### Cargo specifications
     *
     * Several parameters allow you to define the specification of the cargo carried :
     * `nContainers`, `containerSizeTypeCode`, `weight`.
     * The following container types are supported by our API :
     * 20GP, 22G1, 2200, 22G0, 2202, 2210 (20ft, General purpose (Standard)) [Default]
     * 40GP, 42G1, 42G0, 40G1 (40ft, General purpose (Standard)),
     * 40HC, 45G1, 45G0, 4500, 4510 (40ft High cube, General Purpose),
     * 22R1, 2231 (20ft, Reefer),
     * 40NOR, 42R1, 4531 (40ft, Reefer),
     * 40REHC, 45R1, 45R8 (40ft High cube, Reefer),
     * 53GP (53ft High cube).
     *
     * Here are common use cases :
     *
     * #### FCL
     * use the parameters `nContainers` and `containerSizeTypeCode`. We recommend to use the
     * parameter `containerSizeTypeCode` to precise the size and type of the containers. We
     * will estimate the weight of the cargi based on the container specifications providesd.
     *
     * #### LCL
     * use the parameters `weight` in combination with an appropriate `containerTypeSizeCode`
     * (In case of reefer, you can choose 22R1)
     *
     * #### Default
     * Use the parameters `weight` without container specifications.
     *
     *
     * ### Vessel
     *
     * If known, the type of inland vessel can be given. By default, a motor vessel is always
     * used to compute CO2e (`MOTOR_VESSEL`).
     *
     * ### Response
     *
     * The response contains WTT (well-to-tank) and TTW (tank-to-wheels) CO2e emissions in
     * grams (g) for the amount of goods carried. It also contains the intensity factor (kg of
     * CO2e per ton.kilometer) which is calculated from the WTW CO2e emissions, the distance
     * and the weight (in `properties`).
     *
     * The response contains a `parameters` field which contains all the parameters that were
     * passed in the query and the default values if some parameters were not passed.
     *
     * The response contains a `properties` field which contains the useful information that
     * was used for the calculation, for example the distance of the route calculated. The
     * property `dataType` precises if the data used to calculate the CO2 emissions is
     * `default` data (representative of average operating practices) or `modeled` data (taking
     * into account vehicle information).
     *
     * ### Methodology references
     *
     * The emissions are calculated using the GLEC framework.
     *
     *
     * @summary Get CO2 for inland waters
     * @throws FetchError<400, types.GetCo2ForInlandWaterResponse400> Bad request
     * @throws FetchError<404, types.GetCo2ForInlandWaterResponse404> Not found
     */
    SDK.prototype.getCO2ForInlandWater = function (metadata) {
        return this.core.fetch('/co2/v2/direct/inland-water', 'get', metadata);
    };
    /**
     * This endpoint returns CO2e emissions (i.e., CO2e equivalent emissions) in grams (g) for
     * a train voyage between two specified train stations.
     *
     * ### Origin and destination
     *
     * The train stations can be given either as locodes or as coordinates.
     * You must provide either `fromLocode` or `fromCoordinates` and either `toLocode` or
     * `toCoordinates`.
     *
     * We currently support calculation within these regions: Europe, North America, South
     * America, Asia, Oceania, Europe/Asia, and Africa. Please note that both origin and
     * destination must be in the same region.
     *
     * The distance between the origin and destination is computed using rail networks.
     * However, you can use your own computed distance (in meters) using the `distance`
     * parameter.
     * It's important to note that while custom distance input is accepted, both the origin and
     * destination remain mandatory as CO2e computation is region-dependent.
     *
     * ### Cargo specifications
     *
     * Several parameters allow to define the specification of the cargo carried:
     * `nContainers`, `containerSizeTypeCode`, `weight` and `loadCharacteristics`.
     *
     * The following container types are supported by our API:
     * 20GP, 22G1, 2200, 22G0, 2202, 2210 (20ft, General purpose (Standard)) [Default]
     * 40GP, 42G1, 42G0, 40G1 (40ft, General purpose (Standard)),
     * 40HC, 45G1, 45G0, 4500, 4510 (40ft High cube, General Purpose),
     * 22R1, 2231 (20ft, Reefer),
     * 40NOR, 42R1, 4531 (40ft, Reefer),
     * 40REHC, 45R1, 45R8 (40ft High cube, Reefer),
     * 53GP (53ft High cube).
     *
     * **Here are two common use cases:**
     *
     * #### Container
     *
     * For a container, use the parameters `nContainers` and `containerSizeTypeCode`.
     * Additionaly, you can set the parameter `loadCharacteristics` to `CONTAINER`.
     *
     * If you also provide the `weight` of the goods, this value will take priority over the
     * `nContainers`. If `weight` is not provided, an average of 10 tons per TEU will be taken
     * into account for CO2e calculations.
     *
     * #### Average
     *
     * If you do not specify `loadCharacteristics`, or container specifications, we assume you
     * have a cargo of type `AVERAGE_MIXED`. The default weight in that case is 1 metric ton,
     * but it can be specified if known.
     *
     * ### Fuel
     *
     * The fuel type can be specified when known. Please note that certain fuel types may not
     * be supported in all regions.
     *
     * ### Response
     *
     * The response contains WTT (well-to-tank) and TTW (tank-to-wheels) CO2e emissions in
     * grams (g) for the amount of goods carried. It also contains the intensity factor (kg of
     * CO2e per ton.kilometer) which is calculated from the WTW CO2e emissions, the distance
     * and the weight (in `properties`).
     *
     * A `parameters` field is present, containing all the parameters that were passed in the
     * query and the default values if some parameters were not passed.
     *
     * Additionally, a `properties` field, which contains useful information used for the
     * calculation, for example, the distance. The property `dataType` specifies if the data
     * used to calculate the CO2e emissions is `default` data (representative of average
     * operating practices) or `modeled` data (taking into account vehicle information).
     *
     * ### Methodology references
     *
     * The emissions are calculated using the GLEC framework.
     *
     *
     * @summary Get CO2 for rail
     * @throws FetchError<400, types.GetCo2ForRailResponse400> Bad request
     * @throws FetchError<404, types.GetCo2ForRailResponse404> Not found
     */
    SDK.prototype.getCO2ForRail = function (metadata) {
        return this.core.fetch('/co2/v2/direct/rail', 'get', metadata);
    };
    /**
     * This endpoint returns CO2e emissions (i.e., CO2 equivalent emissions) in grams (g) for a
     * voyage from a city to another by road.
     *
     * ### Origin and destination
     *
     * The source and destination can be given either by locode or coordinates.
     * You must provide either `fromLocode` or `fromCoordinates` and either `toLocode` or
     * `toCoordinates`.
     *
     * The emissions are calculated using the real road network distance and based on the
     * region. However, you can use the parameter `distance` (in meters) to pass your own
     * distance (the origin and destination remain mandatory because the co2e computation is
     * region-dependent).
     *
     * Supported regions are: Europe, North America, Ocenia South America, Africa and Asia.
     * Please note that both origin and destination must be in the same region.
     *
     * ### Cargo specifications
     *
     * Container specifications such as `nContainers`, `nContainers`, `weight` and
     * `loadCharacteristics` define the cargo specifications.
     *
     * The following container types are supported by our API:
     * 20GP, 22G1, 2200, 22G0, 2202, 2210 (20ft, General purpose (Standard)) [Default]
     * 40GP, 42G1, 42G0, 40G1 (40ft, General purpose (Standard)),
     * 40HC, 45G1, 45G0, 4500, 4510 (40ft High cube, General Purpose),
     * 22R1, 2231 (20ft, Reefer),
     * 40NOR, 42R1, 4531 (40ft, Reefer),
     * 40REHC, 45R1, 45R8 (40ft High cube, Reefer),
     * 53GP (53ft High cube).
     *
     * **Here are some use cases:**
     *
     * #### Container
     *
     * For a container use the parameters `nContainers` and `containerSizeTypeCode`.
     *
     * If you also provide the `weight` of the goods, this value will take priority over the
     * `nContainers`.
     * If `weight` is not provided, an average of 10 tons per TEU will be taken into account
     * for CO2e calculations.
     *
     * You can also pass a `truckSize` and a `fuelType`. Not all combinations are usable: in
     * order to limit the errors and return CO2e emissions in most cases, we adapt `truckSize`
     * and `fuel` parameters passed.
     *
     * If you do not specify a `truckSize`, an appropiate one will be chosen for you (except if
     * you pass one).
     *
     * The parameters actually used are listed in the `properties` object of the response.
     *
     * #### Average
     *
     * If you do not specify the `weight` or the `loadCharacteristics`, we assume you have a
     * cargo of type `AVERAGE_MIXED`. The default weight in that case is 1 metric ton of goods
     * in the worst case scenario (smallest truck) (`loadCharacteristics = AVERAGE_MIXED or
     * DEFAULT`).
     *
     * If the `weight` is specified, you must also provide the size of the truck (gross vehicle
     * weight in tons) except for North America and Oceania, where the truck size is not taken
     * into account.
     *
     * ### Truck specifications
     *
     * For regions including Europe, South America, Africa and Asia, you can pass a `truckSize`
     * (gross vehicle weight - GVW) for more accurate results.
     *
     * ### Fuel specifications
     *
     * For greater accuracy in CO2e values, you can specify the fuel type from the following
     * options:
     *
     * - DIESEL
     * - CNG
     * - LNG
     * - HVO
     * - ELEC
     * - BIOLNG
     * - BIOCNG
     * - BIODIESEL
     * - HYDROGEN_GASEOUS_FCV
     *
     * Diesel-Biodiesel blends:
     *
     * - DIESEL99_BIODIESEL1 (99% Diesel, 1% Biodiesel)
     * - DIESEL98_BIODIESEL2 (98% Diesel, 2% Biodiesel)
     * - DIESEL95_BIODIESEL5 (95% Diesel, 5% Biodiesel)
     * - DIESEL93_BIODIESEL7 (93% Diesel, 7% Biodiesel)
     * - DIESEL90_BIODIESEL10 (90% Diesel, 10% Biodiesel)
     * - DIESEL80_BIODIESEL20 (80% Diesel, 20% Biodiesel)
     * - DIESEL50_BIODIESEL50 (50% Diesel, 50% Biodiesel)
     *
     * For `ELEC` the calculation uses local emission factors from the origin.
     *
     * Additionally, for vans weighing less than 3.5t, you may select `LPG` and `PETROL` as
     * fuel options in regions including Europe, South America, Africa and Asia.
     *
     * ### Carrier specifications (North America)
     *
     * We can compute CO2e for a given truck carrier (identified by its SCAC). This is only
     * available in North America (the from/to locations should be within this region) and the
     * computation uses SmartWay carrier data (Dray (CONTAINER) and Mix (AVERAGE_MIXED)).
     *
     * You can use the parameter `carrierScac` (which is a carrier alpha code identifier) to
     * select the carrier.
     * Note that in that case we only support DIESEL as fuel type and the `truckSize` cannot be
     * changed. If the SCAC passed is not valid or we don't have enough data to compute CO2e,
     * the computation will be based on GLEC defaults. In that case, the `carrierScac` property
     * in the field `properties` of the response is set to `null`.
     *
     * ### Response
     *
     * The response contains WTW (well-to-wheels) CO2e emissions in grams (g) for the amount of
     * goods carried and detailed emissions: WTT (well-to-tank) and TTW (tank-to-wheels). It
     * also contains the intensity factor (kg of CO2e per ton.kilometer) which is calculated
     * from the WTW CO2e emissions, the distance and the weight (in `properties`).
     *
     * The field `parameters` contains the parameters that were passed in the query and the
     * default values that were used. Depending on the combination of parameters you enter, the
     * default values for other parameters may vary. For example, the default `truckSize` for
     * average mixed goods is 3t while it is 33t for container.
     *
     * The field `properties` contains information about the data that was used for the
     * calculation, for example the distance, some characteristics about the truck, the
     * hypothesis made for load factor, etc. The property `dataType` indicates whether the data
     * used to calculate the CO2 emissions is `default` data (representative of average
     * operating practices) or `modeled` data (which takes into account specific vehicle
     * information).
     *
     * ### Methodology references
     *
     * The emissions are calculated using the GLEC framework or SmartWay Carrier data.
     * You can find detailed information about the calculation and the hypothesis in our Guide
     * section.
     *
     *
     * @summary Get CO2 for road
     * @throws FetchError<400, types.GetCo2ForRoadResponse400> Bad request
     * @throws FetchError<404, types.GetCo2ForRoadResponse404> Not found
     */
    SDK.prototype.getCO2ForRoad = function (metadata) {
        return this.core.fetch('/co2/v2/direct/road', 'get', metadata);
    };
    /**
     * Retrieve information from AIS and return general information about the vessel together
     * with its last known position, its last known speed (in km/h) and its current draft (in
     * m).
     *
     * If an IMO was not found, the object at its position is `null`.
     *
     *
     * @summary Get vessels positions
     * @throws FetchError<400, types.GetVesselPositionResponse400> Bad request
     * @throws FetchError<503, types.GetVesselPositionResponse503> Service unavailable.
     */
    SDK.prototype.getVesselPosition = function (metadata) {
        return this.core.fetch('/vessel/v2/{imo}/position', 'get', metadata);
    };
    /**
     * This endpoint returns the historical trace of a given vessel between two dates in the
     * past. The successive positions of the vessel are retrieved from AIS and processed to
     * determine the geometry and route statistics.
     *
     * ### Vessel information
     * The vessel can be identified either by its `imo` number or its `mmsi`. In the case both
     * are given, the `mmsi` will be taken into account.
     *
     * ### Dates
     * This endpoint takes two dates for the beginning and the end of the trace. Both are
     * required and can be passed using the ISO 8601 format (`departureDateTime` and
     * `arrivalDateTime`) or the unix time in milliseconds (`departure` and `arrival`).
     *
     * ### Response
     * The response is a Geojson `FeatureCollection`. The trace is represented as a `Feature` :
     * its geometry is a MultiLineString (cut at the antimeridian if crossed) and its
     * properties give information about the route (distance, areas crossed, average speed).
     * Total distance + distances in Seca zones and HRA are returned.
     * Note that the average speed is computed for the entire trace. If the vessel stops
     * multiple days, the average speed can be low.
     *
     *
     * @summary Get trace of a given vessel
     * @throws FetchError<400, types.GetVesselTraceResponse400> Bad request
     * @throws FetchError<404, types.GetVesselTraceResponse404> Not found
     * @throws FetchError<503, types.GetVesselTraceResponse503> Service is unavailable.
     */
    SDK.prototype.getVesselTrace = function (metadata) {
        return this.core.fetch('/vessel/v2/trace', 'get', metadata);
    };
    /**
     * Get historical, real or forecasted weather information at a given location.
     *
     * In the response, we return the closest point, on a 0.5 degree grid, at which our models
     * computed weather information (wind, waves, current, etc.). Likewise, we find the closest
     * timestamp to your requested timestamp for which we have data. For instance, when
     * requesting weather information at the point `{"latitude": 17.152, "longitude": -80.564,
     * "timestamp": 1548388800000}`, we return data for our closest point ` {"latitude": 17,
     * "longitude": -80.5, "timestamp": 1548385200000}`.
     *
     * All values are expressed in the standard SI units (temperatures in Celcius degrees,
     * humidity, cloud coverage and ice coverage in percentages, pressure in hectopascals,
     * precipitation in millimeters, times in seconds, distances in meters, speeds in meters
     * per second, salinity in PSU).
     *
     *
     * @summary Get latest weather at location
     * @throws FetchError<400, types.GetWeatherResponse400> Bad request
     */
    SDK.prototype.getWeather = function (metadata) {
        return this.core.fetch('/weather/v2/current', 'get', metadata);
    };
    /**
     * Get historical weather information in bulk, at a given location, for the period
     * 2013-today. By default we return weather information every 3 hours for your requested
     * timeframe. You cannot request data for more than two weeks at a time.
     *
     * All values are expressed in the standard SI units (temperatures in Celcius degrees,
     * humidity, cloud coverage and ice coverage in percentages, pressure in hectopascals,
     * precipitation in millimeters, times in seconds, distances in meters, speeds in meters
     * per second, salinity in PSU).
     *
     *
     * @summary Get historical weather at location
     * @throws FetchError<400, types.GetWeatherTimeFrameResponse400> Bad request
     */
    SDK.prototype.getWeatherTimeFrame = function (metadata) {
        return this.core.fetch('/weather/v2/history', 'get', metadata);
    };
    return SDK;
}());
var createSDK = (function () { return new SDK(); })();
module.exports = createSDK;
