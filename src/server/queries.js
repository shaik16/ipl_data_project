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
};

module.exports = queries;
