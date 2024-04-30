//@ts-check
/**
 * Prettier Configuration
 * @type {import('prettier').Config}
 */
const config = {
  overrides: [
    // Revert JSONC parsing:
    // https://github.com/prettier/prettier/issues/15553
    {
      files: ["**/*.json", "**/*.jsonc"],
      options: {
        parser: "json",
      },
    },
    {
      // Special rules for Markdown files
      files: ["*.md"],
      options: {
        printWidth: Infinity,
      },
    },
  ],
};

module.exports = config;
