<template>
    <div id="Add-Modal" v-bind:class="{ hidden: !showModal }" >
        <div id="Add-Dialog">
            <label>Account Name</label>
            <input type="text" v-bind:class="{ valid: AccountName != '' }" v-model="AccountName" placeholder="Google" />
            <label>Key</label>
            <input type="text" v-bind:class="{ valid: Key != '' }" v-model="Key" placeholder="KEY123456789" />
            <div id="Button-Container">
                <button @click="cancel" >CANCEL</button>
                <button @click="addAccount">ADD ACCOUNT</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {eventHub} from '../main'

    export default {
        data() {
            return {
                AccountName: '',
                Key: '',
                showModal: false
            }
        },

        methods: {

            cancel: function() {
                this.AccountName = this.Key = '';
                this.toggleModal();
            },

            toggleModal: function() {
                this.showModal = !this.showModal;
            },

            addAccount: function() {
                if(this.AccountName !== '' || this.Key !== '') {
                    var km = { AccountName: this.AccountName, Key: this.Key};
                    eventHub.$emit('add-account', km);
                    this.toggleModal();
                    this.AccountName = this.Key = '';
                }
            }

        },

        created: function() {
            eventHub.$on('show-add-modal', this.toggleModal);
        },

        beforeDestroy: function() {
            eventHub.$off('show-add-modal', this.toggleModal);
        }

    }

</script>

<style lang="scss" scoped>

    #Add-Modal.hidden {
        display: none;
    }

    #Add-Modal {
        top: 0px;
        z-index: 9999;
        position: fixed;
        width: 100vw;
        height: 100vh;
        background-color: rgba(#000, 0.6);        

        #Add-Dialog {
            padding: 10px;
            display: flex;
            flex-direction: column;
            background: #FFF;
            width: 60%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            box-shadow: 0px 20px 20px 0 rgba(#000, 0.2);

            label {
                font-weight: bold;
                margin-bottom: 5px;
            }

            input[type=text] {
                padding-bottom: 10px;
                margin-bottom: 10px;
                border: none;
                border-bottom: 2px solid #BBB;
                transition: border;
                
                &:focus {
                    outline: none;
                    border-bottom: 2px solid #26a69a;
                }

            }

            input[type=text].valid {
                outline: none;
                border-bottom: 2px solid #4caf50;

                &:focus {
                    outline: none;
                    border-bottom: 2px solid #26a69a;
                }
            }

            #Button-Container {

                align-self: flex-end;

                button {
                    cursor: pointer;
                    color: #4285f4;
                    border: none;
                    outline: none;
                    background: none;
                    transition: background 400ms;
                    padding: 10px;

                    &:active {
                        background: darken(#FFF, 5%);
                    }

                }

            }

        }

    }

</style>