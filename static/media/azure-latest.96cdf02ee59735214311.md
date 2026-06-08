<details> <summary><mark>📌Load Balancer</mark></summary>

<details><summary><b>What are the key differences between Azure Basic Load Balancer and Standard Load Balancer? How do these differences impact security and scalability? </b></summary>
Here are the key differences between Azure Basic Load Balancer and Azure Standard Load Balancer, along with how these differences impact security and scalability:

***Key Differences***  

| Feature                | Basic Load Balancer                                 | Standard Load Balancer                                    |
|------------------------|-----------------------------------------------------|-----------------------------------------------------------|
| SKU Availability       | Only supports Basic SKU                             | Supports Standard SKU                                     |
| Backend Pool Size      | Up to 100 instances                                 | Up to 1000 instances                                      |
| Availability Zones     | No zone redundancy                                  | Supports zone-redundant and zone-aware deployments        |
| Security               | No integration with Network Security Groups (NSGs)  | Fully integrates with NSGs for inbound/outbound filtering |
| Public IP Addresses    | Only Basic Public IP                                | Supports Standard Public IP with static/dynamic allocation|
| Health Probes          | Limited to TCP and HTTP                             | Supports TCP, HTTP, HTTPS probes with enhanced options    |
| Outbound Connectivity  | Basic SNAT for outbound                             | Provides more scalable and reliable outbound SNAT         |
| Metrics and Diagnostics| Limited monitoring and diagnostics                  | Enhanced monitoring, diagnostics, and logging             |
| Protocol               | SupportTCP and UDP                                  | TCP, UDP, and supports more advanced scenarios            |
| Pricing                | Lower cost                                          | Higher cost but with advanced features                    |


***Impact on Security***

Standard Load Balancer supports integration with Network Security Groups (NSGs), allowing fine-grained control over inbound and outbound traffic, enhancing security posture.  
Basic Load Balancer does not support NSG integration, limiting security controls at the load balancer level.  
Standard SKU supports zone redundancy, improving resilience against zone failures, which indirectly enhances security by reducing downtime.  


***Impact on Scalability***

Standard Load Balancer supports up to 1000 backend instances, enabling much larger scale deployments compared to Basic Load Balancer’s 100-instance limit.  
Standard SKU supports availability zones, allowing for high availability and fault tolerance across zones.  
Outbound SNAT ports and connection scalability are significantly better in Standard Load Balancer, supporting high-throughput applications.  

<hr/>
</details>

<details><summary><b>What is the 5-tuple hashing algorithm used by Azure Load Balancer, and which five elements does it consider?</b></summary>
The 5-tuple hashing algorithm used by Azure Load Balancer is a method to determine how incoming network traffic is distributed across backend instances.

**What is the 5-tuple hashing algorithm?**  
It is a hash function that takes five specific elements from each network packet to compute a hash value.  
This hash value is then used to consistently map the packet to one of the backend pool instances.
The goal is to ensure flow affinity (session persistence), meaning all packets belonging to the same connection or flow are routed to the same backend instance.  

The Five Elements Considered:

1. Source IP address
2. Source port
3. Destination IP address
4. Destination port
5. Protocol (e.g., TCP or UDP)

***How it works:**

For each incoming packet, Azure Load Balancer extracts these five elements.  
It computes a hash based on these values.  
The hash determines which backend instance will handle the packet.  
This ensures that packets from the same client connection consistently reach the same backend, maintaining session state.  
<hr/>
</details>

<details><summary><b>Is it possible to configure or customize the hashing algorithm used by Azure Load Balancer? Why or why not? </b></summary>
No, it is not possible to configure or customize the hashing algorithm used by Azure Load Balancer.

***Explanation:***

Azure Load Balancer uses a fixed 5-tuple hashing algorithm based on the combination of:

Source IP address  
Source port  
Destination IP address  
Destination port  
Protocol (TCP/UDP)  

This algorithm is built into the Azure Load Balancer service to provide consistent flow affinity (session persistence) by ensuring that all packets of a given flow are routed to the same backend instance.

The hashing algorithm is not exposed for customization because:

It is optimized for performance and scalability within Azure’s infrastructure.
Allowing customization could introduce complexity, reduce reliability, or impact the deterministic routing of flows.
Azure abstracts these low-level details to provide a managed, consistent load balancing experience.

If you require more advanced or customizable load balancing algorithms (e.g., round-robin, least connections, weighted routing), you would typically use a Layer 7 load balancer or Application Gateway that supports such features.

<hr/>
</details>
<details><summary><b> What happens to existing sessions when backend pool membership changes (e.g., scaling out or in) in Azure Load Balancer using 5-tuple hashing?</b></summary>

