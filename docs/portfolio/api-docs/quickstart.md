# Quickstart

This example shows how to create, list, and delete a synonym entry.

## Prerequisites

- An API token. See [Authentication](./authentication.md). 
- `curl` installed on your machine.


## Step 1: Create a synonym entry

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

## Step 2: List synonym entries

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

## Step 3: Get a synonym entry by ID

```bash
curl -X GET "https://api.synonyms.io/v1/synonyms/syn_01hx4k9mzqe8f3b7n2p6r0wc" \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

## Step 4: Delete a synonym entry

```bash
curl -X DELETE "https://api.synonyms.io/v1/synonyms/syn_01hx4k9mzqe8f3b7n2p6r0wc" \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

A successful request returns status `204 No Content`.

