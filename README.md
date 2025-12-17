# DevOps Project

### step 1 setup project 

stack
- nodejs 20
- SQLite (local `data.sqlite`)
- Vagrant + Ansible (Ubuntu 20.04 VM)
- Jest + supertest


commands
```
npm ci
npm start
```

show api
localhost:3000/docs

### step 2 IaC (Vagrant + Ansible)

from `infra/` start the VM and provision the app
```
vagrant up
```

app runs in the VM on port 3000 (forwarded to host); health endpoint at `localhost:3000/health`.

