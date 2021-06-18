# viagogo API Documentation

[![CI](https://github.com/akilburge/viagogo-openapi-repo/actions/workflows/ci.yml/badge.svg)](https://github.com/akilburge/viagogo-openapi-repo/actions/workflows/ci.yml)

This is the documentation site for the viagogo API! (http://developer.viagogo.net)

## How to contribute

All submissions are welcome. Fork the repository, read the rest of this README file and make some changes.
Once you're done with your changes send a pull request. Thanks!

## How to edit the site

### Prerequisites

You're going to need:

- [Node JS](https://nodejs.org/)

### Getting Set Up

 1. Fork this repository on Github.
 2. Clone *your forked repository* (not our original one) to your hard drive with `git clone https://github.com/YOURUSERNAME/viagogo-api-docs.git`
 3. `cd viagogo-api-docs`
 4. Install all dependencies: `npm install`
 5. Start the preview server: `npm run start`

You can now see the docs at <http://localhost:8080>. Whoa! That was fast!

### Folder Structure

    .
    ├── dist                   # All of the files that will serve via GitHub pages
    │   ├── custom-docs
    |   |   └── description.md # Markdown file containing custom documentation for the API
    │   ├── openapi
    |   |   ├── definition     # **Auto-generated** YAML files for the OpenAPI definition
    |   |   └── openapi.json   # JSON OpenAPI definition that is just used to generate the YAML definitions
    │   ├── favicon.ico
    │   └── index.html         # HTML page for the site on GitHub pages (not used locally)
    ├── scripts                # NPM scripts
    ├── .redocly.yaml          # Redocly configuration file
    ├── LICENSE
    └── README.md

## Need Help? Found a bug?

Just [submit a issue](https://github.com/viagogo/viagogo-api-docs/issues) if you need any help. And, of course, feel free to submit pull requests with bug fixes or changes.
