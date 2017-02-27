<template>
  <div id="app">
    <titlebar :title='"Toof"' ></titlebar>
    <contentarea :accounts='accounts'></contentarea>
    <toast></toast>
  </div>
</template>

<script>
  import {eventHub} from './main'

  // Components import
  import titlebar from 'components/Titlebar';
  import contentarea from 'components/ContentArea';
  import toast from 'components/Toast'

  // DataContext import
  import dataContext from './App.vue.datacontext';
  var dc = new dataContext();

  var App = {
    components: {
      titlebar,
      contentarea,
      toast
    },

    data() {
      return {
        accounts: dc.store.accounts
      }
    },

    methods: {
      addAccount: function(km) {
        var result = dc.addAccount(km.AccountName, km.Key);
        if(!result)
          eventHub.$emit('show-toast', "Key already exists");
      },
    },

    created: function() {
      eventHub.$on('add-account', this.addAccount);
    },

    beforeDestroy: function() {
      eventHub.$off('add-account', this.addAccount);
    }

  };

  // TODO remove
  dc.addAccount("Google","134513461");
  dc.addAccount("Microsoft","224562");
  dc.addAccount("Apple","24562664");

  export default App;

</script>

<style lang="scss" scoped>
  #app {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
</style>

<style lang="scss" >

body {
    margin: 0px;
    padding: 0px;

    @font-face {
      font-family: Roboto;
      src: url('./Assets/Roboto-Regular.ttf');
    }

    
    * {
      box-sizing: border-box;
      font-family: 'Roboto';
    }

}

</style>
