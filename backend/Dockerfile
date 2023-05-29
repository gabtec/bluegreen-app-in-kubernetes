FROM denoland/deno

EXPOSE 4000

RUN apt-get update && apt-get install -y curl

WORKDIR /app

ADD ./src /app

RUN deno cache server.ts

CMD ["run", "--allow-net", "--allow-sys", "--allow-env", "server.ts"]