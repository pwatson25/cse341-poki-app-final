const validation = require('./validation/signupValidation');
const loginValidation = require('./validation/loginValidation');

test('returns false for empty passsword', () => {
  expectect(singupValidation('')).toBe(false);
});

test('returns false for empty passsword', () => {
  expectect(loginValidation('')).toBe(false);
});
