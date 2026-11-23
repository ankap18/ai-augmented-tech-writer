---
title: Vector search overview
sidebar_label: Overview
description: Learn how vector search retrieves content by semantic similarity and where it is used in AI systems.
summary: Learn how vector search works and where it is used in AI systems
content-type: concept
product: portfolio
audience: AI developers, ML engineers, and backend engineers
level: intermediate
prerequisites:
  - Basic understanding of machine learning concepts
  - Familiarity with APIs and databases
---

# Vector search overview

Vector search finds data by similarity in meaning instead of by exact keyword matches. The system converts content and queries into vectors, which are lists of numbers that encode meaning. Then it finds the stored vectors that are closest to the query vector.

AI applications such as semantic search, recommendation systems, and retrieval-augmented generation (RAG) use vector search.

## In this section

This section contains the following pages:

- [Key concepts](key-concepts.md): vectors, embeddings, embedding models, similarity metrics, vector databases, and nearest neighbor search
- [How it works](how-it-works.md): the two phases of vector search, indexing and querying, with an example
- [Common uses](use-cases.md): RAG, semantic search, recommendations, multimodal search, anomaly detection, and duplicate detection
- [Challenges](key-challenges.md): model quality, speed and cost, filters, chunking, quality checks, and data security in production