class Router {
  constructor() {
    this.routes = routes;
    this._loadInitialRoute();
  }

  // Update DOM directoly and window.history
  loadRoute(...urlSegments) {
    const matchedRoute = this._matchUrlToRoute(urlSegments);

    const url = `/${urlSegments.join('/')}`;
    history.pushState({}, '', url);

    const routerOutletElement = document.querySelectorAll('[data-router-outlet]')[0];
    routerOutletElement.innerHTML = matchedRoute.template;
  }

  // Find mathcedUrl using target routes array and current url with array function such as every and find
  _matchUrlToRoute(urlSegments) {
    const matchedRoute = this.routes.find((route) => {
      const routePathSegments = route.path.split('/').slice(1);

      if (routePathSegments.length !== urlSegments.length) {
        return false;
      }

      return routePathSegments.every((routePathSegment, i) => routePathSegment === urlSegments[i]);
    });

    return matchedRoute;
  }

  // For initial rendaring
  _loadInitialRoute() {
    const pathnameSplit = window.location.pathname.split('/');
    const pathSegments = pathnameSplit.length > 1 ? pathnameSplit.slice(1) : '';

    this.loadRoute(...pathSegments);
  }
}
