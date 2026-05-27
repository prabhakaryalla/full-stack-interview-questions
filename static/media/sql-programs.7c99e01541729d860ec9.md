<details><summary><b>📌Count()</b></summary>

|Id	|Name	    |Salary |
|---|-----------|-------|
|1	|Ramu	    |50000  |
|2	|Sita	    |40000  |
|3	|Karthik    |NULL   |
|4  |Pratheek   |40000  |
|5  |Bhaskar    |NULL   |

``` sql
select count(*) from Employees				  -- 5
select count(1) from Employees				  -- 5
select count(-1) from Employees				  -- 5
select count(salary) from Employees			  -- 3
select(count(distinct salary)) from Employees -- 2
```
<hr/>
</details>

<details><summary><b>📌 ORDER BY</b></summary>

|Id	|Name	    |Salary |
|---|-----------|-------|
|1	|Ramu	    |50000  |
|2	|Sita	    |40000  |
|3	|Karthik    |NULL   |
|4  |Pratheek   |40000  |
|5  |Bhaskar    |NULL   |

<details><summary><b>Ascending Order When NUlls are present</b></summary>

``` sql 
select Name, Salary from Employees
order by Salary
```
**O/p**:

Name	    |Salary |
|-----------|-------|
|Karthik    |NULL   |
|Bhaskar    |NULL   |
|Pratheek   |40000  |
|Sita	    |40000  |
|Ramu	    |50000  |

</details>
<hr/>

<details><summary><b>Descending Order When NUlls are present</b></summary>

``` sql 
select Name, Salary from Employees
order by Salary desc
```
**O/p**:

Name	    |Salary |
|-----------|-------|
|Ramu	    |50000  |
|Sita	    |40000  |
|Pratheek   |40000  |
|Bhaskar    |NULL   |
|Karthik    |NULL   |

</details>
<hr/>


<details><summary><b>How to display Nulls valuesat last in Ascending order</b></summary>

``` sql 
select Name, Salary from Employees
order by 
CASE When Salary is NULL Then 1 else 0 end, salary asc
```
**O/p**:

Name	    |Salary |
|-----------|-------|
|Sita	    |40000  |
|Pratheek   |40000  |
|Ramu	    |50000  |
|Bhaskar    |NULL   |
|Karthik    |NULL   |

</details>
<hr />
</details>

<details><summary><b>📌NULL</b></summary>

|Id	|Name	    |Salary |
|---|-----------|-------|
|1	|Ramu	    |50000  |
|2	|Sita	    |40000  |
|3	|Karthik    |NULL   |

``` sql
select SUM(Salary) from Employees               -- 90000
select * from Employees where Salary != 50000   -- One row only. Excludes Null
```

<details><summary><b>SELECT NULL = NULL;</b></summary>

``` sql
SELECT * from Employees
where NULL = NULL;
```
 **o/p**: Return zero rows

**NULL = NULL** is NULL (or sometimes shown as UNKNOWN), not TRUE.

***Explanation:***

In SQL, NULL represents an unknown or missing value.  
Comparing NULL to anything, including another NULL, using standard comparison operators (=, <>, <, >, etc.) results in NULL because the comparison is unknown.  
Therefore, NULL = NULL does not evaluate to TRUE; it evaluates to NULL (unknown).  

If you want to check if a value is NULL, you must use the IS NULL operator, for example:  

``` sql
NULL IS NULL;  -- This returns TRUE  
```
So, NULL = NULL returns NULL, not TRUE.Regenerate
<hr/>
</details>
<details><summary><b> What is the difference between IS NULL and = NULL in SQL?</b></summary>

The correct and standard way to check if a value is NULL.  

``` sql
SELECT * FROM table WHERE column IS NULL;
```
This query returns all rows where column has a NULL value.

**Why?**

In SQL, NULL means "unknown" or "missing" value.  
Comparisons with NULL using = or <> do not return TRUE or FALSE but NULL (unknown).  
IS NULL is a special operator designed to check for NULL explicitly.

