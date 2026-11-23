---
title: Synonyms API quickstart
sidebar_label: Quickstart
description: Create a synonym entry, expand a search query with it, then update and delete the entry with the Synonyms API.
sidebar_custom_props:
  card_icon: img/icons/zap.svg
  card_icon_invert_dark: true
---

In this quickstart, you create a synonym entry, use it to expand a search query, update the entry, find it in a list, and then delete it.

## Prerequisites

To complete this quickstart, you need the following:

- `curl` installed on your machine.
- An API key with the **Read and write** access level. Steps 1, 3, and 5 change data, so a read-only key returns `403 Forbidden`. To generate a key, see [Authentication](./authentication.md).

  Store the API key in an environment variable so that you can paste the commands on this page without changes:

  ```bash
  export SYNONYMS_API_KEY="API_KEY"
  ```

  Replace `API_KEY` with your API key.

## Step 1: Create a synonym entry

To create an entry, send a `POST` request to `/synonyms`. This entry, in the `ecommerce` synonym set, makes "sofa," "couch," "settee," and "divan" interchangeable:

```bash
curl -X POST "https://api.synonyms.io/v1/synonyms" \
  -H "Authorization: Bearer $SYNONYMS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "synonym_set": "ecommerce",
    "term": "sofa",
    "synonyms": ["couch", "settee", "divan"],
    "synonym_type": "EQUIVALENT",
    "tags": ["furniture"]
  }'
```

A successful request returns status `201 Created` and the new entry:

```json
{
  "id": "syn_01hx4k9mzqe8f3b7n2p6r0wc5t",
  "synonym_set": "ecommerce",
  "term": "sofa",
  "synonyms": ["couch", "settee", "divan"],
  "synonym_type": "EQUIVALENT",
  "tags": ["furniture"],
  "created_at": "2025-03-15T10:22:00Z",
  "updated_at": "2025-03-15T10:22:00Z"
}
```

Save the `id` value. You use it in steps 3 and 5.

## Step 2: Expand a search query

To get the terms that a search for "couch" should match, send a `GET` request to `/expansions`:

```bash
curl -X GET "https://api.synonyms.io/v1/expansions?q=couch&synonym_set=ecommerce" \
  -H "Authorization: Bearer $SYNONYMS_API_KEY"
```

Because the entry is `EQUIVALENT`, "couch" expands to the term and all its synonyms:

```json
{
  "q": "couch",
  "synonym_set": "ecommerce",
  "terms": ["couch", "sofa", "settee", "divan"],
  "matched_entries": ["syn_01hx4k9mzqe8f3b7n2p6r0wc5t"]
}
```

In your app, you send all the `terms` to your search engine instead of only "couch."

## Step 3: Update the synonym entry

To add "chesterfield" as a synonym, send a `PUT` request to `/synonyms/ENTRY_ID`. A `PUT` request replaces the whole entry, so include every field that you want to keep:

```bash
curl -X PUT "https://api.synonyms.io/v1/synonyms/ENTRY_ID" \
  -H "Authorization: Bearer $SYNONYMS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "synonym_set": "ecommerce",
    "term": "sofa",
    "synonyms": ["couch", "settee", "divan", "chesterfield"],
    "synonym_type": "EQUIVALENT",
    "tags": ["furniture"]
  }'
```

Replace `ENTRY_ID` with the `id` value from step 1, for example, `syn_01hx4k9mzqe8f3b7n2p6r0wc5t`.

The response contains the updated entry. The `id` stays the same, and `updated_at` changes:

```json
{
  "id": "syn_01hx4k9mzqe8f3b7n2p6r0wc5t",
  "synonym_set": "ecommerce",
  "term": "sofa",
  "synonyms": ["couch", "settee", "divan", "chesterfield"],
  "synonym_type": "EQUIVALENT",
  "tags": ["furniture"],
  "created_at": "2025-03-15T10:22:00Z",
  "updated_at": "2025-03-16T09:05:00Z"
}
```

## Step 4: List synonym entries

To find the entry in a list, send a `GET` request to `/synonyms`. This request returns the first page of entries in the `ecommerce` set that have the `furniture` tag, with up to 20 entries per page:

```bash
curl -X GET "https://api.synonyms.io/v1/synonyms?synonym_set=ecommerce&tag=furniture&page=1&page_size=20" \
  -H "Authorization: Bearer $SYNONYMS_API_KEY"
```

The response contains the matching entries and pagination details:

```json
{
  "data": [
    {
      "id": "syn_01hx4k9mzqe8f3b7n2p6r0wc5t",
      "synonym_set": "ecommerce",
      "term": "sofa",
      "synonyms": ["couch", "settee", "divan", "chesterfield"],
      "synonym_type": "EQUIVALENT",
      "tags": ["furniture"],
      "created_at": "2025-03-15T10:22:00Z",
      "updated_at": "2025-03-16T09:05:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "page_size": 20,
    "total": 1
  }
}
```

## Step 5: Delete the synonym entry

To delete the entry, send a `DELETE` request to `/synonyms/ENTRY_ID`. You can't restore a deleted entry.

```bash
curl -X DELETE "https://api.synonyms.io/v1/synonyms/ENTRY_ID" \
  -H "Authorization: Bearer $SYNONYMS_API_KEY"
```

Replace `ENTRY_ID` with the `id` value from step 1.

A successful request returns status `204 No Content` with no response body.

## Next steps

After you complete this quickstart, explore the rest of the API:

- To learn how the relationship types expand queries, see the [Synonyms API overview](overview.md).
- To learn about every endpoint, filter, and field, see the [API reference](generated/synonyms-api/synonyms.tag.mdx).
- To use short-lived access tokens instead of an API key, see [Authentication](./authentication.md).
