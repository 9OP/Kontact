# Proxy

Nginx reverse proxy
`https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-nginx-in-ubuntu-16-04`

Generate ssl keys:

```
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./nginx-selfsigned.key -out ./nginx-selfsigned.crt
```

Generate Diffie-Helman group:

```
openssl dhparam -out ./dhparam.pem 2048
```
