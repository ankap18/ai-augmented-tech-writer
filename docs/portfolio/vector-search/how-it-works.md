---
title: How vector search works
sidebar_label: How it works
description: Learn how the indexing and querying phases of vector search turn your data and a user's query into search results.
sidebar_custom_props:
  card_icon: img/icons/workflow.svg
  card_icon_invert_dark: true
---

This page assumes that you know the terms in [Key concepts](key-concepts.md).

A vector search system works in two phases:

- **Indexing**: the system converts your data into vectors and stores them. This phase runs before any search. It runs again for new or changed data.
- **Querying**: the system converts a user query into a vector and finds the closest stored vectors. This phase runs on each search.

:::note

Both phases must use the same embedding model. Embeddings from different models are in different [vector spaces](key-concepts.md#vectors-and-embeddings), so the system can't compare them.

:::

The following diagram shows both phases:

![Diagram of the indexing and querying phases of vector search.](/img/vector-search-phases-light.svg#gh-light-mode-only)![Diagram of the indexing and querying phases of vector search.](/img/vector-search-phases-dark.svg#gh-dark-mode-only)

## Phase 1: Indexing

During indexing, the system prepares the data for fast search in the following steps:

1. An embedding model converts each item, such as a document, an image, or a product, into a vector. A long document is usually split into chunks first, and each chunk gets its own vector.
2. The system stores each vector in a vector database. With each vector, it stores a reference to the original item, such as an ID or a URL.
3. The system builds or updates an index with an [approximate nearest neighbor (ANN)](key-concepts.md#nearest-neighbor-search) algorithm. The index makes search fast. Many vector databases update the index each time that they store a new vector.

## Phase 2: Querying

During querying, the system finds the items that are most similar to the query in the following steps:

1. The embedding model from the indexing phase converts the user query into a vector. The query can be text, an image, or other data.
2. The system uses ANN search to find the *k* stored vectors that are closest to the query vector, where *k* is the number of results, for example, 10.
3. The system uses the references to return the original items.

Many systems also apply filters, such as "only items in stock," to the results. For more information, see [Filters and keyword matches](key-challenges.md#filters-and-keyword-matches).

## Example: Search a help center

A help center has 1,000 short articles. The system has already indexed them: it converted each article into a vector and stored the vectors in a vector database.

A user searches for "I can't log in." The system converts the query into a vector and runs an ANN search with *k* = 3. The search returns the following articles, starting with the closest match:

1. Reset your password
2. Unlock your account
3. Set up two-step verification

None of these articles contains the words "log in." For example, "Reset your password" explains what to do when you forget your password and can't sign in. A keyword search for "I can't log in" would miss it. Vector search finds it because the query vector and the article vector are close: the query and the article have similar meanings. The other two results are also about problems with signing in.

## Next steps

- To learn how applications use vector search, see [Common uses of vector search](use-cases.md).
- To learn the problems that vector search systems face in production, see [Key challenges of running vector search in production](key-challenges.md).
