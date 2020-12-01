# My Helsinki React

## Tools in use
-   [TypeScript](https://www.typescriptlang.org/) TypeScript language
-   ~~[Flowtype](https://flowtype.org/) Type checker~~ *Should not be used anymore. Use typescript instead.*
-   [npm](https://www.npmjs.com/) Node package manager
-   [React](https://facebook.github.io/react/) User interface components
-   [Redux](http://redux.js.org/) Predictable state container
-   [Lodash](https://lodash.com/) Utility library
-   [Babel](https://babeljs.io/) ES.Next transpiler
-   [Eslint](http://eslint.org/) Linting utility
-   [Webpack](https://webpack.github.io/) Module bundler
-   And more...

## Usage

#### Requirements

Use Node v10.17.0 version.

(Optional) Use nvm (Node Version Manager) to manage the Node versions. Run for example `nvm use` in the project folder before running any `npm` commands.

#### Install dependencies

On your local:

```bash
npm install
```

#### Add .env file

Copy `.env.example` to `.env`

If you need the .envs from the servers magically, see
`myhelsinki-environment`'s README.

#### Start the development server

In one terminal:

```bash
npm start
```

And in another terminal (after client has fully started):

```bash
npm run server
```

When it is finished starting, open it in your browser:
http://localhost:8080/fi

If you want more verbose debugging set:

```bash
export DEBUG=*,-babel  # or use other filtering flags
```

on terminals before issuing the above npm commands.

#### Debug dev/staging server

In case you want to see in more detail how the node server is behaving on dev or staging you can login to appropriate server (e.g. `ssh myhelsinki@ssh.dev.myhelsinki.fi`)

Stop the service:

```bash
sudo service myhelsinki-react-api stop
```

Run it manually with debug enabled:

```bash
cd /home/myhelsinki/myhelsinki-react/current
DEBUG=* npm run server
```

Afterwards start again server as service:

```bash
sudo service myhelsinki-react-api start
```

### Run all tests in command line

```
npm run test # requires development server
```

Q: What do I do if my tests are failing with "Code style issues found in the above file(s). Forgot to run Prettier?"

A: Run `npm run format`. You may also want to configure your editor to format with [Prettier](https://prettier.io/) on save.

### Run end-to-end tests interactively

```
npx cypress open
```

### User login in development server

User login can be used against a locally run Drupal. Currenly only Google OAuth can be used, because it allows localhost redirects.

You need to modify your local Drupal slightly to make the login work with your local React server. See [Session cookies with local React development server](https://github.com/helsinkimarketing/myhelsinki-d8/#session-cookies-with-local-react-development-server) in d8 repository.

Check that your `.env` variables `API_URL`, `FRONTEND_URL`, `SERVER_ADDRESS`. `COOKIE_DOMAIN` point to a `localhost` address similarly to `.env.example` and that the `DRUPAL_URL` points to your locally installed Drupal (`http://edit.local.myhelsinki.fi/`) and `DRUPAL_AUTH_SECRET` is set. The `GOOGLE_OAUTH_CLIENT_ID` and `GOOGLE_OAUTH_CLIENT_SECRET` env variables should be setup. These values can be found from the password safe.

### Troubleshooting

#### Pictures are missing

Local Drupal has not imported files folder from production server.

Two options:
1) open the editing page in local Drupal. This will fetch the picture for the page. Clear also Drupal cache on vagrant box using `drush cr`
2) import files folder to local Drupal. Note size (as of 2019-01) is about 30 Gb<br/>
On Vagrant box run `drush rsync @myhelsinki-web.production:%files/ /vagrant/myhelsinki-d8/drupal/web/sites/default/files/`

#### Compile the distribution build

```bash
npm run compile
```

#### Deployment

Since we've moved site under cloudlfare, some changes required in order to deploy front-end:

1. `vagrant up` the machine and `vagrant ssh react/d8`
2. `cd` to `/vagrant/myhelsinki-react`
3. Run `BRANCH=<branch> cap <server> deploy`. Where `<branch>` is branch you'd like to deploy, e.g. `develop` and `<server>` is either `production`, `staging` or `dev`.

**Note**: if you add new environment variables to `.env` you need to update dev, staging and production servers files too. See instructions for downloading and uploading `.env`s for servers from https://github.com/helsinkimarketing/myhelsinki-environment#env-files.

## Development

### Workflow

We are following a slightly modified version of [Development Model](https://nvie.com/posts/a-successful-git-branching-model/). Branch called `develop` is the default branch and that should be used as a base for new feature branches.
