/*
 * Modules
 */

/*
 * Variables
 */

/*
 * class Aa
 */
module.exports = class Aa {

    // constructor
    constructor(aa) {
        this.aa = aa;
        this.setAaArray();
        this.setHeight();
        this.setWidth();
    }

    // split aa by '\n'
    setAaArray() {
        // remove last '\n' from this.aa
        let tmp_aa = this.aa;
        tmp_aa = tmp_aa.substr(0, (tmp_aa.length - 1));
        // split this.aa by '\n'
        this.aa_array = tmp_aa.split('\n');
    }

    // calc height
    setHeight() {
        // get height
        this.height = this.aa_array.length;
    }

    // calc width
    setWidth() {
        // get each line length of this.aa_array
        let each_line_width = [];
        for(let lc = 0; lc < this.aa_array.length; lc ++) {
            each_line_width.push(this.aa_array[lc].length);
        }

        // verify that each line length is equal
        this.width = 0;
        let first_line_width = each_line_width[0];
        for(let lc = 1; lc < each_line_width.length; lc ++) {
            if(each_line_width[lc] !== first_line_width) {
                // if each line length is not equal, set this.width -1
                this.width = -1;
            }
        }
        // if each line length is equal, set this.width first_line_width
        if(this.width === 0) {
            this.width = first_line_width;
        }
    }

}


/*
 * Sample Main
 */
/*
// sample ascii art 'A'
const aa_A = '@________@@@@@\n|\\   __  \\@@@@\n\\ \\  \\|\\  \\@@@\n@\\ \\   __  \\@@\n@@\\ \\  \\ \\  \\@\n@@@\\ \\__\\ \\__\\\n@@@@\\|__|\\|__|\n';
// create Aa instance
let aa_A_obj = new Aa(aa_A);
// check aa_array value
console.log(aa_A_obj.aa_array);
// check width value
console.log(aa_A_obj.width);
// check height value
console.log(aa_A_obj.height);
*/
