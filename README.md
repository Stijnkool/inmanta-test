# inmanta-test

## Wireframes

Basic wireframes can be found in the `/wireframes` folder.

- `base-view.pdf`
  - shows the main view of the application
  - it lists all the routers
  - 1 router is opened which shows the details for that router
  - you can click the `ping` button which opens a modal (see `modal-view.pdf`)
  - you can toggle interfaces `up` or `down`
  - you can click the `edit` button for an interface which triggers a modal (see `modal-view.pdf`)
  - you can click the `new interface` button for creating a new interface
- `modal-view.pdf`
  - this shows a basic modal displayed over the main view with a darker shade
  - the advantage of a modal is that you are focussed on this 1 view
  - closing or confirming a modal takes you back to where you were before
  - creating and editing an interface will share the same modal, but this is not visible in the wireframes

## Designs

Basic designs can be found in the `/designs` folder.

- `base-view.pdf`

## Development

Since this project is developed as a proof of concept, certain features are not implemented.
Not implemented:

- URL routing
- API data validation
- Input validation
- keyboard support
- full test coverage
- clean software architecture
- animations

### How to run the application

This application talks to the `nfv` server that needs to be hosted on `http://0.0.0.0:8080/`.  
Make sure you have that running. (See https://github.com/inmanta/nfv-test-api)

You need `nodejs` & `npm` installed to run this project.

This project has been developed on node version `v12.20.0`.
This project will run on most node versions.  
But if you run into problems, maybe try that version.

1. Install dependencies by running `npm install`
2. Start the local web server by running `npm start`

The application is now running on `http://localhost:3000`.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Testing

To execute the tests, run `npm test`.
This runs only 1 test for the root component.
This test makes sure the root component doesn't crash.
It also verifies that the basic api data works (mocked).

## User Stories

|             | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
| ----------- | --- | --- | --- | --- | --- | --- | --- |
| wireframes  | yes | yes | yes | yes | -   | yes | -   |
| design      | yes | yes | yes | -   | -   | -   | -   |
| development | yes | yes | yes | -   | -   | -   | -   |
