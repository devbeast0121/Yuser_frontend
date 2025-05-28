/**
 * 	More Fancy-ness tools with classes 
 * */

import { Generator_RandomColor } from "./tools";

/**
 * 	Colorizer
 * 	Use the Generator_RandomColor() generator function to quickly get a new color.
 * 	Just type :
 * 		Colorizer.next
 * 	And you'll have a random and exciting new color everytime!
 * 	William Doyle
 * 	Aug 30th 2021
 * */
export class Colorizer {
	static #generator = Generator_RandomColor();
	static get next() {
		return Colorizer.#generator.next().value;
	}
}

/*
	William Doyle
	March 22nd 2022
	Delegate class. For storing functions to run later
*/
export class Delegate {
    constructor(_function) {
        this.func = _function;
    }

    run () {
        return this.func();
    }

	runWith (...args) {
		return this.func(...args);
	}
}