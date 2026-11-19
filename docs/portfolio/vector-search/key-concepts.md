---
title: Key concepts in vector search
sidebar_label: Key concepts
description: Understand embeddings, vector representations, and the core terms used to explain vector search.
sidebar_custom_props:
  card_icon: img/icons/lightbulb.svg
  card_icon_invert_dark: true
---

Before you read about how vector search works, learn these key concepts.

## Embeddings

An embedding is a vector that encodes the meaning of data. Each vector is a list of floating-point numbers. The model sets the number of dimensions, usually from 128 to 4,096.

Items with similar meaning are close together in the vector space. Unrelated items are farther apart. For example, in a text embedding model, the vector for "Paris" is close to the vector for "France." The vector for "Berlin" is close to the vector for "Germany."

An embedding model can convert the query "a quick brown fox" into this vector:

```
[ 0.231, -0.445,  0.612,  0.178, -0.334,  0.789,
  0.056, -0.223,  0.501,  0.367, -0.612,  0.144,
  0.788, -0.091,  0.423, -0.317]
```

_A 16-dimensional sentence embedding. Most real models use 768 to 3,072 dimensions._

The system then uses cosine similarity to find the nearest neighbors. It can return these results:

| Text                | Similarity |
|---------------------|------------|
| "the fast red fox"  | 0.88       |
| "a speedy brown dog"| 0.81       |
| "brown animals run" | 0.76       |
| "stock market crash"| 0.03       |

## Embedding models

Machine learning models make embeddings. Most of these models are transformer-based neural networks trained on large datasets. Different models work with different data types and use cases.

| Model type | Description and examples |
|---|---|
| **Text** | Converts sentences, paragraphs, or documents into vectors. Examples include OpenAI text-embedding-3, Cohere Embed, and Sentence-BERT. |
| **Image** | Converts images into vectors. Examples include ResNet-based models. |
| **Multimodal** | Converts text and images into vectors in a shared space. This makes cross-modal search possible. Examples include CLIP and ImageBind. |
| **Code** | Converts source code into vectors. An example is CodeBERT. |
| **Audio** | Converts speech or music into vectors. Examples include wav2vec 2.0 and CLAP. |

## Vector databases

A vector database stores large collections of vectors and queries them quickly. Relational databases are optimized for exact matches. Vector databases are optimized for similarity search.

Common vector databases and libraries include:

- **Pinecone:** a managed vector database
- **Weaviate:** an open-source database with built-in vectorization and hybrid search
- **Qdrant:** an open-source database for high performance
- **Milvus:** a distributed database for large workloads
- **pgvector:** a PostgreSQL extension for vector search
- **FAISS:** a library for fast similarity search, not a database
- **Chroma:** a lightweight database that is often used in RAG applications

### Approximate nearest neighbor (ANN) algorithms

Nearest neighbor search finds the data point that is most similar to a query point.

Vector embeddings have many dimensions. In these high-dimensional spaces, exact search is slow and needs a lot of computing power.

Approximate nearest neighbor (ANN) algorithms trade a small amount of accuracy for speed. They do not always find the closest match. Their results are close enough for most use cases. They often return these results in near real time.

| Algorithm | Description and trade-offs |
|---|---|
| **HNSW** | Uses a multi-layer graph structure for fast search. Has high accuracy and speed, but uses more memory. |
| **IVF** | Groups vectors into clusters and searches only the relevant clusters. Is fast, but its accuracy depends on the configuration. |
| **LSH** | Hashes similar vectors into the same buckets. Is very fast, but has lower accuracy. |
| **ScaNN** | Uses quantization and optimized distance scoring. Performs well on large datasets. |
| **PQ** | Compresses vectors to reduce memory usage, but reduces accuracy. Is often combined with IVF. |

## Similarity metrics

The system uses a similarity metric or a distance metric to measure how similar two vectors are. The correct metric depends on the model and the use case.

| Metric | Description |
|---|---|
| **Cosine similarity** | Measures the angle between vectors and ignores their magnitude. Is common for text embeddings. Gives values from -1 to 1. Higher values show greater similarity. |
| **Euclidean distance (L2)** | Measures the straight-line distance between vectors. Lower values show greater similarity. |
| **Dot product** | Measures both direction and magnitude. Is fast to calculate. Is often used in RAG systems. |
| **Hamming distance** | Counts the differences between binary vectors. Is used for compact binary embeddings. |