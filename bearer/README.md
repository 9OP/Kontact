# Bearer

Kontact bearer (message storing API)

Doc:
GET /message/<channel_id>?messages=30
POST /message/<channel_id>
GET /message/<author_id>?messages=30
//
PUT / DELETE

message = {
id,
authorId,
channelId,
content,
date,
signature,
publickey, // key of author
}
