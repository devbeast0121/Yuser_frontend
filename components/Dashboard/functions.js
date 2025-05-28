import axios from 'axios';
import * as crypto from 'crypto';

/*		hash()
 *		@in [
 *			input: string
 *				The thing to hash
 *			algo: optional string
 *				the hash algorithum to use. Defaults to SHA256
 *		]
 *		@out hash of input
 *		William Doyle
 *		pre september 6th 2021
 * */
export function hash(input, algo = 'SHA256') {
    const hash = crypto.createHash(algo);
    hash.update(input).end();
    return hash.digest('hex');
}

/*
    hashImageAtUrl
    hash an image at a given url
    William Doyle
    March 2022
*/
export async function hashImageAtUrl(url) {
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const buffer = Buffer.from(response.data, "utf-8")
    return hash(JSON.stringify(buffer));
}

