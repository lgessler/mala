import json
import jsonschema
from jsonschema.protocols import Validator
import os
import sys

data_types = [
    "tei",
    "tags",
    "time-aligned",
    "span-labels",
    "nested-span-labels",
    "constituency-tree",
    "dependency-tree",
    "graph",
]

data_formats = [
    "plaintext",
    "csv",
    "xml",
    "json",
    "conllu",
    "elan-xml",
    "flex-xml",
    "proprietary"
]

schema = {
    "type": "object",
    "properties": {
        # Display name
        "name": {"type": "string"},
        # For use in the URL, should be wb URL friendly and unique
        "slug": {"type": "string"},
        # Year of initial publication
        "releaseYear": {"type": "number"},
        # Icon URL, if available
        "icon": {"type": ["string", "null"], "format": "uri"},
        # Screenshot of app in use, if available
        "screenshot": {"type": ["string", "null"], "format": "uri"},
        # URL to paper, if available
        "paperUrl": {"type": ["string", "null"], "format": "uri"},
        # URL to code, if available
        "codeUrl": {"type": ["string", "null"], "format": "uri"},
        # Data types supported by the app. Only consider app-internally.
        "dataTypes": {
            "type": "array",
            "uniqueItems": True,
            "items": {"enum": data_types}
        },
        # Import formats supported by the app.
        "importFormats": {
            "type": "array",
            "uniqueItems": True,
            "items": {"enum": data_formats}
        },
        # Export formats supported by the app.
        "exportFormats": {
            "type": "array",
            "uniqueItems": True,
            "items": {"enum": data_formats}
        },
        # Is the code free and open-source, free and closed-source, or commercial?
        "freeness": {"type": "string", "pattern": "open-source|closed-source|commercial"},
        # An arbitrary list of keywords
        "keywords": {"type": "array", "contains": {"type": "string"}},
        # A short (few sentences) description of the app and what it's for.
        "description": {"type": "string"},
        # A longer review of the app
        "review": {
            "type": "object",
            "properties": {
                "reviewer": {"type": ["string", "null"]},
                # Should be YYYY-MM-DD
                "date": {"type": ["string", "null"]},
                "body": {"type": ["string", "null"]}
            },
            "required": ["reviewer", "date", "body"]
        }
    },
}
schema["required"] = list(schema["properties"].keys())

# main code
def validate_json(validator, filepath, data):
    errors = [f"{filepath} - {e._contents()['message']}" for e in validator.iter_errors(instance=data)]
    return errors


def load_json(filepath):
    with open(filepath, 'r') as f:
        return json.load(f)


def main():
    errors = []
    filepaths = [f"src/data/{p}" for p in os.listdir('src/data/') if p.endswith(".json") and p != "_template.json"]
    jsons = [load_json(filepath) for filepath in filepaths]
    Validator.check_schema(schema)
    validator = jsonschema.Draft7Validator(schema)
    for filepath, obj in zip(filepaths, jsons): 
        errors += validate_json(validator, filepath, obj)
    if len(errors) > 0:
        print("Validation failed. Errors:", file=sys.stderr)
        print("\n".join(errors), file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()