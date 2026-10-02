
export interface Conversation {
id:string , 
other_user:Otheruser
last_message:lastMessage
unread_count:number
last_message_at:string
created_at:string
}
interface Otheruser {
id:string , 
name:string , 
email:string , 
phone:string , 
birth_date:string , 
gender:string , 
country:string , 
language:string , 
profile_image:string , 
role:string , 
created_at:string , 
updated_at:string 
}
interface lastMessage {
id:string , 
conversation_id:string , 
sender_id:string , 
receiver_id:string , 
type:string , 
content:string , 
media_url:string , 
media_duration:string , 
file_name:string , 
file_size:string , 
status:string , 
is_deleted_by_sender:boolean , 
is_deleted_by_receiver:boolean , 
delivered_at:string , 
seen_at:string , 
created_at:string 
sender:Sender
receiver:Receiver
}
interface Sender {
id:string , 
name:string , 
email:string , 
phone:string , 
birth_date:string , 
gender:string , 
country:string , 
language:string , 
profile_image:string , 
role:string , 
created_at:string , 
updated_at:string 
}
interface Receiver {
id:string , 
name:string , 
email:string , 
phone:string , 
birth_date:string , 
gender:string , 
country:string , 
language:string , 
profile_image:string , 
role:string , 
created_at:string , 
updated_at:string 
}
