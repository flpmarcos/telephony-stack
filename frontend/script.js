const userAgent = new SIP.UA(config);

function makeCall() {
  const session = userAgent.invite('sip:1001@IP_DO_SEU_ASTERISK', {
    media: {
      constraints: { audio: true, video: false },
      render: {
        remote: document.getElementById('remoteVideo'),
      },
    },
  });
}
