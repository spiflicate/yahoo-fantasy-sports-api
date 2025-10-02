// Type definitions for yahoo-fantasy
// Project: https://github.com/whatadewitt/yfsapi
// Definitions by: GitHub Copilot

/// <reference types="node" />

import { IncomingMessage, ServerResponse } from 'http';

declare namespace YahooFantasy {
  // ==================== Callback Types ====================
  
  type Callback<T = any> = (error: Error | null, data?: T) => void;
  
  // ==================== Common Data Types ====================
  
  interface Game {
    game_key: string;
    game_id: string;
    name: string;
    code: string;
    type: string;
    url: string;
    season: string;
    is_registration_over?: number;
    is_game_over?: number;
    is_offseason?: number;
  }
  
  interface League {
    league_key: string;
    league_id: string;
    name: string;
    url: string;
    logo_url?: string;
    draft_status: string;
    num_teams: number;
    edit_key: string;
    weekly_deadline: string;
    league_update_timestamp: string;
    scoring_type: string;
    league_type: string;
    renew?: string;
    renewed?: string;
    iris_group_chat_id?: string;
    allow_add_to_dl_extra_pos?: number;
    is_pro_league?: string;
    is_cash_league?: string;
    current_week?: number | string;
    start_week?: string;
    start_date?: string;
    end_week?: string;
    end_date?: string;
    game_code?: string;
    season?: string;
  }
  
  interface Team {
    team_key: string;
    team_id: string;
    name: string;
    is_owned_by_current_login?: number;
    url: string;
    team_logos?: Array<{ team_logo: { size: string; url: string } }>;
    waiver_priority?: number;
    number_of_moves?: number;
    number_of_trades?: number;
    roster_adds?: {
      coverage_type: string;
      coverage_value: number | string;
      value: number | string;
    };
    league_scoring_type?: string;
    has_draft_grade?: number;
    managers?: Manager[];
  }
  
  interface Manager {
    manager_id: string;
    nickname: string;
    guid: string;
    is_commissioner?: number | string;
    is_current_login?: number | string;
    email?: string;
    image_url?: string;
  }
  
  interface Player {
    player_key: string;
    player_id: string;
    name: {
      full: string;
      first: string;
      last: string;
      ascii_first: string;
      ascii_last: string;
    };
    editorial_player_key?: string;
    editorial_team_key?: string;
    editorial_team_full_name?: string;
    editorial_team_abbr?: string;
    bye_weeks?: { week: string };
    uniform_number?: number;
    display_position?: string;
    headshot?: {
      url: string;
      size: string;
    };
    image_url?: string;
    is_undroppable?: string;
    position_type?: string;
    primary_position?: string;
    eligible_positions?: string[];
    has_player_notes?: number;
    player_notes_last_timestamp?: number;
    selected_position?: {
      coverage_type: string;
      date?: string;
      week?: string;
      position: string;
      is_flex?: number;
    };
  }
  
  interface Stat {
    stat_id: number | string;
    value: string | number;
  }
  
  interface Stats {
    coverage_type?: string;
    date?: string;
    week?: string;
    season?: string;
    stats?: Stat[];
  }
  
  interface Transaction {
    transaction_key: string;
    transaction_id: string;
    type: string;
    status: string;
    timestamp: string;
    tradee_team_key?: string;
    tradee_team_name?: string;
    trader_team_key?: string;
    trader_team_name?: string;
    faab_bid?: number;
    players?: any[];
  }
  
  interface User {
    guid: string;
    games?: Game[];
    teams?: any[];
  }
  
  interface DraftResult {
    pick: number;
    round: number;
    team_key: string;
    player_key: string;
  }
  
  interface Matchup {
    week: string;
    week_start: string;
    week_end: string;
    status: string;
    is_playoffs: string;
    is_consolation: string;
    is_matchup_recap_available?: number;
    matchup_recap_url?: string;
    matchup_recap_title?: string;
    matchup_grades?: any[];
    is_tied?: number;
    winner_team_key?: string;
    teams: Team[];
  }
  
