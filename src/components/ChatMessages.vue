<template>
    <div class="chat-messages">
        <new-message v-if="showIconMessage" @scrollToBottom="scrollToBottom"></new-message>
        <div class="chat-container" 
             v-for="(message, index) in messages" :key="index" 
             :class=" currentUser.uid  == message.sendlerId ? 'chat-container-right' : '' ">
            <div class="chat-message" :class=" currentUser.uid == message.sendlerId ? 'message-right' : '' "> 
                <span class="name-message">
                    {{ currentUser.uid == message.sendlerId ? '' : defineName(message.sendlerId) }}
                </span>
                <p class="message">
                    {{ message.message }}
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import NewMessage from './NewMessage.vue'
import scrollToBottomHelper from '../helpers/scrollToBottom.js'
export default {
    components:{
        NewMessage
    },
    props:{
        messages : {
            type : Array,
            required : true
        },
        currentUser : {
            type : Object,
            required : true
        },
        group : {
            type : Array,
            required : true
        }
    },
    data(){
        return{
            showIconMessage : false
        }
    },
    mounted(){
        let chatMessages = document.querySelector('.chat-messages');
        let self = this
        chatMessages.addEventListener("scroll", function(){
            let scrollMax = 180
            let scrollElement = chatMessages.scrollTop
            let chatViewHeight = chatMessages.clientHeight
            let heightMax = chatMessages.clientHeight + 100
            if(chatMessages.scrollHeight - scrollElement >= heightMax){
                self.showIconMessage = true
            }else{
                self.showIconMessage = false
            }
        })
        chatMessages.scrollTo(0, chatMessages.scrollHeight)
    },
    methods : {
        defineName(id){
            let memberMessage = this.group.filter(function(member){
                return member.uid === id
            })
            return memberMessage[0].name
        },
        scrollToBottom(){
            let chatMessages = document.querySelector('.chat-messages');
            if(chatMessages){
                scrollToBottomHelper.scrollTo(chatMessages, chatMessages.scrollHeight, 500)
            }
            
        }
    },
    
}
</script>
<style lang="scss">

</style>
