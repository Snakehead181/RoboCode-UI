FROM alpine:latest
MAINTAINER stjohnbacon_w

# update alpine linux
RUN apk update && apk upgrade && \
    apk add nodejs && \
    # may comment this line in my computer.
    apk add npm && \
    npm install -g @angular/cli

# add source code to images
ADD . /angular2-example-app

# switch working directory
WORKDIR /angular2-example-app

# install dependencies
RUN npm install

# expose port 4200
EXPOSE 4200

# run ng serve on localhost
CMD ["ng","serve", "--host", "0.0.0.0", "--disable-host-check"]
