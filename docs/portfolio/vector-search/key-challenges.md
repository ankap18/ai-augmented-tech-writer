---
title: Key challenges of running vector search in production
sidebar_label: Challenges
description: Understand the trade-offs that vector search systems face in production, from embedding drift and index tuning to filtering, evaluation, and security.
sidebar_custom_props:
  card_icon: img/icons/list-checks.svg
  card_icon_invert_dark: true
---

A vector search system can seem simple in a prototype. In production, it often has more challenges. This page describes the most common challenges and their trade-offs.

## Embedding quality and drift

The embedding model sets what "similar" means. The quality of the search results depends on the model that you choose. It also depends on the style of your content and on how well the model knows your language and domain.

If you change the embedding model, re-embed and re-index your data. You cannot compare vectors from different models. An index that mixes them gives inconsistent results.

## Index configuration trade-offs

Approximate nearest neighbor (ANN) indexes trade some accuracy for speed and lower cost. When you configure an ANN index, think about these trade-offs:

- **Recall versus latency**: recall is the percentage of relevant results that a search returns. Higher recall usually needs more computing power for each query. This increases latency.
- **Memory footprint**: some index types, such as Hierarchical Navigable Small World (HNSW) graphs, are fast but use more memory.
- **Build time versus query time**: faster queries can need more time to build the index.

## Filters, metadata, and hybrid search

Real applications often need filters, such as "only within this tenant," "only documents from the last 30 days," or "only items in stock." These filters can affect ANN search in ways that are not obvious. For example, a filter that the system applies after the search can remove most of the nearest neighbors. Then too few results are left.

Many systems combine these methods:

- **Vector similarity**: finds matches by meaning.
- **Keyword search**: finds exact terms. It often uses BM25, a standard keyword-ranking algorithm.
- **Metadata filters**: apply business rules.

*Hybrid search* combines keyword search with vector search.

## Chunking for retrieval-augmented generation

In retrieval-augmented generation (RAG) pipelines, the way that you split documents into chunks has a large effect on the results. Three decisions are important: the chunk size, the overlap between chunks, and the metadata that you attach to each chunk. Examples of metadata are titles, section names, and URLs. These decisions affect the relevance of the search results and the quality of the generated answers.

## Evaluation and monitoring

Most systems need both offline and online evaluation:

- **Offline evaluation**: uses prepared sets of test queries, relevance judgments, latency benchmarks, and metrics such as recall@k. Recall@k is the percentage of relevant results that appear in the top *k* results.
- **Online evaluation**: uses user feedback, A/B tests, and monitoring to find regressions.

## Security, privacy, and multi-tenancy

An attacker can sometimes recover sensitive information from an embedding, such as parts of the original text. Production systems usually need these controls:

- **Tenant isolation**: keeps each customer's data separate.
- **Query-time access controls**: check permissions when each query runs, not only when you index the data.
- **Retention and deletion workflows**: remove data when necessary, including the vectors in each index.
