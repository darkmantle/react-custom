
/**
 * Represents the Router for your application
 * @public
 */

export default class Router {

    /**
     * Array of all application routes
     */
    static routes: Route[];

    /**
     * The URL parameters of the current route
     */
    static routeParams: any;

    /**
     * The current route
     */
    static currentRoute: Route;

    /**
     * Matches the path given to the correct route
     * @param path - If not given, defaults to window.location.pathname
     * @returns The matching Route
     */
    static matchRoute(path: string = window.location.pathname) {
        // Find the route that matches the current path
        const escapeDots = (s: string) => Array.from(s, c => c === '.' ? '\\.' : c).join('')
        const matchedRoute = this.routes.find(o => new RegExp(`^${o.path
            .split('/')
            .map(s => s.startsWith(':') ? '[^\/]+' : escapeDots(s))
            .join('\/')
            }$`).test(path));

        if (!matchedRoute) return null;

        // Now we need to strip out the route params
        const routeParts = matchedRoute?.path.split("/"),
            pathParts = path.split("/"),
            params: any = {};

        routeParts?.forEach((part, i) => {
            if (part.startsWith(":")) {
                params[part.replace(":", "")] = pathParts[i];
            }
        });

        // Set variables used in hooks
        this.routeParams = params;
        this.currentRoute = matchedRoute;

        return {
            ...matchedRoute,
            params
        };

    }

    /**
     * Sets the applications routes
     * @param routes: An array of routes
     */
    static setRoutes = (routes: Route[]) => this.routes = routes;

    /**
     * Returns the applications routes
     * @returns An array of all app routes
     */
    static getRoutes = () => this.routes;

    static goBack = () => history.go(-1);

    static navigate = (path: string) => location.href = path;
}