<template>
    <div class="chat-body">
        <chat-messages :messages="messages"></chat-messages>
        <send-messages @sendMessage="sendMessage()"></send-messages>
    </div>
</template>
<script>
import firebase from './helpers/firebase.js'
import ChatMessages from './components/ChatMessages.vue'
import SendMessages from './components/SendMessages.vue'
export default {
    data(){
        return{
            messages : []
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
        }
    },
    async created(){
        let ref = await this.connectFirestore()
        ref.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type == 'added') {
                    let doc = change.doc
                    this.messages.push(doc)
                }
            })
        })
    },
    methods: {
        async connectFirestore(){
            let db = await firebase.initializeFirebase(this.projectConfigs)
            let ref = await db.collection(this.collectionName).doc(this.chatId)
            return ref
        },
        async sendMessage(message){
            let ref = await this.connectFirestore()
        }
    }
}
</script>
<style lang="scss" scoped>

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

            .chat-message{

                max-width: 75%;
                width: auto;
                margin: 0 0 10px 20px;
                padding: 15px;
                background-color: white;
                border-radius: 5px;
                

                .name-message{

                    color: rgb(255, 115, 0);
                    font-weight: bold;
                    text-transform: uppercase;
                    font-size: 12px;
                    letter-spacing: 1px;
                    width: 100%;
                    display: block;
                }

                .message{

                    font-size: 14px;
                    margin-top: 3px;
                    color: rgb(20, 20, 20);
                }
            }

            .message-right{

                align-self: flex-end;
                margin: 5px 15px 10px 0;
                background-color: #545e63;

                .message{

                    color: white;
                    word-wrap: break-word;
                }
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
