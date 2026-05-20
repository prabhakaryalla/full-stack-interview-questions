<details><summary><b>Query to find Total Matches Played, Won, Lost, Points</b></summary>

|Id	| Team_1		| Team_2		| Winner      |
|---|---------------|---------------|-------------|
|1	| India			| Australia		| India       |
|2	| England		| Sri Lanka		| Sri Lanka   |
|3	| New Zealand	| India			| New Zealand |
|4	| India			| Sri Lanka		| India       |
|5	| England		| India			| India       |
|6	| South Africa	| West Indies	| South Africa|
|7	| Australia		| England		| Australia   |
|8	| West Indies	| India			| India       |
|9	| South Africa	| New Zealand	| South Africa|
|10	| Australia		| Sri Lanka		| Australia   |
|11	| West Indies	| England		| West Indies |
|12	| New Zealand	| Sri Lanka		| New Zealand |

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

</details>
<hr/>
</details>