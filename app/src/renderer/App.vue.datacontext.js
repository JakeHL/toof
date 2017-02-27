import keyModel from './Model/KeyModel'

export default function(){  

        this.store = {
            accounts : []
        };

        // Methods
        this.addAccount = function(name, key) {
            for(var i = 0; i < this.store.accounts.length; i++) {
                var item = this.store.accounts[i];
                if (item.key === key) {
                    console.log("[TOOF] Key: " + key + " already exists in list.");
                    return false;
                }
            }
            var km = new keyModel(name, key);
            this.store.accounts.push(km);
            return true;
        }

        this.removeAccount = function(key) {
            for(var i = 0; i < this.store.accounts.length; i++) {
                var item = this.store.accounts[i];
                if (item.key == key) {
                    this.store.accounts.splice(i, 0);
                    return true;
                }
            }
            return false;
        }

}