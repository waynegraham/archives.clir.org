const path = require("path");

const { DateTime } = require("luxon");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require('markdown-it-attrs');
const markdownItRenderer = require('markdown-it')('commonmark');

const schema = require('@quasibit/eleventy-plugin-schema'); //https://www.maxivanov.io/add-structured-data-to-eleventy-blog/

// official plugins
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation"); // https://www.11ty.dev/docs/plugins/navigation/
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const Image = require("@11ty/eleventy-img"); // https://www.11ty.dev/docs/plugins/image/

module.exports = (eleventyConfig) => {
    // Copy the "assets" directory to the compiled "_site" folder.
    eleventyConfig.addPassthroughCopy('assets');

    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(EleventyRenderPlugin);
	eleventyConfig.addPlugin(schema);

    // Official plugins
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(pluginBundle);

    // watch CSS files for changes
    eleventyConfig.setBrowserSyncConfig({
        files: './_css/**/*.css'
    });




    // Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if(!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if( n < 0 ) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

    // Filters
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "LLL yyyy");
	});

	eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if(!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if( n < 0 ) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

    // Customize Markdown library settings:
    eleventyConfig.amendLibrary("md", mdLib => {
		mdLib.use(markdownItAttrs);

		mdLib.use(markdownItAnchor, {
			permalink: markdownItAnchor.permalink.ariaHidden({
				placement: "after",
				class: "header-anchor",
				symbol: "#",
				ariaHidden: false,
			}),
			level: [1,2,3,4],
			slugify: eleventyConfig.getFilter("slugify")
		});
	});

    // https://github.com/11ty/eleventy/issues/543#issuecomment-1005914243
    eleventyConfig.addFilter('markdownify', (str) => {
		return markdownItRenderer.render(str);
    });

	// shortcodes
	// https://www.11ty.dev/docs/plugins/image/
	eleventyConfig.addShortcode("image", async function(src, alt, sizes, css) {
		let metadata = await Image(src, {
			widths: [200, 300, 400, 600],
			formats: ["avif", "jpeg", null],
		outputDir: path.join(eleventyConfig.dir.output, "assets", "images"),
		urlPath: "/archives.clir.org/assets/images/"
		});

		let imageAttributes = {
			alt,
			sizes,
      		class: css,
			loading: "lazy",
			decoding: "async",
		};

		// You bet we throw an error on a missing alt (alt="" works okay)
		return Image.generateHTML(metadata, imageAttributes);
	});
    
    return {
        dir: {
            input: './',
            output: './docs',
            layouts: './_layouts',
            data: './_data',
            includes: './_includes',
        },
        templateFormats: [
            'md',
			'njk',
			'html',
            'liquid'
        ],

		// Pre-process *.md files with: (default: `liquid`)
		markdownTemplateEngine: "njk",

        pathPrefix: '/archives.clir.org/', // omit this line if using custom domain
    };
};