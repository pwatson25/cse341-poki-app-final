const signupValidation = require('./validation/signupValidation');
const loginValidation = require('./validation/loginValidation');

test('returns false for empty passsword', () => {
  expectect(signupValidation('')).toBe(false);
});

test('returns false for empty passsword', () => {
  expectect(loginValidation('')).toBe(false);
});
