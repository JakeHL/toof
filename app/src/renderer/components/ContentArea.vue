<template>
    
    <div id="content-area">

        <accountView v-for="key in accounts" :load-percent="loadPercent" :key-model="key"></accountView>
        
        <div v-on:click="openModal" id="fab">
            <svg viewBox="0 0 24 24">
                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
            </svg>
        </div>

        <addmodal></addmodal>

    </div>

</template>

<script>
    import addmodal from './AddModal'; 
    import accountView from './AccountView';

    import {eventHub} from '../main'

    export default {
        props: [ "accounts" ],
        data() {
            return {
                loadPercent: 0,
                seconds: 0
            }
        },
        components: {
            addmodal,
            accountView
        },
        methods: {
            openModal: function() {
                eventHub.$emit('show-add-modal');
            },
            genTimer: function() {

                let incValue = 1000;
                this.loadPercent = 0;

                let interval;

                let increment = () => {
                    let d = new Date();
                    let seconds = d.getSeconds();                    
                    this.seconds = seconds;
                    if(seconds == 0 || seconds == 30)
                        eventHub.$emit('get-new-code');
                    else if (seconds == 29 || seconds == 59)
                        eventHub.$emit('disable-load-animation');

                    this.loadPercent = (((seconds > 30 ? seconds - 30 : seconds) / 30) * 100)
                    if(this.loadPercent == 0)
                    {
                        alert("fuck bud");
                    }
                }

                interval = setInterval(increment, incValue);

            }
        },
        created: function() {
            this.genTimer();
        }
    }

</script>

<style lang="scss" scoped>
    #content-area {
        position: relative;
        flex: 1;
        background: #EEE;
        overflow-y: scroll;

        &::-webkit-scrollbar              {
            width: 8px;
        }
        &::-webkit-scrollbar-thumb        {
            background-color: #BBB;
        }

        #fab {

            cursor: pointer;
            position: fixed;
            bottom: 15px;
            right: 15px;
            width: 60px;
            height: 60px;
            border-radius: 100%;
            background-color: #F33;
            color: #fff;
            box-shadow: 0px 2px 5px 0px rgba(#000, 0.3);
            transition: background-color 400ms, box-shadow 400ms;

            &:hover {
                background-color: lighten(#F33, 5%);
            }

            &:active {
                background-color: lighten(#F33, 20%);
            }

            svg {
                width: 40%;
                height: 40%;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                path {
                    fill: #ffffff;
                }
            }

        }

        .last {
            margin-bottom: 100px;
        }

    }
</style>