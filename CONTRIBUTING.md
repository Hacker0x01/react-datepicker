# How to contribute

Thanks for taking your time to read this. We're thrilled you're reading this because we the help from the community to keep improving this project.

## Testing

We have a handful of Cucumber features, but most of our testbed consists of RSpec examples. Please write RSpec examples for new code you create.

## Submitting changes

Please send a [GitHub Pull Request](https://github.com/Hacker0x01/react-datepicker/pull/new/master) with a clear list of what you've done (read more about [pull requests](https://help.github.com/articles/about-pull-requests/)). When you send a pull request, we will love you forever if you include a test to cover your changes. We can always use more test coverage.
Always write a clear log message for your commits. One-line messages are fine for small changes, but bigger changes should look like this:
\$ git commit -m "A summary of the commit > > A paragraph describing what changed and its impact."

## Coding conventions

Start reading our code, and you'll get the hang of it. We optimize for readability:

- We use prettier for code styling. Don't worry about tabs vs spaces, or how to indent your code.
- We use ESlint for all other coding standards. We try to be consistent and helpful.
- This is open source software. Consider the people who will read your code, and make it look nice for them. It's sort of like driving a car: Perhaps you love doing donuts when you're alone, but with passengers, the goal is to make the ride as smooth as possible.

## Getting set up

Local development configuration is pretty snappy. Here's how to get set up:

1. Install/use node >=16.0.0
1. Run `yarn link` from project root
1. Run `cd docs-site && yarn link react-datepicker`
1. Run `yarn install` from project root
1. Run `yarn build` from project root (at least the first time, this will get you the `dist` directory that holds the code that will be linked to)
1. Run `yarn start` from project root
1. Open new terminal window
1. After each JS change run `yarn build:js` in project root
1. After each SCSS change run `yarn run css:dev && yarn run css:modules:dev` in project root
