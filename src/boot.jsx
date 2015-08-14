var React = require('react');
var ExampleComponents = require('./example_components.jsx');
var HeroExample = require('./hero_example.jsx');

React.render(<ExampleComponents/>, document.getElementById('datepicker-region'));
React.render(<HeroExample />, document.getElementById('js-hero-example'));
