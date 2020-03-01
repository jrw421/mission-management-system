FROM node:10
EXPOSE 8080
WORKDIR /Blackboard/server

COPY package*.json ./
RUN npm install

COPY . .
CMD [ "node", "server/index.js" ]

# ENV UV_THREADPOOL_SIZE 64

# # https://serverfault.com/questions/683605/docker-container-time-timezone-will-not-reflect-changes
# ENV TZ=America/New_York
# RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# RUN apt-get update && \
#   apt-get install -y --no-install-recommends apt-utils sudo && \
#   useradd -m docker && echo "docker:docker" | chpasswd && adduser docker sudo

# RUN apt install -y curl

# RUN curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
# RUN apt-get install -y nodejs

# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app
# ADD . /usr/src/app

# RUN echo "package-lock=false" > .npmrc
# RUN echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >> .npmrc
# RUN npm install --production
# RUN rm -f .npmrc

# ENTRYPOINT ["node", "--nouse-idle-notification", "--expose-gc", "--max-old-space-size=8192", "server/index.js"]
