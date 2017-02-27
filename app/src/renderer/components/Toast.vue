<template>
<div>
    <div id="toast" v-bind:class="{ visible: showToast }" >
        <div class="Toast-Text">{{ message }}</div>
    </div>
</div>
</template>

<script>
    import {eventHub} from '../main'

    export default {
        data() {
            return {
                showToast: false,
                message: ''
            }
        },
        methods: {
            toggle: function() {
                this.showToast = !this.showToast;
            },
            showMessage: function(message) {
                this.message = message;
                this.showToast = true;
                setTimeout(() => { this.showToast = false; }, 3000);
            }
        },
        created: function() {
            eventHub.$on('show-toast', this.showMessage);
        },
        beforeDestroy: function(){
            eventHub.$off('show-toast', this.showMessage);
        }
    }

</script>

<style lang="scss" scoped>

    #toast {

        height: 0px;
        background-color: #424242;
        transition: height 400ms;
        color: #fff;
        position: relative;

        .Toast-Text {
            line-height: 0px;
            position: absolute;
            top: 20px;
            left: 24px;
            opacity: 0;
            transition: opacity 200ms 0ms;
        }

    }

    #toast.visible {

        height: 40px;

        .Toast-Text {
            opacity: 1;
            transition: opacity 400ms 100ms;            
        }

    }

</style>
