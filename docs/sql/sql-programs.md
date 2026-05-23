<details><summary><b>Count()</b></summary>
|Id	|Name	    |Salary |
|---|-----------|-------|
|1	|Ramu	    |50000  |
|2	|Sita	    |40000  |
|3	|Karthik    |NULL   |

``` sql
select count(*) from Employees       -- 3
select count(1) from Employees       -- 3
select count(-1) from Employees      -- 3
select count(salary) from Employees  -- 2
```
<hr/>
</details>

<details><summary><b>Total matches played, won, lost, points</b></summary>

|Id	| Team_1		| Team_2		| Winner       |
|---|---------------|---------------|--------------|
|1	| India			| Australia		| India        |
|2	| England		| Sri Lanka		| Sri Lanka    |
|3	| New Zealand	| India			| New Zealand  |
|4	| India			| Sri Lanka		| India        |
|5	| England		| India			| India        |
|6	| South Africa	| West Indies	| South Africa |
|7	| Australia		| England		| Australia    |
|8	| West Indies	| India			| India        |
|9	| South Africa	| New Zealand	| South Africa |
|10	| Australia		| Sri Lanka		| Australia    |
|11	| West Indies	| England		| West Indies  |
|12	| New Zealand	| Sri Lanka		| New Zealand  |

***Output:***  

|team			| played	| won	| lost	| points |
|---------------|-----------|-------|-------|--------|
|India			| 5			| 4		| 1		| 8      |
|Australia		| 3			| 2		| 1		| 4      |
|New Zealand	| 3			| 2		| 1		| 4      |
|South Africa	| 2			| 2		| 0		| 4      |
|Sri Lanka		| 4			| 1		| 3		| 2      |
|West Indies	| 3			| 1		| 2		| 2      |
|England		| 4			| 0		| 4		| 0      |

**Query:**

``` sql
SELECT
    TeamName AS team,
    COUNT(*) AS played,
    SUM(CASE WHEN TeamName = winner THEN 1 ELSE 0 END) AS won,
    SUM(CASE WHEN TeamName <> winner THEN 1 ELSE 0 END) AS lost,
    SUM(CASE WHEN TeamName = winner THEN 2 ELSE 0 END) AS points
FROM
    (
        SELECT team_1 AS TeamName, winner FROM Matches
        UNION ALL
        SELECT team_2 AS TeamName, winner FROM Matches
    ) AS AllTeams
GROUP BY
    TeamName
ORDER BY
    points DESC, won DESC, team;
```

*** With CTE ***

``` sql

With all_teams as (
select team_1 as team, winner from Matches
union all 
select team_2 as team, winner from Matches
) 

select team, 
count(*) as played,
COUNT(CASE when team = winner then 1 end) as won,
COUNT(CASE when team != winner then 1 end) as lost,
COUNT(CASE when team = winner then 1 end) * 2 as points
from all_teams
group by team
order by points desc
```
<hr/>
</details>

<details><summary><b>Arrange the tasks based on priority</b></summary>

| Id    | Name				| Priority		| Assignee   |
|-------|-------------------|---------------|------------|
| 1	    | Fix Payment		| Critical  	| Prabhakar  |
| 2	    | Update Onboarding	| Medium    	| Saswat     |
| 3	    | Server Downtime	| Critical  	| Dhanush    |
| 4	    | Redesign UI		| Low       	| Prabhakar  |
| 5	    | Fix login timeout	| High      	| Saswat     |
| 6	    | Optimise Search	| High      	| Dhanush    |
| 7	    | Add Dark Mode 	| Low       	| Dhanush    |
| 9	    | Write Unit Tests	| Medium    	| Prabhakar  |

***Output:***

| Id	 | Name	       			| Priority		| Assignee    |
|--------|----------------------|---------------|-------------|
| 1	     | Fix Payment			| Critical  	| Prabhakar   |
| 3	     | Server Downtime		| Critical  	| Dhanush     |
| 2	     | Update Onboarding	| Medium    	| Saswat      |
| 9	     | Write Unit Tests		| Medium    	| Prabhakar   |
| 5	     | Fix login timeout	| High      	| Saswat      |
| 6	     | Optimise Search		| High      	| Dhanush     |
| 7	     | Add Dark Mode 		| Low       	| Dhanush     |
| 4	     | Redesign UI			| Low       	| Prabhakar   |

``` sql
select * from tasks 
order by 
Case priority
    When 'Critical' Then 1
    When 'Medium'	Then 2
    When 'High'		Then 3
    When 'Low'		Then 4
    Else				 5
End Asc;
```
<hr/>
</details>

<details><summary><b>Scores with subject wise</b></summary>

| Name		| Subject	| Score |
|-----------|-----------|-------|
| Ram		| English	| 80 	|
| Ram		| Maths		| 90 	|
| Ram		| Science	| 89 	|
| Priyal	| English	| 98 	|
| Priyal	| Maths		| 67 	|
| Priyal	| Science	| 88 	|
| Karthik	| Maths		| 99 	|
| Karthik	| English	| 87 	|
| Karthik	| Science	| 96 	|

***Output***

| Name		| Maths	| English	| Science |
|-----------|-------|-----------|---------|
| Karthik	| 99	| 87		| 96 	  |
| Priyal	| 67	| 98		| 88      |
| Ram		| 90	| 80		| 89      |

**Query using PIVOT**

``` sql
SELECT Name, Maths, English, Science FROM Scores
PIVOT
(
  MAX(Score)
  FOR Subject IN ([Maths], [English], [Science])
) AS PivotTable
```

**Query without PIVOT**
``` sql
SELECT
  Name AS name,
  MAX(CASE WHEN Subject = 'Maths' THEN Score END) AS Maths,
  MAX(CASE WHEN Subject = 'English' THEN Score END) AS English,
  MAX(CASE WHEN Subject = 'Science' THEN Score END) AS Science
FROM
  Scores
GROUP BY Name;
```
<hr/>
</details>

