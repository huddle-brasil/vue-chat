<template>
    <div class="chat-body">
        <chat-messages :messages="messages" :currentUser="currentUser" :group="group"></chat-messages>
        <send-messages @sendMessage="sendMessage"></send-messages>
    </div>
</template>
<script>
import firebaseHelper from './helpers/firebase.js'
import Firebase from 'firebase'
import ChatMessages from './components/ChatMessages.vue'
import SendMessages from './components/SendMessages.vue'
import moment from 'moment'
moment.locale('pt-br');
import Bus from './main.js'
export default {
    data(){
        return{
            messages : [],
            ref : ''
        }
    },
    components:{
        ChatMessages,
        SendMessages
    },
    props:{
        projectConfigs : {
            type : Object,
            required : true
        },
        chatId : {
            type : String,
            required : true
        },
        collectionName : {
            type : String,
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
    async created(){
        let ref = await this.connectFirestore()
        this.ref = ref
        let self = this
        this.ref.onSnapshot(snapshot => {
            Bus.$emit('newMessage')
            let messages = snapshot.data().messages
            if(self.messages.length){
                self.messages = messages
            }else{
                let lastMessages = messages[messages.length - 1]
                self.messages.push(lastMessages)
            }
        })
    },
    methods: {
        async connectFirestore(){
            let db = await firebaseHelper.initializeFirebase(this.projectConfigs)
            let ref = await db.collection(this.collectionName).doc(this.chatId)
            return ref
        },
        async sendMessage(message){
            let sendlerId = this.currentUser.uid
            let sentOn = moment().format()
            let newMessage = {
                sendlerId,
                sentOn,
                message
            }
            this.ref.update({
                messages: Firebase.firestore.FieldValue.arrayUnion(newMessage)
            })
        }
    }
}
</script>
<style lang="scss">

    .chat-body{

        width: 100%;
        height: 90vh;
        background-color:#282d30;
        position: relative;
        display: flex;
        flex-direction: column;

        .chat-open{

            width: 100%;
            background-color: black;
            height: 10vh;
            min-height: 60px;
            position: fixed;
            top: 0;
            z-index: 2;

            .open-letter{

                display: flex;
                align-items: center;
                width: 90%;
                height: 100%;
                margin: 0 auto;

                .chat-icon{

                    height: 40px;
                }

                .chat-title{

                    font-weight: bold;
                    font-size: 15px;
                    color: white;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    margin-left: 5%;
                }
            }

            .infos-game{
                display: flex;
                justify-content: flex-end;
                width: 75%;
            }
        }

        .chat-messages{

            width: 100%;
            height: 80vh;
            overflow-y: scroll;
            overflow-x: hidden;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            position: relative;
            

            .chat-container{

                width: 100%;
                margin: 10px;
                margin-bottom: 1px;

                &:first-child{

                    margin-top: 10px;        
                }

                &:last-child{

                    margin-bottom: 10px;
                }

                .chat-message{

                    max-width: 75%;
                    background-color: white;
                    border-radius: 5px;
                    display: flex;
                    flex-direction: column;
                    padding: 2% 8% 2% 3%;
                    width: max-content;
                    

                    .name-message{

                        color: rgb(255, 115, 0);
                        font-weight: bold;
                        text-transform: uppercase;
                        font-size: 10px;
                        letter-spacing: 1px;
                        width: 100%;
                        display: block;
                    }

                    .message{

                        font-size: 14px;
                        color: #272727;
                        font-weight: 700;
                        margin-top: 5px;
                    }
                }

                .message-right{

                    background-color: #545e63;
                    margin-left: auto;
                    margin-right: 10px;

                    .message{

                        color: white;
                        word-wrap: break-word;
                        margin: 3px 0;
                    }
                }
            }

            .chat-container-right{
                margin : 5px 10px 0 0;
            }
        }

        .chat-input{

            width: 100%;
            height: 10vh;
            min-height: 60px;
            background-color: black;
            display: flex;
            align-items: center;

            .input-message{

                width: 80%;
                height: 60px;
                background-color: transparent;
                border: none;
                padding: 0 5%;
                outline: none;
                color: white;
                font-size: 13px;
            }

            .send-message{

                width: 70px;
                height: 30px;
                margin-right: 10px;
                background-color: #9c00ec;
                color: white;
                border: none;
                text-transform: uppercase;
                font-weight: bold;
                font-size: 0.7em;
                letter-spacing: 1px;
                outline: none;
            }
        }

        .new-message{
            position: fixed;
            bottom: 75px;
            right: 15px;

            .container-circle{
                position: relative;

                .circle-new-messages{

                    width: 22px;
                    height: 22px;
                    border-radius: 50%;
                    background-color: #5cf356;
                    position: absolute;
                    top: -11px;
                    left: -11px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .new-message-counter{
                        color: black;
                        font-size: 12px;
                        font-weight: bold;
                    }
                }
            }

            .btn-new-message{
                background-color: white;
                border: none;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                outline: none;
                cursor: pointer;

                .img-new-message{
                    height: 15px;
                    margin-top: 2px;
                }
            }
        }
    }

    @media only screen and (min-width : 750px) {

        .chat-body{

            .chat-messages{

                height: 270px;
            }

            .chat-input{

                height: 55px;

                .input-message{

                    font-size: 16px;
                }

                .send-message{

                    margin-left: 6%;
                    width: 90px;
                    height: 35px;
                    font-size: 0.8em;
                    letter-spacing: 2px;
                }
            }
        }

    }

    // @media only screen and (max-width: 400px){
    //     .chat-body{

    //         .chat-messages{

    //             height: 80vh;
    //         }
    //     }
    // }

</style>
