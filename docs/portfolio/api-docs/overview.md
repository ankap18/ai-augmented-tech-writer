---
title: Synonyms API overview
sidebar_label: Overview
description: Learn how the Synonyms API manages synonym relationships for search and query expansion.
---

The Synonyms API lets you manage synonym relationships for search and query expansion. Define how terms relate to each other once, then use those relationships across search engines, autocomplete, and query processing pipelines. For example, you can expand a search for "laptop" to also match "notebook."

With the API, you can do the following:

- Define two-way, one-way, or group synonym relationships.
- Organize entries into synonym sets, for example, one set for each domain.
- Create, update, and delete entries as your vocabulary changes.
- Expand a search query into all the terms it should match, at query time.

## Synonym entries and sets

A *synonym entry* is the resource that the API manages. Each entry contains a primary term, a list of synonyms, optional tags, and a relationship type. The relationship type controls which terms match each other in a search:

| Relationship type | How terms match | Example |
|---|---|---|
| `EQUIVALENT` | The term and all its synonyms match each other. | "sofa," "couch," and "settee" are interchangeable. |
| `ONE_WAY` | The term matches its synonyms, but the synonyms don't match the term. | A search for "laptop" finds "notebook," but a search for "notebook" doesn't find "laptop." |
| `GROUP` | The synonyms match each other. The term is only a name for the group. | The group "red shades" makes "red," "crimson," and "scarlet" interchangeable. A search for "red shades" doesn't match them. |

Each entry belongs to a *synonym set*. A term must be unique within its set, so different sets can define the same term differently. For example, "discharge" can have different synonyms in a `medical` set and a `legal` set.

## Use synonyms in search

The API stores your synonyms, but it doesn't run searches. To use the synonyms, your app expands each search query before it sends the query to your search engine:

1. A user searches for "couch."
2. Your app calls [Expand a search query](generated/synonyms-api/expand-query.api.mdx) with `q=couch` and the synonym set to use.
3. The API returns the terms to search for: "couch," "sofa," "settee," and "divan."
4. Your app searches for all four terms.

## In this section

This section contains the following pages:

- [Quickstart](quickstart.md): create a synonym entry, expand a query with it, then update and delete the entry.
- [Authentication](authentication.md): get an API key or access token, send it with each request, and keep it secure.
- [API reference](generated/synonyms-api/synonyms.tag.mdx): the base URL, request conventions, pagination, errors, rate limits, and every endpoint with its parameters and responses.

The full API definition is also available as an [OpenAPI specification](pathname:///synonyms-api.yaml).
