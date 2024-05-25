export class APIRequestPayload{
    method !: string;
    endpoint !: string;
    body ? : object;
  }
  
  export enum HttpMethod{
    CONNECT = 'CONNECT',
    DELETE = 'DELETE',
    GET = 'GET',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS',
    PATCH = 'PATCH',
    POST = 'POST',
    PUT = 'PUT',
    TRACE = 'TRACE'
  }

  export enum Endpoint {
    LOGIN = "login",
    ROLE = "role",
    ROLES = "roles",
    ROUTES = "routes",
    ROUTE = "route",
    ROLE_ROUTE_MAPPINGS = "role-route-mappings",
    ROLE_ROUTE_MAPPING = "role-route-mapping",
    HANDLER = "handler",
    USER = "user"
  }