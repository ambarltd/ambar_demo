FROM nginx:1.25.4

COPY static /usr/share/nginx/html
COPY site.conf /etc/nginx/conf.d/default.conf

RUN mkdir -p /usr/share/nginx/html/domains
ARG ARG_BE_DOMAIN
RUN echo $ARG_BE_DOMAIN > /usr/share/nginx/html/domains/be-domain.txt

ARG ARG_BEL_DOMAIN
RUN echo $ARG_BEL_DOMAIN > /usr/share/nginx/html/domains/bel-domain.txt

ARG ARG_FEL_DOMAIN
RUN echo $ARG_FEL_DOMAIN > /usr/share/nginx/html/domains/fel-domain.txt

ARG ARG_REPO_BASE_URL
RUN echo $ARG_REPO_BASE_URL > /usr/share/nginx/html/domains/repo-base-url.txt

EXPOSE 80
EXPOSE 81
