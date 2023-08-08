- [What is Kubernetes?](#what-is-kubernetes)
- [Kubernetes Architecture](#kubernetes-architecture)
- [What is Kubenet?](#what-is-kubenet)
- [What is Azure CNI?](#what-is-azure-cni)
- [Kubenet or Azure CNI](#kubenet-or-azure-cni)
- [Azure CNI (advanced) network mode](#azure-cni-overlay-mode)
- [What is Pod?](#what-is-pod)
- [What is Deployment?](#what-is-deployment)
- [What is ReplicaSet?](#what-is-replicaset)
- [Can a POD use ReplicaSet?](#can-a-pod-use-replicaset)
- [What is Sidecar or helper container?](#what-is-sidecar-or-helper-container)
- [Why are the Labels used in Deployment?](#why-are-the-labels-used-in-deployment)
- [What is a service in Kubernetes?](#what-is-a-service-in-kubernetes)
- [What are different types of Services in Kubernetes?]()
- [How POD communication happens in Kubernetes?](#how-pod-communication-happens-in-kubernetes)
- [Which service is secure in Kubernetes?](#which-service-is-secure-in-kubernetes)
- [How is a service is mapped to its respective POD's?](#how-is-a-service-is-mapped-to-its-respective-pods)
- [How the containers in a POD communicate with each other?](#how-the-containers-in-a-pod-communicate-with-each-other)
- [How to look at which POD's are mapped to a service?](#how-to-look-at-which-pods-are-mapped-to-a-service)
- [NodePort port allocation starts from?](#nodeport-port-allocation-starts-from)
- [What is Ingress?](#what-is-ingress)
- [What is Ingress Controller?](#what-is-ingress-controller)
- [What are Ingress Resources?](#what-are-ingress-resources)
- [What is ConfigMap?](#what-is-configmap)
- [What is Secret?](#what-is-secret)
- [What are the different types of secrets in Kubernetes?](#what-are-the-different-types-of-secrets-in-kubernetes)
- [What are Kubernetes Namespaces?](#what-are-kubernetes-namespaces)
- [What are Kubernetes Persistent Volumes?](#what-are-kubernetes-persistent-volumes)
- [What are Kubernetes Persistent Volume Claims?](#what-are-kubernetes-persistent-volume-claims)
- [What are Kubernetes Statefulsets?](#what-are-kubernetes-statefulsets)
- [What are Kubernetes Daemonsets?](#what-are-kubernetes-daemonsets)
- [What are Kubernetes Jobs?](#what-are-kubernetes-jobs)
- [What are Horizontal Pod Autoscaler?](#what-are-horizontal-pod-autoscaler)
- [What are Cluster Autoscaler?](#what-are-cluster-autoscaler)
- [What is LimitRange?](#what-is-limitrange)
- [What is ResourceQuota?](#what-is-resourcequota)


### What is Kubernetes?
Kubernetes is an open-source Container Management tool that automates container deployment, container scaling, descaling, and container load balancing (also called a container orchestration tool)

### Kubernetes Architecture

![Kubernetes Architecture](https://d33wubrfki0l68.cloudfront.net/2475489eaf20163ec0f54ddc1d92aa8d4c87c96b/e7c81/images/docs/components-of-kubernetes.svg)

First we have Nodes (can be VM or Physical Servers) in a cluster. In Each those Nodes we run containers. In order to run containers we need Container Runtime in each node. We can access of those any nodes and  deploy & run the containers using docker run command. But consider for example if i am running on node 2, there is no enough memory and CPU inorder to run the container. Another scenario is i dont want to access the node directly if i have cluster of 100 nodes inorder to deploy and run the containers. 

Here we have another layer added by Kubernetes Control Plane or Master Node. This will facilitate running and deployment of different containers. Here we have all the main Kubernetes components. Developer uses Kubectl commands to issue the commands to the Control Pane. Kubectl is command line interface. Kubectl commands uses Yaml files which contain the configurarions (container name, replica, ports , services, etc). The Master Node or Control Pane contains API Server, Controller Manger, Scheduler, etcd.

**API Server**– The API server is the entry point for all the REST commands used to control the cluster. All the administrative tasks are done by the API server within the master node. If we want to create, delete, update or display in Kubernetes object it has to go through this API server. API server validates and configures the API objects such as ports, services, replication, controllers, and deployments and it is responsible for exposing APIs for every operation.

**etcd**- It is a distributed key-value lightweight database. In Kubernetes, it is a central database for storing the current cluster state at any point in time and is also used to store the configuration details such as subnets, config maps, etc. It is written in the Go programming language.

**Scheduler**- It is a service in the master responsible for distributing the workload. It is responsible for tracking the utilization of the working load of each worker node and then placing the workload on which resources are available and can accept the workload. The scheduler is responsible for scheduling pods across available nodes depending on the constraints you mention in the configuration file it schedules these pods accordingly. The scheduler is responsible for workload utilization and allocating the pod to the new node. 

**Controller Manager** -  Also known as controllers. It is a daemon that runs in a non terminating loop and is responsible for collecting and sending information to the API server.

**Cloud Manager**- Cloud Manager will tell the different cloud providers (AKS, GKE, EKS) to provison the different managed disks or load balancer or etc.


Kubernetes Worker node contains all the necessary services to manage the networking between the containers, communicate with the master node, and assign resources to the containers scheduled. The components of the Kubernetes Worker node are: 

**a) Kubelet** - It is a primary node agent which communicates with the master node and executes on each worker node inside the cluster. It gets the pod specifications through the API server and executes the container associated with the pods and ensures that the containers described in the pods are running and healthy. If kubelet notices any issues with the pods running on the worker nodes then it tries to restart the pod on the same node. If the issue is with the worker node itself then the Kubernetes master node detects the node failure and decides to recreate the pods on the other healthy node.

**b) Kube-Proxy**- It is the core networking component inside the Kubernetes cluster. It is responsible for maintaining the entire network configuration. Kube-Proxy maintains the distributed network across all the nodes, pods, and containers and exposes the services across the outside world. It acts as a network proxy and load balancer for a service on a single worker node and manages the network routing for TCP and UDP packets. It listens to the API server for each service endpoint creation and deletion so for each service endpoint it sets up the route so that you can reach it. 

**C) Pods**– A pod is a group of containers that are deployed together on the same host. With the help of pods, we can deploy multiple dependent containers together so it acts as a wrapper around these containers so we can interact and manage these containers primarily through pods. 


Users wants to access the app, intead if directly access the accessing the containers they go through load balancer beacuse we have multiple instances of our application. Load balancer will decide which container to access.

***

### What is Kubenet?

**AKS Network Plugin - Kubenet**

- Nodes gets an IP addresses from Azure Virtual Network subnet.
- Pods receive an IP address from a logically different address space to the Azure Virtual network subnet of the nodes.
- Network Address Translation(NAT) is then configured so that Pods can reach out to the resources on the VNET.
- The source IP address of the traffic is NAT to the node primary IP address.
This reduces the number of IP Addresses you need to reserve in your network space for pods to use.

***

### What is Azure CNI?

**AKS Network Plugin: Azure CNI**

- Every pod gets an IP address from the subnet and can be accessed directly
- These IP addresses must be unique across the network space and must be planned in advance.
- Each node has a configuration parameter for the maximum number of pods it supports
- The equivalent number of Ip addresses per node are then reserved upfront for that node.
- This approach requires more planning 
- Might lead to IP Address exhaustion or the need to rebuild clusters in larger subnet as application demand grows.

***

### Kubenet or Azure CNI

**Use Kubenet when**
- You have limited address space.
- Most of the communication is within the cluster
- You dont need advanced AKS features such as virtual nodes or Azure Network Policies

** Use Azure CNI when**
- You have avialable address space.
- Most of the communication is to the resources outside the cluster.
- You dont need to manage user defined routes for prod connectivity.
- You need AKS advanced features

***

### Azure CNI Overlay Mode






```ps
az group create --name rg-aks-cni --location eastus
```

***

### What is Pod?

- In Kubernetes, a Pod is the smallest and most basic unit of deployment.
- It represents a single instance of running process with in the cluster.
- A pod encapsulates one or more containers, storage resources, network configurations and other options to run a specific set of containers together.
- Pods are typically created and managed using higher level of abstraction such as Deployments, ReplicaSets, or StatefulSets which provide additional features like scaling, rolling updates, self healing capabilities.
- Pods provides several benefits includes resource isolation, flexible deployment strategies, easy scaling and enhanced security.

***POD Manifest***
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
  - name: my-container
    image: nginx:latest
    ports:
    - containerPort: 8080
```
---

### What is Deployment?
- In Kubernetes, a Deployment is an object that provides declarative updates and management for set of replica Pods.
- When we create Deployment, we specify desired state by defining the container images, number of replicas and other configuration parameters.
- Kubernetes ensures that the actual state matches with the desired state.
- If there are any discrepencies, Kubernetes automatically take action to reconsile the state, creating or deleting the Pods as necessary.

***Deployment Manifest***
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-container
        image: nginx:latest
        ports:
        - containerPort: 8080

```
---

### What is ReplicaSet?
- In Kubernetes, a ReplicaSet is an object that ensures a specific number of replica pods are running at any given time.
- It is responsible for maintianing desired replica count and mainting the lifecycle of pods.
- ReplicaSets are typically used to manage stateless applications where individual instances of the applications can be treated as interchangable.
- They help in acheiving high availability and scalability by automatically scaling the number of replicas up or down based on the designed specifications.
- When we create ReplicaSet, we specify the desired number of replicas and provide a template for creating the Pods.

***ReplicaSet Manifest***

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: my-replicaset
spec:
  # modify replicas according to your case
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-container
        image: nginx:latest
        ports:
        - containerPort: 8080
```

---

### Can a POD use ReplicaSet?
- No, we cannot directly associate a POD with ReplicaSet. In order to that, we need use Deployments.

- ReplicaSet primary responsibility is to maintain desired number replicas in a given Deployment.

----

### What is Sidecar or helper container?

- In the context of containerization and microservices, a sidecar or helper container refers to a secondary container that runs alongside of the main application container with in a Pod in Kubernetes.
- The sidecar container provides auxiliary functionalities and support to the main container, enhancing overall capabilities of the application.

----

### Why are the Labels used in Deployment?

- Labels in the Deployments are used for different purposes including identification, grouping and selecting the resources within the deployment.
- They enable you to organize and control different aspects of our deployment, such as service routing, updates, rollbacks and monitoring, based on specific attributes or criteria.

### What is a service in Kubernetes?

- In Kubernetes, a Service is an abstraction that provides consistent way to access and communicate with the set of Pods.
- It acts as a stable network endpoint for accessing Pods, enabling inter-Pod communication and load balancing.

![Service Overview](https://d33wubrfki0l68.cloudfront.net/7a13fe12acc9ea0728460c482c67e0eb31ff5303/2c8a7/docs/tutorials/kubernetes-basics/public/images/module_04_labels.svg)

-----
###

### What are different types of Services in Kubernetes?

- **ClusterIP:** The default Service type, which exposes the Service on a cluster-internal IP address. It is accessible only within the cluster.
- **NodePort:** Exposes the Service on a specific port on each node in the cluster. The Service is accessible using cluster nodes' IP address.
- **LoadBalancer:** Provision a cloud provider's load balancer to distribute traffic to the Service. External Clients can access the Service using a Publicly accessible IP address.
- **ExternalName:** Maps the Service to a DNS name, allowing the Service to redirect the requests to an external endpoint outside the cluster.

***ClusterIP Manifest***
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-deployment-cip
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app-cip
  template:
    metadata:
      labels:
        app: my-app-cip
    spec:
      containers:
      - name: my-container
        image: nginx:latest
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: my-app-cip
  labels:
    app: my-app-cip
spec:
  type: ClusterIP
  ports:
  - port: 80
    targetPort: 80
    protocol: TCP
  selector:
    app: my-app-cip
```

***NodePort Manifest***
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-deployment-np
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app-np
  template:
    metadata:
      labels:
        app: my-app-np
    spec:
      containers:
      - name: my-container
        image: nginx:latest
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: my-app-np
  labels:
    app: my-app-np
spec:
  type: NodePort
  ports:
  - port: 80
    targetPort: 80
    protocol: TCP
  selector:
    app: my-app-np
```

***LoadBalancer Manifest***
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-deployment-lb
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app-lb
  template:
    metadata:
      labels:
        app: my-app-lb
    spec:
      containers:
      - name: my-container
        image: nginx:latest
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: my-app-lb
  labels:
    app: my-app-lb
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 80
    protocol: TCP
  selector:
    app: my-app-lb
```
---

### How POD communication happens in Kubernetes?

- DNS-Based Service Discovery: Kubernetes provides a built-in DNS service called CoreDNS.
- Each POD is automatically assigned a DNS name based on its metadata.
- This DNS name is used by other PODS or services to discover or communicate with the Pod.
- The DNS resolution is handled by CoreDNS which maps DNS name to the POD IP address.

---
### Which service is secure in Kubernetes?

- ClusterIP is more secure in Kubernetes.
- The Cluster IP service type creates an internal-only service within the cluster, making it accessible only to other resources within the same cluster.

---

### How is a service is mapped to its respective POD's?

- Using labels
- In Kubernetes, a Service is mapped to its respective Pods through the use of labels and selectors.
- Labels are key-value pairs that are attached to Kubernetes objects including Pods and Services.
- Selectors are used to match labels on objects.

----

### How the containers in a POD communicate with each other?

- Using localhost
- In a Pod, the container share the same network namespace, which means they can communicate each other using localhost or the loopback address (127.0.0.1)
- When multiple containers are running within a Pod, they communicate over the loopback network interface just as if they were running on the same machine.

---
### How to look at which POD's are mapped to a service?

- kubectl describe service <servicename>
---
### NodePort port allocation starts from ?

30000

---
### What is Ingress?

- In kubernetes, Ingress is an API object that provides external access to services within a cluster
- It acts as a layer 7 (Application Layer) load balancer, allowing external traffic to be routed to different services based on HTTP/HTTPS routes and rules.

![Ingress Diagram](https://d33wubrfki0l68.cloudfront.net/91ace4ec5dd0260386e71960638243cf902f8206/c3c52/docs/images/ingress.svg)

---

### What is Ingress Controller?

- In Kubernetes, an Ingress Controller is a component that manages and operates the Ingress Resources.
- It is responsible for fulfilling the Ingress rules by configuring and managing the underlying load balancer or reverse proxy that handles the incoming traffic.
- By using an Ingress Controller, Kubernetes clusters can leverage the Ingress resource to manage external access to services in a more centrilized and flexible manner.
- The Ingress Controller abstracts the complexities of load balancing and routing, provide an convenient interface to define and manage the ingress rules for applications running in the cluster.

Kubernetes as a project supports and maintains AWS, GCE, and nginx ingress controllers

### What are Ingress Resources?

- In Kubernetes, an Ingress resource is an API object that defines the rules for routing the external HTTP and HTTP traffic to services within the cluster.
- It acts as a layer 7 (Application Layer) load balancer and allows for more advanced traffic routing and configuration compared to the basic Service and NodePort approches.
- Using Ingress resources, you can define complex routing rules, manage multiple backend services and customize the behaviour of incoming traffic of your application in Kubernetes.
- The Ingress Controller will handle the implementation and enforcement of these rules allowing external traffic to efficient and securely routed to the appropriate services within the cluster.

```yaml
#https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.2.1/deploy/static/provider/cloud/deploy.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: k8s-ingress
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "false"
    nginx.ingress.kubernetes.io/use-regex: "true"
    nginx.ingress.kubernetes.io/rewrite-target: /$2
spec:
  ingressClassName: nginx
  rules:
  - http:
      paths:
      - path: /nginx(/|$)(.*)
        pathType: Prefix
        backend:
          service:
            name: nginx
            port:
              number: 80
      - path: /httpd(/|$)(.*)
        pathType: Prefix
        backend:
          service:
            name: httpd
            port:
              number: 80
      - path: /(.*)
        pathType: Prefix
        backend:
          service:
            name: nginx
            port:
              number: 80
```

---

### What is ConfigMap?

- In Kubernetes, a ConfigMap is an API object used to store configuration data that can be consumed by pods or other resources in the cluster.
- It provides a way to decouple configuration settings from the containerized applications, making it easier to manage and update configuration data without modifying the application code or container images.
- ConfigMaps stores key-value pairs or provide the ability to mount configuration files as data.
- This can include environment variables, command-line arguments, or any other type of configuration data required by our application.

```yml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mongodb-configmap
data:
  database_url: mongodb-service
```

----

### What is Secret?

- In Kubernetes, a Secret is an API object used to store sensitive information such as passwords, tokens or SSH keys.
- Secrets provide a way to securely store and manage sensitive data within the cluster.
- Secrets can be used by the applications and Pods to access the sensitive information without exposing it in plain text.
- They are typically used to store data that needs to be passed to containers securely, such as database credentials, API Keys or TLS certificates.
- Kubernetes Secrets are stored in the cluster's etcd data stored, encrpted at rest. They can be accessed by pods or other kubernetes objects securely.
- Secrets can be mounted as files or exposed as environment variables within a container.


```yml
apiVersion: v1
kind: Secret
metadata:
    name: mongodb-secret
type: Opaque
data:
    mongo-root-username: dXNlcm5hbWU=
    mongo-root-password: cGFzc3dvcmQ=
```
-----

### What are the different types of secrets in Kubernetes?

-**Opaque:** The most common type of secret. It allows us to store the arbitary key-value pairs as base64-encoded strings. It is used to store general purpose sensitive information.
-**Docker-registry:** Used for storing credentials to authenticate with a private Docker registry. It includes the server, username, password and email fields.
-**TLS:** Used for storing TLS certificates and private keys. It includes the tls.crt and tls.key fields.
-**Service Account:** Automatically created Secrets that provide credentials for accessing Kubernetes API. They are associated with service accounts and allows pods to authenticate with the API server.

----

### What are Kubernetes Namespaces?

- In Kubernetes, namespace are way to create virtual ckusters within a physical cluster. 
- They provide a way to divide cluster resources into logical groups, enabling multiple teams or applications to coexist and operate independently within the same Kubernetes cluster.
- Namespaces help in organizing and isolating resources, improving resource utilization and providing a level of seperation between different environments, projects or teams.
- They act as a scope for Kubernetes objects such as pods, services, deployments, configmaps and secrets.
- Each object in Kubernetes belong to a specific namespace.

***Key points about namespaces:***

- Isolation: Namespaces provide isolation between resources. Objects in one namespace are typically not aware of objects in other namespaces, unless explicitly configured to communicate.
- Resource Allocation: Resources like CPU, memory, storage and network bandwidth can be allocated and managed at the namespace level. This allows for resource quotas and limits to set for each namespace.
- Access Control: Kubernetes RBAC can be used to define fine-grained access control policies at the namespace level. This enables different teams or users to have different permissions within their respective namespaces.

----

### What are Kubernetes Persistent Volumes?

- In Kubernetes, a Persistent Volume (PV) is a piece of storage provisioned in a cluster that can be dynamically allocated  and managed by administrators.
- PVs provide a way to decouple storage from the lifecycle pods and allow data to persist beyond the lifetime of individual pods.
- Persistant Volumes serves as an abstraction layer between physical storage (such as network-attached storage or local storage) and the application's need for storage.
- They enable application to request storage resources without needing to know the details of underlying infrastructure.

***Persistent Volume - Key Points***

Provisioning:
- PVs can be provisioned statically or dynamically.
- Static provisioning involves creating PVs in advance, while dynamic provisioning allows PVs to be created on-demand when requesting by applications.

Storage Classes:
- Dynamic provisioning of PVs is facilitated through the use of Storage Classes.
- Storage Classes define different classs of storage with specific characteristics (e.g., performance, access modes) and specify provisioner responsible for dynamically creating the storage.


Access Modes:
- PVs support different access modes to cater to different types of storage requirements.
- The common access modes are ReadWriteOnce (RWO) for single node read-write access, ReadOnlyMany (ROX) for multiple nodes read-only access, and ReadWriteMany (RWX) for multiple nodes read write access.


Lifecycle and Reclaim Policy:
- PVs have a lifecycle independent of the pods that use them.
- They can be managed seperately from pods.
- When a PV is no longer needed, it can be released and made available for resuse.
- The reclaim policy determines what happens to the storage when the PV is released, allowing options like retaining the data, deleting the data or manual reclaimation.


Persistent Volume Claims (PVCs):
- Persistent Volume Claims (PVCs) in Kubernetes have three different reclaim policies that determines what happens to the associated Persistent Volume (PV) when the PVC is deleted or no longer needed.
- **Retain:** With the "Retain" policy, the PV associated with the PVC is not automatically deleted or released when the PVC is deleted. Instead, the PV is retained, and its contents are preserved.
- **Delete:** The "Delete" policy indicates that the associated PV should be automatically deleted when the PVC is deleted.
- **Recycle (Deprecated):** The Recycle policy is deprecated and no longer recommended for use.

----

### What are Kubernetes Persistent Volume Claims?

- Persistent Volume Claims (PVCs) are used by applications to request storage resources from PVs.
- PVCs define the desired characteristics of the storage, such as size access mode and storage class.
- When PVC is created, Kubernetes dynamically binds it to an available PV that matches the requirements specified in the claim. 

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
    name: azure-managed-disk
spec:
  accessModes:
  - ReadWriteOnce
  storageClassName: managed-csi
  resources:
    requests:
      storage: 5Gi
```

The below manifest creates a basic NGINX pod that uses the persistent volume claim named azure-managed-disk to mount the Azure Disk at the path /mnt/azure. For Windows Server containers, specify a mountPath using the Windows path convention, such as 'D:'.

```yaml
kind: Pod
apiVersion: v1
metadata:
  name: mypod
spec:
  containers:
    - name: mypod
      image: mcr.microsoft.com/oss/nginx/nginx:1.15.5-alpine
      resources:
        requests:
          cpu: 100m
          memory: 128Mi
        limits:
          cpu: 250m
          memory: 256Mi
      volumeMounts:
        - mountPath: "/mnt/azure"
          name: volume
  volumes:
    - name: volume
      persistentVolumeClaim:
        claimName: azure-managed-disk
```

***Create a custom storage class***

The default storage classes suit the most common scenarios, but not all. For some cases, you might want to have your own storage class customized with your own parameters. 

**Storage class using NFS protocol**

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: azureblob-nfs-premium
provisioner: blob.csi.azure.com
parameters:
  protocol: nfs
  tags: environment=Development
volumeBindingMode: Immediate
```

---

### What are Kubernetes Statefulsets?

- Statefulsets in Kubernetes are a workload API object used to manage stateful applications.
- Unlike the traditional deployment if stateless applications, stateful applications require stable and unique network identities, stable storage, and ordered and predictable deployment and scaling.
- Statefulsets are commonly used for deploying and managing stateful applications such as databases (e.g., MySQL, PostgresSQL), messaging systems (e.g., Kafta) and other applications that require stable netwrok identities and persistent storage.

The below are some key features and characteristics of StatefulSets:

- **Stable Network Identities:** Each pod in a StatefulSet is assigned a unique and stable hostname based on a defined naming convention. This allows stateful applications to have a consistent network even when they are scaled up or down.
- **Ordered Deployment and Scaling:** StatefulSets ensure that pods are deployed and scaled in a sequential and orderly manner. Each pod is created and fully running before the next pod is started, ensuring dependencies and sequencing requirements are maintained.
- **Stable Storage:** StatefulSets provide stable and unique storage volumes for each pod. Persistent Volumes (PVs) and Persistent Volume Claims (PVCs) are used to provide storage to the pods, allowing data to be persisted and retained across the pod restarts and rescheduling.
- **Headless Service:** StatefulSets automatically create a Headless Service, which allows each pod to have its own DNS entry. This enable direct communication between the pods using their unique hostnames.
- **Stateful Pod Scaling:** StatefulSets support both vertical and horizontal scaling. Vertical scaling involves changing the resources (CPU and memory) allocated to each pod, while horizontal scaling involves adding or removing pods from the StatefulSet.
- **Ordered Termination:** When scaling down or termination of pods in a StatefulSet, Kubernetes ensures that the pods are terminated in the reverese order of their creation. This allows for orderly application shutdown and ensures data integrity and consistency.

**StatefulSets - Data Replication**
- Data Replication: Since each pod in the StatefulSet has its own PV and PVC, data replication can be handled at storage level.
- Many Cloud based storage solutions, like Google Cloud Persistent Disk (GCP PD) or Amazon Elastic Block Store (EBS) provide data replication capabilities to ensure high avaialability and data integrity.


```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: statefulset-blob-nfs
  labels:
    app: nginx
spec:
  serviceName: statefulset-blob-nfs
  replicas: 1
  template:
    metadata:
      labels:
        app: nginx
    spec:
      nodeSelector:
        "kubernetes.io/os": linux
      containers:
        - name: statefulset-blob-nfs
          image: mcr.microsoft.com/oss/nginx/nginx:1.19.5
          volumeMounts:
            - name: persistent-storage
              mountPath: /mnt/blob
  updateStrategy:
    type: RollingUpdate
  selector:
    matchLabels:
      app: nginx
  volumeClaimTemplates:
    - metadata:
        name: persistent-storage
      spec:
        storageClassName: azureblob-nfs-premium
        accessModes: ["ReadWriteMany"]
        resources:
          requests:
            storage: 100Gi

```
---

### What are Kubernetes Daemonsets?

- In Kubernetes, DaemonSets are a type of controller used to ensure that a copy of specific pod is running on all or some of the nodes in a cluster.
- Unlike ReplicaSets or Deployments that maintain a desired number of replicas across the cluster, DaemonSets are designed to run exactly one instance of a pod on each node.
- DaemonSets are commonly used to run system services or monotoring agents on each node, ensuring these essential services are present and active throughout the cluster.

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: prometheus-node-exporter
spec:
  selector:
    matchLabels:
      app: prometheus-node-exporter
  template:
    metadata:
      labels:
        app: prometheus-node-exporter
    spec:
      containers:
      - name: prometheus-node-exporter-container
        image: quay.io/prometheus/node-exporter:latest
        ports:
        - containerPort: 9100
        resources:
          limits:
            cpu: 100m
            memory: 200Mi
          requests:
            cpu: 50m
            memory: 100Mi
        volumeMounts:
        - name: proc
          mountPath: /host/proc
          readOnly: true
        - name: sys
          mountPath: /host/sys
          readOnly: true
      volumes:
      - name: proc
        hostPath:
          path: /proc
      - name: sys
        hostPath:
          path: /sys

```
---

### What are Kubernetes Jobs?

- In Kubernetes, a Job is a controller object that creates one or more pods to perform a specific task and ensures that task is completed successfully.
- Unlike other controller objects like Deployments or ReplicaSets, which maintains sepcified number of replicas running at all times, a job is designed for short-lived tasks or batch processing.
- Jobs are designed to run one or more pods to perform a task and then terminate when the task is completed. They are ideal for running batch jobs or tasks that needs to be executed once.

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: factorial-job
spec:
  completions: 1
  parallelism: 1
  template:
    spec:
      restartPolicy: Never
      containers:
      - name: factorial-job-container
        image: python:3
        command: ["python"]
        args: ["-c", "import math; num = 5; result = math.factorial(num); print(f'The factorial of {num} is {result}')"]
```
---
### What are Horizontal Pod Autoscaler?

- HPA automatically adjusts the number of replicas of Deployment, ReplicaSet or StatefulSet based on observed CPU Utilization or custom metrics.
- It ensures that there are enough replicas to handle the incoming traffic and prevent overloading the cluster.
- When CPU or custom metrics exceed the defined threshold, HPA scales up the replicas and when the metric decreases, it scales down the replicas.

***Deployment Manifest***

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
  namespace: default
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.7.9
        ports:
        - containerPort: 80
        resources:
          # You must specify requests for CPU to autoscale
          # based on CPU utilization
          requests:
            cpu: "250m"
```

***HPA Manifest***

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: nginx
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx
  minReplicas: 1
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 50
  - type: Resource
    resource:
      name: memory
      target:
        type: AverageValue
        averageValue: 100Mi
```


---
### What are Cluster Autoscaler?

- CA automatically adjusts the size of the Kubernetes cluster by adding or removing nodes based on the resource demands of pods.
- It ensures that there are enough resources available in the cluster to accommodate the scheduled pods.

---

### What is LimitRange?

- LimitRange are used to specify the constriants on the resource requests and limits the pods in a namespace.
- They help prevent pods from using excessive resources or ensure that all pods have minimum resource guarantees.

```yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: my-limit-range
spec:
  limits:
  - type: Container
    defaultRequest:
      cpu: 100m
      memory: 200Mi
    default:
      cpu: 200m
      memory: 500Mi
    min:
      cpu: 50m
      memory: 100Mi
    max:
      cpu: 500m
      memory: 1Gi
```

---

### What is ResourceQuota?

- ResourceQuotas are used to limit the total amount of compute resources (CPU and memory) that can be used within a namespace.
- They help to control the resource consumption of all pods and containers in the namespace.

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: my-resource-quota
spec:
  hard:
    cpu: "2"
    memory: 4Gi
```

---


[Kubernetes Examples](https://github.com/nextopsvideos/kubernetesyt)

---

### Kubectl commands

```ps
kubectl apply -f <manifest.yml>
kubectl get pods -o wide
kubectl get all -n kube-system
kubectl describe pod <my-pod> 
kubectl edit deployment <my-deployment>
kubectl delete pod <my-pod>
kubectl delete -f <manifest.yml>
kubectl logs <my-pod>
```



