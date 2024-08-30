declare const GetCarrierById: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly default: 21;
                    readonly type: "integer";
                    readonly examples: readonly [21];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The id of the carrier";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "404": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetCarrierByNameOrScac: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly name: {
                    readonly default: "MSC";
                    readonly type: "string";
                    readonly examples: readonly ["MSC"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The name or partial name to search.";
                };
                readonly scac: {
                    readonly type: "string";
                    readonly examples: readonly ["MSCU"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The SCAC of the searched carrier.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "404": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetGeocodingAirport: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly query: {
                    readonly default: "YUL";
                    readonly type: "string";
                    readonly examples: readonly ["BRTBT"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A partial string used for search. For instance, part of an airport name or part of a locode";
                };
                readonly iataCode: {
                    readonly type: "string";
                    readonly examples: readonly ["BRTBT"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A string representing the iata code of the searched airport.";
                };
                readonly locode: {
                    readonly type: "string";
                    readonly examples: readonly ["FRMRS"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A string representing the locode of the searched airport.";
                };
                readonly sizes: {
                    readonly type: "string";
                    readonly examples: readonly ["large,medium"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A list of strings used to filter the location by size. Permitted values are `large`, `medium`, `small`. If not passed, all the sizes will be taken into account.";
                };
                readonly countryCodes: {
                    readonly type: "string";
                    readonly examples: readonly ["CA,FR"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A list of country codes (2 characters ISO) used to filter the location by country.";
                };
                readonly excludeCountryCodes: {
                    readonly type: "string";
                    readonly examples: readonly ["US,MX"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A list of country codes (2 characters ISO) used to exclude location of some countries.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "404": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "503": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetGeocodingAll: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly query: {
                    readonly default: "Montreal";
                    readonly type: "string";
                    readonly examples: readonly ["Montreal"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A partial string used for search. For instance, part of an airport name or part of a locode";
                };
                readonly postalCode: {
                    readonly type: "string";
                    readonly examples: readonly [13002];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A string denoting the postal code.";
                };
                readonly locode: {
                    readonly type: "string";
                    readonly examples: readonly ["FRMRS"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A string representing the locode of the searched airport.";
                };
                readonly iataCode: {
                    readonly type: "string";
                    readonly examples: readonly ["YUL"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A string representing the iata code of the searched airport.";
                };
                readonly locationTypes: {
                    readonly type: "string";
                    readonly examples: readonly ["port,airport,railTerminal"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A list of strings used to filter the location types. Permitted values are `port`, `airport`, `zipcode`, `railTerminal`, `roadTerminal`. If not passed, all the types will be taken into account.";
                };
                readonly sizes: {
                    readonly type: "string";
                    readonly examples: readonly ["large,medium"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A list of strings used to filter the location by size. Permitted values are `large`, `medium`, `small`. Note that this parameter is available for airports search only. If not passed, all the sizes will be taken into account.";
                };
                readonly countryCodes: {
                    readonly type: "string";
                    readonly examples: readonly ["DE,FR"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A list of country codes (2 characters ISO) used to filter the location by country.";
                };
                readonly excludeCountryCodes: {
                    readonly type: "string";
                    readonly examples: readonly ["US,CA"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A list of country codes (2 characters ISO) used to exclude location of some countries.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "503": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetGeocodingArea: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly name: {
                    readonly default: "panama";
                    readonly type: "string";
                    readonly examples: readonly ["panam"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A partial string, with at least 3 characters";
                };
            };
            readonly required: readonly ["name"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "integer";
                    readonly examples: readonly [4];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "An integer to limit the number of results";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "404": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetGeocodingClosest: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly coordinates: {
                    readonly default: "9.965629577636719,53.53296196255539";
                    readonly type: "string";
                    readonly examples: readonly ["9.965629577636719,53.53296196255539"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "coordinates pair of the point as `longitude,latitude`. Longitude should be between -180 and 180 degrees, and latitude between -90 and 90 degrees.";
                };
            };
            readonly required: readonly ["coordinates"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly radius: {
                    readonly type: "number";
                    readonly examples: readonly [10000];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "the radius of the geographical circle used to search closest locations (in meters). If not passed, the closest locations are retrieved.";
                };
                readonly locationTypes: {
                    readonly type: "string";
                    readonly examples: readonly ["port,airport,railTerminal"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A list of strings used to filter the location types. Permitted values are `port, airport, zipcode, railTerminal, roadTerminal`. If not passed, all the types will be taken into account.";
                };
                readonly sizes: {
                    readonly type: "string";
                    readonly examples: readonly ["large,medium"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A list of strings used to filter the location by size. Permitted values are `large`, `medium`, `small` and `tiny`. Note that this parameter is available for ports and airports search only. If not passed, all the sizes will be taken into account.";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly examples: readonly [10];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The maximum number of results (between 0 and 50). If not passed, the default limit is 1.";
                };
                readonly countryCodes: {
                    readonly type: "string";
                    readonly examples: readonly ["DE,FR"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A list of country codes (2 characters ISO) used to filter the location by country.";
                };
                readonly excludeCountryCodes: {
                    readonly type: "string";
                    readonly examples: readonly ["US,CA"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A list of country codes (2 characters ISO) used to exclude location of some countries.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "503": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetGeocodingPlace: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly coordinates: {
                    readonly default: "14.27621841430664,40.84464176925914";
                    readonly type: "string";
                    readonly examples: readonly ["14.27621841430664,40.84464176925914"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A pair `longitude,latitude`. Longitude should be between -180 and 180 degrees, and latitude between -90 and 90 degrees.";
                };
            };
            readonly required: readonly ["coordinates"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly description: "GeoJSon object\nThe coordinate reference system for all GeoJSON coordinates is a geographic coordinate reference system, using the World Geodetic System 1984 (WGS 84) datum, with longitude and latitude units of decimal degrees. This is equivalent to the coordinate reference system identified by the Open Geospatial Consortium (OGC) URN An OPTIONAL third-position element SHALL be the height in meters above or below the WGS 84 reference ellipsoid. In the absence of elevation values, applications sensitive to height or depth SHOULD interpret positions as being at local ground or sea level.\n";
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly enum: readonly ["Feature", "FeatureCollection", "Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon", "GeometryCollection"];
                    readonly description: "`Feature` `FeatureCollection` `Point` `MultiPoint` `LineString` `MultiLineString` `Polygon` `MultiPolygon` `GeometryCollection`";
                };
                readonly bbox: {
                    readonly description: "A GeoJSON object MAY have a member named \"bbox\" to include information on the coordinate range for its Geometries, Features, or FeatureCollections. The value of the bbox member MUST be an array of length 2*n where n is the number of dimensions represented in the contained geometries, with all axes of the most southwesterly point followed by all axes of the more northeasterly point. The axes order of a bbox follows the axes order of geometries.\n";
                    readonly type: "array";
                    readonly items: {
                        readonly type: "number";
                    };
                };
            };
            readonly required: readonly ["type"];
            readonly discriminator: {
                readonly propertyName: "type";
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetGeocodingPort: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly locode: {
                    readonly type: "string";
                    readonly examples: readonly ["FRMRS"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A string representing the locode of the searched airport.";
                };
                readonly query: {
                    readonly default: "FRMRS";
                    readonly type: "string";
                    readonly examples: readonly ["FRMRS"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A partial string used for search. For instance, part of an port name or part of a locode.";
                };
                readonly sizes: {
                    readonly type: "string";
                    readonly examples: readonly ["large,medium"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A list of strings used to filter the locations by size. Permitted values are `large`, `medium`, `small`, `tiny`. If not passed, all the sizes will be taken into account.";
                };
                readonly countryCodes: {
                    readonly type: "string";
                    readonly examples: readonly ["DE,FR"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A list of country codes (2 characters ISO) used to filter the locations by country.";
                };
                readonly excludeCountryCodes: {
                    readonly type: "string";
                    readonly examples: readonly ["US,CA"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A list of country codes (2 characters ISO) used to exclude locations of some countries.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "404": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "503": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetGeocodingZip: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly countryCodes: {
                    readonly default: "FR";
                    readonly type: "string";
                    readonly examples: readonly ["FR"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A two letter string denoting the country.";
                };
                readonly postalCode: {
                    readonly type: "string";
                    readonly examples: readonly [13005];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A string denoting the postal code. Either `query` or `postalCode` must be given.";
                };
                readonly query: {
                    readonly default: "Montreal";
                    readonly type: "string";
                    readonly examples: readonly ["Montreal"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A partial string used for search. For instance, part of the city name. Either `query` or `postalCode` must be given.";
                };
                readonly country: {
                    readonly default: "FR";
                    readonly type: "string";
                    readonly deprecated: true;
                    readonly examples: readonly ["FR"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Deprecated, use `countryCodes`";
                };
                readonly postal: {
                    readonly default: 13005;
                    readonly type: "string";
                    readonly deprecated: true;
                    readonly examples: readonly [13005];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Deprecated, use `postalCode`.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "404": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "503": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetServiceById: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly default: 214;
                    readonly type: "integer";
                    readonly examples: readonly [214];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The id of the service";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "404": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetServiceByName: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly name: {
                    readonly default: "FAL6";
                    readonly type: "string";
                    readonly examples: readonly ["FAL6"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The id of the service";
                };
                readonly carrierScac: {
                    readonly default: "CMDU";
                    readonly type: "string";
                    readonly examples: readonly ["CMDU"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The SCAC of a carrier that operates the wanted service";
                };
            };
            readonly required: readonly ["name"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "404": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetVesselsByName: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly name: {
                    readonly default: "CMA CGM Chopin";
                    readonly type: "string";
                    readonly examples: readonly ["CMA CGM Chopin"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The name or a part of the name of the searched vessel.";
                };
            };
            readonly required: readonly ["name"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "404": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
export { GetCarrierById, GetCarrierByNameOrScac, GetGeocodingAirport, GetGeocodingAll, GetGeocodingArea, GetGeocodingClosest, GetGeocodingPlace, GetGeocodingPort, GetGeocodingZip, GetServiceById, GetServiceByName, GetVesselsByName };
