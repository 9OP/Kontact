bind = "0.0.0.0:5000"
proc = "gunicorn_kontact_back"

workers = 2
worker_class = "sync"
worker_connections = 50
timeout = 30
keepalive = 2

reload = True
errorlog = "-"
loglevel = "debug"
accesslog = "-"
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s"'
