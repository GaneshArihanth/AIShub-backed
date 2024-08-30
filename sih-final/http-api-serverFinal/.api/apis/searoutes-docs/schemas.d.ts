declare const GetCo2ForARun: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["locations", "orders", "mode"];
        readonly properties: {
            readonly metadata: {
                readonly type: "object";
                readonly additionalProperties: true;
            };
            readonly locations: {
                readonly type: "array";
                readonly minItems: 1;
                readonly items: {
                    readonly type: "string";
                };
                readonly default: readonly ["FRMRS", "FRVAF"];
            };
            readonly orders: {
                readonly type: "array";
                readonly minItems: 1;
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly fromIndex: {
                            readonly type: "integer";
                            readonly description: "index of the stop where the parcel is loaded.";
                            readonly default: 1;
                        };
                        readonly toIndex: {
                            readonly type: "integer";
                            readonly description: "index of the stop where the parcel is unloaded.";
                            readonly default: 2;
                        };
                        readonly weight: {
                            readonly type: "number";
                            readonly description: "weight (in kg) of the parcel";
                            readonly default: 1000;
                        };
                        readonly id: {
                            readonly type: "string";
                            readonly description: "identifier of the booking (can be an external reference)";
                            readonly default: "ABC1234";
                        };
                        readonly type: {
                            readonly type: "string";
                            readonly enum: readonly ["PARCEL"];
                            readonly default: "PARCEL";
                            readonly description: "Default: PARCEL";
                        };
                    };
                };
            };
            readonly mode: {
                readonly type: "string";
                readonly enum: readonly ["road"];
                readonly default: "road";
                readonly description: "Default: road";
            };
            readonly details: {
                readonly type: "object";
                readonly properties: {
                    readonly fuel: {
                        readonly type: "string";
                        readonly description: "fuel type of the truck used during the run.\n\nDefault: `DIESEL`";
                        readonly enum: readonly ["DIESEL", "PETROL", "LPG"];
                        readonly default: "DIESEL";
                    };
                    readonly truckSize: {
                        readonly type: "integer";
                        readonly description: "truck size of the asset (GWV from 4t to 60t)";
                        readonly default: 34;
                    };
                    readonly carrier: {
                        readonly type: "object";
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                            };
                            readonly scac: {
                                readonly type: "string";
                            };
                        };
                    };
                };
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetCo2ForAircraft: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly fromIata: {
                    readonly default: "MRS";
                    readonly type: "string";
                    readonly examples: readonly ["MRS"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The IATA code of the departure airport.";
                };
                readonly toIata: {
                    readonly default: "YVR";
                    readonly type: "string";
                    readonly examples: readonly ["YVR"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The IATA code of the arrival airport.";
                };
                readonly fromLocode: {
                    readonly type: "string";
                    readonly examples: readonly ["FRMRS"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The UNLOCODE of the departure airport.";
                };
                readonly toLocode: {
                    readonly type: "string";
                    readonly examples: readonly ["CAYVR"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The UNLOCODE of the destination airport.";
                };
                readonly fromCoordinates: {
                    readonly type: "string";
                    readonly examples: readonly ["5.22142410278,43.439271922"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The cordinates of the origin airport.";
                };
                readonly toCoordinates: {
                    readonly type: "string";
                    readonly examples: readonly ["-123.183998108,49.193901062"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The cordinates of the destination airport.";
                };
                readonly distance: {
                    readonly type: "integer";
                    readonly examples: readonly [564575];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your own computed distance (if known) in meters.";
                };
                readonly aircraftIata: {
                    readonly type: "string";
                    readonly examples: readonly ["74Y"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The IATA designator of the aircraft type.";
                };
                readonly aircraftType: {
                    readonly type: "string";
                    readonly examples: readonly ["PASSENGER"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The type of the aircraft (if no IATA), either `PASSENGER`, `CARGO` or `UNKNOWN` (if unknown, the emissions are calculated as 55% passenger and 45% cargo).";
                };
                readonly weight: {
                    readonly default: 1000;
                    readonly type: "integer";
                    readonly examples: readonly [11000];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The weight of shipped goods in kilograms.";
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
declare const GetCo2ForInlandWater: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly fromLocode: {
                    readonly default: "FRLIO";
                    readonly type: "string";
                    readonly examples: readonly ["FRLIO"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The LOCODE of the departure inland port.";
                };
                readonly fromCoordinates: {
                    readonly type: "string";
                    readonly examples: readonly ["4.8395635,45.7323"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The coordinates of the departure inland port given as `lon,lat`";
                };
                readonly toLocode: {
                    readonly default: "FRVAF";
                    readonly type: "string";
                    readonly examples: readonly ["FRVAF"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The LOCODE code of the arrival inland port.";
                };
                readonly toCoordinates: {
                    readonly type: "string";
                    readonly examples: readonly ["4.88333333333333,44.9333333333333"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The coordinates of the arrival inland port given as `lon,lat`";
                };
                readonly distance: {
                    readonly type: "integer";
                    readonly examples: readonly [564575];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your own computed distance (if known) in meters.";
                };
                readonly weight: {
                    readonly type: "integer";
                    readonly examples: readonly [5000];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The weight of shipped goods in kilograms. Default is 1000 kg (1 metric ton). When `nContainers` is passed, the weight is ignored.";
                };
                readonly vesselType: {
                    readonly default: "MOTOR_VESSEL";
                    readonly type: "string";
                    readonly examples: readonly ["PUSHED_CONVOY"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The type of inland vessel. Can be `MOTOR_VESSEL`, `COUPLED_CONVOY`, `PUSHED_CONVOY`, `TANKER`, `CONTAINER_VESSEL_110`, `CONTAINER_VESSEL_135` or `CONTAINER_COUPLED`.";
                };
                readonly nContainers: {
                    readonly type: "integer";
                    readonly examples: readonly [2];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The number of containers.";
                };
                readonly containerSizeTypeCode: {
                    readonly type: "string";
                    readonly examples: readonly ["20GP"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Code to identify the size and the type of the container. Supported values are 20GP, 22G1, 2200, 22G0, 2202, 2210, 40GP, 42G1, 42G0, 40G1, 40HC, 45G1, 4500, 45G0, 22R1, 2231, 42R1, 4531, 40NOR, 45R1, 45R8, 40REHC, 53GP. We recommend to use this parameter instead of `containerType` and `containerSize`.";
                };
                readonly containerSize: {
                    readonly type: "integer";
                    readonly deprecated: true;
                    readonly examples: readonly [40];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The size of the containers (20, 40 or 45). We recommend to use of the parameter `containerSizeTypeCode` instead.";
                };
                readonly containerType: {
                    readonly type: "string";
                    readonly deprecated: true;
                    readonly examples: readonly ["STANDARD"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The type of the containers (either STANDARD or HIGH_CUBE). Default is STANDARD. We recommend to use of the parameter `containerSizeTypeCode` instead.";
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
declare const GetCo2ForRail: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly fromLocode: {
                    readonly type: "string";
                    readonly default: "FRMRS";
                    readonly examples: readonly ["FRMRS"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The UNLOCODE of the departure train station.";
                };
                readonly fromCoordinates: {
                    readonly type: "string";
                    readonly examples: readonly ["5.382152795791626,43.3038665102729"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The coordinates of the departure train station given as `lon,lat`";
                };
                readonly toLocode: {
                    readonly type: "string";
                    readonly default: "FR2JR";
                    readonly examples: readonly ["FR2JR"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The UNLOCODE code of the arrival train station.";
                };
                readonly toCoordinates: {
                    readonly type: "string";
                    readonly examples: readonly ["4.893014430999756,44.927657882857886"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The coordinates of the arrival train station given as `lon,lat`";
                };
                readonly distance: {
                    readonly type: "integer";
                    readonly examples: readonly [564575];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your own computed distance (if known) in meters.";
                };
                readonly nContainers: {
                    readonly type: "integer";
                    readonly examples: readonly [2];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The number of containers.";
                };
                readonly containerSizeTypeCode: {
                    readonly type: "string";
                    readonly enum: readonly ["20GP", "22G1", "2200", "22G0", "2202", "2210", "40GP", "42G1", "42G0", "40G1", "40HC", "45G1", "4500", "45G0", "22R1", "2231", "42R1", "4531", "40NOR", "45R1", "45R8", "40REHC", "53GP"];
                    readonly examples: readonly ["20GP"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Code to identify the size and the type of the container.";
                };
                readonly weight: {
                    readonly type: "integer";
                    readonly default: 1000;
                    readonly examples: readonly [5000];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The weight of shipped goods in kilograms. If both `weight` and `nContainers` are provided, the `weight` will take priority over the `nContainers`.";
                };
                readonly loadCharacteristics: {
                    readonly type: "string";
                    readonly enum: readonly ["CONTAINER", "AVERAGE_MIXED"];
                    readonly default: "AVERAGE_MIXED";
                    readonly description: "Can be `AVERAGE_MIXED` (default) or `CONTAINER`. If `nContainers` or `containerSizeTypeCode` are passed, this parameter is automatically set to `CONTAINER`.";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
                readonly fuel: {
                    readonly type: "string";
                    readonly enum: readonly ["ELEC", "DIESEL", "DEFAULT"];
                    readonly default: "ELEC";
                    readonly description: "The fuel type can be `ELEC`, `DIESEL` or `DEFAULT`.";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
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
declare const GetCo2ForRoad: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly fromLocode: {
                    readonly default: "FRMRS";
                    readonly type: "string";
                    readonly examples: readonly ["FRMRS"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The UNLOCODE of the departure city.";
                };
                readonly fromCoordinates: {
                    readonly type: "string";
                    readonly examples: readonly ["5.34005236625671,43.3317317962646"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The coordinates of the departure city given as `lon,lat`.";
                };
                readonly toLocode: {
                    readonly default: "FRAOP";
                    readonly type: "string";
                    readonly examples: readonly ["FRAOP"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The UNLOCODE code of the arrival city.";
                };
                readonly toCoordinates: {
                    readonly type: "string";
                    readonly examples: readonly ["4.89004158973694,43.4159469604492"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The coordinates of the arrival city given as `lon,lat`.";
                };
                readonly distance: {
                    readonly type: "integer";
                    readonly examples: readonly [564575];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your own computed distance (if known) in meters.";
                };
                readonly weight: {
                    readonly default: 1000;
                    readonly type: "integer";
                    readonly examples: readonly [10000];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The weight of shipped goods in kilograms. If both `weight` and `nContainers` are provided, the `weight` will take priority over the `nContainers`.";
                };
                readonly fuel: {
                    readonly type: "string";
                    readonly enum: readonly ["DIESEL", "CNG", "LNG", "HVO", "ELEC", "BIOLNG", "BIOCNG", "BIODIESEL", "PETROL", "LPG", "HYDROGEN_GASEOUS_FCV", "DIESEL99_BIODIESEL1", "DIESEL98_BIODIESEL2", "DIESEL95_BIODIESEL5", "DIESEL93_BIODIESEL7", "DIESEL90_BIODIESEL10", "DIESEL80_BIODIESEL20", "DIESEL50_BIODIESEL50"];
                    readonly examples: readonly ["DIESEL"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The fuel type can be `DIESEL`, `CNG`, `LNG`, `HVO`, `ELEC`, `BIOLNG`, `BIOCNG`, `BIODIESEL`, `HYDROGEN_GASEOUS_FCV` or various Diesel-Biodiesel blends (`DIESEL99_BIODIESEL1`, `DIESEL98_BIODIESEL2`, `DIESEL95_BIODIESEL5`, `DIESEL93_BIODIESEL7`, `DIESEL90_BIODIESEL10`, `DIESEL80_BIODIESEL20`, `DIESEL50_BIODIESEL50`). For vans weighing less than 3.5 tons in regions including Europe, South America, Africa and Asia, you may select `LPG` and `PETROL`.";
                };
                readonly truckSize: {
                    readonly default: 3;
                    readonly type: "integer";
                    readonly examples: readonly [18];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The gross vehicle weight of the truck in metric tons, between 0 and 72t. If `nContainers` is used, the default value is 33t (except in North America where the truck size is not taken into account)";
                };
                readonly loadCharacteristics: {
                    readonly type: "string";
                    readonly enum: readonly ["AVERAGE_MIXED", "CONTAINER", "DEFAULT"];
                    readonly default: "AVERAGE_MIXED";
                    readonly description: "Specifies the type of cargo, which can be `AVERAGE_MIXED`, `CONTAINER` or `DEFAULT` (North America + Oceania). If `nContainers` or `containerSizeTypeCode` are passed, this parameter is automatically set to `CONTAINER`.";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
                readonly nContainers: {
                    readonly type: "integer";
                    readonly examples: readonly [2];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The number of containers.";
                };
                readonly containerSizeTypeCode: {
                    readonly type: "string";
                    readonly enum: readonly ["20GP", "22G1", "2200", "22G0", "2202", "2210", "40GP", "42G1", "42G0", "40G1", "40HC", "45G1", "4500", "45G0", "22R1", "2231", "42R1", "4531", "40NOR", "45R1", "45R8", "40REHC", "53GP"];
                    readonly examples: readonly ["20GP"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Code to identify the size and the type of the container. We recommend to use this parameter instead of `containerType` and `containerSize`.";
                };
                readonly carrierScac: {
                    readonly type: "string";
                    readonly examples: readonly ["ACAP"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The Standard Carrier Alpha Code (SCAC) of the truck carrier (only available for North America). Examples ACAP, ACRQ, ACUI, ACXE.";
                };
                readonly containerSize: {
                    readonly type: "integer";
                    readonly deprecated: true;
                    readonly examples: readonly [40];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The size of the containers (20, 40 or 45). We recommend to use of the parameter `containerSizeTypeCode` instead.";
                };
                readonly containerType: {
                    readonly type: "string";
                    readonly deprecated: true;
                    readonly examples: readonly ["STANDARD"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The type of the containers (either STANDARD or HIGH_CUBE). Default is STANDARD.  We recommend to use of the parameter `containerSizeTypeCode` instead.";
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
declare const GetCo2ForShipment: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["orders", "legs"];
        readonly properties: {
            readonly metadata: {
                readonly type: "object";
                readonly additionalProperties: true;
            };
            readonly details: {
                readonly type: "object";
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly description: "We recommend to use this parameter instead of `shipmentId` (deprecated)";
                        readonly examples: readonly ["AD35736"];
                    };
                    readonly referenceNumber: {
                        readonly type: "string";
                        readonly description: "We recommend to use this parameter instead of `bookingNumber` (deprecated)";
                        readonly examples: readonly ["304i93424"];
                    };
                    readonly status: {
                        readonly type: "string";
                        readonly enum: readonly ["BOOKED", "ARRIVED"];
                        readonly examples: readonly ["BOOKED"];
                    };
                    readonly carrier: {
                        readonly type: "object";
                        readonly properties: {
                            readonly scac: {
                                readonly type: "string";
                                readonly examples: readonly ["SCAC"];
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly examples: readonly ["My carrier"];
                            };
                        };
                    };
                    readonly client: {
                        readonly type: "object";
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                                readonly examples: readonly ["Client"];
                            };
                        };
                    };
                    readonly shipmentId: {
                        readonly type: "string";
                        readonly deprecated: true;
                        readonly description: "We recommend to use the parameter `id` instead.";
                        readonly examples: readonly ["AD35736"];
                    };
                    readonly bookingNumber: {
                        readonly type: "string";
                        readonly deprecated: true;
                        readonly description: "We recommend to use the parameter `referenceNumber` instead.";
                        readonly examples: readonly ["304i93424"];
                    };
                };
            };
            readonly orders: {
                readonly type: "array";
                readonly description: "We recommend to use this parameter instead of `containers` (deprecated). Maximum amount of orders is 5.";
                readonly minItems: 1;
                readonly items: {
                    readonly type: "object";
                    readonly required: readonly ["type"];
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                            readonly enum: readonly ["CONTAINER", "PARCEL", "FCL", "LCL", "PALLET", "UNIT_LOAD"];
                            readonly default: "CONTAINER";
                            readonly description: "Default: CONTAINER";
                        };
                        readonly sizeTypeCode: {
                            readonly type: "string";
                            readonly enum: readonly ["20GP", "22G1", "2200", "22G0", "2202", "2210", "40GP", "42G1", "42G0", "40G1", "40HC", "45G1", "4500", "45G0", "22R1", "2231", "42R1", "4531", "40NOR", "45R1", "45R8", "40REHC", "53GP"];
                        };
                        readonly quantity: {
                            readonly type: "number";
                            readonly default: 1;
                        };
                        readonly weight: {
                            readonly type: "number";
                            readonly default: 300;
                        };
                        readonly id: {
                            readonly type: "string";
                            readonly examples: readonly ["OD45782"];
                        };
                    };
                };
            };
            readonly legs: {
                readonly type: "array";
                readonly minItems: 1;
                readonly items: {
                    readonly oneOf: readonly [{
                        readonly type: "object";
                        readonly required: readonly ["from", "to", "mode"];
                        readonly properties: {
                            readonly from: {
                                readonly type: "string";
                                readonly default: "FRMRS";
                                readonly examples: readonly ["FRMRS"];
                            };
                            readonly to: {
                                readonly type: "string";
                                readonly default: "DEHAM";
                                readonly examples: readonly ["DEHAM"];
                            };
                            readonly mode: {
                                readonly type: "string";
                                readonly enum: readonly ["road"];
                                readonly default: "road";
                                readonly examples: readonly ["road"];
                                readonly description: "Default: road";
                            };
                            readonly details: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly truckSize: {
                                        readonly type: "integer";
                                    };
                                    readonly fuelType: {
                                        readonly type: "string";
                                        readonly enum: readonly ["DIESEL", "CNG", "LNG", "PETROL", "HVO", "ELEC", "LPG", "BIOLNG", "BIOCNG", "HYDROGEN_GASEOUS_FCV", "BIODIESEL", "DIESEL99_BIODIESEL1", "DIESEL98_BIODIESEL2", "DIESEL95_BIODIESEL5", "DIESEL93_BIODIESEL7", "DIESEL90_BIODIESEL10", "DIESEL80_BIODIESEL20", "DIESEL50_BIODIESEL50"];
                                    };
                                    readonly fuel: {
                                        readonly type: "string";
                                        readonly deprecated: true;
                                        readonly description: "We recommend to use the parameter `fuelType` instead";
                                        readonly examples: readonly ["DIESEL"];
                                    };
                                    readonly distance: {
                                        readonly type: "number";
                                    };
                                    readonly carrier: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly scac: {
                                                readonly type: "string";
                                            };
                                        };
                                    };
                                    readonly dateTime: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly departure: {
                                                readonly format: "date-time";
                                            };
                                            readonly arrival: {
                                                readonly format: "date-time";
                                            };
                                        };
                                    };
                                };
                            };
                            readonly metadata: {
                                readonly type: "object";
                                readonly additionalProperties: true;
                            };
                        };
                    }, {
                        readonly type: "object";
                        readonly required: readonly ["from", "to", "mode"];
                        readonly properties: {
                            readonly from: {
                                readonly type: "string";
                                readonly default: "-73.768741607666,45.4261722564697";
                                readonly examples: readonly ["-73.768741607666,45.4261722564697"];
                            };
                            readonly to: {
                                readonly type: "string";
                                readonly default: "DEHAM";
                                readonly examples: readonly ["DEHAM"];
                            };
                            readonly mode: {
                                readonly type: "string";
                                readonly enum: readonly ["sea"];
                                readonly default: "sea";
                                readonly examples: readonly ["sea"];
                                readonly description: "Default: sea";
                            };
                            readonly details: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly voyageNumber: {
                                        readonly type: "string";
                                    };
                                    readonly carrier: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly scac: {
                                                readonly type: "string";
                                            };
                                        };
                                    };
                                    readonly vessel: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly imo: {
                                                readonly type: "string";
                                            };
                                            readonly name: {
                                                readonly type: "string";
                                            };
                                        };
                                    };
                                    readonly fuelType: {
                                        readonly type: "string";
                                        readonly enum: readonly ["HFO", "VLSFO", "ULSFO", "MDO", "MGO", "LNG", "BIOLNG", "LSMGO", "METHANOL", "BIOMETHANOL", "IFO380", "LNG_CMACGM_VAS", "UCO", "METHANOL_COAL", "METHANOL_GAS", "METHANOL_RENEWABLES"];
                                    };
                                    readonly distance: {
                                        readonly type: "number";
                                    };
                                    readonly dateTime: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly departure: {
                                                readonly format: "date-time";
                                            };
                                            readonly arrival: {
                                                readonly format: "date-time";
                                            };
                                        };
                                    };
                                };
                            };
                            readonly metadata: {
                                readonly type: "object";
                                readonly additionalProperties: true;
                            };
                        };
                    }, {
                        readonly type: "object";
                        readonly required: readonly ["from", "to", "mode"];
                        readonly properties: {
                            readonly from: {
                                readonly type: "string";
                                readonly default: "-73.768741607666,45.4261722564697";
                                readonly examples: readonly ["-73.768741607666,45.4261722564697"];
                            };
                            readonly to: {
                                readonly type: "string";
                                readonly default: "DEHAM";
                                readonly examples: readonly ["DEHAM"];
                            };
                            readonly mode: {
                                readonly type: "string";
                                readonly enum: readonly ["rail"];
                                readonly default: "rail";
                                readonly examples: readonly ["rail"];
                                readonly description: "Default: rail";
                            };
                            readonly details: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly fuelType: {
                                        readonly type: "string";
                                        readonly enum: readonly ["ELEC", "DIESEL", "DEFAULT"];
                                    };
                                    readonly fuel: {
                                        readonly type: "string";
                                        readonly deprecated: true;
                                        readonly description: "We recommend to use the parameter `fuelType` instead";
                                        readonly examples: readonly ["DIESEL"];
                                    };
                                    readonly distance: {
                                        readonly type: "number";
                                    };
                                    readonly dateTime: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly departure: {
                                                readonly format: "date-time";
                                            };
                                            readonly arrival: {
                                                readonly format: "date-time";
                                            };
                                        };
                                    };
                                };
                            };
                            readonly metadata: {
                                readonly type: "object";
                                readonly additionalProperties: true;
                            };
                        };
                    }, {
                        readonly type: "object";
                        readonly required: readonly ["from", "to", "mode"];
                        readonly properties: {
                            readonly from: {
                                readonly type: "string";
                                readonly default: "SKBTS";
                                readonly examples: readonly ["SKBTS"];
                            };
                            readonly to: {
                                readonly type: "string";
                                readonly default: "DEHAM";
                                readonly examples: readonly ["DEHAM"];
                            };
                            readonly mode: {
                                readonly type: "string";
                                readonly enum: readonly ["inland-water"];
                                readonly default: "inland-water";
                                readonly examples: readonly ["inland-water"];
                                readonly description: "Default: inland-water";
                            };
                            readonly details: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly vesselType: {
                                        readonly type: "string";
                                        readonly enum: readonly ["MOTOR_VESSEL", "COUPLED_CONVOY", "PUSHED_CONVOY", "CONTAINER_VESSEL_110", "CONTAINER_VESSEL_135", "CONTAINER_COUPLED"];
                                        readonly default: "MOTOR_VESSEL";
                                        readonly examples: readonly ["MOTOR_VESSEL"];
                                        readonly description: "Default: MOTOR_VESSEL";
                                    };
                                    readonly distance: {
                                        readonly type: "number";
                                    };
                                    readonly dateTime: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly departure: {
                                                readonly format: "date-time";
                                            };
                                            readonly arrival: {
                                                readonly format: "date-time";
                                            };
                                        };
                                    };
                                };
                            };
                            readonly metadata: {
                                readonly type: "object";
                                readonly additionalProperties: true;
                            };
                        };
                    }, {
                        readonly type: "object";
                        readonly required: readonly ["from", "to", "mode"];
                        readonly properties: {
                            readonly from: {
                                readonly type: "string";
                                readonly default: "FRMRS";
                                readonly examples: readonly ["FRMRS"];
                            };
                            readonly to: {
                                readonly type: "string";
                                readonly default: "DEHAM";
                                readonly examples: readonly ["DEHAM"];
                            };
                            readonly mode: {
                                readonly type: "string";
                                readonly enum: readonly ["air"];
                                readonly default: "air";
                                readonly examples: readonly ["air"];
                                readonly description: "Default: air";
                            };
                            readonly details: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly aircraft: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly iata: {
                                                readonly type: "string";
                                                readonly default: "74Y";
                                                readonly examples: readonly ["74Y"];
                                            };
                                            readonly type: {
                                                readonly type: "string";
                                                readonly enum: readonly ["CARGO", "PASSENGER"];
                                                readonly default: "CARGO";
                                                readonly examples: readonly ["CARGO"];
                                                readonly description: "Default: CARGO";
                                            };
                                        };
                                    };
                                    readonly distance: {
                                        readonly type: "number";
                                    };
                                    readonly dateTime: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly departure: {
                                                readonly format: "date-time";
                                            };
                                            readonly arrival: {
                                                readonly format: "date-time";
                                            };
                                        };
                                    };
                                };
                            };
                            readonly metadata: {
                                readonly type: "object";
                                readonly additionalProperties: true;
                            };
                        };
                    }, {
                        readonly type: "object";
                        readonly required: readonly ["mode", "details"];
                        readonly properties: {
                            readonly mode: {
                                readonly type: "string";
                                readonly enum: readonly ["hub"];
                                readonly default: "hub";
                                readonly examples: readonly ["hub"];
                                readonly description: "Default: hub";
                            };
                            readonly details: {
                                readonly type: "object";
                                readonly required: readonly ["hubType"];
                                readonly properties: {
                                    readonly hubType: {
                                        readonly type: "string";
                                        readonly enum: readonly ["WAREHOUSE", "TRANSHIPMENT_SITE", "STORAGE_TRANSHIPMENT", "LIQUID_BULK_TERMINAL", "MARITIME_CONTAINER_TERMINAL"];
                                    };
                                };
                            };
                            readonly metadata: {
                                readonly type: "object";
                                readonly additionalProperties: true;
                            };
                        };
                    }];
                };
            };
            readonly containers: {
                readonly type: "array";
                readonly deprecated: true;
                readonly description: "We recommend to use the parameter `bookings` instead.";
                readonly minItems: 1;
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly sizeTypeCode: {
                            readonly type: "string";
                            readonly enum: readonly ["20GP", "22G1", "2200", "22G0", "2202", "2210", "40GP", "42G1", "42G0", "40G1", "40HC", "45G1", "4500", "45G0", "22R1", "2231", "42R1", "4531", "40NOR", "45R1", "45R8", "40REHC", "53GP"];
                        };
                        readonly quantity: {
                            readonly type: "number";
                        };
                        readonly weight: {
                            readonly type: "number";
                        };
                    };
                };
            };
            readonly type: {
                readonly type: "string";
                readonly deprecated: true;
                readonly enum: readonly ["CONTAINER"];
                readonly default: "CONTAINER";
                readonly description: "Default: CONTAINER";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly generateCertificate: {
                    readonly default: false;
                    readonly type: "boolean";
                    readonly examples: readonly [false];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Boolean which controls if certificate is generated for requested shipment.";
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
        readonly "418": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetCo2ForVessel: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly fromLocode: {
                    readonly default: "FRMRS";
                    readonly type: "string";
                    readonly examples: readonly ["FRMRS"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The UNLOCODE of the departure port.";
                };
                readonly fromCoordinates: {
                    readonly type: "string";
                    readonly examples: readonly ["5.34005236625671,43.3317317962646"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The coordinates of the departure port given as `lon,lat`";
                };
                readonly toLocode: {
                    readonly default: "HKHKG";
                    readonly type: "string";
                    readonly examples: readonly ["HKHKG"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The UNLOCODE of the arrival port.";
                };
                readonly toCoordinates: {
                    readonly type: "string";
                    readonly examples: readonly ["114.128887176514,22.3508024215698"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The coordinates of the arrival port given as `lon,lat`";
                };
                readonly distance: {
                    readonly type: "integer";
                    readonly examples: readonly [564575];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Your own computed distance (if known) in meters.";
                };
                readonly vesselImo: {
                    readonly type: "integer";
                    readonly examples: readonly [9776418];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The IMO number of the vessel.";
                };
                readonly allowIceAreas: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Specifies if sailing in ice areas (Northern Sea route, deep South Pacific, deep South Atlantic, Bering Sea, etc) is possible.";
                };
                readonly avoidHRA: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Specifies if travel in HRA zone should be avoided";
                };
                readonly avoidSeca: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Specifies if travel in SECA zones should be avoided";
                };
                readonly blockAreas: {
                    readonly type: "integer";
                    readonly examples: readonly [11112];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Specifies a particular area to block, or a list of areas to block (separated by `,`). Area Ids can be found using the [/geocoding/area/{name}](#operation/getGeocodingArea) endpoint.";
                };
                readonly nContainers: {
                    readonly default: 1;
                    readonly type: "number";
                    readonly examples: readonly [2.5];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The number of shipped containers.";
                };
                readonly containerSizeTypeCode: {
                    readonly type: "string";
                    readonly examples: readonly ["20GP"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Code to identify the size and the type of the container. 20GP, 22G1, 2200, 22G0, 2202, 2210, 40GP, 42G1, 42G0, 40G1, 40HC, 45G1, 4500, 45G0, 22R1, 2231, 42R1, 4531, 40NOR, 45R1, 45R8, 40REHC, 53GP. We recommend to use this parameter instead of `containerType` and `containerSize`(deprecated)";
                };
                readonly containerSize: {
                    readonly default: 20;
                    readonly type: "integer";
                    readonly deprecated: true;
                    readonly examples: readonly [20];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The size in foot of containers (either 20, 40 of 45). We recommend to use the parameter `containerSizeTypeCode` instead.";
                };
                readonly containerType: {
                    readonly type: "string";
                    readonly deprecated: true;
                    readonly examples: readonly ["STANDARD"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The type of the containers (either STANDARD or HIGH_CUBE). Default depends on the size of the containers (STANDARD for 20ft, HIGH_CUBE for 40ft and 45ft). We recommend to use the parameter `containerSizeTypeCode` instead.";
                };
                readonly weight: {
                    readonly type: "number";
                    readonly examples: readonly [8000];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The weight of shipped goods in kilograms in case the number of containers is unknown.";
                };
                readonly volume: {
                    readonly type: "number";
                    readonly examples: readonly [5];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The volume of shipped goods in cube meters in case the number of containers is unknown.";
                };
                readonly fuelType: {
                    readonly type: "string";
                    readonly examples: readonly ["VLSFO"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The fuel type to take into account for the vessel (can be HFO, VLSFO, ULSFO, MDO, MGO, LNG, BIOLNG, LSMGO, METHANOL, BIOMETHANOL, IFO380, LNG_CMACGM_VAS, UCO, METHANOL_COAL, METHANOL_GAS, METHANOL_RENEWABLES).";
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
declare const GetVesselPosition: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly imo: {
                    readonly default: 9299628;
                    readonly type: "string";
                    readonly examples: readonly [9299628];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "An IMO number.";
                };
            };
            readonly required: readonly ["imo"];
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
declare const GetVesselTrace: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly imo: {
                    readonly default: 9245756;
                    readonly type: "integer";
                    readonly examples: readonly [9245756];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "imo number of the vessel (required if `mmsi` is not used)";
                };
                readonly mmsi: {
                    readonly default: 220061000;
                    readonly type: "integer";
                    readonly examples: readonly [220061000];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "mmsi number of the vessel (required if `imo` not used)";
                };
                readonly departureDateTime: {
                    readonly default: "2023-02-16T15:00:00Z";
                    readonly type: "string";
                    readonly examples: readonly ["2023-02-16T15:00:00Z"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Specifies the beginning of the trace in the ISO 8601 format (required if `departure` is not used)";
                };
                readonly departure: {
                    readonly type: "number";
                    readonly examples: readonly [1676559600000];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Specifies the begining of the trace in unix time (in ms) (required if `departureDateTime` is not used)";
                };
                readonly arrivalDateTime: {
                    readonly default: "2023-02-16T16:00:00Z";
                    readonly type: "string";
                    readonly examples: readonly ["2023-02-16T16:00:00Z"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Specifies the end of the trace in the ISO 8601 format (required if `arrival` is not used)";
                };
                readonly arrival: {
                    readonly type: "number";
                    readonly examples: readonly [1676995200000];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Specifies the end of the trace in unix time (in ms) (required if `arrivalDateTime` is not used)";
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
        readonly "503": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetWeather: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly latitude: {
                    readonly type: "number";
                    readonly examples: readonly [17.152];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Latitude\n";
                };
                readonly longitude: {
                    readonly type: "number";
                    readonly examples: readonly [-80.564];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Longitude\n";
                };
                readonly timestamp: {
                    readonly type: "number";
                    readonly examples: readonly [1548388800000];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Unix timestamp, in milliseconds\n";
                };
            };
            readonly required: readonly ["latitude", "longitude", "timestamp"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetWeatherTimeFrame: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly latitude: {
                    readonly type: "number";
                    readonly examples: readonly [17.152];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Latitude\n";
                };
                readonly longitude: {
                    readonly type: "number";
                    readonly examples: readonly [-80.564];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Longitude\n";
                };
                readonly timestamp: {
                    readonly type: "number";
                    readonly examples: readonly [1454561200000];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Unix timestamp, in milliseconds\n";
                };
                readonly timeframe: {
                    readonly type: "number";
                    readonly examples: readonly [21600000];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Time window, in milliseconds\n";
                };
            };
            readonly required: readonly ["latitude", "longitude", "timestamp"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
export { GetCo2ForARun, GetCo2ForAircraft, GetCo2ForInlandWater, GetCo2ForRail, GetCo2ForRoad, GetCo2ForShipment, GetCo2ForVessel, GetVesselPosition, GetVesselTrace, GetWeather, GetWeatherTimeFrame };
