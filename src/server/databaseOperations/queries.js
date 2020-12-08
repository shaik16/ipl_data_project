const queries = {
  tableExistQuery: (tableName, dbName) => {
    return `SELECT EXISTS(
      SELECT *
      FROM   information_schema.tables 
      WHERE 
      table_schema LIKE '${dbName}' AND 
      table_name LIKE '${tableName}'
    ) as Exist`;
  },
  insertQuery: (tableName)=>{
    return `INSERT INTO ${tableName} VALUES ?` 
  },
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
    dl_applied INT NOT NULL,
    winner VARCHAR(50) NOT NULL,
    win_by_runs INT NOT NULL,
    win_by_wickets INT NOT NULL,
    player_of_match VARCHAR(30) NOT NULL,
    venue VARCHAR(100) NOT NULL,
    umpire1 VARCHAR(40) NOT NULL,
    umpire2 VARCHAR(40) NOT NULL,
    umpire3 VARCHAR(40)
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
    is_super_over INT,
    wide_runs INT,
    bye_runs INT,
    leg_bye_runs INT,
    noball_runs INT,
    penalty_runs INT,
    batsman_runs INT,
    extra_runs INT,
    total_runs INT,
    player_dismissed VARCHAR(30),
    dismissal_kind VARCHAR(30),
    fielder VARCHAR(40)	
  )`,

  insertData: (csvPath, fileName) => {
    return `LOAD DATA
      LOCAL INFILE '${csvPath}/${fileName}.csv'
      INTO TABLE ${fileName}
      FIELDS TERMINATED BY ','
      LINES TERMINATED BY '\n' IGNORE 1 ROWS;`;
  },

  dropTableQuery: (tableName) => {
    return `DROP TABLE ${tableName}`;
  },

  selectMatchesPerYearQuery: (matchesTableName) => {
    return `SELECT season,COUNT(season) AS matches 
    FROM ${matchesTableName} 
    GROUP BY season 
    ORDER BY season`;
  },

  selectTeamWonPerYearQuery: (matchesTableName) => {
    return `SELECT season,winner AS team,COUNT(winner) AS wins
    FROM ${matchesTableName}
    WHERE winner != ''
    GROUP BY season,winner
    ORDER BY season`;
  },

  selectExtraRunsConcededPerTeamQuery: (matchesTableName, deliveriesTableName, year) => {
    return `SELECT season,bowling_team AS team,SUM(extra_runs) AS runs
    FROM ${matchesTableName}
    INNER JOIN ${deliveriesTableName}
	    ON ${matchesTableName}.id=${deliveriesTableName}.match_id
    WHERE season = ${year} 
    GROUP BY bowling_team`;
  },

  selectTopTenEconomicBowlersQuery: (matchesTableName, deliveriesTableName, year) => {
    return `SELECT season,bowler,SUM(total_runs) AS runs_conceded,
    round((floor(count(ball)/6)+(count(ball)-floor(count(ball)/6)*6)/10),1) AS overs,
    round((sum(total_runs)/(count(ball)*(10/6))*10),2) AS Economy
    FROM ${matchesTableName}
    INNER JOIN ${deliveriesTableName}
	    ON ${matchesTableName}.id=${deliveriesTableName}.match_id
    WHERE season = ${year} AND
      ball IN(
	      SELECT ball
        FROM ${deliveriesTableName}
        WHERE wide_runs=0 AND noball_runs=0
      )
    AND
      total_runs IN(
	      SELECT total_runs
        FROM ${deliveriesTableName}
        WHERE bye_runs=0 AND leg_bye_runs=0
      )
    GROUP BY bowler
    ORDER BY Economy LIMIT 10`;
  },
};

module.exports = queries;