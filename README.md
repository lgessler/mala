# The Map of Applications for Linguistic Annotation

MALA is a list of application software for use in annotating natural language texts.
Please see [our homepage](https://lgessler.github.io/mala/about.html) for more information.

# Adding an Application
If there is an application you would like to see listed in MALA, please either:
- Open an issue describing the application on this repository 
- Open a pull request with a new JSON [based on the template](./src/data/_template.json). 
  Make sure your JSON validates properly by running `python scripts/validate_json.py`.
  Refer to [scripts/validate_json.py](scripts/validate_json.py) for more information on the meanings of the JSON fields.

# Acknowledgments 
Some entries in MALA were derived from an existing list, [Annotationsaurus](https://github.com/mariananeves/annotation-tools).

# Development
- Prod build: `yarn build`
- Dev server: `yarn start`