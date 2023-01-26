# Notes for OCI Architecture Associate 

## OCI Introduction

### Overview

- Infrastructure: compute, storage and networking
- Databases: oracle and open source DBs
- Data and AI: data flow, data catalog, data integration, ai services
- Analytics
- Applications
- Developer Services
- Governance and Administration

### Architecture

- **Regions**: 
    - Localized geographical area containing multiple availability domains which hosts OCI servers and data.
- Choose a region based on:
    - Data residency and compliance
    - Service availability
    - Location
- **Availability Domain**: 
    - Set of datacenters within a region isolated from each other, fault tolerant and unlikely to fail simultaneously. 
    - Each AD has 3 FDs. 
- **Fault Domain**: 
    - Can be interpreted as logical data centers ie. grouping of hardware and insfrastructure within an availability domain. 
- Data remains synchronized (across domains) usign Oracle Data Guard. 

---

## Identity and Access Management (IAM)

### Introduction

- Gives us fine grained access control
- User is assigned roles and each role comes with access (RBAC: role based access control)
- AuthN (authentication): who are you?
- AuthZ (authorization): what permissions do you have?
- Identity domain: helps to segregate users
- **Compartments**: fundamental building blocks, logically separates the resources
- Users are grouped into groups (usually they have similar requirements or access to resources). 
- We then write policies that gives them access to compartments and their resources. 
- **Resources**: instance of an entity exposed by a service, could be a database, load balancer etc.
- **Principal**: identity of the caller trying to access/operate on a resource.
- **Service**: application developed and operated by OCI, offers functionality to end customers.
- These reseources are objects. 
- Each resource is assigned a unique OCID.
- `ocid1.<RESOURCE TYPE>.<REALM>.[REGION][.FUTURE USE].<UNIQUE ID>`

usesrs --> groups --> policies --> compartments --> resources 

### Identity domains

- Represents user configs and security settings.
- Acts as a container to manage users, roles, federations, sso, mfa etc.
- An example use case: can separate dev and prod environments.
- Oracle provides following identity domains: free, premium, external user, oracle apps premium.

### AuthN

- Principal: IAM entity allowed to interact with users
- Instance principal: allows instances make api calls against other services
- OCI does AuthN via 3 ways:
    - username and password
    - API keys (usually when SDKs and CLIs are used) - RSA key pair
    - Auth tokens (used with 3rd party APIs)

### AuthZ

- All policies start with allow, everything is denied initially.
- `allow <SUBJECTS> to <ACTIONS in <PLACEMENT> [where <CONDITION>]`
- SUBJECTS are a clause for the various ways that an authenticated actor can be addressed.
- ACTIONS contains a verb and resource. 
- There are 4 available verbs:
    - **inspect**: enumerate and observe w/o access to any confidentioal data
    - **read**: permissions necessary to access, but not alter resources
    - **use**: permissions to modify pre-existing resources
    - **manage**: can do anything with the resources
- Resources include: all-resources, database-family, instance-family, object-family etc. 

### Common Policies

- Some policies have a lot of sub-polciies that are always required. They are referred as common policies.
- For example, in order to access storage, we need access to the virtual cloud network because it has the VNIC through which all requests are routed.

### Compartments

- Compartment is a logical collection of related resources. 
- The tenancy is often called as the root compartment. 
- The purpose is to isolate and control the access to the resources. 
- Root compartment can hold all the resources, but it's good practise to isolate. 
- Each resource can belong to a single compartment. 
- Resources can interact with other resources in different compartments. 
- Resources can be moved from one compartment to another. 
- The compartment you create exists through all the regions one has subscribed to. Compartemtns are global.
- Compartments can be nested.
- Compartment quota is set by admin, service limits are set by Oracle.

Note: 
- Compartments can only see their immediate children, not further levels. 
- In this example, A has a child B, which in turn has a child C.
- A doesn't know C exists, so a path must be provided.
- Thus, while writing policies for compartment C through compartment A, it must be: `allow ... compartment B:C`. 

### Policy Inheritance and Attachment

- Compartments inherit all policies from their parent compartment.
- When a policy is created, it must be attached to a compartment.
- Where a policy is attached, affects who can modify or delete it. For example, a policy in the root compartment cannot be modified by someone who has access only to the child compartments.

### Conditional Policies

- Conditional clauses enable more fine grained access controls.
- Conditions evaluate toL true, false or not applicable.
- Variables must be used when adding conditions to policies. 
- These variables are prefixed with `request` or `target`.
- For example, `Allow group IAD-Devleopers to manage all-resources in tenancy where request.region='iad'`
- Syntax for multiple conditions: `any|all {<CONDITION 1>, <CONDITION 2>, ... ,<CONDITION N>}`.

