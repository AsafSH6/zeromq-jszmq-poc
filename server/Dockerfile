#
# ---- Base build ----
#
FROM node:14.16.1 as base

WORKDIR /app
ADD . /app
RUN npm install
EXPOSE 3000

CMD [ "npm", "run", "start" ]
