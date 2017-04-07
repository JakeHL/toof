<template>
    <div id="accountView">
        <div id="textContainer">
            <div id="code">
                {{ keyModel.code }}
            </div>
            <div id="accountName">
                {{ keyModel.accountName }}
            </div>
        </div>
        <div id="loadContainer">
            <div id="loadBar" v-bind:style="{ width: loadPercent+'%' }" v-bind:class="{loadAnim: shouldLoadAnim}"></div>
        </div>
    </div>
</template>

<script>
import {eventHub} from '../main';

export default {
   props: ["keyModel", "loadPercent"],
   data() {
       return {
           shouldLoadAnim: false
       }
   },
   methods: {
        getCode: function() {
            this.keyModel.code = Math.random();
            
        },
        disableLoadAnim() {
            console.log('Im hit')
        }
   },
   created: function() {
       eventHub.$on('get-new-code', this.getCode);
       eventHub.$on('disable-load-animation', this.disableLoadAnim);
   },
   beforeDestroy: function() {
       eventHub.$off('get-new-code', this.getCode);
       eventHub.$off('disable-load-animation', this.disableLoadAnim);
   }
}

</script>

<style lang="scss" scoped>

    #accountView {
        margin: 25px;
        margin-right: 17px;
        background-color: #FFF;
        box-shadow: 0px 10px 20px 3px rgba(#000, 0.1);

        #textContainer {
            padding: 10px;
        }

        #code {
            font-size: 40px;
        }

        #accountName {
            margin-left: 5px;
            font-size: 14px;
            letter-spacing: 2px;
            font-weight: bold;
            color: #999;
        }

        #loadContainer {
            height: 5px;
            background-color: lighten($base-blue, 35%);

            #loadBar {
                height: 5px;
                background-color: $base-blue;
                transition-timing-function: linear;
            }

            .loadAnim {
                transition: width 1s;
            }

        }

    }

</style>