  interface Scoreboard {
    week: string;
    matchups: Matchup[];
  }
  
  interface Roster {
    coverage_type: string;
    week?: string;
    date?: string;
    is_editable?: number;
    players: Player[];
  }
  
  interface Standings {
    teams: Team[];
  }
  
  interface Settings {
    draft_type?: string;
    is_auction_draft?: string;
    scoring_type?: string;
    persistent_url?: string;
    uses_playoff?: string;
    has_playoff_consolation_games?: boolean;
    playoff_start_week?: string;
    uses_playoff_reseeding?: number;
    uses_lock_eliminated_teams?: number;
    num_playoff_teams?: string;
    num_playoff_consolation_teams?: number;
    has_multiweek_championship?: number;
    waiver_type?: string;
    waiver_rule?: string;
    uses_faab?: string;
    draft_time?: string;
    draft_pick_time?: string;
    post_draft_players?: string;
    max_teams?: string;
    waiver_time?: string;
    trade_end_date?: string;
    trade_ratify_type?: string;
    trade_reject_time?: string;
    player_pool?: string;
    cant_cut_list?: string;
    roster_positions?: RosterPosition[];
    stat_categories?: StatCategory[];
    stat_modifiers?: StatModifier[];
  }
  
  interface RosterPosition {
    position: string;
    position_type?: string;
    count?: number;
    abbreviation?: string;
    display_name?: string;
    is_bench?: number;
  }
  
  interface StatCategory {
    stat_id: number;
    enabled?: string;
    name?: string;
    display_name?: string;
    sort_order?: string;
    position_type?: string;
    position_types?: Array<{ position_type: string }>;
    is_only_display_stat?: string;
    base_stat?: string;
  }
  
  interface StatModifier {
    stat_id: number;
    value?: number | string;
  }
  
  interface Ownership {
    ownership_type: string;
    owner_team_key?: string;
    owner_team_name?: string;
    waiver_date?: string;
  }
  
  interface DraftAnalysis {
    average_pick?: string;
    average_round?: string;
    average_cost?: string;
    percent_drafted?: string;
  }
  
  // ==================== Resource Classes ====================
  
  interface GameResource {
    /**
     * Get game metadata
     * @param gameKey - Game key (e.g., 'nfl', 'mlb', or a specific game ID)
     * @param cb - Optional callback function
     * @returns Promise resolving to game metadata
     */
    meta(gameKey: string | number, cb?: Callback<Game>): Promise<Game>;
    
    /**
     * Get leagues for a game
     * @deprecated Use league.meta instead
     * @param gameKey - Game key
     * @param leagueKey - League key or array of league keys
     * @param cb - Optional callback function
     * @returns Promise resolving to game with leagues
     */
    leagues(gameKey: string | number, leagueKey: string | string[], cb?: Callback<Game & { leagues: League[] }>): Promise<Game & { leagues: League[] }>;
    
    /**
     * Get players for a game
     * @deprecated Use player.meta instead
     * @param gameKey - Game key
     * @param playerKey - Player key or array of player keys
     * @param cb - Optional callback function
     * @returns Promise resolving to game with players
     */
    players(gameKey: string | number, playerKey: string | string[], cb?: Callback<Game & { players: Player[] }>): Promise<Game & { players: Player[] }>;
    
    /**
     * Get game weeks
     * @param gameKey - Game key
     * @param cb - Optional callback function
     * @returns Promise resolving to game with weeks
     */
    game_weeks(gameKey: string | number, cb?: Callback<Game & { weeks: any[] }>): Promise<Game & { weeks: any[] }>;
    
    /**
     * Get stat categories for a game
     * @param gameKey - Game key
     * @param cb - Optional callback function
     * @returns Promise resolving to game with stat categories
     */
    stat_categories(gameKey: string | number, cb?: Callback<Game & { stat_categories: StatCategory[] }>): Promise<Game & { stat_categories: StatCategory[] }>;
    
    /**
     * Get position types for a game
     * @param gameKey - Game key
     * @param cb - Optional callback function
     * @returns Promise resolving to game with position types
     */
    position_types(gameKey: string | number, cb?: Callback<Game & { position_types: any[] }>): Promise<Game & { position_types: any[] }>;
    
