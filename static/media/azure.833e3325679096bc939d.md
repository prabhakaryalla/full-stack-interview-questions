## Azure Interview Questions & Answers

### Questions

- [Difference between Scale up and Scale out App Service plan?](#difference-between-scale-up-and-scale-out-app-service-plan?)
- [Different types of App service plans?](#different-types-of-app-service-plans)
- [What is the difference between storage account queues and service bus queues](#)
- [What is the difference between web job and function app](#)
- [Different types of triggers in web job?](#)
- [What are app registrations](#)
- [How do we configure Authentication](#)
- [What are keyVaults?](#)
- [What is APIM](#)
- [Different types of storage accounts? ](#)
- [What is append blob and block blob?](#)
- [What is CORS ?](#)
- [What are Logic apps?](#)
- [How to run Logic apps in syncoronous mode (parallelism)](#)
- [what are recieve modes in service bus?](#)
- [When to go for Event hub?](#)
- [What is Azure Service Bus?](#)
- [What are acure service bus topics?](#)
- [What is table storage?](#)
- [Explain application Insights?](#)
- [Can we use same application insight to multiple applications? If so how to seggegrate the logs based on applications?](#)
- [How to catch the log for user redirecting from page A to page B in app insights?](#)
- [Azure Kubernetes Architecture, How to host your appliacation in Azure?](#)
- [What are service fabrics clusters?](#)
- [Azure Cloud Services Worker Nodes Delegation etc](#)
- [What is Reddis Cache?](#)
- [Can single message consumed by multiple subscriober? How?](#)
- [What is Dead-letter in Service bus Queue?](#)
- [Different types of storages](#)
- [How to copy data from blob storage to on premise database?](#)
- [Versoning and Snapshot in blob storage?](#)
- [What are web apps?](#)
- [What is VM?](#)
- [Azure Data Factory Concepts?](#)
- [What are advantages of Azure Functions?](#)
- [How do you implement event emitting from the devices in bulk in Azure?](#)
- [Exception Handling in Azure Functions and Web API](#)
- [](#)
- [](#)
- [](#)
- [](#)
- [](#)


### Difference between Scale up and Scale out App Service plan?

**Scale up** means upgrade the capacity of the host where the app is hosted. Ex: Increase the memory from 1.75GB to 3.5GB.

**Scale out** means upgrade the capacity of the app by increasing the number of host instances.

***

### Different types of App Service plans?

- Free
  * 1 size only -> F1
  * CPU resource 60 CPU minutes / day
  * 1 GB Storage
  * 32 bit application only
  * Debugger support only one connection
- Shared
  * 1 size only -> D1
  * CPU resource 240 CPU minutes / day
  * 1GB storage
  * Custom domains
  * 32 bit application only
  * Debugger support only one connection
- Basic
    * 3 sizes -> B1, B2, B3
    * 10GB storage
    * Custom domains
    * SSL support (SNI SSL only)
    * Scale out -> up to 3 instances (manual scale only!)
    * 32 bit and 64 bit application supported
    * Debugger support 5 connections
    * SLA 99.95%
    * Hybrid Connections up to 5 connections
- Standard
    * 3 sizes -> S1, S2, S3
    * 50GB storage
    * Custom domains
    * SSL support (SNI SSL + IP SSL)
    * Scale out -> up to 10 instances (auto scale)
    * Daily backup
    * 5 deployment slots (staged deployment)
    * Traffic manager support
    * 32 bit and 64 bit application supported
    * Debugger support 5 connections
    * SLA 99.95%
    * Hybrid Connections up to 25 connections
- Premium
    * 3 sizes -> P1, P2, P3 (an ExtraLarge size is shown by the API)
    * 250GB storage
    * Custom domains
    * SSL support (SNI SSL + IP SSL)
    * Scale out -> up to 20 instances (auto scale)
    * Daily backup 50 times
    * 20 deployment slots (staged deployment)
    * Traffic manager support
    * 32 bit and 64 bit application supported
    * Debugger support 5 connections
    * SLA 99.95%
    * Hybrid Connections up to 200 connections

[Read More](#https://medium.com/@zaab_it/azure-app-service-plan-tiers-f07d5e22297a)

***


