#
# ---- Base build ----
#
FROM node:14.16.1 as build

WORKDIR /app
COPY ./package.json /app
COPY ./package-lock.json /app

RUN npm install
COPY . .
RUN npm run build


FROM nginx:latest

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html