### Network Sources

- Mechanism to control access based on originating IP addresses.
- Two step process:
    1. Define a set of IP addresses and group them into an object. These can be a set of public IP addresses or VCN addresses.
    2. Write a policy and add `request.networkSource.name` in the condition.

### Tag-based Access Control

- Policies can be written with tags that span compartments, groups and resources.
- Access control can be done on the request or the target.
- `request.principal.<group/compartment/resource>.tag.{tagNamespace}.{tagKeyDefinition}=<value>`

### Dynamic Groups

- There are 3 types of resource principals:
    1. **Infrastructure principal**: enables instances to be authorized actors or principals to perform actions on service resources.
    - Example: Instance Principal
    2. **Stacked principal**: projects on principal on top of another. 
    - Example: Oracle Database
    3. **Ephemeral principal**: uses injected identifiers (a service which defines the holder of a particular credential for a short period of time).
    - Example: Oracle Funtion
- Dynamic groups allow the above resource principals to be grouped as principal actors.
- Memberships are dyanmic rather than static and are added by matching rules because they are created and destroyed in the comartment. 
- `allow dynamic-group InstanceA to manage objects in tenancy where any {target.bucket.name = 'logs', target.region.name = 'regionA'}`

---

## Networking - Virtual Cloud Network

### Introduction

- Virtual representation of a physical newtork.
- It resides in a single region.
- Consists of subnets, routers (gateways), firewalls, route tables etc.
- Internet gateway grants access to internet to access public subnet nad vice versa.
- Internet cannot access private subnet.
- Private subnet can access internet via NAT gateway.
- Service gateway allows private subnet to access other Oracle resources.

### CIDR Notation

- Classless Inter Domain Routing
- `A.B.C.D/x`
- Each letter is a single byte (8 bits)
- `A.B.C.D` is the network address
- `/x` is the network prefix or mask

### RFC - 1918

- Standard used to assign IPv4 addresses in the VCN.
- Some IP addresses are reserved for the private subnet and aren't accessible via the public internet directly (only via firewalls, bastion servers etc.). 
- They are assigned to internal hosts inside the private network.
- First two and last IP address (broadcast) in CIDR notation are reserved.

### Introduction to Subnets

- VCN spans all the ADs within a region.
- Subnets can be AD specific or span a region as well (recommended).
- Subnets cannot overlap, they are contiguous.
- VNIC (Virtual Network Interface Card) decides how instances connect with endpoints inside and outside the VCN.
- Types of subnets:
    - Private subnets will have only private IPs
    - Public subnets can have private and public IPs

### Security Lists

- Refers to firewall rules associated with a subnet and is applied to the instances that are launched from within the subnet.
- Allows us to define stateful or stateless rules.
- It is applied at the VNIC level.
- Consists of rules that specifies the traffic allowed in and out of the subnet.
- Associated with the subnet during or after creation.
- Pinging can be enabled.
- **Stateful**: ingress or egress is defined, the other is left alone.
- **Stateless**: in and out has to be defined.

### Network Security Groups

- Provides a virtual firewall for a set of cloud of resources. 
- They apply ontly to a set of VNICs of our choice in a single VCN.
- NSG is recommended because it let's us separate the VCNs architecture from an applications security requirements.
- NSGs allow you to describe another NSG as a source or destination, while SLs expect CIDR blocks.

### Bastion

- Bastion serves as a jump box from public to private subnet.
- OCI Bastion service provides ephemeral access to the target resources in a secure and time bound manner.
- It is tracked and audited by Event and Audit service. 
- Allows access to specified IPv4 addresses.
- Free, integrated with IAM.
- Anything that works with SSH, can work with OCI Bastion.

### Internet Gateway

- Optional virtual router that connects the VCN to the internet.
- Supports connections initiated form within the VCN and from the internet.
- Needs to have a public IP.
- Requires the subnet to have a route table specifying the gateway as the target.

### NAT Gateway

- Network Address Translation Gateway
- Instances in a private subnet don't have a public IP address. 
- This allows the whole private network to have a public IP address for OUTBOUND traffic, inbound traffic isn't allowed.
- Each NAT gateway can accommodate upto 20,000 connections.

### Service Gateway

- Provides a secure path to the ONS (Oracle Network Service) without leaving the OCI. 
- These services have a public IP address.
- We don't need to be on OCI to access the services.
- We can access it via the internet.
- ONS hosts object storage, ADW etc. 

### Local Peering Gateway