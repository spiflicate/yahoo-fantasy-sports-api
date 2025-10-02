# Yahoo Fantasy Sports API Examples

This directory contains example code demonstrating how to use the `yahoo-fantasy` library.

## TypeScript Example

The `typescript-example.ts` file demonstrates how to use the library with TypeScript, including:

- Game metadata queries
- League standings and settings
- Player statistics
- Team rosters
- Scoreboard data
- User games
- Collections (multiple resources at once)
- Both callback and promise-based usage

### Running the TypeScript Example

1. Install TypeScript and dependencies:
```bash
npm install
npm install --save-dev typescript @types/node
```

2. Set your environment variables:
```bash
export YAHOO_CLIENT_ID="your_client_id"
export YAHOO_CLIENT_SECRET="your_client_secret"
export REDIRECT_URI="http://localhost:3000/auth/yahoo/callback"
```

3. Compile and run:
```bash
# Compile TypeScript to JavaScript
npx tsc examples/typescript-example.ts --outDir examples/dist

# Run the compiled JavaScript
node examples/dist/typescript-example.js
```

Or use `ts-node` for direct execution:
```bash
npm install --save-dev ts-node
npx ts-node examples/typescript-example.ts
```

### Note

Before running any examples, make sure to:
1. Obtain your Yahoo! API credentials from the [Yahoo Developer Network](https://developer.yahoo.com/apps/)
2. Set up OAuth2 authentication and obtain user tokens
3. Replace placeholder keys in the examples with your actual league, team, and player keys

## More Examples Coming Soon

Additional examples for different use cases will be added, including:
- OAuth2 authentication flow
- Transaction management
- Draft analysis
- Real-time updates
- Express.js integration
- React integration

## Contributing

Feel free to contribute additional examples! Please ensure they:
- Are well-commented
- Include error handling
- Work with the latest version of the library
- Follow TypeScript best practices (if applicable)
