<template>
    
    <div id="content-area">

        <div v-for="key in accounts">{{ key.accountName }} - {{ key.key }}</div>        
        
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
    import {eventHub} from '../main'

    export default {
        props: [ "accounts" ],
        components: {
            addmodal
        },
        methods: {
            openModal: function() {
                eventHub.$emit('show-add-modal');
            }
        }
    }

</script>

<style lang="scss" scoped>
    #content-area {
        position: relative;
        flex: 1;

        #fab {

            cursor: pointer;
            position: absolute;
            bottom: 10px;
            right: 10px;
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

    }
</style>