* When the backend pool is scaled out (instances added), existing sessions continue on their original instances, while new sessions may be routed to the new instances.  
* When the backend pool is scaled in (instances removed), sessions on the removed instances are disrupted, and new sessions exclude those removed instances.  
* If a backend instance becomes unhealthy, sessions routed to that instance are disrupted.  
<hr/>
</details>
</details>

<details> <summary><mark>📌Application Gateway</mark></summary>
<details><summary><b>Explain the architecture of Azure Application Gateway and how it differs from Azure Load Balancer and Azure Front Door</b></summary>

**Azure Application Gateway Architecture**
Azure Application Gateway is a Layer 7 (Application Layer) load balancer that manages web traffic to your applications. It operates at the HTTP/HTTPS level and provides advanced routing capabilities, including URL-based routing, SSL termination, session affinity, and Web Application Firewall (WAF) integration.

**Key Components:**   
***Frontend IP Configuration***: Public or private IP address where the gateway listens for incoming traffic.  
***Listeners***: Define how the gateway listens for incoming requests (protocol, port, and hostname).
***Rules***: Define how requests are routed to backend pools based on listener and routing rules.
***Backend Pools***: Groups of backend servers (VMs, VM scale sets, IP addresses, or fully qualified domain names) that serve the application.
***HTTP Settings***: Define how the gateway communicates with backend servers (protocol, port, cookie-based affinity, connection draining).
***Web Application Firewall (WAF)***: Provides protection against common web vulnerabilities and attacks (e.g., SQL injection, cross-site scripting).

***Architecture Highlights:***  
Operates at Layer 7, enabling content-based routing decisions.  
Supports SSL termination and end-to-end SSL.  
Provides session affinity (sticky sessions).  
Integrates with WAF for security.  
Supports autoscaling and zone redundancy.  


***Differences from Azure Load Balancer and Azure Front Door***  
| Feature/Aspect               | Azure Application Gateway                          | Azure Load Balancer                            | Azure Front Door                              |
|-----------------------------|--------------------------------------------------|-----------------------------------------------|-----------------------------------------------|
| OSI Layer                   | Layer 7 (Application Layer)                       | Layer 4 (Transport Layer)                      | Layer 7 (Application Layer)                    |
| Primary Use Case            | Web application delivery with advanced routing, SSL offload, WAF | High-performance TCP/UDP load balancing        | Global HTTP/HTTPS load balancing with CDN and acceleration |
| Routing Capabilities        | URL-based routing, host-based routing             | Port and protocol-based load balancing         | URL-based routing, path-based routing, fast failover |
| SSL Termination             | Supported (SSL offload and end-to-end SSL)        | Not supported                                  | Supported                                      |
| Web Application Firewall    | Integrated WAF                                    | Not available                                  | Integrated WAF                                 |
| Global vs Regional          | Regional (within a single Azure region)            | Regional                                       | Global (multi-region)                          |
| Session Affinity            | Supported (cookie-based)                           | Supported (source IP affinity)                  | Supported                                      |
| Backend Targets             | VMs, VMSS, IP addresses, FQDN                      | VMs, VMSS, IP addresses                         | Any publicly accessible endpoint               |
| Use with CDN                | Typically used within region                       | Typically used within region                    | Acts as a global entry point with CDN features |
| Autoscaling                | Supported                                         | Supported                                     | Supported                                      |

***Summary***

Azure Application Gateway is ideal for web applications needing advanced Layer 7 routing, SSL offloading, and security via WAF within a single region.  
Azure Load Balancer is suited for high-throughput, low-latency Layer 4 load balancing of TCP/UDP traffic within a region.  
Azure Front Door provides global, Layer 7 load balancing with CDN capabilities, optimized for delivering applications with low latency worldwide.  
<hr/>
</details>
</details>




<details><summary><mark>📌Blob Storage</mark></summary>

<details><summary><b>Can you explain the differences between Hot, Cool, and Archive access tiers in Blob Storage and scenarios where each should be used?</b></summary>


***Hot Tier:***  
Designed for data that is accessed frequently. It offers the lowest latency and highest throughput but comes with higher storage costs compared to other tiers. Ideal for active data like websites, streaming, or data analytics.


***Cool Tier:***  
Intended for data that is infrequently accessed but needs to be available immediately when requested. It has lower storage costs than the Hot tier but higher access and retrieval costs. Suitable for backups, disaster recovery data, or older data that is still needed occasionally.


***Archive Tier:***  
Meant for data that is rarely accessed and can tolerate several hours of retrieval latency. It offers the lowest storage cost but the highest access and retrieval costs. Data must be rehydrated before use. Best for long-term archival, compliance, or legal data retention.

<hr/>
</details>

<details><summary><b>What strategies would you use to handle poison messages and message duplication in Azure Queue Storage?</b></summary>

***Poison Messages:***

Poison messages are messages that cause repeated processing failures, potentially blocking the queue.

