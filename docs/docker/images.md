---
title: Images courantes pour docker
---

## Images utiles pour dev local

- rabbitmq `docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:4-management`
- postgresql `docker run --name tempdb -e POSTGRES_PASSWORD=temppassword -e POSTGRES_DB=tempdb -d postgres`
