// String.prototype.tonedVersion.js © 2023 by Austin is licensed under Attribution 4.0 International. To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/
// needs charset UTF-8
// 0 is no sound, the others are obvious, just search them up
// sets String.prototype.tonedVersion
Object.defineProperty(String.prototype, 'tonedVersion', {
    // sets getter
    get() {
        // sets arr to entries of the string that replaces v with this thing
        let arr = Object.entries(this.replace(/v/g, 'ü').replace(/V/g, 'Ü'))
        // update function that'll rarely be used at all
        let update = obj => obj.map(([, val], i) => [i, val])
        // updates it to make the strings of indeces numbers
        arr = update(arr)
        // creates nums array
        let nums = []
        // for local
        {
            // creates _obj which is just a dupe of arr
            let _obj = [...arr]
            // creates is array
            let is = []
            // uses reduce for accumulator
            _obj.reduce((acc, val, i) => {
                // if no number 0 to 4 then just add the character to the accumulator
                if (/[^0-4]/.test(val[1])) return acc + val[1]
                // same as last line but if accumulator doesn't include these vowels
                if (!/[aeiouü]/i.test(acc)) return acc + val[1]
                // push i to is
                is.push(i)
                // reset accumulator
                return ''
                // syntax
            }, '')
            /*
            it gets the i and the index
            pushes a value
            this value is the spliced element when
            val - i is spliced
            val - i because i is spliced so far ("is" variable is in ascending order)
            val is the old index of the valid number
            */
            is.forEach((val, i) => nums.push(arr.splice(val - i, 1)[0]))
            // syntax
        }
        // map nums so that each "num" is consisted of its index minus its index in the array and its value
        nums = nums.map(([i, val], ind) => [i - ind, val])
        // (this called function is some clever thing) uses reduce to not define a seperate variable
        nums.reduce((acc, [i], ind) => {
            //  subtract the location of the number from accumulator
            nums[ind][0] -= acc
            // return i since i - acc + acc = i
            return i
            // syntax
        }, 0)
        // update arr so that the nums get forgotten
        arr = update(arr)
        // vowel characters (had to change the ones for the third sound cuz' it was wrong)
        let vowels = 'aāáǎàoōóǒòeēéěèiīíǐìuūúǔùüǖǘǚǜ'
        // big chunk of code incoming, sets str variable to empty string
        let str = ''
        // gets the _i and numValue of nums (which is an array or arrays or "entries")
        for (let [_i, numValue] of nums) {
            // parse numValue to an int and name it num
            let num = parseInt(numValue)
            // get letters which are the letters before _i, also remove them from arr (this is why we needed str)
            let letters = arr.splice(0, _i)
            // $vowels are not vowels, they are a special kind of our letters, and are still entries
            let $vowels = letters.filter(([, char]) => /[aeiouü]/i.test(char))
            // this is $vowels but a full string
            let _$vowels = $vowels.map((([, val]) => val)).join('')
            // there is a special rule for iu (u gets the tone)
            if (_$vowels.toLowerCase() === 'iu') {
                // random code that I quickly coded up here, didn't give that much thought so it might suck. checks if u is lowercase
                let lowerCase = _$vowels[1] === _$vowels[1].toLowerCase()
                // for transforming the result to lowercase or uppercase depending on val (a character)
                let toCase = val => lowerCase ? val.toLowerCase() : val.toUpperCase()
                // what. uhhh.. finds 'u' in letters, changes the character to u with its tone (based on num)
                letters[$vowels[1][0] - letters[0][0]][1] = toCase(vowels[vowels.indexOf('u') + num])
                // adds the letters joined as a string to str
                str += letters.map(([, value]) => value).join('')
                // continues the for loop
                continue
                // syntax
            }
            // this code finds the lowest i of vowels
            let lowest = _$vowels.split('').reduce((acc, char) => {
                // if the i of char is lower than acc, change acc to the i of char
                if (vowels.indexOf(char.toLowerCase()) < acc) return vowels.indexOf(char.toLowerCase())
                // otherwise, keep it the same value
                return acc
                // syntax (not setting it to vowels.length or 24 might break it Idk)
            }, vowels.length)
            // ok, we're almost at the end (gets i and char for each entry of $vowels)
            $vowels.forEach(([i, char]) => {
                // if the lowest 'i'd character is not current character, return
                if (char.toLowerCase() !== vowels[lowest]) return
                // gets lowerCase state like before
                let lowerCase = char === char.toLowerCase()
                // sets toCase variable, like before
                let toCase = val => lowerCase ? val.toLowerCase() : val.toUpperCase()
                // sets char position's character to toCased vowel with index char i in vowel + num
                letters[i - letters[0][0]][1] = toCase(vowels[lowest + num])
                // syntax
            })
            // adds letters joined (like _$vowels) to str
            str += letters.map(([, value]) => value).join('')
            // syntax
        }
        // adds the rest of the string (the value after the last valid number) to str
        str += arr.map(([, value]) => value).join('')
        // finally, returns str
        return str
        // syntax
    }
    // syntax
})