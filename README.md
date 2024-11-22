## Dependencies

### DEV:

`npm install --save-dev prettier eslint eslint-config-prettier eslint-plugin-node eslint-plugin-prettier`

TESTING:

`npm install --save-dev jasmine jasmine-spec-reporter supertest`

TypeScript:

`npm i --save-dev @types/<package-name> or npm i --save-dev @typescript/<package-name>`

`npm install --save-dev typescript`
`npm install --save-dev ts-node`
`npm install --save-dev @types/node`
`npm install --save-dev @types/express`
`npm install --save-dev @types/jasmine @types/supertest`
`npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser`

## Tasks :

### Project:

-   [x] install dependencies
-   [x] configs
-   [x] imageProcessingService: Input -> filename, width, height - Output -> string file location.
-   [x] API endpoint -> /images?filename=name&width=w&height=h

### Refactoring, debugging and testing.

-   [x] Test -> invalid URL.
-   [x] Test -> valid image.
-   [x] Test -> not providing a query object.
-   [x] Test -> given bad filename.
-   [x] Test -> given height and width in negative numbers.
-   [x] Test -> given bad height and width.
-   [x] Error Handling Middleware.
-   [x] Custom Errors.
-   [x] Refactor imageResize function to return void.
-   [x] Caching an image.
-   [x] Validation Middleware
