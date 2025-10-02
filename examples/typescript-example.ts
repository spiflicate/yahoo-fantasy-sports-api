/**
 * TypeScript Example for yahoo-fantasy library
 * 
 * This example demonstrates how to use the yahoo-fantasy library
 * with TypeScript for type-safe interactions with the Yahoo Fantasy Sports API.
 */

import YahooFantasy = require('../index');

// Initialize the Yahoo Fantasy client
const yf = new YahooFantasy(
  process.env.YAHOO_CLIENT_ID || 'YOUR_CLIENT_ID',
  process.env.YAHOO_CLIENT_SECRET || 'YOUR_CLIENT_SECRET',
  async (tokenData: YahooFantasy.TokenResponse) => {
    // Optional: Handle token refresh
    // Save the new tokens to your database or session storage
    console.log('Token refreshed at:', new Date().toISOString());
  },
  process.env.REDIRECT_URI || 'http://localhost:3000/auth/yahoo/callback'
);

// Set user tokens (in a real app, you'd get these from your session/database)
// yf.setUserToken('USER_ACCESS_TOKEN');
// yf.setRefreshToken('USER_REFRESH_TOKEN');

/**
 * Example 1: Get game metadata
 */
async function getGameMetadata(gameKey: string): Promise<void> {
  try {
    const game = await yf.game.meta(gameKey);
    console.log('Game Information:');
    console.log(`  Name: ${game.name}`);
    console.log(`  Code: ${game.code}`);
    console.log(`  Season: ${game.season}`);
    console.log(`  Type: ${game.type}`);
  } catch (error) {
    console.error('Error fetching game metadata:', error);
  }
}

/**
 * Example 2: Get league standings
 */
async function getLeagueStandings(leagueKey: string): Promise<void> {
  try {
    const league = await yf.league.standings(leagueKey);
    console.log(`\nLeague: ${league.name}`);
    console.log('Standings:');
    
    league.standings.teams.forEach((team, index) => {
      console.log(`  ${index + 1}. ${team.name}`);
    });
  } catch (error) {
    console.error('Error fetching league standings:', error);
  }
}

/**
 * Example 3: Get player statistics
 */
async function getPlayerStats(playerKey: string, week?: number): Promise<void> {
  try {
    const player = await yf.player.stats(playerKey, week);
    console.log(`\nPlayer: ${player.name.full}`);
    console.log(`Team: ${player.editorial_team_abbr}`);
    console.log(`Position: ${player.display_position}`);
    
    if (typeof player.stats !== 'string') {
      console.log('Stats:', player.stats);
    } else {
      console.log('Stats:', player.stats);
    }
  } catch (error) {
    console.error('Error fetching player stats:', error);
  }
}

/**
 * Example 4: Get team roster
 */
async function getTeamRoster(teamKey: string, week?: number): Promise<void> {
  try {
    const team = await yf.team.roster(teamKey, week);
    console.log(`\nTeam: ${team.name}`);
    console.log('Roster:');
    
    team.roster.players.forEach((player) => {
      const position = player.selected_position?.position || 'N/A';
      console.log(`  ${player.name.full} (${player.display_position}) - ${position}`);
    });
  } catch (error) {
    console.error('Error fetching team roster:', error);
  }
}

/**
 * Example 5: Get multiple games using collections
 */
async function getMultipleGames(gameKeys: string[]): Promise<void> {
  try {
    const games = await yf.games.fetch(gameKeys);
    console.log('\nGames:');
    
    games.forEach((game) => {
      console.log(`  ${game.name} (${game.code}) - ${game.season}`);
    });
  } catch (error) {
    console.error('Error fetching multiple games:', error);
  }
}

/**
 * Example 6: Get league settings
 */
