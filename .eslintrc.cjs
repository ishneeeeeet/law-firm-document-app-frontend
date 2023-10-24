module.exports = {
  "rules": {
    "no-undef": "off",
    "react/react-in-jsx-scope": "off"
  },
  "extends": [
    "plugin:react/recommended"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true,
      "experimentalObjectRestSpread": true
    }
  }
}
