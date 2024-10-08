# Use the latest Alpine-based Node.js image
FROM node:alpine

# Set working directory
WORKDIR /usr/src/app

COPY package.json /usr/src/app/


RUN npm install \
    && apk add --no-cache bash curl tzdata \
    && apk add --no-cache --virtual .build-deps \
    && apk add --no-cache dcron \
    && cp /usr/share/zoneinfo/Etc/UTC /etc/localtime \
    && echo "Etc/UTC" > /etc/timezone

# Add a crontab file to the cron.d directory

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

# Command to start cron and keep the container running
CMD ["node", "ipupdate.js", ">", "/var/log/cron.log" ]

#CMD ["sh", "-c", "crond -f -l 2 && tail -f /var/log/cron.log"]
