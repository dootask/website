FROM nginx:alpine
WORKDIR /var/www
COPY . /var/www/public

RUN chown -R nginx:nginx /var/www/public/
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]