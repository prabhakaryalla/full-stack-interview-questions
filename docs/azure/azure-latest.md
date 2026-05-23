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