    /**
     * Get roster positions for a game
     * @param gameKey - Game key
     * @param cb - Optional callback function
     * @returns Promise resolving to game with roster positions
     */
    roster_positions(gameKey: string | number, cb?: Callback<Game & { roster_positions: RosterPosition[] }>): Promise<Game & { roster_positions: RosterPosition[] }>;
  }
  
  interface LeagueResource {
    /**
     * Get league metadata
     * @param leagueKey - League key
     * @param cb - Optional callback function
     * @returns Promise resolving to league metadata
     */
    meta(leagueKey: string, cb?: Callback<League>): Promise<League>;
    
    /**
     * Get league settings
     * @param leagueKey - League key
     * @param cb - Optional callback function
     * @returns Promise resolving to league with settings
     */
    settings(leagueKey: string, cb?: Callback<League & { settings: Settings }>): Promise<League & { settings: Settings }>;
    
    /**
     * Get league standings
     * @param leagueKey - League key
     * @param cb - Optional callback function
     * @returns Promise resolving to league with standings
     */
    standings(leagueKey: string, cb?: Callback<League & { standings: Standings }>): Promise<League & { standings: Standings }>;
    
    /**
     * Get league scoreboard (H2H only)
     * @param leagueKey - League key
     * @param week - Optional week number
     * @param cb - Optional callback function
     * @returns Promise resolving to league with scoreboard
     */
    scoreboard(leagueKey: string, week?: string | number, cb?: Callback<League & { scoreboard: Scoreboard }>): Promise<League & { scoreboard: Scoreboard }>;
    scoreboard(leagueKey: string, cb?: Callback<League & { scoreboard: Scoreboard }>): Promise<League & { scoreboard: Scoreboard }>;
    
    /**
     * Get teams in a league
     * @param leagueKey - League key
     * @param cb - Optional callback function
     * @returns Promise resolving to league with teams
     */
    teams(leagueKey: string, cb?: Callback<League & { teams: Team[] }>): Promise<League & { teams: Team[] }>;
    
    /**
     * Get draft results for a league
     * @param leagueKey - League key
     * @param cb - Optional callback function
     * @returns Promise resolving to league with draft results
     */
    draft_results(leagueKey: string, cb?: Callback<League & { draft_results: DraftResult[] }>): Promise<League & { draft_results: DraftResult[] }>;
    
    /**
     * Get transactions for a league
     * @param leagueKey - League key
     * @param cb - Optional callback function
     * @returns Promise resolving to league with transactions
     */
    transactions(leagueKey: string, cb?: Callback<League & { transactions: Transaction[] }>): Promise<League & { transactions: Transaction[] }>;
    
    /**
     * Get players in a league with optional stats
     * @param leagueKey - League key
     * @param playerKeys - Player key or array of player keys
     * @param week - Optional week number
     * @param cb - Optional callback function
     * @returns Promise resolving to league with players
     */
    players(leagueKey: string, playerKeys: string | string[], week?: string | number, cb?: Callback<League & { players: Player[] }>): Promise<League & { players: Player[] }>;
    players(leagueKey: string, playerKeys: string | string[], cb?: Callback<League & { players: Player[] }>): Promise<League & { players: Player[] }>;
  }
  
  interface PlayerResource {
    /**
     * Get player metadata
     * @param playerKey - Player key
     * @param cb - Optional callback function
     * @returns Promise resolving to player metadata
     */
    meta(playerKey: string, cb?: Callback<Player>): Promise<Player>;
    
    /**
     * Get player stats
     * @param playerKey - Player key
     * @param weekOrDate - Optional week number, date (YYYY-MM-DD), 'lastweek', or 'lastmonth'
     * @param cb - Optional callback function
     * @returns Promise resolving to player with stats
     */
    stats(playerKey: string, weekOrDate?: string | number, cb?: Callback<Player & { stats: Stats | string }>): Promise<Player & { stats: Stats | string }>;
    stats(playerKey: string, cb?: Callback<Player & { stats: Stats | string }>): Promise<Player & { stats: Stats | string }>;
    
