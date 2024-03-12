# syntax=docker/dockerfile:1
FROM hashicorp/terraform:1.2.7

RUN apk update
RUN apk add --no-cache bash
RUN apk add --no-cache aws-cli

RUN mkdir "/var/build-files -p"

WORKDIR "/var/build-files"

ENTRYPOINT ["terraform"]