async function getLeagueSettings(leagueKey: string): Promise<void> {
  try {
    const league = await yf.league.settings(leagueKey);
    console.log(`\nLeague Settings for: ${league.name}`);
    console.log(`  Scoring Type: ${league.settings.scoring_type}`);
    console.log(`  Draft Type: ${league.settings.draft_type}`);
    console.log(`  Number of Playoff Teams: ${league.settings.num_playoff_teams}`);
    console.log(`  Uses FAAB: ${league.settings.uses_faab}`);
    
    if (league.settings.roster_positions) {
      console.log('  Roster Positions:');
      league.settings.roster_positions.forEach((pos) => {
        console.log(`    ${pos.position}: ${pos.count || 1}`);
      });
    }
  } catch (error) {
    console.error('Error fetching league settings:', error);
  }
}

/**
 * Example 7: Get user's games
 */
async function getUserGames(): Promise<void> {
  try {
    const user = await yf.user.games();
    console.log('\nUser Games:');
    
    if (user.games) {
      user.games.forEach((game) => {
        console.log(`  ${game.name} (${game.season})`);
      });
    }
  } catch (error) {
    console.error('Error fetching user games:', error);
  }
}

/**
 * Example 8: Get scoreboard for a specific week
 */
async function getScoreboard(leagueKey: string, week: number): Promise<void> {
  try {
    const league = await yf.league.scoreboard(leagueKey, week);
    console.log(`\nScoreboard - Week ${week}`);
    
    league.scoreboard.matchups.forEach((matchup, index) => {
      console.log(`\n  Matchup ${index + 1}:`);
      matchup.teams.forEach((team) => {
        console.log(`    ${team.name}`);
      });
      if (matchup.winner_team_key) {
        console.log(`    Winner: ${matchup.winner_team_key}`);
      } else if (matchup.is_tied) {
        console.log('    Status: Tied');
      }
    });
  } catch (error) {
    console.error('Error fetching scoreboard:', error);
  }
}

/**
 * Example 9: Type-safe callback usage
 */
function getGameWithCallback(gameKey: string): void {
  yf.game.meta(gameKey, (error: Error | null, game?: YahooFantasy.Game) => {
    if (error) {
      console.error('Error:', error);
      return;
    }
    
    if (game) {
      console.log(`\nGame (via callback): ${game.name}`);
    }
  });
}

/**
 * Example 10: Working with player collections
 */
async function getMultiplePlayers(playerKeys: string[]): Promise<void> {
  try {
    const players = await yf.players.fetch(playerKeys, ['stats', 'ownership']);
    console.log('\nPlayers:');
    
    players.forEach((player) => {
      console.log(`  ${player.name.full} - ${player.editorial_team_abbr}`);
    });
  } catch (error) {
    console.error('Error fetching multiple players:', error);
  }
}

// Main execution
async function main() {
  console.log('Yahoo Fantasy TypeScript Example\n');
  console.log('=================================\n');
  
  // Example game keys and league keys (replace with your actual keys)
  const gameKey = 'nfl';
  const leagueKey = '423.l.123456'; // Replace with your league key
  const playerKey = '423.p.7847'; // Replace with actual player key
  const teamKey = '423.l.123456.t.1'; // Replace with actual team key
  
  // Uncomment the examples you want to run:
  
  // await getGameMetadata(gameKey);
  // await getMultipleGames(['nfl', 'mlb', 'nba']);
  // await getLeagueStandings(leagueKey);
  // await getLeagueSettings(leagueKey);
  // await getPlayerStats(playerKey, 1);
  // await getTeamRoster(teamKey, 1);
  // await getScoreboard(leagueKey, 1);
  // await getUserGames();
  // await getMultiplePlayers([playerKey]);
  // getGameWithCallback(gameKey);
  
  console.log('\nNote: Make sure to set your tokens before running these examples!');
  console.log('Use yf.setUserToken() and yf.setRefreshToken() or handle OAuth flow.');
}

// Run if executed directly
if (require.main === module) {
  main().catch((error) => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
}

// Export for use in other modules
export {
  yf,
  getGameMetadata,
  getLeagueStandings,
  getPlayerStats,
  getTeamRoster,
  getMultipleGames,
  getLeagueSettings,
  getUserGames,
  getScoreboard,
  getMultiplePlayers,
};