    /**
     * Get player ownership percentage
     * @param playerKey - Player key
     * @param cb - Optional callback function
     * @returns Promise resolving to player with ownership percentage
     */
    percent_owned(playerKey: string, cb?: Callback<Player & { percent_owned: string }>): Promise<Player & { percent_owned: string }>;
    
    /**
     * Get player ownership status in a league
     * @param playerKey - Player key
     * @param leagueKey - League key
     * @param cb - Optional callback function
     * @returns Promise resolving to player with ownership status
     */
    ownership(playerKey: string, leagueKey: string, cb?: Callback<Player & { status: Ownership; league: League }>): Promise<Player & { status: Ownership; league: League }>;
    
    /**
     * Get player draft analysis
     * @param playerKey - Player key
     * @param cb - Optional callback function
     * @returns Promise resolving to player with draft analysis
     */
    draft_analysis(playerKey: string, cb?: Callback<Player & { draft_analysis: DraftAnalysis }>): Promise<Player & { draft_analysis: DraftAnalysis }>;
  }
  
  interface RosterResource {
    /**
     * Get roster for a team
     * @param teamKey - Team key
     * @param weekOrDate - Optional week number or date (YYYY-MM-DD)
     * @param cb - Optional callback function
     * @returns Promise resolving to team with roster
     */
    fetch(teamKey: string, weekOrDate?: string | number, cb?: Callback<Team & { roster: Roster }>): Promise<Team & { roster: Roster }>;
    fetch(teamKey: string, cb?: Callback<Team & { roster: Roster }>): Promise<Team & { roster: Roster }>;
    
    /**
     * Get roster players with additional subresources
     * @param teamKey - Team key
     * @param weekOrDate - Optional week number or date (YYYY-MM-DD)
     * @param subresource - Optional subresource (e.g., 'stats')
     * @param cb - Optional callback function
     * @returns Promise resolving to team with roster
     */
    players(teamKey: string, weekOrDate?: string | number, subresource?: string, cb?: Callback<Team & { roster: Roster }>): Promise<Team & { roster: Roster }>;
    players(teamKey: string, cb?: Callback<Team & { roster: Roster }>): Promise<Team & { roster: Roster }>;
  }
  
  interface TeamResource {
    /**
     * Get team metadata
     * @param teamKey - Team key
     * @param cb - Optional callback function
     * @returns Promise resolving to team metadata
     */
    meta(teamKey: string, cb?: Callback<Team>): Promise<Team>;
    
    /**
     * Get team stats
     * @param teamKey - Team key
     * @param weekOrDate - Optional week number or date (YYYY-MM-DD)
     * @param cb - Optional callback function
     * @returns Promise resolving to team with stats
     */
    stats(teamKey: string, weekOrDate?: string | number, cb?: Callback<Team & { stats: Stats }>): Promise<Team & { stats: Stats }>;
    stats(teamKey: string, cb?: Callback<Team & { stats: Stats }>): Promise<Team & { stats: Stats }>;
    
    /**
     * Get team matchups
     * @param teamKey - Team key
     * @param weeks - Optional week number or array of weeks
     * @param cb - Optional callback function
     * @returns Promise resolving to team with matchups
     */
    matchups(teamKey: string, weeks?: string | number | Array<string | number>, cb?: Callback<Team & { matchups: Matchup[] }>): Promise<Team & { matchups: Matchup[] }>;
    matchups(teamKey: string, cb?: Callback<Team & { matchups: Matchup[] }>): Promise<Team & { matchups: Matchup[] }>;
    
    /**
     * Get team roster
     * @param teamKey - Team key
     * @param weekOrDate - Optional week number or date (YYYY-MM-DD)
     * @param cb - Optional callback function
     * @returns Promise resolving to team with roster
     */
    roster(teamKey: string, weekOrDate?: string | number, cb?: Callback<Team & { roster: Roster }>): Promise<Team & { roster: Roster }>;
    roster(teamKey: string, cb?: Callback<Team & { roster: Roster }>): Promise<Team & { roster: Roster }>;
    
