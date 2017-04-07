export default function keyModel(accName, key) {

    this.accountName = accName;
    this.key = key;
    this.code = '';

    // TOOD remove
    this.genCode = () => { this.Code = Math.floor(Math.random() * 199999) + 100000 };

}