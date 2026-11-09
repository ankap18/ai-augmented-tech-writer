---
title: Key challenges of running vector search in production
sidebar_label: Challenges
description: Understand the trade-offs that vector search systems face in production, from embedding drift and index tuning to filtering, evaluation, and security.
sidebar_custom_props:
  card_icon: img/icons/list-checks.svg
  card_icon_invert_dark: true
---

Vector search systems can feel "plug and play" during prototyping, but production deployments surface recurring challenges. This page describes the most common ones and the trade-offs involved.

## Embedding quality and drift

The embedding model determines what "similar" means. Model choice, the style of your content, and the model's coverage of your language and domain all affect retrieval quality.

If you change or upgrade the embedding model, re-embed and re-index your data. Vectors from different models aren't comparable, so an index that mixes them returns inconsistent results.

## Index configuration trade-offs

Approximate nearest neighbor (ANN) indexes trade some accuracy for speed and lower cost. Common tuning decisions include the following:

- **Recall versus latency**: recall is the share of relevant results that a search returns. Higher recall usually requires more compute for each query, which increases latency.
- **Memory footprint**: some index types, such as Hierarchical Navigable Small World (HNSW) graphs, are fast but use a lot of memory.
- **Build time versus query time**: faster queries can require longer index builds.

## Filtering, metadata, and hybrid retrieval

Real applications often need constraints such as "only within this tenant," "only documents from the last 30 days," or "only items in stock." These filters can interact with ANN search in ways that aren't obvious. For example, a filter applied after the search can remove most of the nearest neighbors and leave too few results.

Many systems combine the following methods:

- **Vector similarity**: finds semantic matches.
- **Keyword search**: finds exact terms, often with BM25, a standard keyword-ranking algorithm. A system that combines keyword search with vector search uses *hybrid search*.
- **Metadata filters**: apply business rules.

## Chunking for retrieval-augmented generation

In retrieval-augmented generation (RAG) pipelines, the way you split documents into chunks has a large effect on results. Chunk size, the overlap between chunks, and the metadata that you attach to each chunk, such as titles, section names, and URLs, affect both retrieval relevance and the quality of the generated answers.

## Evaluation and monitoring

Most systems need both offline and online evaluation:

- **Offline evaluation**: uses curated query sets, relevance judgments, latency benchmarks, and metrics such as recall@k, the share of relevant results that appear in the top *k* results.
- **Online evaluation**: uses user feedback, A/B tests, and monitoring to catch regressions.

## Security, privacy, and multi-tenancy

Embeddings can leak sensitive information about the text that they represent. Production systems commonly require the following:

- **Tenant isolation**: keeps each customer's data separate.
- **Query-time access controls**: check permissions when each query runs, not only when you index the data.
- **Retention and deletion workflows**: remove data when required, including the vectors in each index.
