# SuperBug AI Web App

A web application that servers as the frontend for the SuperBug AI App. Which will present the outputs from artificial intelligence predicting the existence of antibiotic resistant infectous bacterium using EMR (Electronic Medical Record) data in the FHIR (Fast Healthcare Interoperability Resources) format.

## Dependencies

The app uses the [NextJS](https://nextjs.org/) React framework and applies the pages router paradigm

## Testing

Once cloned a test environment can be launched using ```"npm run dev"``` which will launch the frontend at [localhost:3000](http:localhost:3000).
Note that the app requires connection to a running FHIR database in order for any functionality to work

## Build

To build the app simply run ```npm run build```. This will create a build package which can then be launched using ```npm start```. The app will then be running on [localhost:3000](http:localhost:3000).

## Changelog
[link](https://docs.google.com/document/d/13tKJqB61ulvWK3TMmUg7DFfTRobDJk7ToiMIC-EGdZE/edit?usp=sharing)