<hr/>
</details>

<details><summary><b>How does the GROUP BY clause handle NULL values?</b></summary>
In SQL, the GROUP BY clause treats NULL vaues as a distinct group, just like any other value. Here’s how it handles NULL:
Behavior of GROUP BY with NULL:

Example:  
Suppose you have a table Employees:  
|Department |EmployeeName   |
|-----------|---------------|
|Sales      |Alice          |
|Sales      |Bob            |
|NULL       |Charlie        |
|NULL       |David          |

Query:  
``` sql
SELECT Department, COUNT(*)
FROM Employees
GROUP BY Department;
```

Result:

|Department |COUNT(*)   |
|-----------|-----------|
|Sales      |2          |
|NULL       |2          |

The two rows with NULL in Department are grouped together as one group.

Summary:

GROUP BY treats all NULL values as one group.
NULL values are not ignored or excluded; they form their own group.  
This behavior allows aggregate functions to operate on rows with NULL values in the grouped columns.  

If you want to treat NULL differently (e.g., replace NULL with a specific value for grouping), you can use functions like COALESCE:   
```sql
SELECT COALESCE(Department, 'Unknown') AS Dept, COUNT(*)
FROM Employees
GROUP BY COALESCE(Department, 'Unknown');
```
This groups NULLs under 'Unknown' instead.
<hr/>
</details>

<details><summary><b>What is the difference between NULLIF and COALESCE functions?</b></summary>

**NULLIF(expr1, expr2)** returns NULL if expr1 equals expr2; otherwise returns expr1. It’s used to convert specific values to NULL.

**COALESCE(expr1, expr2, ..., exprN)** returns the first non-NULL value from the list. It’s used to replace NULLs with default values.

<details><summary><em>Example</em></summary>

|Id	|Name	    |Salary |
|---|-----------|-------|
|1	|Ramu	    |50000  |
|2	|Sita	    |40000  |
|3	|Karthik    |NULL   |
|4  |Pratheek   |40000  |
|5  |Bhaskar    |NULL   |

``` sql
SELECT Name,
       NULLIF(Salary, 40000) AS SalaryNullIf,
       COALESCE(Salary, 30000) AS SalaryCoalesce
FROM Employees;
```

|Name	  |SalaryNullIf	    |SalaryCoalesce |
|---------|-----------------|---------------|
|Ramu	  |50000	        |50000          |
|Sita     |NULL	            |40000          |
|Karthik  |NULL	            |30000          |
|Pratheek |NULL	            |40000          |
|Bhaskar  |NULL	            |30000          |

</details>
<hr/>
</details>

<details><summary><b>Can aggregate functions like SUM or AVG return NULL? Under what conditions?</b></summary>
Aggregate functions such as SUM and AVG return NULL when all the values they operate on are NULL or when there are no rows to aggregate.  

If there is at least one non-NULL value, these functions return the sum or average of those non-NULL values, ignoring NULLs.  
NULL values are excluded from the calculation, not treated as zero.

**Explanation**:

SUM(column) returns NULL if there are no non-NULL values in column.  
AVG(column) returns NULL if there are no non-NULL values in column.  

<details><summary><em>Example</em></summary>
Suppose a table Salaries:

|Employee   |Salary |
|-----------|-------|
|A          |50000  |
|B          |NULL   |
|C          |40000  |
|D          |NULL   |

``` sql
SELECT SUM(Salary) AS TotalSalary, AVG(Salary) AS AverageSalary
FROM Salaries;
```
**Result:**  

|TotalSalary    |AverageSalary  |
|---------------|---------------|
|90000          |45000          |

NULL salaries are ignored.

If all salaries are NULL:

|Employee   |Salary |
|-----------|-------|
|A          |NULL   |
|B          |NULL   |

Query result:

|TotalSalary    |AverageSalary  |
|---------------|---------------|
|NULL           |NULL           |

</details>
<hr/>
</details>

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