Strategies to handle poison messages:  
Dequeue Count Monitoring: Each message has a dequeue count property. If a message exceeds a threshold (e.g., 5 attempts), move it to a separate "poison queue" for later inspection.  
Dead-letter Queue: Implement a dead-letter queue pattern where failed messages are moved after max retries.  
Logging and Alerts: Log failures and set up alerts to monitor poison message occurrences.  
Message Validation: Validate message content before processing to avoid processing invalid data.  
Idempotent Processing: Design message processing to be idempotent to reduce failure impact.  

***Message Duplication:***

Azure Queue Storage guarantees at-least-once delivery, so duplicates can occur.
Strategies to handle duplication:

Idempotent Consumers: Ensure message processing logic can safely handle duplicate messages without adverse effects.  
Message De-duplication: Use unique message IDs or correlation IDs stored in a database or cache to detect and ignore duplicates.  
Visibility Timeout: Set appropriate visibility timeout to allow enough time for processing before the message becomes visible again.  
Atomic Operations: Use transactions or atomic updates in backend systems to prevent duplicate side effects.  

<hr/>
</details>


</details>


<details> <summary><mark>📌Azure Active Directory</mark></summary>

<details><summary><b>How does Azure Managed Identity work under the hood? Explain the token acquisition and renewal process?</b></summary>

***Overview of Azure Managed Identity***  
Azure Managed Identity provides an automatically managed identity in Azure Active Directory (Azure AD) for applications running on Azure resources. This identity can be used to authenticate to any service that supports Azure AD authentication, without needing to manage credentials explicitly.

<u>**Types of Managed Identities**</u>  

***System-Assigned Managed Identity:***
Created and tied to the lifecycle of a specific Azure resource (e.g., VM, Azure Function). When the resource is deleted, the identity is deleted.  

***User-Assigned Managed Identity:***
Created as a standalone Azure resource and can be assigned to one or more Azure resources. Its lifecycle is independent of the resources using it.


<u>**How Managed Identity Works Under the Hood**</u>

***Identity Registration:***
When a managed identity is enabled on an Azure resource, Azure AD creates a service principal representing that identity in the tenant.

***Token Endpoint and Metadata Service:***
Each Azure resource with a managed identity has access to a local IMDS (Instance Metadata Service) endpoint at a fixed IP address (169.254.169.254) or a well-known URL. This endpoint is only accessible from within the resource.

***Token Acquisition Process:***
The application running on the Azure resource makes an HTTP request to the IMDS endpoint to request an OAuth 2.0 access token for a specific resource (e.g., Azure Key Vault, Azure Storage).

The request includes:

The resource URI (audience) for which the token is requested.  
Optionally, the client ID of the user-assigned managed identity (if applicable).

The IMDS service authenticates the request based on the resource's identity and returns an access token issued by Azure AD.

***Token Usage:***  
The application uses the access token to authenticate API calls to the target Azure service.  
The token is a JWT (JSON Web Token) with a limited lifetime (usually 1 hour).  

***Token Renewal:***  
The application is responsible for renewing the token before it expires.  
Typically, SDKs (e.g., Azure SDKs) handle token caching and automatic renewal by requesting a new token from the IMDS endpoint as needed.  
The renewal process is the same as the initial acquisition: request a new token from IMDS.  

***Security Considerations***
***Local IMDS Endpoint:*** The token endpoint is only accessible from within the Azure resource, preventing external access.  
***No Credential Exposure:*** The application never handles credentials directly; tokens are transient and managed by Azure.  
***Scoped Access:*** Tokens are scoped to specific resources, enforcing least privilege.

**Summary Flow**  
App requests token from local IMDS endpoint.  
IMDS validates the request and obtains token from Azure AD.  
IMDS returns token to the app.  
App uses token to call Azure service.  
App renews token before expiry by repeating the request.  

<hr/>
</details>


<details><summary><b>Can Managed Identities be used for cross-tenant or cross-subscription access? If yes, how do you configure and secure such scenarios?</b></summary>
Yes, Azure Managed Identities can be used for cross-subscription and, with additional configuration, for cross-tenant access, but there are important considerations and steps to securely configure such scenarios.

<u>**Cross-Subscription Access with Managed Identities**</u>

Scenario:
Your Azure resource with a managed identity in Subscription A needs to access resources (e.g., Azure Key Vault, Storage) in Subscription B within the same Azure AD tenant.
How to Configure:

***Same Azure AD Tenant:*** Both subscriptions must be under the same Azure AD tenant.  
***Assign RBAC Roles:*** Assign the managed identity the appropriate Azure RBAC role (e.g., Reader, Contributor, Key Vault Reader) on the target resource in Subscription B.  
***Use Managed Identity for Authentication:*** The resource in Subscription A requests tokens via its managed identity and uses them to access resources in Subscription B.  

