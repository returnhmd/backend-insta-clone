const yup = require('yup')

module.exports = {
  postDescr: yup.object().shape({
    description: yup
      .string()
      .required()
      .max(500),
  }),

  signUp: yup.object().shape({
    email: yup
      .string()
      .email()
      .required(),
    full_name: yup.string().required(),
    username: yup.string().required(),
    password: yup.string().required(),
  }),

  signIn: yup.object().shape({
    email: yup
      .string()
      .email()
      .required(),
    password: yup.string().required(),
  }),
}
