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
    LOGIN = "login"
  }