#!/bin/sh

# DANGER: nginx image uses /bin/sh NOT /bin/bash

# API_SERVICE=gt-api
# API_PORT=4000
echo $API_SERVICE
echo $API_NAMESPACE
echo $API_PORT

# CONF_FILE="./nginx.conf"
CONF_FILE="/etc/nginx/conf.d/default.conf"

sed -i'.original' -e "s|API_SERVICE_NAME|$API_SERVICE|" \
-e "s|API_SERVICE_NS|$API_NAMESPACE|" \
-e "s|API_SERVICE_PORT|$API_PORT|" \
$CONF_FILE

echo "===> Launching http server ... "
# #Starting NGINX
nginx -s reload
nginx -g 'daemon off;'