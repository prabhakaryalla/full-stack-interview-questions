
- [What is Docker?](#what-is-docker)
- [DOcker Architect](#docker-architecture)
- [How to build a Docker image?](#how-to-build-a-docker-image)
- [How to deploy .Net Microservices to AKS and and Automating with Azure DevOps?](#https://medium.com/aspnetrun/deploying-net-microservices-to-azure-kubernetes-services-aks-and-automating-with-azure-devops-c50bdd51b702)

### What is Docker?

Docker is an open platform for developing, shipping, and running applications. Docker enables you to separate your applications from your infrastructure so you can deliver software quickly. With Docker, you can manage your infrastructure in the same ways you manage your applications.

---


### Docker Architecture
Docker uses a client-server architecture.
![Docker Architecture](https://docs.docker.com/assets/images/architecture.svg)



---
### How to build a Docker image?

It all starts with a Dockerfile. Docker builds images by reading the instructions from a Dockerfile. This is a text file containing instructions that adhere to a specific format needed to assemble your application into a container image and for which you can find its specification reference in the Dockerfile reference.

Here are the most common types of instructions:

|Instruction| Description|
|--|--|
|FROM `<image>`|Defines a base for your image.|
|RUN `<command>`|Executes any commands in a new layer on top of the current image and commits the result. RUN also has a shell form for running commands.|
|WORKDIR `<directory>`| Sets the working directory for any RUN, CMD, ENTRYPOINT, COPY, and ADD instructions that follow it in the Dockerfile.|
|COPY `<src><dest>`|Copies new files or directories from `<src>` and adds them to the filesystem of the container at the path `<dest>`.|
|CMD `<command>`|Lets you define the default program that is run once you start the container based on this image. Each Dockerfile only has one CMD, and only the last CMD instance is respected when multiple exist.|

Dockerfiles are crucial inputs for image builds and can facilitate automated, multi-layer image builds based on your unique configurations. Dockerfiles can start simple and grow with your needs and support images that require complex instructions. For all the possible instructions, see the Dockerfile reference.

Docker images consist of read-only layers, each resulting from an instruction in the Dockerfile. Layers are stacked sequentially and each one is a delta representing the changes applied to the previous layer.

***Example***

Here’s a simple Dockerfile example to get you started with building images. We’ll take a simple “Hello World” Python Flask application, and bundle it into a Docker image that can test locally or deploy anywhere! Let’s say we have a hello.py file with the following content:

```python
from flask import Flask
app = Flask(__name__)
@app.route("/")
def hello():
    return "Hello World!"
```

Here’s the Dockerfile that will be used to create an image for our application:

```docker
# syntax=docker/dockerfile:1
FROM ubuntu:22.04
# install app dependencies
RUN apt-get update && apt-get install -y python3 python3-pip
RUN pip install flask==2.1.*
# install app
COPY hello.py /
# final configuration
ENV FLASK_APP=hello
EXPOSE 8000
CMD flask run --host 0.0.0.0 --port 8000
```


**1.** We start by specifying the syntax directive. It pins the exact version of the Dockerfile syntax we’re using:

```docker
# syntax=docker/dockerfile:1
```
As a best practice, this should be the very first line in all our Dockerfiles as it informs BuildKit the right version of the Dockerfile to use.

**2.** Next, we define the first instruction:

```docker
FROM ubuntu:22.04
```

Here the FROM instruction sets our base image to the 22.04 release of Ubuntu. All following instructions are executed on this base image, in this case, an Ubuntu environment.The notation ubuntu:22:04, follows the name:tag standard for naming docker images. When you build your, image you use this notation to name your images and use it to specify any existing Docker image. There are many public images you can leverage in your projects. Explore Docker Hub to find out.

**3.** This RUN instruction executes a shell command in the build context. A build’s context is the set of files located in the specified PATH or URL.

```docker
# install app dependencies
RUN apt-get update && apt-get install -y python3 python3-pip
```

In this example, our context is a full Ubuntu operating system, so we have access to its package manager, apt. The provided commands update our package lists and then, after that succeeds, installs python3 and pip, the package manager for Python.

**4.** This second RUN instruction requires that we’ve installed pip in the layer before. After applying the previous directive, we can use the pip command to install the flask web framework. This is the framework we’ve used to write our basic “Hello World” application from above, so to run it in Docker, we’ll need to make sure it’s installed.

```docker
RUN pip install flask==2.1.*
```

**5.** Now we use the COPY instruction to copy our hello.py file from the local build context into the root directory of our image. After being executed, we’ll end up with a file called /hello.py inside the image.


```docker 
COPY hello.py /
```

**6.** This ENV instruction sets a Linux environment variable we’ll need later. This is a flask-specific variable, that configures the command later used to run our hello.py application. Without this, flask wouldn’t know where to find our application to be able to run it.

```docker
ENV FLASK_APP=hello
```

**7.** This EXPOSE instruction marks that our final image has a service listening on port 8000. This isn’t required, but it is a good practice, as users and tools can use this to understand what your image does.

```docker
EXPOSE 8000
```

**8.** Finally, CMD instruction sets the command that is run when the user starts a container based on this image. In this case we’ll start the flask development server listening on all addresses on port 8000.

```docker
CMD flask run --host 0.0.0.0 --port 8000
```

#### Testing

**1.** To test our Dockerfile, we’ll first build it using the docker build command:

```console
$ docker build -t test:latest .
```

- -t test:latest option specifies the name (required) and tag (optional) of the image we’re building
- . specifies the build context as the current directory. In this example, this is where build expects to find the Dockerfile and the local files the Dockerfile needs to access, in this case your python application.

So, in accordance with the build command issued and how build context works, your Dockerfile and Python app need to be in the same directory.


**2.** Now run your newly built image:

```console
$ docker run -p 8000:8000 test:latest
```

**3.** From your computer, open a browser and navigate to http://localhost:8000

---

### How to deploy .Net Microservices to AKS and and Automating with Azure DevOps?

[Link](#https://medium.com/aspnetrun/deploying-net-microservices-to-azure-kubernetes-services-aks-and-automating-with-azure-devops-c50bdd51b702)