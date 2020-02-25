// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false
};

export const HOSTNAME: string = location.hostname;
//export const HOSTNAME:string ="104.198.56.13";
export const PORT: number = 8085;

//export const WEBSOCKET_HOSTNAME = HOSTNAME;
export const WEBSOCKET_HOSTNAME = '34.203.189.54';
export const WEBSOCKET_PORT: number = 8084;

//export const CACHE_SERVICE_HOSTNAME = HOSTNAME;
export const CACHE_SERVICE_HOSTNAME = '35.193.112.1';
export const CACHE_SERVICE_PORT: number = 8088;

//export const MANAGEMENT_SERVICE_HOSTNAME = HOSTNAME;
export const MANAGEMENT_SERVICE_HOSTNAME = '3.86.93.33';
export const MANAGEMENT_SERVICE_PORT: number = 8085;


//export const WEBSOCKET_URL = 'http://' + WEBSOCKET_HOSTNAME + ':' + WEBSOCKET_PORT + '/log-socket';
export const WEBSOCKET_URL =  '/websocket-api/log-socket';

//export const ROUTE_DESCRIPTION_URL = 'http://'+CACHE_SERVICE_HOSTNAME+':'+CACHE_SERVICE_PORT+'/route';
export const ROUTE_DESCRIPTION_URL = '/cache-api/route';