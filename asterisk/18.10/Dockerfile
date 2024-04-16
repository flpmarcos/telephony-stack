FROM debian:bullseye

LABEL vendor="Felipe Marcos TI"
LABEL maintainer="Felipe Marcos <flpmarcos.dev@gmail.com>"

ENV TZ=America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
ENV PROJECT_NAME telephony-stack
ENV ASTERISK_VERSION=18.10.1
#ENV ASTERISK_VERSION=18-current
ENV SRTP_VERSION 2.6.0

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y  build-essential openssl libxml2-dev libncurses5-dev uuid-dev sqlite3 libsqlite3-dev pkg-config libjansson-dev libssl-dev libedit-dev curl msmtp nano


# Install libsrtp
RUN cd /usr/local/src && curl -L -o srtp.tar.gz https://github.com/cisco/libsrtp/archive/v${SRTP_VERSION}.tar.gz \
    && tar xzf srtp.tar.gz
RUN cd /usr/local/src/libsrtp* \
    && ./configure CFLAGS=-fPIC \
    && make \
    && make install

# Install Asterisk
RUN cd /usr/local/src && curl -o asterisk.tar.gz http://downloads.asterisk.org/pub/telephony/asterisk/releases/asterisk-${ASTERISK_VERSION}.tar.gz \
    && tar xzf asterisk.tar.gz
