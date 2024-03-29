
[What is Amazon DynamoDB?]
[What are the DynamoDB Key Features?]
[What is DynamoDB Terminology?]
[How is DynamoDb is different from Other databases?]
[How do you interact with DynamoDB?]
[What ae the different DynamoDB Indexes?]

***

### What is Amazon DynamoDB?

Amazon DynamoDB is fully managed serverless NOSQL database service.
Fully managed means that the  DynamoDB is responsible for provisioning and maintaing the underlying infrastructure. 
Serverless means all the server and server administration is invisible to the user.
Most common NOSQL Datamodels are  Key-Value, Document, Graph and Wide-Column Databases. Amazon DynamoDB is most commonly  used as Key-Value database although it does support document database.

***

### What are the DynamoDB Key Features?

- Highly available - replicated across 3 availability zones, (Eventual Consistency and Strong Consitency), Supports ACID, Global Tables, Backups (On-Demand, Point In-Time Recovery)
- Scalable - Infinitely scalable
- Durable -  
- Fast

used in Gaiming -> Leaderboards, E-Commerce -> shopping cart info, User Profile Data,  Transportation -> GPS data for ride shares

***

### What is DynamoDB Terminology?

**Items:**  An item is a row or record in the table.

**Attributes:** Attributes describes the items (columns)

**Primary Key:** Item is uniquely identified using primary key (Car Id + Customer ID)

**Partition Key:** used to store data inn logical partitions (Car Id)

**Sort Key:**  used to sort our data within the partition (Customer ID)

Partition Key and Sort Key = a composite primary key

Throughput Modes -  Provisioned, On-demand capacity

**Provisioned Throughput Mode**

RCU (Read Capacity Unit), WCU (Write Capacity Unit)

4KB item:
- One RCU (Strongly consistent read)
- 1/2 RCU (eventually consistent read)
- Two RCUs(transaction)

One Write Capacity Unit = One write per second  *For Items upto 1 KB
Transactions - Two Write Capacity Units = One write per second  *For Items upto 1 KB

We can use Provisioned throughput mode with DynamoDb Auto scaling. With Autoscaling you can specify upper and lower limits of RCU and WCU
In Provisioned Throughput mode, we can also chose reserved capacity mode for a discounted hourly rate.

**On-Demand Capacity Mode**

With this mode, Dynamo DB decides how may RCU and WCU needs based on the traffic. This provides Just-in-time approach to give our application exactly amount if capacity it needs as soon as it needs it. It handles the Auto scaling for you.

Costs more per request.

***

### How is DynamoDb is different from Other databases?

Relational Databases - Oracle, My SQL, Microsoft SQL Server

Relational databases are scaled vertically - If we need more power and CPU we increase the size of the server
DynamoDb is scaled horizontally - If we need more power and CPU, we add more servers 

Relational databases has fixed schema while DynamoDB is schemaless

With SQL if we are doing advanced Quering with joins grouping and summaries, but in DynamoDB its not flexible. But DynamoDB supports PartiQL which is sql like language for quering and modifying data.

**mongoDB** is a JSON document based dadtabase where as DynamoDB is Key-value and  document models
mongoDB is Platform agnostic whereas DynamoDB runs Only in AWS.

#### DynamoDB Limitations:
- Maximum items size = 400KB (to get out of this linitation we need to store in s3 and store the refernce in DynamoDB)
- DynamoDB doesn't offer a wide range of data types.
- Max number of Tables, Max Throughput limitations can be adjusted by calling AWS customer support

***

### How do you interact with DynamoDB?

- AWS Console
- AWS CLI
- Write Code using AWS Software Development Kits (SDKs)
- NoSQL Workbench for DynamoDB

Control Plane Operations - For managing the DynamoDB tables in your account 
API Calls:
- ListTable
- DescribeTable
- CreateTable/ UpdateTable / DeleteTable

Data Plane Operations - CRUD operations on tables
API Calls:
- GetItem
- BatchGetItem
- Query
- Scan
- PutItem
- UpdateItem
- DeleteItem
- BatchWriteItem
- PartiQL

Transaction Operations  - For ACID Compliance

- TransactGetItems
- TransactWriteItems
- PartiQL

***

### What ae the different DynamoDB Indexes?

**Global Secondary Index (GSI)** is an index with a partition key and a sort key that can differ from those on the base table

**Local Secondary Index (LSI)** is an index with the same partition key as your table but a different sort key

***