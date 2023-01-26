# Microservices

## What are microservices and why do we need them?

Monolithic architecture is a traditional way of designing applications. Single, unified and indivisble unit. Managed and served in one place. Lack modularity (ie. reusability goes down). Less cross-cutting concers (eg. going to mall for shopping rather than going to individual shops cause of higher accessibility). Making changes are tougher since we have to change all the linked components. 

![Monolithic vs. Microservice Architecture](https://www.suse.com/c/wp-content/uploads/2021/09/rancher_blog_microservices-and-monolithic-architectures.jpg)

Each component has it's own environment. A component going down doesn't get affected.

In microservices, applications are broken down into smaller chunks. Each component is deployed individually. 

## What is 12-factor Application Design?

Important aspects that are required for our application to be enabled on the cloud. Required for building Software as a Service (SaaS). These 12 factors are designed by Heroku Labs. 

### Vertical scalability vs Horizontal scalability

![Vertical vs. Horizontal](https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210209202449/Scaling-Concept.png)

Cloud scalability is horizontal scalability.

![12 Factors](https://media-exp1.licdn.com/dms/image/C5612AQFZiICWgTh2ig/article-cover_image-shrink_720_1280/0/1609225402751?e=1659571200&v=beta&t=kUvZ8IbJJfy7nSmDIezazUoCvH-MAyFrbLzFeGNpuIs)

## Implementing Microservices using Spring
DTO: data transfer object
DAO: data access object (collection of multiple DTOs)

## Microservices Design Patters