RUN cd /usr/local/src/asterisk* \
    && ./configure --with-pjproject-bundled --with-jansson-bundled --with-crypto --with-ssl \
    && make menuselect/menuselect menuselect-tree menuselect.makeopts \
    && menuselect/menuselect --disable BUILD_NATIVE menuselect.makeopts && \
    menuselect/menuselect --enable BETTER_BACKTRACES menuselect.makeopts && \
    menuselect/menuselect \
        --enable chan_bridge_media \
        --enable chan_sip \
        --enable chan_rtp \
        --enable chan_alsa \
        --enable chan_pjsip \
        --enable cdr_csv \
        --enable cdr_sqlite3_custom \
        --enable cdr_pgsql \
        --enable cdr_adaptive_odbc \
        --enable cel_custom \
        --enable cel_sqlite3_custom \
        --enable cel_pgsql \
        --enable cel_odbc \
        --enable bridge_native_rtp \
        --enable bridge_simple \
        --enable codec_gsm \
        --enable codec_a_mu \
        --enable codec_alaw \
        --enable codec_ulaw \
        --enable codec_speex \
        --enable codec_opus \
        --enable codec_resample \
        --enable format_gsm \
        --enable format_wav \
        --enable format_wav_gsm \
        --enable format_pcm \
        --enable format_ogg_vorbis \
        --enable format_h264 \
        --enable format_h263 \
        --enable func_base64 \
        --enable func_callerid \
        --enable func_cdr \
        --enable func_channel \
        --enable func_curl \
        --enable func_cut \
        --enable func_db \
        --enable func_logic \
        --enable func_math \
        --enable func_sprintf \
        --enable func_strings \
        --enable app_confbridge \
        --enable app_db \
        --enable app_dial \
        --enable app_echo \
        --enable app_exec \
        --enable app_mixmonitor \
        --enable app_originate \
        --enable app_playback \
        --enable app_playtones \
        --enable app_queue \
        --enable app_sendtext \
        --enable app_stack \
        --enable app_transfer \
        --enable app_system \
        --enable app_verbose \
        --enable app_voicemail \
        --enable app_externalivr \
        --enable app_fax \
        --enable app_image \
        --enable app_jack \
        --enable app_sms \
        --enable pbx_config \
        --enable pbx_lua \
        --enable pbx_realtime \
        --enable res_agi \
        --enable res_ari \
        --enable res_ari_applications \
        --enable res_ari_asterisk \
        --enable res_ari_bridges \
        --enable res_ari_channels \
        --enable res_ari_device_states \
        --enable res_ari_endpoints \
        --enable res_ari_events \
        --enable res_ari_mailboxes \
        --enable res_ari_model \
        --enable res_ari_playbacks \
        --enable res_ari_recordings \
        --enable res_ari_sounds \
        --enable res_clioriginate \
        --enable res_config_curl \
        --enable res_config_sqlite3 \
        --enable res_config_odbc \
        --enable res_curl \
        --enable res_format_attr_h263 \
        --enable res_format_attr_h264 \
        --enable res_format_attr_opus \
        --enable res_format_attr_vp8 \
        --enable res_http_post \
        --enable res_http_websocket \
        --enable res_odbc \
        --enable res_odbc_transaction \
        --enable res_parking \
        --enable res_pjproject \
        --enable res_pjsip \
        --enable res_pjsip_acl \
        --enable res_pjsip_authenticator_digest \
        --enable res_pjsip_caller_id \
        --enable res_pjsip_config_wizard \
        --enable res_pjsip_dialog_info_body_generator \
        --enable res_pjsip_diversion \
        --enable res_pjsip_dlg_options \
        --enable res_pjsip_dtmf_info \
        --enable res_pjsip_empty_info \
        --enable res_pjsip_endpoint_identifier_anonymous \
        --enable res_pjsip_endpoint_identifier_ip \
        --enable res_pjsip_endpoint_identifier_user \
        --enable res_pjsip_exten_state \
        --enable res_pjsip_header_funcs \
        --enable res_pjsip_logger \
        --enable res_pjsip_messaging \
        --enable res_pjsip_mwi \
        --enable res_pjsip_mwi_body_generator \
        --enable res_pjsip_nat \
        --enable res_pjsip_notify \
        --enable res_pjsip_one_touch_record_info \
        --enable res_pjsip_outbound_authenticator_digest \
        --enable res_pjsip_outbound_publish \
        --enable res_pjsip_outbound_registration \
        --enable res_pjsip_path \
        --enable res_pjsip_pidf_body_generator \
        --enable res_pjsip_pidf_digium_body_supplement \
        --enable res_pjsip_pidf_eyebeam_body_supplement \
        --enable res_pjsip_publish_asterisk \
        --enable res_pjsip_pubsub \
        --enable res_pjsip_refer \
        --enable res_pjsip_registrar \
        --enable res_pjsip_rfc3326 \
        --enable res_pjsip_sdp_rtp \
        --enable res_pjsip_send_to_voicemail \
        --enable res_pjsip_session \
        --enable res_pjsip_sips_contact \
        --enable res_pjsip_t38 \
        --enable res_pjsip_transport_websocket \
        --enable res_pjsip_xpidf_body_generator \
        --enable res_realtime \
        --enable res_rtp_asterisk \
        --enable res_sorcery_astdb \
        --enable res_sorcery_config \
        --enable res_sorcery_memory \
        --enable res_sorcery_memory_cache \
        --enable res_sorcery_realtime \
        --enable res_srtp \
        --enable res_chan_stats \
        --enable res_config_ldap \
        --enable res_config_pgsql \
        --enable res_config_sqlite \
        --enable res_corosync \
        --enable res_endpoint_stats \
        --enable res_snmp \
        --enable astdb2sqlite3 \
        --enable astcanary \
        --enable OPTIONAL_API \
        --enable MOH-OPSOUND-WAV \
        --enable CORE-SOUNDS-EN-WAV \
        --enable CORE-SOUNDS-RU-WAV \
        --enable EXTRA-SOUNDS-EN-WAV \
        --enable CORE-SOUNDS-EN-ULAW \
		--enable CORE-SOUNDS-EN-ALAW \
		--enable CORE-SOUNDS-EN-G722 \
		--enable CORE-SOUNDS-EN-GSM \
		--enable CORE-SOUNDS-EN-SLN16 \
		--enable MOH-OPSOUND-ULAW \
		--enable MOH-OPSOUND-ALAW \
		--enable MOH-OPSOUND-G722 \
		--enable MOH-OPSOUND-GSM \
		--enable MOH-OPSOUND-SLN16 \
		--enable EXTRA-SOUNDS-EN-ULAW \
		--enable EXTRA-SOUNDS-EN-ALAW \
		--enable EXTRA-SOUNDS-EN-G722 \
		--enable EXTRA-SOUNDS-EN-GSM \
		--enable EXTRA-SOUNDS-EN-SLN16 \
		--enable app_queue \
        --enable app_agent_pool \
        menuselect.makeopts \
        && make \
        && make install \
        && make basic-pbx \
        && make config

# # Copie as configurações padrão e configure o usuário de execução
# RUN mkdir -p /etc/asterisk/ && \
#     cp /usr/local/src/asterisk/configs/basic-pbx/*.conf /etc/asterisk/ && \
#     sed -i -E 's/^;(run)(user|group)/\1\2/' /etc/asterisk/asterisk.conf

# Copie o plano de discagem básico
COPY basic-pbx-dialplan/*.conf /etc/asterisk/
RUN mkdir -p /var/lib/asterisk/moh/agentes

# Cria chave privada e um certificado autoassinado
RUN mkdir -p /etc/asterisk/keys
RUN openssl genpkey -algorithm RSA -out /etc/asterisk/keys/chave_privada.key && \
    openssl req -x509 -sha256 -days 365 -key /etc/asterisk/keys/chave_privada.key -out /etc/asterisk/keys/certificado.crt -subj "/CN=asterisk.local/O=Asterisk/C=BR"


# Expoe as portas necessárias
EXPOSE 5060/tcp 5061/tcp 10000:10100/udp 8088 5038

# Execute o Asterisk em primeiro plano
CMD ["/bin/bash", "-c", "asterisk; sleep infinity"]