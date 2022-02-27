var ORIGINAL_ALPHABET =  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ \n0123456789!@\'\"#$^&*:()_+=-~<>,.?;%][}{"
var SHUFFLED_ALPHABET =  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ \n0123456789!@\'\"#$^&*:()_+=-~<>,.?;%][}{"

function getRandom(seed, modulus) {
  var returnVal = Math.max(seed % modulus -1, 0);
  
  return returnVal;
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function shuffleAlphabet(seed) {
	// setup
	var a = 1664525;
	var c = 1013904223;
    var positions = []
	for (var i = 0; i < ORIGINAL_ALPHABET.length; i++) {
		positions.push(i)
	}
	var modulus = ORIGINAL_ALPHABET.length

    for (var i = 0; i < ORIGINAL_ALPHABET.length; i++) {
		// generate random alphabet
		var x = getRandom(seed, modulus)
		SHUFFLED_ALPHABET = SHUFFLED_ALPHABET.replaceAt(positions[x], ORIGINAL_ALPHABET[i])
		positions.splice(x, 1)

		// update randomizer vars
		modulus -= 1
		seed = (a * seed + c) % modulus;
    }
}

function find(data, key) {
	for (var i = 0; i < data.length; i++) {
		if (data[i] == key) {
			return i
		}
	}
	return -1
}

function encryption(data, seed) {
	shuffleAlphabet(seed)
	encrypted_word = ''
	for (var i = 0; i < data.length; i++) {
		encrypted_word += SHUFFLED_ALPHABET[find(ORIGINAL_ALPHABET, data[i])]
	}
	return encrypted_word
}

// scrambled_alphabet = get_scrambled_alphabet(ORIGINAL_ALPHABET, seed)
// encrypted_word = ""
// for x in original_word:
// 	encrypted_word += scrambled_alphabet[ORIGINAL_ALPHABET.find(x)]
// return encrypted_word

function decryption(data, seed) {
	shuffleAlphabet(seed)
	decrypted_word = ''
	for (var i = 0; i < data.length; i++) {
		decrypted_word += ORIGINAL_ALPHABET[find(SHUFFLED_ALPHABET, data[i])]
	}
	return decrypted_word
}


var encryptButton = document.getElementById('encrypt-button')
console.log(encryptButton)
encryptButton.addEventListener('click', (event) => {
	var decryptedDataField = document.getElementById('decrypted-data')
	var encryptedDataField = document.getElementById('encrypted-data')
	var seed = document.getElementById('seed').value
	encryptedDataField.value = encryption(decryptedDataField.value, seed)
})


var decryptButton = document.getElementById('decrypt-button')
console.log(decryptButton)
decryptButton.addEventListener('click', (event) => {
	var decryptedDataField = document.getElementById('decrypted-data')
	var encryptedDataField = document.getElementById('encrypted-data')
	var seed = document.getElementById('seed').value
	decryptedDataField.value = decryption(encryptedDataField.value, seed)
})