    /**
     * Get team draft results
     * @param teamKey - Team key
     * @param cb - Optional callback function
     * @returns Promise resolving to team with draft results
     */
    draft_results(teamKey: string, cb?: Callback<Team & { draft_results: DraftResult[] }>): Promise<Team & { draft_results: DraftResult[] }>;
  }
  
  interface TransactionResource {
    /**
     * Get transaction metadata with players
     * @param transactionKey - Transaction key
     * @param cb - Optional callback function
     * @returns Promise resolving to transaction with players
     */
    meta(transactionKey: string, cb?: Callback<Transaction>): Promise<Transaction>;
    
    /**
     * Get transaction players (alias for meta)
     * @param transactionKey - Transaction key
     * @param cb - Optional callback function
     * @returns Promise resolving to transaction with players
     */
    players(transactionKey: string, cb?: Callback<Transaction>): Promise<Transaction>;
  }
  
  interface UserResource {
    /**
     * Get games for the authenticated user
     * @param cb - Optional callback function
     * @returns Promise resolving to user with games
     */
    games(cb?: Callback<User & { games: Game[] }>): Promise<User & { games: Game[] }>;
    
    /**
     * Get user's leagues for specified game(s)
     * @param gameKeys - Game key or array of game keys
     * @param cb - Optional callback function
     * @returns Promise resolving to user with games containing leagues
     */
    game_leagues(gameKeys: string | string[], cb?: Callback<User & { games: Array<Game & { leagues: League[] }> }>): Promise<User & { games: Array<Game & { leagues: League[] }> }>;
    
    /**
     * Get user's teams for specified game(s)
     * @param gameKeys - Game key or array of game keys
     * @param cb - Optional callback function
     * @returns Promise resolving to user with teams
     */
    game_teams(gameKeys: string | string[], cb?: Callback<User & { teams: Team[] }>): Promise<User & { teams: Team[] }>;
  }
  
  // ==================== Collection Classes ====================
  
  interface GamesCollection {
    /**
     * Fetch multiple games
     * @param gameKeys - Game key or array of game keys
     * @param subresources - Optional subresources
     * @param cb - Optional callback function
     * @returns Promise resolving to array of games
     */
    fetch(gameKeys: string | string[], subresources?: string | string[], cb?: Callback<Game[]>): Promise<Game[]>;
    fetch(gameKeys: string | string[], cb?: Callback<Game[]>): Promise<Game[]>;
    
    /**
     * Get games for authenticated user
     * @param filters - Optional filters
     * @param subresources - Optional subresources
     * @param cb - Optional callback function
     * @returns Promise resolving to array of games
     */
    user(filters?: Record<string, any>, subresources?: string | string[], cb?: Callback<Game[]>): Promise<Game[]>;
    user(subresources?: string | string[], cb?: Callback<Game[]>): Promise<Game[]>;
    user(cb?: Callback<Game[]>): Promise<Game[]>;
    
    /**
     * Fetch specific games for authenticated user
     * @param gameKeys - Game key or array of game keys
     * @param subresources - Optional subresources
     * @param cb - Optional callback function
     * @returns Promise resolving to user with games
     */
    userFetch(gameKeys: string | string[], subresources?: string | string[], cb?: Callback<User & { games: Game[] }>): Promise<User & { games: Game[] }>;
    userFetch(gameKeys: string | string[], cb?: Callback<User & { games: Game[] }>): Promise<User & { games: Game[] }>;
  }
  
  interface LeaguesCollection {
    /**
     * Fetch multiple leagues
     * @param leagueKeys - League key or array of league keys
     * @param subresources - Optional subresources
     * @param cb - Optional callback function
     * @returns Promise resolving to array of leagues
     */
    fetch(leagueKeys: string | string[], subresources?: string | string[], cb?: Callback<League[]>): Promise<League[]>;
    fetch(leagueKeys: string | string[], cb?: Callback<League[]>): Promise<League[]>;
  }
  
