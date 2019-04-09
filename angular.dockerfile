FROM nginx
MAINTAINER Akshay P
COPY ./app/ /usr/share/nginx/html/
EXPOSE 80