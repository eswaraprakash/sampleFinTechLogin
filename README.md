
### Technical description

1. When a user opens a page he or she sees the following: ![first](https://cloud.githubusercontent.com/assets/812240/23119046/dc0db034-f756-11e6-914f-5991a7483cc4.png)

2. The user should be able to add and remove bank accounts ![second](https://cloud.githubusercontent.com/assets/812240/23119087/080bacb8-f757-11e6-99df-3ee9ba709974.png)

3. The specific input data shall be validated once the user finishes his field input and once again for all data just before the submission of the form to the backend (validation rules - please see bellow). In case of validation errors a
message shall be displayed next to the invalid field. ![third](https://cloud.githubusercontent.com/assets/812240/23119100/13cc82f2-f757-11e6-8570-84040666bcb0.png)

4. When all entered data is valid it should be displayed as a popup message to the user after submission. ![forth](https://cloud.githubusercontent.com/assets/812240/23119112/205d2472-f757-11e6-82b3-b04b564fc073.png)

5. If the user has tried to submit invalid data first and fixed the validation errors afterwards, the whole data set should be validated again on submission.

### Validation rules

* All fields are mandatory

1. **firstName** - should contain only small and capital letters, no numbers, special characters, etc.
1. **lastName** - same as the **firstName**
1. **email** - must be a valid email address
1. **bankAccounts** - must be at least one account
1. **iban** - must be a valid [IBAN](https://en.wikipedia.org/wiki/International_Bank_Account_Number). You may want to use [this library](https://www.npmjs.com/package/iban) for validation.
1. **bankName** - no extra specific requirements, just not be empty.