  interface PlayersCollection {
    /**
     * Fetch multiple players
     * @param playerKeys - Player key or array of player keys
     * @param subresources - Optional subresources
     * @param cb - Optional callback function
     * @returns Promise resolving to array of players
     */
    fetch(playerKeys: string | string[], subresources?: string | string[], cb?: Callback<Player[]>): Promise<Player[]>;
    fetch(playerKeys: string | string[], cb?: Callback<Player[]>): Promise<Player[]>;
    
    /**
     * Fetch players from leagues
     * @param leagueKeys - League key or array of league keys
     * @param filters - Optional filters
     * @param subresources - Optional subresources
     * @param cb - Optional callback function
     * @returns Promise resolving to array of leagues with players
     */
    leagues(leagueKeys: string | string[], filters?: Record<string, any>, subresources?: string | string[], cb?: Callback<Array<League & { players: Player[] }>>): Promise<Array<League & { players: Player[] }>>;
    leagues(leagueKeys: string | string[], subresources?: string | string[], cb?: Callback<Array<League & { players: Player[] }>>): Promise<Array<League & { players: Player[] }>>;
    leagues(leagueKeys: string | string[], cb?: Callback<Array<League & { players: Player[] }>>): Promise<Array<League & { players: Player[] }>>;
    
    /**
     * Fetch players from teams
     * @param teamKeys - Team key or array of team keys
     * @param filters - Optional filters
     * @param subresources - Optional subresources
     * @param cb - Optional callback function
     * @returns Promise resolving to array of teams with players
     */
    teams(teamKeys: string | string[], filters?: Record<string, any>, subresources?: string | string[], cb?: Callback<Array<Team & { players: Player[] }>>): Promise<Array<Team & { players: Player[] }>>;
    teams(teamKeys: string | string[], subresources?: string | string[], cb?: Callback<Array<Team & { players: Player[] }>>): Promise<Array<Team & { players: Player[] }>>;
    teams(teamKeys: string | string[], cb?: Callback<Array<Team & { players: Player[] }>>): Promise<Array<Team & { players: Player[] }>>;
  }
  
  interface TeamsCollection {
    /**
     * Fetch multiple teams
     * @param teamKeys - Team key or array of team keys
     * @param subresources - Optional subresources
     * @param cb - Optional callback function
     * @returns Promise resolving to array of teams
     */
    fetch(teamKeys: string | string[], subresources?: string | string[], cb?: Callback<Team[]>): Promise<Team[]>;
    fetch(teamKeys: string | string[], cb?: Callback<Team[]>): Promise<Team[]>;
    
    /**
     * Fetch user's teams for specified leagues
     * @param leagueKeys - League key or array of league keys
     * @param subresources - Optional subresources
     * @param cb - Optional callback function
     * @returns Promise resolving to array of teams
     */
    user_leagues(leagueKeys: string | string[], subresources?: string | string[], cb?: Callback<Team[]>): Promise<Team[]>;
    user_leagues(leagueKeys: string | string[], cb?: Callback<Team[]>): Promise<Team[]>;
  }
  
  interface TransactionsCollection {
    /**
     * Fetch multiple transactions
     * @param transactionKeys - Transaction key or array of transaction keys
     * @param cb - Optional callback function
     * @returns Promise resolving to array of transactions
     */
    fetch(transactionKeys: string | string[], cb?: Callback<Transaction[]>): Promise<Transaction[]>;
    
    /**
     * Add a player
     * @param leagueKey - League key
     * @param teamKey - Team key
     * @param playerKey - Player key
     * @param cb - Optional callback function
     * @returns Promise resolving to transaction
     */
    add_player(leagueKey: string, teamKey: string, playerKey: string, cb?: Callback<Transaction>): Promise<Transaction>;
    
    /**
     * Drop a player
     * @param leagueKey - League key
     * @param teamKey - Team key
     * @param playerKey - Player key
     * @param cb - Optional callback function
     * @returns Promise resolving to transaction
     */
    drop_player(leagueKey: string, teamKey: string, playerKey: string, cb?: Callback<Transaction>): Promise<Transaction>;
    
