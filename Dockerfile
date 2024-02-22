# pull official base image
FROM python:3.10-alpine
LABEL maintainer="addisuhaile"

# install python dependencies
COPY requirements.txt /app/requirements.txt

# copy project
COPY . .

# set work directory
WORKDIR /app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install runtime dependencies
RUN apk add --no-cache \
    ca-certificates \
    tzdata

# install build dependencies
RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip  && \
    apk add --update --no-cache postgresql-client jpeg-dev && \
    apk add --update --no-cache --virtual .build-deps \
        alpine-sdk \
        postgresql-dev \
        gcc \
        python3-dev \
        musl-dev \
        zlib \
        zlib-dev && \
    /py/bin/pip install --no-cache-dir -r requirements.txt && \
    apk del .build-deps

CMD ["python3"]
