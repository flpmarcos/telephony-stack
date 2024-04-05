FROM andrius/asterisk:latest

LABEL vendor="Felipe Marcos TI"
LABEL maintainer="Felipe Marcos <flpmarcos.dev@gmail.com>"

ENV TZ=America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
ENV PROJECT_NAME asterisk-ami-test

COPY basic-pbx-dialplan/*.conf /etc/asterisk/

RUN mkdir -p /var/lib/asterisk/moh/agentes

EXPOSE 5060/tcp 10000:10200/udp 8088 5038
VOLUME /var/lib/asterisk/sounds /var/lib/asterisk/keys /var/lib/asterisk/phoneprov /var/spool/asterisk /var/log/asterisk /etc/asterisk

# And run asterisk in the foreground.
CMD ["/usr/sbin/asterisk", "-f"]