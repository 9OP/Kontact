# BUILD
FROM python:3.9-slim as base
FROM base as builder

WORKDIR /install

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# # install system dependencies
# RUN apt-get update \
#     && apt-get clean \
#     && rm -rf /var/lib/apt/lists/* /usr/share/doc /usr/share/man

# lint
COPY app lib .flake8 ./
RUN pip install --upgrade pip \
    && pip install flake8 \
    && flake8

# install python dependencies
COPY ./requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r ./requirements.txt


# FINAL
FROM base

WORKDIR /app

# create the user "kontact"
RUN useradd kontact

# install dependencies
COPY --from=builder /install /usr/local

# copy project
COPY . .

# chown /app files to the app user
RUN chown -R kontact:kontact .

# set container user
USER kontact

# expose port to host
EXPOSE 5000

# start app
CMD ["gunicorn", "-c", "python:config.gunicorn", "app:create_app()"]
