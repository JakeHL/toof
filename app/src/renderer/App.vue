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

  for(let i = 0; i < 60; i++) {

    let name = '';
    if(i % 4 == 0)
      name = 'Google';
    else if(i % 3 == 0)
      name = 'Yahoo';
    else if(i % 2 == 0)
      name = 'Microsoft'
    else
      name = 'Github'

    name = name + i;
    let key = Math.floor((Math.random() * 9999999) + 1000000);

    dc.addAccount(name, key);

  }

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

  @font-face {
    font-family: AlexBrush;
    src: url(./Assets/AlexBrush-Regular.ttf);
  }

  @font-face {
    font-family: Roboto;
    src: url(./Assets/Roboto-Regular.ttf);
  }

body {
    margin: 0px;
    padding: 0px;
    
    * {
      box-sizing: border-box;
      font-family: 'Roboto';
    }

}

</style>
