# How to contribute

Thanks for taking your time to read this. We're thrilled you're reading this because we the help from the community to keep improving this project.

## Testing

We use Jest with React Testing Library for our test suite. Please write tests for new code you create.

## Submitting changes

Please send a [GitHub Pull Request](https://github.com/Hacker0x01/react-datepicker/pull/new/main) with a clear list of what you've done (read more about [pull requests](https://help.github.com/articles/about-pull-requests/)). When you send a pull request, we will love you forever if you include a test to cover your changes. We can always use more test coverage.
Always write a clear log message for your commits. One-line messages are fine for small changes, but bigger changes should look like this:
\$ git commit -m "A summary of the commit > > A paragraph describing what changed and its impact."

All pull requests are reviewed with :heart: by [PullRequest](https://www.pullrequest.com/).
The GitHub user persona will be displayed as "pullrequest (bot)" but the written contents are from a human software engineer. You can respond to these comments as if they were any other GitHub user. More [here](https://docs.pullrequest.com/customer-documentation/assign-code-review-to-pull-request-network/collaborating-with-pullrequest-reviewers#addressing-pullrequest-reviewers-in-comments).

## Coding conventions

Start reading our code, and you'll get the hang of it. We optimize for readability:

- We use prettier for code styling. Don't worry about tabs vs spaces, or how to indent your code.
- We use ESlint for all other coding standards. We try to be consistent and helpful.
- This is open source software. Consider the people who will read your code, and make it look nice for them. It's sort of like driving a car: Perhaps you love doing donuts when you're alone, but with passengers, the goal is to make the ride as smooth as possible.

## Sass / stylesheet theming

The package exposes [`src/stylesheets/`](https://github.com/Hacker0x01/react-datepicker/tree/main/src/stylesheets) so you can compile your own CSS. Palette tokens live in `variables.scss`: base colors (`$datepicker__background-color`, `$datepicker__selected-color`, …) and derived tokens (`$datepicker__selected-color--hover`, `$datepicker__muted-color--chevron-dim`, …) computed with `color.adjust` / `rgba`. Each token uses `!default`, so set your overrides **before** `@use`ing or importing the datepicker stylesheet (for example via a small “theme” partial loaded first, or your build’s `load-path` + `@use … with (...)` where applicable).

**Compile-time colors:** Sass `color.adjust()` and `rgba()` only accept real colors at compile time. If you set a base variable to something like `var(--brand-primary)`, you must also override every derived variable that was computed from that base (for example `$datepicker__selected-color--hover`, `$datepicker__selected-color--disabled`), or keep bases as hex/rgb/hsl literals so the defaults still compile.

Example when a base is not a compile-time color:

```scss
$datepicker__selected-color: var(--datepicker-accent);
$datepicker__selected-color--hover: var(--datepicker-accent-hover);
$datepicker__selected-color--disabled: var(--datepicker-accent-subtle);
$datepicker__selected-color--keyboard-selected-bg: var(--datepicker-accent-surface);
```

Derived tokens include: `$datepicker__muted-color--chevron-dim`, `$datepicker__muted-color--navigation-hover-border`, `$datepicker__navigation-disabled-color`, `$datepicker__selected-color--disabled`, `$datepicker__selected-color--hover`, `$datepicker__selected-color--keyboard-selected-bg`, `$datepicker__highlighted-color--hover`, `$datepicker__holidays-color--hover`.

## Getting set up

Local development configuration is pretty snappy. Here's how to get set up:

1. Install/use node >=16.0.0
1. Install/use yarn >=4.6.x
1. Run `yarn install` from project root
1. Run `yarn build` from project root
1. Run `yarn start` from project root (This command launches a documentation app and runs it as a simple webserver at http://localhost:5173.)
1. Open a new terminal window
1. Run `yarn build-dev` from project root (sets up watch mode that auto-rebuilds on file changes)

You can run `yarn test` to execute the test suite and linters. To help you develop the component we’ve set up some tests that cover the basic functionality (can be found in `/tests`). Even though we’re big fans of testing, this only covers a small piece of the component. We highly recommend you add tests when you’re adding new functionality.

1. After each JS change run `yarn build:js` in project root
1. After each SCSS change run `yarn run css:dev && yarn run css:modules:dev` in project root
