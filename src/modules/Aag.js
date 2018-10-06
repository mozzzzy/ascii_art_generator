/*
 * Modules
 */
const Aa = require('./Aa');

/*
 * Variables
 */


/*
 * class Aag
 */
module.exports = class Aag {

    // constructor
    constructor(aa_str_array) {
        // parse each character from aa_str_array, and create each Aa class object
        this.setAaObjArray(aa_str_array);
        // create consecutive Ascii Art's string array
        this.setConsecutiveAaStrArray();
        // create consecutive Ascii Art's string
        this.setConsecutiveAaStr();
        // delete space between each Ascii Art
        while(this.consecutive_aa_str.indexOf('@') != -1){
            this.deleteSpace();
        }
        // create consecutive Ascii Art's Aa class object
        this.consecutive_aa_obj = new Aa(this.consecutive_aa_str);
    }

    // create array of Aa class objects from aa_str_array
    setAaObjArray(aa_str_array) {
        this.aa_obj_array = [];
        for(let aac = 0; aac < aa_str_array.length; aac ++) {
            let aa_obj = new Aa(aa_str_array[aac]);
            this.aa_obj_array.push(aa_obj);
        }
    }

    // calc consective aa str's height
    setHeight() {
        this.height = 0;
        for(let aac = 0; aac < this.aa_obj_array.length; aac ++) {
            if(this.height < this.aa_obj_array[aac].height) {
                this.height = this.aa_obj_array[aac].height;
            }
        }
    }

    // create consecutive aa string array
    setConsecutiveAaStrArray() {

        // calc consecutive_aa_str_array's height
        this.setHeight();

        // initialize array
        this.consecutive_aa_str_array = [];
        for(let lc = 0; lc < this.height; lc ++) {
            this.consecutive_aa_str_array.push('');
        }

        // for each Aa object
        for(let aac = 0; aac < this.aa_obj_array.length; aac ++) {
            // for each line of Aa object's str array
            for(let lc = 0; lc < this.height; lc ++) {
                let one_line = "";
                // if line counter < aa_array's height, copy aa string data
                if(lc < this.aa_obj_array[aac].height) {
                    one_line += this.aa_obj_array[aac].aa_array[lc];
                // else copy '@'
                } else {
                    for(let wc = 0; wc < this.aa_obj_array[aac].width; wc ++) {
                        one_line += '@';
                    }
                }
                // add to this.consecutive_aa_str_array
                this.consecutive_aa_str_array[lc] += one_line;
            }
        }
    }

    // find consecutive space
    findAt(one_line) {
        let at_mark_pointer = -1;
        // for one line's each character
        for(let cc = 0; cc < one_line.length; cc ++) {
            // first '@'
            if(one_line[cc] === '@' && at_mark_pointer === -1) {
                at_mark_pointer = cc;
                break;
            }
        }
        return at_mark_pointer;
    }

    // convert pointer
    convertPointer(line_num, line_max, pointer) {
        if(pointer !== -1) {
            return (pointer + (line_max - line_num) - 1);
        } else {
            return Number.MAX_VALUE;
        }
    }

    // delete consecutive space
    deleteSpace() {

        // get each line's at mark pointer
        let at_mark_pointer_array = [];
        for(let lc = 0; lc < this.height; lc ++) {
            at_mark_pointer_array.push(this.findAt(this.consecutive_aa_str_array[lc]));
        }

        // convert each pointer
        let converted_at_mark_pointer_array = [];
        for(let lc = 0; lc < at_mark_pointer_array.length; lc ++) {
            converted_at_mark_pointer_array.push(this.convertPointer(lc, this.height, at_mark_pointer_array[lc]));
        }

        // get minimum converted pointer
        let minimum_at_mark = Math.min(...converted_at_mark_pointer_array);

        // check minimum pointer === all pointer
        let all_at = 1;
        for(let lc = 0; lc < converted_at_mark_pointer_array.length; lc ++) {
            if(minimum_at_mark !== converted_at_mark_pointer_array[lc]) {
                all_at = 0;
                break;
            }
        }

        // minimum pointer !== all pointer
        if(all_at === 0) {
            // for each pointer
            for(let lc = 0; lc < at_mark_pointer_array.length; lc ++) {
                // if find minimum at mark line
                if(converted_at_mark_pointer_array[lc] === minimum_at_mark) {
                    // replace point's '@' to ' '
                    let repleced_line = '';
                    for(let cc = 0; cc < this.consecutive_aa_str_array[lc].length; cc ++) {
                        if(cc === at_mark_pointer_array[lc]) {
                            repleced_line += ' ';
                        } else {
                            repleced_line += this.consecutive_aa_str_array[lc][cc];
                        }
                    }
                    this.consecutive_aa_str_array[lc] = repleced_line;
                }
            }

        // minimum pointer === all pointer
        } else if (all_at === 1) {
            for(let lc = 0; lc < this.consecutive_aa_str_array.length; lc ++) {
                let repleced_line = '';
                for(let cc = 0; cc < this.consecutive_aa_str_array[lc].length; cc ++) {
                    if(cc !== at_mark_pointer_array[lc]) {
                        repleced_line += this.consecutive_aa_str_array[lc][cc]; 
                    }
                }
                this.consecutive_aa_str_array[lc] = repleced_line;
            }
        }
        this.setConsecutiveAaStr();
    }

    // create consecutive_aa_str
    setConsecutiveAaStr() {
        this.consecutive_aa_str = '';
        for(let lc = 0; lc < this.height; lc ++) {
            this.consecutive_aa_str += this.consecutive_aa_str_array[lc] + '\n';
        }
    }


}


/*
 * Sample Main
 */
/*
const aa_array_ABC = [ '@________@@@@@\n|\\   __  \\@@@@\n\\ \\  \\|\\  \\@@@\n@\\ \\   __  \\@@\n@@\\ \\  \\ \\  \\@\n@@@\\ \\__\\ \\__\\\n@@@@\\|__|\\|__|\n',
  '@________@@@@@\n|\\   __  \\@@@@\n\\ \\  \\|\\ /_@@@\n@\\ \\   __  \\@@\n@@\\ \\  \\|\\  \\@\n@@@\\ \\_______\\\n@@@@\\|_______|\n',
  '@________@@@@@\n|\\   ____\\@@@@\n\\ \\  \\___| @@@\n@\\ \\  \\     @@\n@@\\ \\  \\____ @\n@@@\\ \\_______\\\n@@@@\\|_______|\n' ];

aag = new Aag(aa_array_ABC);
console.log(aag);
*/
