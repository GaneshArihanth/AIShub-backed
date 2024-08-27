# Node.js API Project

This project contains two Express-based APIs for retrieving real-time vessel position data and satellite images using third-party services.

## Features

### 1. Vessel Position API
- **Endpoint:** `/vessel-position`
- **Description:** Fetches and returns real-time vessel position data using the SeaRoutes API.
- **Port:** 3006
- **Response:** JSON object containing vessel information (IMO, name, length, width) and its current position in geoJSON format.

### 2. Satellite Image API
- **Endpoint:** `/satellite-image`
- **Description:** Fetches and returns a satellite image of a specified location using the Mapbox Static Images API.
- **Port:** 3000
- **Parameters:**
  - `latitude` (required): Latitude of the location.
  - `longitude` (required): Longitude of the location.
  - `zoom` (optional, default: 15): Zoom level for the image.
  - `width` (optional, default: 600): Width of the image in pixels.
  - `height` (optional, default: 400): Height of the image in pixels.
- **Response:** PNG image of the specified location.

## Getting Started

### Prerequisites
- Node.js and npm installed
- Internet connection

### Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
