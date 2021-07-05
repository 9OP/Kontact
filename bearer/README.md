# Bearer

Kontact bearer (message storing API)

**listen on: localhost:6000**

---
The binary is not build in the dockerfile but in the startup.sh file. The main reason is to prevent rebuilding the image
when source files change. It is not great because it cause longer starting time of the container, but this is most practical in development.
