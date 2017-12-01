**routing-service** is a very simple router. Just add routes and callbacks.

This is a es6 module. No compiled version is provided. Install via `npm install routing-service` or `yarn add
routing-service`.

Don't forget to add `history` npm-module as a dependency. It is set as peerDependency for convenient updates.

## API

* `routingService.onLocationChange(location: Location)` - this is run automatically on history change. This function
  parses provided location and calls matching route's callback
* `routingService.addRoute(shorthand: String, route: String, onVisit: (data: Object, action: String) => {}) =>
  RoutingService` - adds route and callback. Returns routingService for chaining.
* `routingService.add404(onRouteNotFound: (action: String) => {}) => RoutingService` - adds handler for a case, when
  matching route could not be found
* `routingService.composeURL(shorthand: String, routeData: { params: Object, query: Object }) => String` - returns a
  url, that matches `shorthand` route with filled out parameters from `routeData`. Note that returned string does not
  include host.
* `routingService.clearRoutes()` - cleans up all routes
* `routingService.setURL(url: String)` - shorthand for `history.push`
* `routingService.replaceURL(url: String)` - shorthand for `history.replace`
* `routingService.setLocation(shorthand: String, routeData: Object)` - combination of `setURL` and `composeURL`
* `routingService.replaceLocation(shorthand: String, routeData: { params: Object, query: Object })` - combination of
  `replaceURL` and `composeURL`

## How to use

E.g. in combination with `session-controller` module

```javascript
import { Session } from 'session-controller';
import routingService from 'routing-service';

// a list of controller imports
import controllers from './controllers';

window.session = new Session(window.document.getElementById('mount-point'), controllers);

routingService
  .addRoute('home', '/', ({ query }) => {
    // do something with query parameters
    // maybe fetch some data
    // assume payload is the result of that operations
    // ...
    window.session.mountController('HomeController', payload);
  })
  .addRoute('resource', '/resource/:resourceId', ({ params }) => {
    // params will look like { resourceId: ... } for matching route
    // ...
    window.session.mountController('ResourceController', payload);
  })
  .add404(() => {
    window.session.mountController('NotFoundController', {});
  });

// match first route
routingService.onLocationChange(window.location);
```
