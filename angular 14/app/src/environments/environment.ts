// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api: 'http://localhost:3000',
  token: {
    app: 'd7507451-0c15-4922-8686-54703ac3f8af',
    //api: 'https://sau.aps.gob.bo/jwt/api/v2/token',
    //user: 'https://sau.aps.gob.bo/jwt/api/v2/usuarios',
    api: 'http://192.168.57.180:8085/authv2/api/v2/token',
    user: 'http://192.168.57.180:8085/authv2/api/v2/usuarios'
  }
};
