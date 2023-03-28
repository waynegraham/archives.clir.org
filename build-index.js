const lunr = require("lunr");
const glob = require("glob");
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const S = require("string");

const documents = {};
const baseUrl = yaml.load(
    fs.readFileSync(path.join(__dirname, "/_config.yml"))
).baseurl;

const files = glob.sync(path.join(__dirname, "/_reports/**/*.md"));
files.forEach((file) => {
    const fileString = fs.readFileSync(file).toString();
    const content = fileString.split("---");
    const frontMatter = yaml.load(content[1]);
    // clir_id: pub51
    // layout: publication
    // title: "Preservation Activities in Bulgaria: The State of Affairs and Possibilities for Cooperation"
    // description: Traces the literary history of Bulgaria and the state of its preservation activities. Concludes with general observations and a list of future directions compiled by Bulgarian libraries.
    // isbn: 1-887334-36-X
    // eric: ED379003
    // doi: 10.5281/zenodo.7750633
    // subjects: Background, Centralization, Decentralization, Economics, Foreign Countries, History, Library Collections, Library Development, Library Education, Library Networks, Library Statistics, Political Issues, Preservation, Problems, Research Libraries
    // authors: Jordan, Sonja K.
    // pub_date: "1995-02-01"
    // pages: 12
    const fileData = {
        clir_id: frontMatter.clir_id,
        title: frontMatter.title,
        authors: frontMatter.authors,
        description: S(frontMatter.description).stripPunctuation(),
        isbn: frontMatter.isbn,
        doi: frontMatter.doi,
        pub_date: frontMatter.pub_date,
        pages: frontMatter.pages,
        content: S(content[2]).escapeHTML().stripTags().stripPunctuation().s,
        url: `${baseUrl}/reports/${file.substring(
            file.lastIndexOf("/") + 1,
            file.lastIndexOf(".")
        )}/`,
    };
    documents[file.substring(file.lastIndexOf("/") + 1, file.lastIndexOf("."))] =
        fileData;
});

const builder = new lunr.Builder();
builder.ref("id");
builder.field("title", { boost: 10 });
builder.field("authors");
builder.field("description", { boost: 15 });
builder.field("content");
builder.field("pub_date");
builder.metadataWhitelist = ["position"];

builder.pipeline.add(lunr.trimmer, lunr.stopWordFilter, lunr.stemmer);

builder.searchPipeline.add(lunr.trimmer, lunr.stopWordFilter, lunr.stemmer);

for (var key in documents) {
  // Add the data to lunr
    builder.add({
        id: key,
        title: documents[key].title,
        authors: documents[key].authors,
        pub_date: documents[key].pub_date,
        description: documents[key].description,
        content: documents[key].content,
    });
}
const index = builder.build();
const index_data = `var search_index = ${JSON.stringify(index, null, 4)};`;
const documents_data = `var store = ${JSON.stringify(documents, null, 4)};`;
fs.writeFileSync(
    path.join(__dirname, "/assets/js/document-store.js"),
    documents_data
);
fs.writeFileSync(
        path.join(__dirname, "/assets/js/search-index.js"),
        index_data
    );

    // @see https://www.digitalocean.com/community/tools/minify

    const { minify } = require("terser");
    // Define the config for how Terser should minify the code
    // This is set to how you currently have this web tool configured
    const config = {
    compress: {
        dead_code: true,
        drop_console: false,
        drop_debugger: true,
        keep_classnames: false,
        keep_fargs: true,
        keep_fnames: false,
        keep_infinity: false,
    },
    mangle: {
        eval: false,
        keep_classnames: false,
        keep_fnames: false,
        toplevel: false,
        safari10: false,
    },
    module: false,
    sourceMap: false,
    output: {
        comments: "some",
    },
};

const searchIndex = fs.readFileSync("assets/js/search-index.js", "utf8");
const documentStore = fs.readFileSync("assets/js/document-store.js", "utf8");

// const minified_index = minify(searchIndex, config);
// const minified_docs = minify(documentStore, config);

// console.log(minified_docs.code);

// fs.writeFileSync(path.join(__dirname,'/assets/js/document-store.min.js'), minified_docs);
// fs.writeFileSync(path.join(__dirname,'/assets/js/search-index.min.js'), minified_index);
// fs.writeFileSync('assets/js/search-index.min.js', minified.code);
// fs.writeFileSync('assets/js/document-store.min.js', minified_docs.code);
