const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function(eleventyConfig) {
  eleventyConfig.addNunjucksFilter('sortByIndex', require('./dev/site/filters/sort-by-index.js'));
  eleventyConfig.addPlugin(syntaxHighlight);

  return {
    dir: {
      input: '<%= devFolderPath %>/site',
      output: '<%= distFolderPath %>',
      includes: '_includes'
    },
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
};