    /**
     * Add and drop players in one transaction
     * @param leagueKey - League key
     * @param teamKey - Team key
     * @param playerToAdd - Player key to add
     * @param playerToDrop - Player key to drop
     * @param cb - Optional callback function
     * @returns Promise resolving to transaction
     */
    add_drop_player(leagueKey: string, teamKey: string, playerToAdd: string, playerToDrop: string, cb?: Callback<Transaction>): Promise<Transaction>;
    
    /**
     * Add and drop players with FAAB in one transaction
     * @param leagueKey - League key
     * @param teamKey - Team key
     * @param playerToAdd - Player key to add
     * @param playerToDrop - Player key to drop
     * @param faabBid - FAAB bid amount
     * @param cb - Optional callback function
     * @returns Promise resolving to transaction
     */
    add_drop_players(leagueKey: string, teamKey: string, playerToAdd: string, playerToDrop: string, faabBid: number, cb?: Callback<Transaction>): Promise<Transaction>;
  }
  
  // ==================== Token Response ====================
  
  interface TokenResponse {
    access_token: string;
    refresh_token: string;
    state?: string;
  }
  
  // ==================== Request/Response Types ====================
  
  interface AuthRequest {
    query: {
      code: string;
      state?: string;
    };
  }
}

// ==================== Main Class ====================

declare class YahooFantasy {
  /**
   * Create a new YahooFantasy instance
   * @param consumerKey - Yahoo! Application Key
   * @param consumerSecret - Yahoo! Application Secret
   * @param tokenCallbackFn - Optional callback function when user token is refreshed
   * @param redirectUri - Optional redirect endpoint when user authenticates
   */
  constructor(
    consumerKey: string,
    consumerSecret: string,
    tokenCallbackFn?: (tokenData: YahooFantasy.TokenResponse) => void | Promise<void>,
    redirectUri?: string
  );
  
  // HTTP method constants
  readonly GET: string;
  readonly POST: string;
  
  // Resources
  readonly game: YahooFantasy.GameResource;
  readonly league: YahooFantasy.LeagueResource;
  readonly player: YahooFantasy.PlayerResource;
  readonly roster: YahooFantasy.RosterResource;
  readonly team: YahooFantasy.TeamResource;
  readonly transaction: YahooFantasy.TransactionResource;
  readonly user: YahooFantasy.UserResource;
  
  // Collections
  readonly games: YahooFantasy.GamesCollection;
  readonly leagues: YahooFantasy.LeaguesCollection;
  readonly players: YahooFantasy.PlayersCollection;
  readonly teams: YahooFantasy.TeamsCollection;
  readonly transactions: YahooFantasy.TransactionsCollection;
  
  /**
   * Initiate OAuth2 authentication
   * @param res - HTTP response object to redirect user to Yahoo! login
   * @param state - Optional state string for persistence through authentication
   */
  auth(res: ServerResponse, state?: string): void;
  
  /**
   * Handle OAuth2 callback
   * @param req - HTTP request object containing auth code from Yahoo!
   * @param cb - Callback function called after token is retrieved
   */
  authCallback(req: YahooFantasy.AuthRequest, cb: YahooFantasy.Callback<YahooFantasy.TokenResponse>): void;
  
  /**
   * Set the user's access token
   * @param token - Yahoo! access token
   */
  setUserToken(token: string): void;
  
  /**
   * Set the user's refresh token
   * @param token - Yahoo! refresh token
   */
  setRefreshToken(token: string): void;
  
  /**
   * Refresh the user's access token
   * @param cb - Callback function called after token is refreshed
   */
  refreshToken(cb: YahooFantasy.Callback<YahooFantasy.TokenResponse>): void;
  
  /**
   * Make a direct API call to Yahoo! Fantasy Sports API
   * @param method - HTTP method (GET or POST)
   * @param url - Full API URL
   * @param postData - Optional POST data
   * @returns Promise resolving to API response
   */
  api(method: string, url: string, postData?: any): Promise<any>;
}

export = YahooFantasy;
