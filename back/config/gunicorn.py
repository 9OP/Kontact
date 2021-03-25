from os import environ, path

# from distutils.util import strtobool
from dotenv import load_dotenv

basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, "../.env"))


# PROC
proc_name = "gunicorn_kontact_back"
bind = "0.0.0.0:5000"

# LOGGING
accesslog = None
errorlog = "/app/logs/gunicorn_error.log"
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s"'
loglevel = environ.get("WEB_LOG", "info")
reload = True  # bool(strtobool(environ.get("WEB_RELOAD", "false")))

# WORKERS
workers = 3
max_requests = 100
max_requests_jitter = 100
keepalive = 10  # keep alive for 10s

# SERVER
preload_app = False  # not bool(strtobool(environ.get("WEB_RELOAD", "false")))
forwarded_allow_ips = "127.0.0.1"  # addr of front or proxy


def pre_fork(server, worker):
    pass


def pre_exec(server):
    server.log.info("Forked child, re-executing.")


def when_ready(server):
    server.log.info("Server is ready. Spawning workers")


def worker_abort(worker):
    worker.log.info("worker received SIGABRT signal")
