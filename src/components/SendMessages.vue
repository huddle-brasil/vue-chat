<template>
    <div class="chat-input">
        <input  
                autocomplete="off"
                type="text" 
                name="input-message" 
                id="inputMessage" 
                class="input-message"
                placeholder="Digite aqui a sua mensagem"
                @submit.prevent="sendMessage()"
                @keyup.enter="sendMessage()"
                @click="scrollChat()"
                @touch="scrollChat()">
        <button @click="sendMessage()" @touch="sendMessage()" class="send-message">Enviar</button>
    </div>
</template>
<script>
export default {
    methods: {
        sendMessage(){
            let message = inputMessage.value
            this.$emit('sendMessage', message)
            inputMessage.value = ''
            inputMessage.focus()
            this.scrollChat()
        },
        scrollChat(){
            let chatMessages = document.querySelector('.chat-messages');
            setTimeout(function(){ 
                chatMessages.scrollTop = chatMessages.scrollHeight +  1000;
            }, 200);
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
