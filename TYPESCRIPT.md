# TypeScript Support

This library now includes TypeScript type definitions, making it easier to use with TypeScript projects and providing better IDE autocomplete support.

## Installation

The type definitions are included automatically when you install the package:

```bash
npm install yahoo-fantasy
```

## Usage

### Basic Setup

```typescript
import YahooFantasy = require('yahoo-fantasy');

const yf = new YahooFantasy(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  (tokenData) => {
    // Optional callback when token is refreshed
    console.log('Token refreshed:', tokenData.access_token);
  },
  'http://localhost:3000/auth/yahoo/callback'
);

// Set tokens
yf.setUserToken('USER_ACCESS_TOKEN');
yf.setRefreshToken('USER_REFRESH_TOKEN');
```

### Using Resources

All resource methods support both callbacks and promises, with full type inference:

```typescript
// Using promises
async function getGameInfo() {
  try {
    const game = await yf.game.meta('nfl');
    console.log('Game name:', game.name);
    console.log('Game key:', game.game_key);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Using callbacks
yf.game.meta('nfl', (err, game) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('Game name:', game?.name);
});

// Using async/await
async function getLeagueStandings(leagueKey: string) {
  const league = await yf.league.standings(leagueKey);
  return league.standings;
}
```

### Type-Safe Player Stats

```typescript
async function getPlayerStats(playerKey: string, week: number) {
  const player = await yf.player.stats(playerKey, week);
  
  // TypeScript knows the structure of the player object
  console.log('Player name:', player.name.full);
  console.log('Player stats:', player.stats);
  
  return player;
}
```

### Working with Collections

```typescript
async function getMultipleGames() {
  const games = await yf.games.fetch(['nfl', 'mlb', 'nba']);
  
  // TypeScript knows this is an array of Game objects
  games.forEach(game => {
    console.log(`${game.name} (${game.code})`);
  });
}

async function getPlayersWithStats() {
  const players = await yf.players.fetch(
    ['223.p.5479', '223.p.6797'],
    ['stats', 'ownership']
  );
  
  return players;
}
```

### Type Definitions for Custom Code

You can import types for use in your own code:

```typescript
import YahooFantasy = require('yahoo-fantasy');

// Use types in your function signatures
function processLeague(league: YahooFantasy.League): void {
  console.log(`Processing league: ${league.name}`);
}

function processPlayer(player: YahooFantasy.Player): string {
  return `${player.name.full} - ${player.editorial_team_abbr}`;
}

// Callback type
const myCallback: YahooFantasy.Callback<YahooFantasy.Game> = (err, game) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(game?.name);
};
```

## Available Types

The library exports the following main types:

### Resource Types
- `Game` - Game metadata
- `League` - League information
- `Team` - Team data
- `Player` - Player information
- `User` - User data
- `Transaction` - Transaction details
- `Roster` - Roster information
- `Stats` - Player/team statistics
- `Matchup` - Head-to-head matchup data
- `Standings` - League standings
- `Settings` - League settings

### Resource Interfaces
- `GameResource` - Methods for game-related queries
- `LeagueResource` - Methods for league-related queries
- `PlayerResource` - Methods for player-related queries
- `TeamResource` - Methods for team-related queries
- `RosterResource` - Methods for roster-related queries
- `TransactionResource` - Methods for transaction-related queries
- `UserResource` - Methods for user-related queries

### Collection Interfaces
- `GamesCollection` - Methods for fetching multiple games
- `LeaguesCollection` - Methods for fetching multiple leagues
- `PlayersCollection` - Methods for fetching multiple players
- `TeamsCollection` - Methods for fetching multiple teams
- `TransactionsCollection` - Methods for fetching multiple transactions

## Benefits of TypeScript Support

1. **Autocomplete**: Your IDE will provide intelligent suggestions for methods and properties
2. **Type Safety**: Catch errors at compile time instead of runtime
3. **Better Documentation**: Hover over methods to see parameter types and return values
4. **Refactoring**: Rename symbols safely across your entire codebase
5. **Self-Documenting Code**: Types serve as inline documentation

## Example Project

Here's a complete example of using the library with TypeScript:

```typescript
import YahooFantasy = require('yahoo-fantasy');

class FantasyLeagueManager {
  private yf: YahooFantasy;
  
  constructor(clientId: string, clientSecret: string) {
    this.yf = new YahooFantasy(
      clientId,
      clientSecret,
      this.handleTokenRefresh.bind(this)
    );
  }
  
  private async handleTokenRefresh(tokenData: YahooFantasy.TokenResponse): Promise<void> {
    // Save tokens to your database or session
    console.log('Saving new tokens...');
  }
  
  async getLeagueInfo(leagueKey: string): Promise<YahooFantasy.League> {
    return await this.yf.league.meta(leagueKey);
  }
  
  async getTeamRoster(teamKey: string, week?: number): Promise<YahooFantasy.Player[]> {
    const team = await this.yf.team.roster(teamKey, week);
    return team.roster.players;
  }
  
  async getTopPlayers(leagueKey: string): Promise<YahooFantasy.Player[]> {
    const players = await this.yf.players.leagues(
      leagueKey,
      { sort: 'OR', sort_type: 'season', count: 25 },
      ['stats', 'ownership']
    );
    
    return players[0].players;
  }
}

// Usage
const manager = new FantasyLeagueManager('CLIENT_ID', 'CLIENT_SECRET');
manager.getLeagueInfo('123.l.456789')
  .then(league => console.log(league.name))
  .catch(err => console.error(err));
```

## Note on Module System

This library uses CommonJS exports. Import it using:

```typescript
import YahooFantasy = require('yahoo-fantasy');
```

Not:

```typescript
// This won't work
import YahooFantasy from 'yahoo-fantasy';
```

## Contributing

If you find any issues with the type definitions or have suggestions for improvements, please open an issue or submit a pull request on GitHub.
