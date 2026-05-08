## Azure Interview Questions & Answers

### Questions
- [Azure Application Gateway vs Azure Load Balancer vs Azure Traffic Manager vs Azure Front Door]

- [What is immutable storage for blob data?]
- [What are Resource Locks?]
- [What is Azure Policy?]
- [What is Initative in Azure Policy?]
- [What is Azure Blueprint?]
- [What is the difference between ARM and Blueprint?]
- [What are HOT and COLD access tier in stoage?]
- [What are the different Azure Storage Account types? (Standard general-purpose v2, Premium block blobs,Premium file shares,Premium page blobs)]
- [What is RTO and RPO?]

----
- [What is region?]
- [What are availability Zones?]
- [What is region pair?]
- [What is Virtual Network?]
- [What are subnets and gateway subnets?]
- [Can a VNet have multiple gateway subnets?]
- [How many reserverd IP Addresses will be there in subnet?] (5)
- [How many available ip addresses will be present for /24 subnetsize]
- [Do we need ip address when we want to connect VM from another VM in same VNet?] (Just VM name is enough as all subnets in a VNET can communicate each other?)
- What are DNS Servers in VNET?

- What are DDoS Protection?
- What is Azure Firewall?
- What are the 3 types of rules in Azure firewall?

---
- [What are Network Security Group?]
- [Can NSGs be associated to subnets or individual network interfaces (NIC) attached to VMs?]
- [What are default inbound and outbound rules in NSG?]
- [Are the rules created in NSG will be applicable to all intsances in that subnet?]
- [What is the priority of NSG inbound security rules?]
- [What is a maximum of network security rules can be created in NSG?]
- [What are different sources available for NSG while adding inbound or outbound rules? (Any, IP Addresses, My Ip address, Service Tag, Application Security Group)]
- [How do you allow RDP connection for inbound rules in NSG?]
- [How does ASG work? (NSG is applied on VNET which contains 2 VMS. Now we want RDP connection for VM1 but not VM2.)]
- [Give an example how service Tags works in NSG? (Back)]
- [How does "Effective security rules" help in NSG?]
- [What would be the behavior when I apply NSG at NIC and subnet for a VM]
- [Do VNets support multicast or broadcast?]
- 

---
- What are Route Tables?
- Route Table is specific service in Azure?
- [What is the use of tracert in cmd?]
- [what will route print command do in cmd?]
- [What does the 0.0.0.0 IP address mean and why is it used]
- [What are propagated routes?]
- [How do we Route network traffic with a route table?]
- [How to allow ICMP in Windows firewall?](New-NetFirewallRule –DisplayName "Allow ICMPv4-In" –Protocol ICMPv4)
- [How do we turn  on IP forwarding in the operating system?](Set-ItemProperty -Path HKLM:\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters -Name IpEnableRouter -Value 1)
- [How to connect virtual networks using VNET Peering?]
- [What are Service Endpoints and Private Endpoints in VNET?]
- [How to Restrict network access to PaaS resources with virtual network service endpoints?]