***Security:***  
Access is controlled via Azure RBAC and Azure AD token issuance.  
No credentials are shared; tokens are scoped and time-limited.  
Principle of least privilege applies by assigning minimal required roles.  

<hr/>

<u>**Cross-Tenant Access with Managed Identities**</u>

Scenario: Your Azure resource in Tenant A needs to access resources in Tenant B.

Challenges:  
Managed identities are tied to a single Azure AD tenant.  
By default, tokens issued for a managed identity are valid only within its home tenant.  

***Possible Approaches:***

***Azure AD B2B Collaboration:***
Invite the managed identity's service principal as a guest in Tenant B.
Assign appropriate roles to the guest identity in Tenant B.
This requires Tenant B to accept guest users and configure access accordingly.

***Service Principal with Cross-Tenant Access:***  
Alternatively, create a service principal in Tenant B and use it for authentication instead of managed identity.


***Custom Token Exchange or Federation:***
Implement custom solutions involving token exchange or federated identity providers to bridge tenants.

***Security Considerations:***  
Cross-tenant access requires explicit trust and guest user management.  
Ensure conditional access policies and MFA are enforced.  
Monitor and audit guest access carefully.  
<hr/>
</details>

<details><summary><b>What is RBAC?</b></summary>

***RBAC (Role-Based Access Control)*** is a method to manage user and service access to resources based on assigned roles. In Azure, RBAC allows you to grant permissions to users, groups, or service principals at different scopes (subscription, resource group, or resource level) to control what actions they can perform.

***Roles:*** Define a set of permissions (e.g., Reader, Contributor, Owner).  
***Assignments:*** Roles are assigned to users, groups, or identities.  
***Scopes:*** Define where the role applies (subscription, resource group, or specific resource).  
***Principle of Least Privilege:*** Assign only the permissions necessary to perform tasks.


***Simple Code Example: Assigning an RBAC Role Using Azure CLI***
Goal: Assign the Reader role to a user on a specific resource group.

Steps:  
Login to Azure CLI:

``` bash
az login
```

Set variables:

``` bash
RESOURCE_GROUP="myResourceGroup"
USER_EMAIL="user@example.com"
ROLE="Reader"
```

Assign the role:

``` bash
az role assignment create --assignee $USER_EMAIL --role $ROLE --resource-group $RESOURCE_GROUP
```

***Explanation:***

--assignee: The user, group, or service principal to assign the role to.
--role: The role name or ID.
--resource-group: The scope where the role applies.
<hr/>
</details>

<details><summary><b>What is Azure Privileged Identity Management (PIM) and why is it important?</b></summary>

Azure Privileged Identity Management (PIM) is a service in Azure Active Directory (Azure AD) that helps organizations manage, control, and monitor access to important resources within Azure, Microsoft 365, and other Microsoft Online Services. It provides just-in-time privileged access, time-bound role assignments, approval workflows, and access reviews to reduce the risk of excessive, unnecessary, or misused permissions.

<u>**Why is Azure PIM Important?**</u>

***Enhances Security:*** By limiting the time users have privileged access, PIM reduces the attack surface and potential damage from compromised accounts.  
***Enforces Least Privilege:*** Users are assigned roles as “eligible” rather than permanently active, requiring activation only when needed.  
***Provides Just-in-Time Access:*** Users request access when necessary, often requiring approval and multi-factor authentication (MFA).
***Enables Auditing and Compliance:*** PIM logs all privileged role activations and changes, supporting security audits and compliance requirements.  
***Supports Access Reviews:*** Periodic reviews ensure that only the right users retain privileged access.

<hr/>
</details>

<details><summary><b>What is the difference between an “eligible” role and an “active” role in PIM?</b></summary>

**Eligible Role:**  
A user or group is assigned an eligible role when they have the potential to activate privileged access but do not have it by default.  
The user must manually activate the role when they need to perform privileged tasks.  
Activation can require approval, justification, and multi-factor authentication (MFA).  
The activation is typically time-limited (just-in-time access).  
Helps enforce the principle of least privilege by minimizing standing privileged access.  

**Active Role:**
A user or group has an active role when the privileged access is currently enabled and in use.  
The user can perform privileged operations immediately without further activation.  
Active roles can be assigned permanently or for a limited duration.  
Once the activation period expires, the role reverts to eligible (if applicable) or is removed.  

***Summary***

| Aspect        | Eligible Role                            | Active Role                            |
|---------------|----------------------------------------|--------------------------------------|
| Access        | Requires activation to gain privileges | Privileges are currently enabled     |
| Duration     | Activation is time-bound and temporary  | Active until expiration or manual deactivation |
| Control       | Supports approval, MFA, and justification | Immediate access                     |
| Security Benefit | Minimizes standing privileges          | Enables task execution                |

<hr/>
</details>

</details>