# Minority Market

Welcome to the Minority Market GitHub repo!

## CI Server

Here in Github! https://github.com/CPSECapstone/GSP/actions

## Installation

To download our repository, open your terminal and go to the directory in which you will want this repository. Run the command

```bash
git clone https://github.com/CPSECapstone/GSP.git
```

to make a local copy. Next, run the command

```bash
npm i
```

to install the necessary dependencies. After that, run the following commands to set up the AWS Amplify backend:

```bash
npm install -g @aws-amplify/cli
amplify configure
amplify pull
```

Note that this assumes that your AWS account has already been added as a collaborator.

Now, you are able to run our app with

```bash
npm start
```

## Useful commands

To run local unit tests:

```bash
npm test
```

To check for linting errors:

```bash
npm run lint
```

To fix linting errors:

```bash
npm run lint-fix
```

## Resources

Font resource:
https://fonts.google.com/specimen/Mada
