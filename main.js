var encryptButton = document.getElementById('encrypt-button')
encryptButton.addEventListener('click', (event) => {
	var decryptedDataField = document.getElementById('decrypted-data')
	var encryptedDataField = document.getElementById('encrypted-data')
	var secret = document.getElementById('secret').value
	encryptedDataField.value = CryptoJS.AES.encrypt(decryptedDataField.value, secret)
})

var decryptButton = document.getElementById('decrypt-button')
decryptButton.addEventListener('click', (event) => {
	var decryptedDataField = document.getElementById('decrypted-data')
	var encryptedDataField = document.getElementById('encrypted-data')
	var secret = document.getElementById('secret').value
	var decryptedBytes = CryptoJS.AES.decrypt(encryptedDataField.value, secret);
	decryptedDataField.value = decryptedBytes.toString(CryptoJS.enc.Utf8);
})