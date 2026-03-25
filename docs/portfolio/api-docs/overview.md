
# Synonyms API

The Synonyms API lets you manage synonym relationships for search and query expansion.

Use this API to define how terms relate to each other. You can apply these relationships across search engines, autocomplete systems, and query processing pipelines to improve relevance and consistency.

For example:
- Expand queries (for example, "laptop" → "notebook")
- Normalize vocabulary across domains
- Manage controlled vocabularies

Instead of maintaining synonym logic in multiple systems, define it once and reuse it.

## Key capabilities

- Define synonym relationships as `EQUIVALENT`, `ONE_WAY`, or `GROUP`  
- Tag synonym entries by domain (for example, `ecommerce`, `legal`, `medical`)  
- Filter and paginate synonym entries  
- Update or delete entries as your vocabulary evolves  

## Base URL

All API requests use the following base URL:

```
https://api.synonyms.io/v1
```


## Versioning

The API uses URI versioning.

The current version is `v1`. Breaking changes are released in a new version (for example, `/v2`). The API provides a deprecation notice and migration guidance before removing a version.

## Request and response format

The API accepts and returns JSON.

Include these headers in all requests:

```
Content-Type: application/json
Accept: application/json
```
