const swaggerDocumentation = {
  openapi: "3.0.0",
  info: {
    title: "NTNU ppl demo",
    version: "0.0.1",
    description: "This is an api for the ntnu ping pong league",
  },
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          firstname: {
            type: "string",
            example: "Morten",
          },
          surname: {
            type: "string",
            example: "Harket",
          },
          username: {
            type: "string",
            example: "Knorkator",
          },
          password: {
            type: "string",
            example: "password",
          },
          email: {
            type: "string",
            example: "Morten@knork.com",
          },
          department: {
            type: "string",
            example: "Design",
          },
        },
        required: [
          "firstname",
          "surname",
          "username",
          "password",
          "email",
          "department",
        ],
      },
      login: {
        type: "object",
        properties: {
          username: {
            type: "string",
            example: "trymnene",
          },
          password: {
            type: "string",
            example: "password",
          },
        },
        required: ["username", "password"],
      },
      username: {
        type: "object",
        properties: {
          username: {
            type: "string",
            example: "trymnene",
          },
        },
        required: ["username"],
      },
      Match: {
        type: "object",
        properties: {
          player1: {
            type: "string",
            example: "lisamyrene",
          },
          player2: {
            type: "string",
            example: "trymnene",
          },
          scorePlayer1: {
            type: "number",
            example: "3",
          },
          scorePlayer2: {
            type: "number",
            example: "1",
          },
          result: {
            type: "string",
            example: "(11-0)(11-0)(11-0)",
          },
          date: {
            type: "string",
            example: "2023-05-12T13:12:05.986+00:00",
          },
          matchid: {
            type: "number",
            example: "1",
          },
        },
        required: [
          "player1",
          "player2",
          "scorePlayer1",
          "scorePlayer2",
          "result",
          "date",
          "matchid",
        ],
      },
      Password: {
        type: "object",
        properties: {
          oldpassword: {
            type: "string",
            example: "password",
          },
          password: {
            type: "string",
            example: "password",
          },
        },
        required: ["oldpassword", "password"],
      },
    },
    securitySchemes: {
      accesToken: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    responses: {
      UnauthorizedError: {
        description: "Access token is missing or invalid",
      },
    },
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Backend server",
    },
    {
      url: "http://localhost:3000",
      description: "Frontend react server",
    },
  ],
  tags: [
    { name: "Players", description: "Player routes" },
    { name: "Matches", description: "Match routes" },
    { name: "Refreshtoken", description: "Refreshtoken route" },
    { name: "Logout", description: "Logout route" },
  ],
  paths: {
    "/players/": {
      get: {
        security: [
          {
            accesToken: [],
          },
        ],
        tags: ["Players"],
        summary: "returns a list of players",
        responses: {
          200: {
            description: "A JSON array of players",
          },
          401: {
            $ref: "#/components/responses/UnauthorizedError",
          },
        },
      },
      post: {
        tags: ["Players"],
        summary: "Creates a new player",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        responses: {
          201: {
            description: "User created {username}",
          },
          400: {
            description: "bad request",
          },
          409: {
            description: "username already exists",
          },
        },
      },
    },
    "/players/leaderboard": {
      get: {
        security: [
          {
            accesToken: [],
          },
        ],
        tags: ["Players"],
        summary: "returns players, sorted by wins",
        responses: {
          200: {
            description: "A JSON array of players",
          },
          404: {
            description: "No players found",
          },
          401: {
            $ref: "#/components/responses/UnauthorizedError",
          },
        },
      },
    },
    "/players/top-players": {
      get: {
        tags: ["Players"],
        summary: "returns the top 5 players based on wins",
        responses: {
          200: {
            description: "A JSON array of players",
          },
          500: {
            description: "Server error",
          },
        },
      },
    },
    "/players/count": {
      get: {
        tags: ["Players"],
        summary: "returns the number of players",
        responses: {
          200: {
            description: "A JSON array of players",
          },
          500: {
            description: "Server error",
          },
        },
      },
    },
    "/players/{username}": {
      get: {
        security: [
          {
            accesToken: [],
          },
        ],
        tags: ["Players"],
        parameters: [
          {
            name: "username",
            in: "path",
            required: true,
            description: "Username of the player",
          },
        ],
        summary: "returns info about a spesific player",
        responses: {
          200: {
            description: "A JSON array of player info",
          },
          500: {
            description: "Server error",
          },
          401: {
            $ref: "#/components/responses/UnauthorizedError",
          },
        },
      },
    },
    "/players/update/{username}": {
      put: {
        security: [
          {
            accesToken: [],
          },
        ],
        tags: ["Players"],
        summary: "Updates a player",
        parameters: [
          {
            name: "username",
            in: "path",
            required: true,
            description: "Username of the player",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        responses: {
          200: {
            description: "player updated",
          },
          400: {
            description: "error code",
          },
          401: {
            $ref: "#/components/responses/UnauthorizedError",
          },
        },
      },
    },
    "/players/delete/{username}": {
      delete: {
        security: [
          {
            accesToken: [],
          },
        ],
        tags: ["Players"],
        parameters: [
          {
            name: "username",
            in: "path",
            required: true,
            description: "Username of the player",
          },
        ],
        summary: "Deletes a player",
        responses: {
          200: {
            description: "Returns what user was deleted",
          },
          400: {
            description: "error code",
          },
          401: {
            $ref: "#/components/responses/UnauthorizedError",
          },
        },
      },
    },
    "/players/validate": {
      post: {
        security: [
          {
            accesToken: [],
          },
        ],
        tags: ["Players"],
        summary: "validates username in the request body",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/username",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Username validated",
          },
          400: {
            description: "bad request",
          },
          401: {
            $ref: "#/components/responses/UnauthorizedError",
          },
          403: {
            description: "only verified users can play matches",
          },
          404: {
            description: "username does not exist",
          },
        },
      },
    },
    "/players/login": {
      post: {
        tags: ["Players"],
        summary: "Attempts to log in player",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/login",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Sends access token",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    accessToken: {
                      type: "string",
                      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "bad request",
          },
          401: {
            description: "invalid username or password",
          },
          500: {
            description: "An error occured while logging in",
          },
        },
      },
    },
    "/players/sendnewpass": {
      post: {
        tags: ["Players"],
        summary: "sends a user a new password",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/username",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Ok",
          },
          500: {
            description: "An error occured while sending new password",
          },
        },
      },
    },
    "/players/validateemail/{token}": {
      post: {
        tags: ["Players"],
        parameters: [
          {
            name: "token",
            in: "path",
            required: true,
            description: "token recieved in mail",
          },
        ],
        summary: "Validates an email",
        responses: {
          200: {
            description: "Email validated",
          },
          404: {
            description: "Token not found",
          },
        },
      },
    },
    "/players/favourites/{username}": {
      get: {
        security: [
          {
            accesToken: [],
          },
        ],
        tags: ["Players"],
        parameters: [
          {
            name: "username",
            in: "path",
            required: true,
            description: "Username of the player",
          },
        ],
        summary: "returns info about a spesific player",
        responses: {
          200: {
            description: "A JSON array of player info",
          },
          500: {
            description: "Server error",
          },
          401: {
            $ref: "#/components/responses/UnauthorizedError",
          },
        },
      },
    },
    "/players/newFav": {
      post: {
        tags: ["Players"],
        summary: "Makes a new favourite",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/username",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Ok",
          },
          404: {
            description: "Username not found",
          },
          409: {
            description: "Username already a favourite",
          },
        },
      },
    },
    "/players/removeFav": {
      post: {
        tags: ["Players"],
        summary: "Remove a new favourite",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/username",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Ok",
          },
          404: {
            description: "Username not found",
          },
          409: {
            description: "Username not favourited",
          },
          500: {
            description:
              "An error occurred while removing username from favorites.",
          },
        },
      },
    },
    "/players/updatePassword": {
      put: {
        tags: ["Players"],
        security: [
          {
            accesToken: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Password",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad request",
          },
          401: {
            $ref: "#/components/responses/UnauthorizedError",
          },
        },
      },
    },
    "/matches": {
      get: {
        security: [
          {
            accesToken: [],
          },
        ],
        tags: ["Matches"],
        summary: "returns a list of matches",
        responses: {
          200: {
            description: "A JSON array of matches",
          },
          401: {
            $ref: "#/components/responses/UnauthorizedError",
          },
          400: {
            description: "Bad request",
          },
        },
      },
    },
    "/matches/count": {
      get: {
        tags: ["Matches"],
        summary: "returns the number of matches",
        responses: {
          200: {
            description: "Number of players",
          },
          400: {
            description: "Bad request",
          },
          418: {
            description: "Not for coffee",
          },
        },
      },
    },
    "/matches/new": {
      security: [
        {
          accesToken: [],
        },
      ],
      post: {
        tags: ["Matches"],
        summary: "Creates a new match",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Match",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Match created",
          },
          401: {
            $ref: "#/components/responses/UnauthorizedError",
          },
          404: {
            description: "Username does not exist",
          },
          500: {
            description: "Server status error",
          },
          403: {
            description: "Password is wrong",
          },
        },
      },
    },
    "/matches/{username}": {
      get: {
        security: [
          {
            accesToken: [],
          },
        ],
        tags: ["Matches"],
        parameters: [
          {
            name: "username",
            in: "path",
            required: true,
            description: "Username of the player",
          },
        ],
        summary: "returns matches played by specified user",
        responses: {
          200: {
            description: "A JSON array of played matches",
          },
          401: {
            $ref: "#/components/responses/UnauthorizedError",
          },
          400: {
            description: "Bad request",
          },
        },
      },
    },
    "/matches/{nr}": {
      get: {
        security: [
          {
            accesToken: [],
          },
        ],
        tags: ["Matches"],
        parameters: [
          {
            name: "nr",
            in: "path",
            required: true,
            description: "Match number",
          },
        ],
        summary: "returns specified match",
        responses: {
          200: {
            description: "A JSON array of played matches",
          },
          401: {
            $ref: "#/components/responses/UnauthorizedError",
          },
          400: {
            description: "Bad request",
          },
          403: {
            description: "Not authorized",
          },
        },
      },
    },
    "/matches/{matchId}": {
      delete: {
        security: [
          {
            accesToken: [],
          },
        ],
        tags: ["Matches"],
        parameters: [
          {
            name: "matchId",
            in: "path",
            required: true,
            description: "Match id",
          },
        ],
        summary: "Deletes a match",
        responses: {
          200: {
            description: "Returns what user was deleted",
          },
          400: {
            description: "error code",
          },
          401: {
            $ref: "#/components/responses/UnauthorizedError",
          },
        },
      },
      put: {
        security: [
          {
            accesToken: [],
          },
        ],
        tags: ["Matches"],
        summary: "Updates a match",
        parameters: [
          {
            name: "matchId",
            in: "path",
            required: true,
            description: "Match id",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Match",
              },
            },
          },
        },
        responses: {
          200: {
            description: "player updated",
          },
          400: {
            description: "error code",
          },
          401: {
            $ref: "#/components/responses/UnauthorizedError",
          },
        },
      },
    },
    "/refresh": {
      get: {
        tags: ["Refresh"],
        summary: "Refreshes accesstoken using refreshtoken",
        responses: {
          200: {
            description: "Successful token refresh",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    accesstoken: {
                      type: "string",
                      example:
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imxpc2FteXJlbmUiLCJpYXQiOjE2ODQxNjI2ODQsImV4cCI6MTY4NDE2MzU4NH0.GQ33jMdS69SAjAAW6hrDCaXXS_hNcH0k5LwKLd7DaeY",
                    },
                    username: {
                      type: "string",
                      example: "trymnene",
                    },
                  },
                },
              },
            },
          },
          403: {
            description: "Forbidden",
          },
        },
      },
    },
    "/logout": {
      post: {
        tags: ["Logout"],
        summary: "Logs out",
        responses: {
          200: {
            description: "Logout succesful",
          },
          204: {
            description: "no content",
          },
        },
      },
    },
  },
};

module.exports = swaggerDocumentation;
