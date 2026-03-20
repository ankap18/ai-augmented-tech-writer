
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


## Quickstart

This example shows how to create, list, and delete a synonym entry.

### Prerequisites

- An API token. See [Authentication](./authentication.md). 
- `curl` installed on your machine.


### Step 1: Create a synonym entry

```bash
curl -X POST "https://api.synonyms.io/v1/synonyms" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "term": "sofa",
    "synonyms": ["couch", "settee", "divan"],
    "synonym_type": "EQUIVALENT",
    "tags": ["furniture", "ecommerce"]
  }'
```

**Response**

```json
{
  "id": "syn_01hx4k9mzqe8f3b7n2p6r0wc",
  "term": "sofa",
  "synonyms": ["couch", "settee", "divan"],
  "synonym_type": "EQUIVALENT",
  "tags": ["furniture", "ecommerce"],
  "created_at": "2025-03-15T10:22:00Z",
  "updated_at": "2025-03-15T10:22:00Z"
}
```

Save the `id`. You use it to retrieve, update, or delete the entry.

### Step 2: List synonym entries

```bash
curl -X GET "https://api.synonyms.io/v1/synonyms?tag=ecommerce&page=1&page_size=20" \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```
**Response**

```json{
  "data": [
    {
      "id": "syn_01hx4k9mzqe8f3b7n2p6r0wc",
      "term": "sofa",
      "synonyms": ["couch", "settee", "divan"],
      "synonym_type": "EQUIVALENT",
      "tags": ["furniture", "ecommerce"],
      "created_at": "2025-03-15T10:22:00Z",
      "updated_at": "2025-03-15T10:22:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "page_size": 20,
    "total": 1
  }
}
```

### Step 3: Get a synonym entry by ID

```bash
curl -X GET "https://api.synonyms.io/v1/synonyms/syn_01hx4k9mzqe8f3b7n2p6r0wc" \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

### Step 4: Delete a synonym entry

```bash
curl -X DELETE "https://api.synonyms.io/v1/synonyms/syn_01hx4k9mzqe8f3b7n2p6r0wc" \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

A successful request returns status `204 No Content`.

