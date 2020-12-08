# A visual narrative about the Oxford Cambridge Arc

Created with [Idyll](https://idyll-lang.org/) and
[Vega-Lite](https://vega.github.io/vega-lite/).


## Setup

This project is built using Idyll. To use Idyll you must first install node and
npm, which you can get by following
[these instructions](https://www.npmjs.com/get-npm).

Then, from this project root directory, run:

    npm install

The main elements of the project are:

- `index.idyll` - the main Idyll file, article text is in here
- `styles.css` - custom styles
- `components/` - custom map components
- `notebooks/` - preprocessing steps to produce static images
- `static/` - images and data
- `package.json` - project configuration

To run the project locally, in live-reload development mode:

    npm start

To build the project into a static HTML site in the `build/` directory:

    npm run build

To deploy the project to GitHub pages:

    npm run deploy

To copy the article text into a Word document (requires
[pandoc](https://pandoc.org/)) with some formatting applied:

    npm run extract


## Preprocessing

Data preprocessing and static visualisation is run using the Python Jupyter
notebooks in `notebooks`.

Development note - use [nbstripout](https://github.com/kynan/nbstripout) to
avoid storing notebook output in git (and keeping git history minimal):

    nbstripout --install

To configure the location of the shared data folder, copy `config.template.json`
to `config.json` and edit the `data_folder` value.

To run the notebook, install Python and dependencies, then run:

    jupyter notebook


## Acknowledgements

Design and development by Heidi Mok.

The analysis presented has been carried out by researchers at the University of
Oxford and Newcastle University in the UK, funded by the Alan Turing Institute
(ATI).
