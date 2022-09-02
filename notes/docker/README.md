Docker

When we start a docker process ie. `docker container run ...`, it makes an API call to the daemon which in tunr makes a call to the `container d` (not actually a container). This starts a `shim` process and `run c` creates a new container.

To remove an image, all containers running that particular image must be deleted first.


Kubernetes

replica set, replication controller

servieces used for communication between endusers and pods, communication between all the pods in the container