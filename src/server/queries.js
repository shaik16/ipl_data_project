const queries = {
  matchesTableExist: `SELECT EXISTS(
    SELECT *
    FROM   information_schema.tables 
    WHERE 
    table_schema LIKE 'iplData' AND 
    table_name LIKE 'matches'
  ) as Exist`,

  deliveriesTableExist: `SELECT EXISTS(
    SELECT *
    FROM   information_schema.tables 
    WHERE 
    table_schema LIKE 'iplData' AND 
    table_name LIKE 'deliveries'
  ) as Exist`,

  createMatchesTable: `CREATE TABLE matches(
	  id INT PRIMARY KEY AUTO_INCREMENT,
    season INT NOT NULL,
    city VARCHAR(20) NOT NULL,
    date DATE NOT NULL,
	  team1 VARCHAR(50) NOT NULL,
    team2 VARCHAR(50) NOT NULL,
    toss_winner VARCHAR(50) NOT NULL,
    toss_decision VARCHAR(10) NOT NULL,
    result VARCHAR(15) NOT NULL,
    dl_applied BIT NOT NULL,
    winner VARCHAR(50) NOT NULL,
    win_by_runs INT NOT NULL,
    win_by_wickets INT NOT NULL,
    player_of_match VARCHAR(30) NOT NULL,
    venue VARCHAR(100) NOT NULL,
    umpire1 VARCHAR(40) NOT NULL,
    umpire2 VARCHAR(40) NOT NULL
  )`,

  createDeliveriesTable: `CREATE TABLE deliveries(
    match_id INT NOT NULL,
    FOREIGN KEY(match_id) REFERENCES matches(id),
    inning INT,
    batting_team VARCHAR(50),
    bowling_team VARCHAR(50),
    overs INT, 
    ball INT,
    batsman VARCHAR(30),
    non_striker VARCHAR(30),
    bowler VARCHAR(30),
    is_super_over BIT,
    wide_runs INT,
    bye_runs INT,
    noball_runs INT,
    penalty_runs INT,
    batsman_runs INT,
    extra_runs INT,
    total_runs INT,
    player_dismissed VARCHAR(30),
    dismissal_kind VARCHAR(30),
    fielder VARCHAR(40)	
  )`,

  dropMatchesTable: `DROP TABLE matches`,
  dropDeliveriesTable: `DROP TABLE deliveries`,

  selectMatchesPerYear: `SELECT season,COUNT(season) AS matches 
    FROM matches 
    GROUP BY season 
    ORDER BY season`,
};

module.exports = queries;
