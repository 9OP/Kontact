FROM python:3.9-slim

# set work directory
WORKDIR /back

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt /back/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# copy project
COPY . /back/
