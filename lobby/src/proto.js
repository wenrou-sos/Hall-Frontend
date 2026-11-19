var pslb = pslb || {};

pslb.proto = function(){
  var proto = dcodeIO.ProtoBuf.loadProtoFile("lib/lobby.proto");
  return {
    Level:proto.build("Level"),
    Medal:proto.build("Medal"),
    ErrorCode:proto.build("ErrorCode"),
    BigChallenge:proto.build("BigChallenge"),
    MessageId:proto.build("MessageId"),
    Mail:proto.build("Mail"),
    Header:proto.build("Header"),
    LoginCall:proto.build("LoginCall"),
    LoginRecall:proto.build("LoginRecall"),
    BigChallengeCall:proto.build("BigChallengeCall"),
    BigChallengeRecall:proto.build("BigChallengeRecall"),
    UpdateData:proto.build("UpdateData"),
    JackpotInfo:proto.build("JackpotInfo"),
    MailCall:proto.build("MailCall"),
    MailRecall:proto.build("MailRecall"),
    GameInfo:proto.build("GameInfo")
  };
}();