---
- [What are availability options in VM?](No infrastructure redundancy required, Availability Zone, VM scaleset, Availability Scaleset)
- [What is security type in VM?](standard, Trusted Launch VMs, Confidential VMs)
- [What does Run with Azure Spot discount option in VM creation?]
- [What are Azure Spot Instances?]
- [What is Availability Set?](https://www.pragimtech.com/blog/azure/azure-availability-set/)
- [Can we add availability set after VM is created?]
- [How to create snapshot of VM Disk?]
- [What is Disk Export?]
- [How to swap OS in VM?]
- [What is sysprep?]
- [Why should we run Sysprep before capturing an image in VM?]
- [How to attach NIC to VM? Can we attach it when VM is in running state?]
- [What is VM Scaleset?]
- [What is Host Group?]
- [What is Proximity placement group?]
- [What is system assigned and user assigned identity?]
- [What is Bastion?]
- [How does Diasaster recovery works in VM?]

- [What is Inventory?]
- [What is Change Tracking in VM?]
- [What is Configuration Management? (chef, puppet)]
- [What are different config modes in Configuration Manager Agent settings?]
- [How to add Desired State Comfiguration in VM machine?]
- [What is Serial Console in VM?]
- [What are different commands available in serial console cmd?]
- [What are Reseved VMS?]
- [What are options for BIlling Frequency for Reserved VM?](Monthly, UpFront)
------------

- [What is Azure Load Balancer?](#what-is-azure-load-balancer)
- [What is public load balancer?]
- [What is internal (or private) load balancer?]
- []
- [What is the PS script to install IIS and change default.html file in VM?]
- [What are Azure Load Balancer distribution modes(session perrsistance)?]
- [What are Azure Load Balancer health probes?]
- []
- [How to create Public Load balancer?]
- [How to create internal Load balancer?]

- [What is Application Gateway?]
- []

---

- How to install Azure Monitoring Agent in VM?
- How to create Data Collection Rule?
- Will Azure Monitoring agent is installed in VM when adding VM in Resources in Data Collection Rule?
- How to use Azure Policy initiave to create Azure Monitoring Agent when creating VM in resource group?
- [How to collect IIS Logs from VM using Monitoring Agent?]
---

- [How to create point to site vpn?](https://techcommunity.microsoft.com/t5/itops-talk-blog/step-by-step-creating-an-azure-point-to-site-vpn/ba-p/326264)
- [How to create site to site vpn?]
- [What is virtual network gateway?]
- [What is gateway subnet in VNET?]
- [What is local network gateway?]

---

- [What is Network Watcher for windows Extension in VM?]
- [What are Monitoring features in Network Watcher?(Topology,Connection Monitor, Network Performance Monitor)]
- [What are Network Diagnotics tools in Network Watcher?(IP flow verify, NSG Diagnostics, Next hop, Effective Security Rules, VPN troubleshoot, Packet Capture, Connection troubleshoot)]
- [What are logs in NW?(Flow logs, Diagnotics Logs, Traffic Analytics)]
- [Can we create multiple Network Watcher for same region?]
---

- [What is Azure Active Directory?]
- [What are the difference between Active Directory and Azure Active Directory?]
- [What is tenant?]
- [How to configure domain for tenant?]
- [What is mxtoolbox?]
- [How to do company branding?]
- [How to manage users and Groups using GUI and AAD powershell?]
- [How to assign licenses to a user?]
- [What are the different Membership types in Groups? (Assigned, Dynamic)]
- [What is AAD Multifactor Authetication and Secuirty defaults?]
- [What is the difference between Security Defaults and Azure AD MFA?]
- [What are the limilitations of using Security defaults?]
- [What is the difference between Security defaults and Azure AD MFA?]
- [What is Previleged Identity Management?]
- [What are the features Previleged Identity Management?]
- [What license is required for PIM?]
- [Which roles can be managed by PIM?]
- [What are Eligible and Active Assignments?]
- [How to setup Previleged Identity Management?]
- [What is group-based licensing?]
- []
- []
- []
- []
- []


- [How to create Global Administrator?]
- [What is domain controller?]
- [What is AD Connect?]
- [How to configure AD Connect?]
- [What are synchronization rules?]
- [What is synchronization service?]
- [What is DSREGCMD /status command?]
- [What is a hybrid Azure AD joined device?]
- [What is device callback?]




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




------------------
## Azure Active Directory

### What are the limilitations of using Security defaults?
* Security limits are enabled for all the users in the tenant.
* You can use only Authenticator App as an authentication method.

### What is the difference between Security defaults and Azure AD MFA?
|Security defaults| Azure AD MFA|
|--|--|
|Security defaults is a free feature of Azure AD|MFA requires Azure AD Premium 1 licence|
|Security defaults are enabled for all users in Tenant|Azure AD MFA can be enabled to all or set of users|
|Mobile app as authenitcation method|Multiple authentication methods(Phone call, SMS verfification, authenticator app)|
|Easy to implement|Azure AD MFA is configured using Conditional Access policies|

### What is Previleged Identity Management?
PIM is a service Azure AD that enables you to manage, control and monitor the access to the important resources in your organization.

For example, we want to assign some roles to the user for certain period of time, post that duration the permissions should be revoked automatically. This is where PIM comes into picture.

PIM provides time-based and approval-based role activation to migrate the risk of excessive, unnncessary or misused access permissions on resources.

### What are the features Previleged Identity Management?
* Provide just-in-time privileged access to Azure AD and Azure resources.
* Assign time-bound access to the resources using start and end dates.
* Require approval to activate privileged roles if we choose approval-based
* Enforce MFA to activate any role.
* Use Justification to understand why users activate.
* Get notifications when privileged roles are activated.
* Conduct access reviews to ensure user still needs roles. (This requires Premium P2 license)
* Download audit history for internal and external audit. (default last 30 days. To retain data longer than 30 days, we can use azure monitor to route it to an azure storage account.)

### What license is required for PIM?

To use PIM we can any of the below
* Azure AD Premium P2
* Enterprise Mobility and Security E5
* Microsoft 365 E5

**who needs this license**
* Users with eligible and\or time-bound assignments to Azure AD or Azure roles.
* User able to approve or reject activation requests in PIM.
* Users who will be performing access reviews.

**Azure AD Premium P2 licenses are not required for the following tasks:**
* Users who setup and manage PIM, receive alerts and setup access reviews.

**Important**

Accounts used to enable PIM, becomes the member of Previleged Role Administrator and Security Administrator.  (Only memebers of Previleged Role Administrator can manage PIM console.)

### Which roles can be managed by PIM?
* Azure AD built-in roles.
* Azure built-in roles.
* Microsoft 365 roles.

**Which roles cannot be managed by PIM?**
* Account Administrator
* Service Administrator
* Co-Adminstrator

### What are Eligible and Active Assignments?

**Eligible Assignments:** Eligible assignments are those which are maintained by PIM that is also called just-in-time role assignmement.
**Active Assignments:** Active assignments are those permanently assigned to the user.

We can select the expire checkbox when the role should be expired after certain period. This options is present for both assignments.

### How to setup Previleged Identity Management?

[](https://learn.microsoft.com/en-us/azure/active-directory/privileged-identity-management/pim-how-to-change-default-settings)

### What is group-based licensing?
When a user wants to access certain resources or applications in office 365  or in azure, he needs a supported license for the subscription. As an administration, you can assign these licenses either from office 365 admin center from AAD or using powershell commands. If we have less we can assign them manually, but lets say we have 10k users and assigning the license to all these users is one by one is not feasible. Another example is lets say we have 3 departments and have different set of users. Now lets we need to assign different licenses for different departments. This is where group-based licensing comes into picture.

In group-based licensing first we create security group under AAD and add users to this security group to whom we want to assign licenses. we can add these users maunally or using dynamic queries. Then we assign the license to this security group itself and all the users in that group will assign licenses automtically.

In order to use group-based licensing, we need Azure AD Premium P1 license. Also reuire equal number of licenses according to the members of the group.

If we remove the user from the group all the license assigned based on group-based will be removed automatically.

### What is Self Service Pasword Reset (SSPR)?
SSPR gives users the ability of reset their password wirh no adinistrator involvement.

**Pre-requisites**
* Azure AD Premium P1.
* Each user requires Azure AD Premium P1 license to use SSPR

### How does Self Service Pasword Reset Works?

- User tries to reset password
  * Check If SSPR is enabled
    - If No Contact your Administrator message
    - If Yes 
      * Checks if User has set the Authentication methods
        - If No Contact your Administrator message
        - If Yes  
          * Check where are these passwords managed
            - If it is Azure AD User can reset the password
            - If it is on-premise 
              * Checks whether password write back is enabled 
                - If Not ontact your Administrator message
                - If Yes user can reset the password

### What is Password Writeback?
If the users are in on-prem Active Directory and we have Azure AD connect deployed in our on-premise environment with password hash synchronization. 

Password Writeback is feature of Azure AD that writes the passwords from Azure Active Directory to on-premise Active Directory in real time using Azure AD Connect.

### What are the features of Password Writeback?
* Password Writeback is supported with Password hash synchroniztion, Pass through Authentication and Active Directory Federation Services (ADFS).
* Enforcement of on-premises Active Directory Policies.
* Zero delay feedback
* Supports password writeback when admin resets them from the Azure portal.
* Doesnt require any inbound firewall rules.

### How does Password Writeback works?

When an user tries to reset password

* Check where are these passwords managed
  - If it is Azure AD User can reset the password
  - If it is on-premise 
    * Checks whether password write back is enabled 
      - If Not cannt reset password right now message
      - If Yes user can reset the password
        * User proves his identity and gives the new password
        * Password will be encrypted with public key that was created during Password Writeback setup.
        *  This encrypyed password is sent to the service bus relay of Azure AD tenant over port 443. 
        * The service tries to find the user account using cloud anchor attribute.
        * Once the account is found, it attempts to reset on the on-premise AD. If the operation is successful, user gets a prompt password has been updated.

### What are the prerequisites for Password Writeback?
* Azure AD Premium P1 license,
* SSPR should be enabled on Azure AD tenant.
* Global Administrator or Enterprise Administrator accounts.
* Azure AD Connect.

### How to setup Password Writeback?

- We need to go to the service account account created by Azure AD Connect in on-premise. Open the service account and click on properties and Go to security tab and go to advanced and click on add and select principle and look for the account and click ok. Next Applies to select decendant user objeccts and now here you select permisions change password reset, write logout time, Write PWD last set. Click Apply and Ok.

- We need to make some changes with in the group policy. Go to group policy management -> Domains -> Your Domain -> Group Policy Objects. Right click on default domail policy and click edit. Under Computer configuration -> Policies -> Window Settings -> Security Settings -> Account Policies -> Password Policy. Change Minimum passoword age to Zero. 

- Go to Azure AD Connect Wizzard -> Click on Configure -> Customize Synchronization Options -> Provide Username and Password -> Optional features -> Check Password Write back 

- In Azure Portal go to Azure AD Password reset -> on-premise integration -> Make Sure Enable Passowrd writeback for synced users is checked. Also check the option Allow users to unblock the account without resetting the password.

### What is Password Protection in Azure AD?
Password Policies
Password Expiration Policies 
Banned Password list (Global and Custom) 

**Prereuisites**
Azure AD Premium P1 license
SSPR should be configured.
Global Administrator account.

### What is Passwordless Authentication?
Microsoft offers multiple Passwordless Authentications options

- Authenticator App
- Security Key
- PIN

### How does Passwordless Authentication works with Autheicator app?
- When tries to access application, he enters his username, then the request goes to Azure AD. Azure AD will find this user has Passwordless authentication enabled using Authentication app. Now notification is sent to the Authenticator app using APNS/FCM push notification service. if user is andriod the notification is sent using Firebased cloud messaging. When the user opens authenticator app, then Authenticator app will connect to Azure AD and it will recieve proof of reasons challange along with Authorization token. The user completes the challange by entering the Pin to unlock private key. Then the authorization token sent by Authenticator app is signed by private key and will be sent back to Azure AD. Then Azure AD performs Public and Private key validation and sends the access token to the client

### What are the Prerequisites of Passwordless Authentication?
* Azure AD Premium P1 license.
* Latest version of Microsoft Authenticator app installed in iOS or Andriod devices.
* For Andriod, the device that runs Microsoft Autheticator must be registered to an individual user.
* For iOS, the device must be registered with each tenant where its used to sign in.
* Global Administrator account.

### What are Conditional Access Policies?
Conditional Access Policies are if-then statements

When the user signs in with username and password and when this user is authenticated by Azure AD, only then CA Policies will be applied to that user account.

The signals can be 
 - users or groups. 
 - location or an IP address. 
 - device from where the user is accessing. 
 - an application that user is trying to access

Even CAP can be used to identity the risky sign-in behaviour 

Based on signals we created conditions and we speicify the action whether access should be allowed or blocked.

Conditional Access Policy have 4 major components
- **Assignments** - to whom we need to assign the policy. we can include or exlude users or groups, include or exclude all users or set of users using security group, you can add directory roles or you can include or exlude externl guest users
- **Cloud Apps or actions** - we can select cloud applications, user actions and authentication context. Under actions this you can specify the task that can be peformed by user. As of now it supports two user actions Register Security information and  Register or Join devices
- **Conditions** - an administrator can add conditions like device platform, location or client applications. Conditions are User risk level, Sign-in Risk level, device platforms, Locations, Client apps, Filter for devices
- **Access Controls** - administrator can grant or block the access. Using session, we can let Azure AD to pass the device information to the cloud apps

### What is B2B Collaboration?
B2B collaboration is a feature of Azure AD external identities. It allows you to invite external users to your organization and let them use your organization services.

**Prerequisites**
Azure AD Premium P1 license.
An account with Global Administrator Privileges

### What are sign-in and Audit Logs in Azure AD?
Azure AD Audit logs have attributes Service, Category, Activity, Target Id, Initiated by

Examples
- Service -> Core Directory
- Category -> User Management
- Activity -> Add User / Update User
- TargetId -> user1@test.com
- Initiated by -> adminacount@test.com / Microsoft B2B Admin / Sync_Dc@fs

Sign-in logs have attributes Date, User, Application, Status, IP Address, Location, Conditional Access Policy (Not Applied/Success), Authentication requirement (SFA/MFA)

### What is Device Identity in Azure AD?

A device identity is an object in Azure AD. (like users, groups or applications)

There are three ways that we can add a device in Azure AD
- Azure AD Registration
- Azure AD Join
- Hybrid Azure AD Join

### What is Azure AD device registration?

These are the personal devices (laptop, mobile) also called BYOD (Bring Your Own Device).
The user will register their device in Azure AD. The user will login to this device with his personal account but during registration, the user needs to enter Azure AD credentials.

**How it works**

When a user tries to register personal device in Azure AD, he will enter his Azure AD credenitials with in the device. Then Azure AD will perform authentication on this user account and once user is authenticated this device will gets registered in Azure AD and a device identity is created in Azure AD. During this process Azure AD will push a certificate to this device so that that Azure AD can trust this particular device. Once this registration is completed, SSO feature is enabled on this device. Thats means user will be asked to enter credentials while login from this device.

You can manage this device using MDM/MAM/CA policies using Intune. You can control the access of these devices using conditiona access policies.

### What is Azure AD Joined device?
Azure AD Joined devices are Organization-owned devices.

We can join these devices to Azure AD So that admin can apply Intune policies to control the configuration on these devices or we can apply conditional access policies on these particular devices. incase of Azure AD devices users login into the machine using Azure AD credentials.

Supported OS are Windows 10, Windows 11, Windows Server 2019 Vms in azure. Home edition is not supported.

We can join at the time of installing OS or Post OS installed.

We can go my accounts and add the account of Azure AD. 
We can see the status using DSREGCMD /status. AzureAdJoined is yes and AzureAdprt to yes. We can also see the certificate issued by Microsoft. (MMC -> Certficates -> Personal). You can check event viewer logs.

### What is Hybrid Azure AD Joined device?

Hybrid Azure AD Joined devices are joined to on-premise Active Directory domain and registered with Active Directory.

Lets consider When we join a device with on-premise AD device object is created in AD for that particular device. When this object is created, we can apply group policies or other policies on this devcice. Now we want to apply Azure AD policies like SSO or Conditional access polices, so we need device identity in Azure AD as well. Device Identity is created in Azure AD.Once this is done we can apply cloud policies on this device. This is the purpose of enrolling the device as hybrid azure ad join.

**Prerequisites**
- Azure AD Connect version 1.1.819.0 or later
- Add device OU in syncing scope.
- Enterprise Adminsitrator credenitals of on-prem AD.
- urls are allowed in your network
- Devices supporting the OS
  
### What is Azure AD seamless SSO?

It is a feature of Azure AD that allows users login into the applications without their usernames and passwords.

Works when we are using Password Hash Synchronization or Password Through Authenitcation
We can roll out this feature to set of users or all users using Group Policy

**How it Works**
When we enable on Seamless SSO using Azure Connect, it creates an computer account object in on-premise AD with name AzureADSSOAcc. This accounts represents Azure AD.In addition to this a kerbose Service Principle Name is also created and this SPN is used during sign-in process. 

Lets say user is trying to acccess portal.office.com from a domain joined machine, then Azure AD will send challange to the browser using JS. This challenge is sent over 401 unauthorize response and Azure Ad will ask to provide a kerbose ticket. In the next step, the browser will request a ticket from AD for Azure AD SSO account, then AD will locate the compute account object, it will create kerbose ticket, it will encrypt this ticket using secret key of Azure AD SSO account and send the kerbose ticket to the browser. Then browser will forward this kerbose ticket to Azure AD and Azure AD will decrypt the kerbose ticket, it will evaluate the identity that is included within ticket and after the evaluation process, the Azure AD will send a token the application and user will get access to the application. SO in this entire process, the user didnt enter the username or password.

**Prerequisites**
- Setup your Azure AD connect server
- use latest version of Azure AD Connect
- Credentials of Global Administrator and on-prem Active Directory domain administrator
- Enable modern authentication on Azure Ad tenant.

### What is Azure AD Connect Cloud Sync?
It is a light weight version of Azure AD Connect that is designed to meet and acomplish your hybrid idenity goals.

|Azure AD Connect|Azure AD Connect Cloud Sync|
|-|-|
|Installs the agent along with SQL database in on-premise server|Installs light weight agent on on-premise server|
|Default sync cycle runs for every 30 minutes|Default sync cycle runs for every 2 minutes|
|Supports Pass-through authentication|Does not support Pass-through authentication|
|Supports device identities authentication|Does not synchronize device identities|
|Allow advanced customization for attribute flows|Does not support advanced customization for attribute flows|
|Supports device writeback, group writeback, Exchange hybrid writeback|Not supported| 

**Prerequisites**
- A domain joined host server running windows server 2016 or greater with .NET 4.7.1+ runtime
- Credentials of Gloabl Administrator (Azure AD) and Enterprise Administrator (Active Directory)
- Port 443, 80, 8080 should be allowed in firewall. 
- Allow some URLs in firewall



























-----------


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


### What is Azure Load Balancer?

Load balancing refers to evenly distributing load (incoming network traffic) across a group of backend resources or servers.

Azure Load Balancer operates at layer 4 of the Open Systems Interconnection (OSI) model. It's the single point of contact for clients.

### What is the PS script to install IIS and change default.html file in VM?

```ps
# Install IIS server role
 Install-WindowsFeature -name Web-Server -IncludeManagementTools

 # Remove default htm file
 Remove-Item  C:\inetpub\wwwroot\iisstart.htm

 # Add a new htm file that displays server name
 Add-Content -Path "C:\inetpub\wwwroot\iisstart.htm" -Value $("Hello World from " + $env:computername)
```

