/**
 *
 * That's it. Stop using over complicated frameworks that get in your way.
 *
 * -Joe Walnes
 * MIT License. See https://github.com/joewalnes/jstinytest/
 */
var SimpleUnitTest = 
class SimpleUnitTest{
    static run(tests) {
        let numberOfTest = 0;
        let susccesses = 0;
        let failures = 0;
        for(const [testName, testAction] of Object.entries(tests)){
            numberOfTest++;
            try{
                testAction();
                susccesses++;
                log(`✓ ${testName}`);
            } catch (e) {
                failures++;
                log(`x ${testName}`);
                log("\t" + e);
                log("\t" + e.stack);
            }
        }
        log("");
        log("=== Resume ===");
        log(`Total of unit tests: ${numberOfTest}`);
        log("");
        log(`Successful tests: ${susccesses}`);
        log(`Failed tests: ${failures}`);
    }

    static fail(msg) {
        msg = (msg instanceof Error?msg.message:msg);
        throw new Error(msg);
    }

    static assertEquals(expected, actual) {
        if(!SimpleUnitTest._compare(expected, actual)){
            expected = JSON.stringify(expected);
            actual = JSON.stringify(actual);
            throw new Error(`[assertEquals] "${expected}" != "${actual}"`);
        }
    }

    static assertNotEquals(expected, actual) {
        if(SimpleUnitTest._compare(expected, actual)){
            expected = JSON.stringify(expected);
            actual = JSON.stringify(actual);
            throw new Error(`[assertNotEquals] "${expected}" == "${actual}"`);
        }
    }

    static assertTrue(actual) {
        if (actual !== true) {
            throw new Error(`[assertTrue] "${actual}" is false`);
        }
    }

    static assertFalse(actual) {
        if (actual !== false) {
            throw new Error(`[assertFalse] "${actual}" is not false`);
        }
    }

    static assertNull(actual) {
        if (actual != null) {
            throw new Error(`[assertNull] "${actual}" is not null`);
        }
    }

    static assertNotNull(actual) {
        if (actual == null) {
            throw new Error(`[assertNotNull] "${actual}" is null`);
        }
    }

    static assertStrictEquals(expected, actual) {
        if (expected !== actual) {
            throw new Error(`[assertStrictEquals] "${expected}" !== ${actual}`);
        }
    }

    static assertStrictNotEquals(expected, actual) {
        if (expected === actual) {
            throw new Error(`[assertStrictNotEquals] "${expected}" === ${actual}`);
        }
    }

    static _compareArrays(x, y){
        if(!(x instanceof Array) || !(y instanceof Array)){
            return false;
        }
        if(x.length != y.length){
            return false;
        }
        for (var i = 0, l=this.length; i < l; i++) {
            if (x[i] instanceof Array && y[i] instanceof Array) {
                if (!x[i].equals(y[i])){
                    return false;
                }
            }else if (x[i] != y[i]) { 
                return false;   
            }           
        }       
        return true;
    }
    static _compare(x, y) {
        var p;
        if (isNaN(x) && isNaN(y) && typeof(x) === 'number' &&
                typeof(y)=== 'number') {
             return true;
        }

        if ((typeof x === 'function' && typeof y === 'function') ||
           (x instanceof Date && y instanceof Date) ||
           (x instanceof RegExp && y instanceof RegExp) ||
           (x instanceof String && y instanceof String) ||
           (x instanceof Number && y instanceof Number)) {
            return x.toString() === y.toString();
        }
        if(typeof(x) == typeof(y) && 
            ["number", "boolean", "string"].includes(typeof(x))){
            return x == y;
        }

        if((x instanceof Array) && (y instanceof Array)){
            if(x.length != y.length){
                return false;
            }
            for (let i = 0; i < x.length; i++) {
                if (x[i] != y[i]) { 
                    return false;   
                }           
            }       
            return true;
        }
        if (!(x instanceof Object && y instanceof Object)) {
            return false;
        }
        if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
            return false;
        }
        if (x.constructor !== y.constructor) {
            return false;
        }
        for (p in y) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                return false;
            }
            else if (typeof y[p] !== typeof x[p]) {
                return false;
            }
        }
        for (p in x) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                return false;
            }
            else if (typeof y[p] !== typeof x[p]) {
                return false;
            }
            if(!["object", "function"].includes(typeof(x[p]))){
                if (x[p] !== y[p]) {
                    return false;
                }
                break;
            }
        }
        return true;
    }
}
