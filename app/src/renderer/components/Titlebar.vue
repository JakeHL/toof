<template>

    <div id="Titlebar">
        <div id="Windowbar">
            <div id="Window-Close" v-on:click="windowClose">
                <svg viewBox="0 0 24 24">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                </svg>
            </div>
        </div>
        <div id="Subheading">
            <div id="Title-Text">
                {{ title }}
            </div>
            <div id="Actions-Container">
                <!-- TODO Actions component goes here -->
            </div>
        </div>
    </div>

</template>

<script>

    import {remote} from 'electron';

    export default {
        props: ["title"],
        methods: {
            windowClose: function() {
                var win = remote.getCurrentWindow();
                win.close();
            }
        }
    }

</script>

<style lang="scss" scoped>

    $blue-darker: desaturate(darken($base-blue, 5%), 5%);

    #Windowbar {
        background-color: $blue-darker;
        height: 30px;
        -webkit-app-region: drag;
        position: relative;

        #Window-Close {
            -webkit-app-region: no-drag;
            cursor: pointer;
            height: 20px;
            width: 20px;
            position: absolute;
            top: 50%;
            right: 5px;
            transform: translate(0px, -50%);
            border: 2px solid #fff;
            border-radius: 100%;
            transition: background-color, 300ms;

            &:hover {
                background-color: #FFF;
                svg path {
                    fill: $blue-darker;
                    stroke: 1px $blue-darker;
                }
            } 

            svg {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                height: 18px;
                width: 18px;
                transition: fill, 300ms;

                path {
                    fill: #fff;
                }

            }

        }

    }

    #Subheading {
        background-color: $base-blue;
        height: 60px;
        font-size: 35px;
        color: #fff;
        font-family: 'Roboto';
        position: relative;

        #Title-Text {
            cursor: default;
            position: absolute;
            top: 50%;
            left: 10px;
            transform: translate(0px, -50%);
            -webkit-user-select: none;
        }

    }

</style>