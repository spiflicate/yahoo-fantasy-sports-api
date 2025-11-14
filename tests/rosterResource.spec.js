var YahooFantasy = require("../index.js");
var nock = require("nock");

describe("resource: rosterResource", function() {
  var yf = new YahooFantasy("Y!APPLICATION_KEY", "Y!APPLICATION_SECRET"),
    roster = yf.roster;

  it("should be defined", function() {
    expect(roster).not.toBe(null);
  });

  // functions
  it("should have a players function", function() {
    expect(roster.players).not.toBe(null);
  });

  it("should have an update function", function() {
    expect(roster.update).not.toBe(null);
  });

  // building urls
  beforeEach(function() {
    yf.setUserToken("testusertoken==");
    spyOn(yf, "api").and.callThrough();
  });

  // meta
  it("should build a proper url to retrieve players on a team", function(done) {
    nock("https://fantasysports.yahooapis.com")
      .get("/fantasy/v2/team/328.l.34014.t.1/roster?format=json")
      .reply(200, require("./nock-data/teamRoster"));

    roster.players("328.l.34014.t.1", done);

    expect(yf.api).toHaveBeenCalledWith(
      "GET",
      "https://fantasysports.yahooapis.com/fantasy/v2/team/328.l.34014.t.1/roster"
    );
  });

  // update roster
  it("should build a proper url to update a team roster", function(done) {
    nock("https://fantasysports.yahooapis.com")
      .put("/fantasy/v2/team/328.l.34014.t.1/roster?format=json")
      .reply(200, require("./nock-data/teamRoster"));

    const players = [
      { player_key: "328.p.7276", position: "C" },
      { player_key: "328.p.8640", position: "1B" }
    ];

    roster.update("328.l.34014.t.1", "date", "2021-01-08", players, done);

    const apiCall = yf.api.calls.first();
    expect(apiCall.args[0]).toBe("PUT");
    expect(apiCall.args[1]).toBe(
      "https://fantasysports.yahooapis.com/fantasy/v2/team/328.l.34014.t.1/roster"
    );
    expect(apiCall.args[2]).toContain("<coverage_type>date</coverage_type>");
    expect(apiCall.args[2]).toContain("<coverage_value>2021-01-08</coverage_value>");
    expect(apiCall.args[2]).toContain("<player_key>328.p.7276</player_key>");
    expect(apiCall.args[2]).toContain("<position>C</position>");
  });
});
