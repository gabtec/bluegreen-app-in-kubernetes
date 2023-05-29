FROM nginx:1.21.1-alpine



ENV API_SERVICE=api-service
ENV API_NAMESPACE=default
ENV API_PORT=4000

# config Nginx proxy for k8s dns resolver
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY ./deploy/nginx.conf /etc/nginx/conf.d/default.conf

# copy app files
COPY /src /usr/share/nginx/html/

# copy script
WORKDIR /app

COPY ./deploy/customize.sh .
RUN chmod +x ./customize.sh

EXPOSE 80
# ENTRYPOINT ["nginx", "-g", "daemon off;"]
# ENTRYPOINT ["./customize.sh","&&","nginx", "-g", "daemon off;"]
CMD ["./customize.sh"]
