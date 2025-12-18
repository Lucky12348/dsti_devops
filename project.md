### 6. Document your project

Write a sort of report in the `README.md` file which includes the following:

1. List all the work performed (briefly, describing features and bonus tasks).

2. Screenshots (pictures of your screen when you are running a web page, K8s resources, VMs, etc... Provide maximum screenshots)

> Tip. Keep screenshots in a separate folder. Ex.: see how pictures are linked in the `index.md` files of the modules.

3. Provide instructions (commands) of how to:

- Install (or prepare environment)
- Use (your application, run your Docker container or Docker Compose cluster, on K8s cluster, ...)
- Test (your application)

4. All the necessary links with the platforms and tools integrated:

- Docker Hub
- ...

5. Author

6. Other additional info that you want to include...

> **Note!** Use the correct Markdown syntax to keep your `README.md` file looking good.

> **Note!** As per DSTI policy, usage of AI, if any, should be added to the project.   

## Structure

Here is an example structure of your project repository:

```
.github/
userapi/
  src/
  test/
  conf/
  CHANGELOG.md
  package.json
  Dockerfile
  ...
iac/
  Vagrantfile
  playbooks/
k8s/
istio/
image/
README.md
docker-compose.yaml
...
```

## How to get bonuses?

Every initiative will be counted, just don't forget to describe it in your `README.md`.

List of bonus tasks proposed:

1. Use different tools and platforms instead of what has been passed in the labs, for example, GitLab CI/CD, Netlify, etc. This will give you a bigger overview of technologies.
2. Use different languages (Java, Ruby, Python, etc.) to develop the application of part 1.
3. If you use the NodeJS application provided in the [modules/04.ct-ci-cd/assets/userapi](modules/04.ct-ci-cd/assets/userapi) folder, bring it with additional features:

- more/different API methods
- more/different unit/functional/integration tests
- using another database (like Redis, Valkey, MySQL, ...)
- integrate a documenting package to your source code, for example, [Swagger UI](https://www.npmjs.com/package/express-swagger-generator)

4. Any Kubernetes tasks from [this list](https://kubernetes.io/docs/tasks/).
5. [Securing microservice communication](https://istio.io/latest/docs/tasks/security/) or any other task with Istio.
6. Create `docker-compose.yml` file that will start your application
7. Make a service mesh using Istio

- Deploy your application using Istio
- Create configuration that routes requests between 2 different versions of your app
- Create a configuration that uses traffic shifting between 2 different versions of your app

8. Implement Monitoring to your containerized application

- Note. You can imagine something different and set up monitoring (eg. memory usage, CPU time, ...)

9. Etc.

**NOTE:** Students may complete as many bonus steps as they wish. In the event that bonus points raise the project score above 20, up to five points can be applied to the QCM score.  
