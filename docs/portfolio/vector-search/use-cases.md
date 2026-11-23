---
title: Common uses of vector search
sidebar_label: Common uses
description: Learn how applications use vector search for retrieval-augmented generation, semantic search, recommendations, image search, anomaly detection, and duplicate detection.
sidebar_custom_props:
  card_icon: img/icons/layout-grid.svg
  card_icon_invert_dark: true
---

Vector search finds content by meaning, even when the keywords don't match. This page describes six common uses of vector search, each with an example.

## Retrieval-augmented generation (RAG)

Some applications that use a large language model (LLM) answer questions from a private knowledge base. These applications split their documents into chunks, which are short passages, and store a [vector](key-concepts.md#vectors-and-embeddings) for each chunk. When a user asks a question, vector search finds the chunks that are most relevant to the question. The application adds these chunks to the prompt, so that the LLM can answer from them.

:::example

A company's internal assistant answers a question in the following steps:

1. An embedding model converts the user's question into a vector.
2. Vector search finds the five most similar paragraphs in the company's wikis and policy documents.
3. The assistant adds these paragraphs to the prompt.
4. The assistant sends the prompt to the LLM, which writes the answer.

:::

## Semantic document search

Enterprise search systems use vector search to help employees find documents by meaning instead of by keyword.

:::example

An employee searches for "employee leave policy." The search finds documents about vacation, paid time off, and sabbaticals. These documents don't have to include the exact phrase "leave policy."

:::

## Recommendation systems

Ecommerce and media platforms convert items, such as products, articles, and songs, into vectors. The platform builds a vector of each user's preferences from the items that the user viewed, bought, or played. Then it recommends the items with vectors that are closest to the preference vector.

:::example

A music streaming app builds a preference vector from the songs that a user plays most often. Each week, it recommends songs that the user hasn't played yet, with vectors that are close to the preference vector.

:::

## Image and multimodal search

Visual search applications help users find images that are similar to an uploaded photo. Multimodal [embedding models](key-concepts.md#embedding-models) put text and images in the same vector space, so a user can search for images with text, or find text about an image.

:::example

A user uploads a photo of a chair to a furniture store's website. The store converts the photo into a vector and shows the products with the closest image vectors. The user can also type "red velvet armchair" to find product photos that match the text.

:::

## Anomaly detection

Security and monitoring systems convert network traffic, user behavior, and logs into vectors. They compare each new vector with vectors of normal activity. If a new vector is far from all of them, the system flags the event as a possible anomaly or threat.

:::example

A bank converts each sign-in into a vector from the time, the location, and the device. A sign-in at 3:00 AM from a new country on an unknown device is far from the user's normal sign-ins, so the bank asks the user for extra verification.

:::

## Duplicate and near-duplicate detection

News aggregators, content moderation platforms, and data pipelines use vector search to find near-duplicate content. Two items about the same subject have similar vectors, even if they use different words.

:::example

A news aggregator receives two articles about the same election result from different publishers. The articles use different words, but their vectors are close, so the aggregator shows them as one story.

:::

## Next steps

- To learn the problems that vector search systems face in production, see [Key challenges of running vector search in production](key-challenges.md).
- To learn how the indexing and querying phases work, see [How vector search works](how-it-works.md).
