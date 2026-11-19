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

import DocCardList from '@theme/DocCardList';

# Vector search overview

Vector search finds data by similarity in meaning instead of by exact keyword matches.

An embedding model converts content, such as text, images, or audio, into lists of numbers called vectors. These vectors encode the meaning of the data. In the vector space, items with similar meaning are close together. Unrelated items are farther apart.

When a user sends a query, the system converts the query into a vector. Then the system finds the most similar items in a vector database.

AI applications such as semantic search, recommendation systems, and retrieval-augmented generation (RAG) use vector search.

## What you will learn

In this section, you will learn:

- What vector search is and why AI systems use it
- How vectors encode meaning
- How vector databases find similar items
- The two phases of vector search: indexing and querying
- Common uses, such as RAG and recommendation systems
- The main challenges of vector search in production

## In this section

<DocCardList />