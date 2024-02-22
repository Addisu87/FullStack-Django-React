# pull official base image
FROM python:3.10-alpine

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
RUN apk add --update --no-cache postgresql-client && \
    apk add --no-cache --virtual .build-deps \
    alpine-sdk \
    postgresql-dev \
    gcc \
    python3-dev \
    musl-dev \
    jpeg-dev \
    zlib-dev

# install python dependencies
COPY requirements.txt /app/requirements.txt
RUN pip install --upgrade pip \
    && pip install -U setuptools \
    && pip install --no-cache-dir -r requirements.txt

# copy project
COPY . .

# cleanup build dependencies
RUN apk del .build-deps

CMD ["python3"]
