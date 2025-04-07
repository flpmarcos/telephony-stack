const config = {
    uri: 'sip:User1@192.168.21.52',
    password: '1234',
    wsServers: 'wss://192.168.21.52:8089/ws',
    displayName: 'User1',
    hackIpInContact: true,
    traceSip: true,
    sessionDescriptionHandlerOptions: {
      constraints: {
        audio: true,
        video: false
      }
    }
  };