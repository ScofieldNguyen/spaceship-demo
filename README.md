# SPACESHIP DEMO APP

## How to start
1. Clone the repository
2. Run `yarn install`
3. Run `yarn start`

## Layers

This project is devided into 3 main layers:
- **Domain**:
  - Contain all the business logic of the application
  - It is a pure typescript layer, with no dependencies (except for react-query)
  - It requires no knowledge of the outside world, only request data it needs through the Repository interface
  - Well protected with unit tests
  - Define its own entities and types
  - Test it by mocking the Repository interface
- **UI**:
  - Contain all the UI logic of the application
  - It uses the Domain layer to handle the business logic
  - Test it by mocking the Repository interface
- **Integrations**:
  - Contain all the integrations with the outside world
  - Convert the data from the outside world to the data in Domain layer

Using this architecture, we can easily test the Domain and UI layers by mocking the Repository interface. 

This way, we can develop Domain and UI layers without API integration. Open the possibility to develop new feature without waiting for backend to be ready.

Also the changes in the outside world will not affect the Domain and UI layers, as long as the Repository interface is not changed.

For example:
- Changing from RestAPI to GraphQL will only affect the Integrations layer
- Changing from AsyncStorage to local DB will only affect the Integrations layer

## Dependencies Injection
All dependencies are injected through the `DepsProvider` Context in main `_layout.tsx` file.

## Technologies
- **React**: UI library
- **React Query**: Data fetching & Caching solution
- **Jest**: Testing framework
- **React Testing Library**: Testing utility
- **Apollo**: GraphQL Client
- **Async Storage**: Local storage
