---
title: Key concepts in vector search
sidebar_label: Key concepts
description: Learn the terms that you need to understand vector search, from vectors and embeddings to similarity metrics and nearest neighbor search.
sidebar_custom_props:
  card_icon: img/icons/lightbulb.svg
  card_icon_invert_dark: true
---

Vector search finds data by meaning, not by exact words. For example, a search for "car" can also find text about "automobile" or "vehicle."

## Terms at a glance

- **[Vector](#vectors-and-embeddings)**: a list of numbers. Each number is a position along one dimension.
- **[Embedding](#vectors-and-embeddings)**: a vector that represents the meaning of data, such as a word, a sentence, or an image.
- **[Vector space](#vectors-and-embeddings)**: the space that one embedding model maps data into. Items with similar meaning are close together in this space.
- **[Embedding model](#embedding-models)**: a machine learning model that converts data into embeddings.
- **[Similarity metric](#similarity-metrics)**: a calculation that shows how close two vectors are.
- **[Vector database](#vector-databases)**: a database that stores embeddings and finds the embeddings that are closest to a query.
- **[Nearest neighbor search](#nearest-neighbor-search)**: a search that finds the vectors that are closest to the query vector.
- **[Approximate nearest neighbor (ANN) search](#nearest-neighbor-search)**: a faster nearest neighbor search that compares the query with only some of the vectors.

## Vectors and embeddings

A vector is a list of numbers. Each number gives a position along one direction, or dimension. For example, a point on a map has two dimensions: latitude and longitude. A vector can have hundreds or thousands of dimensions.

An embedding is a vector that represents the meaning of data. An embedding model makes the embedding. The model sets the number of dimensions. Many models use from 384 to 4,096 dimensions.

For example, an embedding model can convert the text "a quick brown fox" into this vector:

```text
[ 0.231, -0.445,  0.612,  0.178, -0.334,  0.789,
  0.056, -0.223,  0.501,  0.367, -0.612,  0.144,
  0.788, -0.091,  0.423, -0.317]
```

_A 16-dimensional example. Real models use many more dimensions._

A vector space is the space that one embedding model maps data into. All embeddings from one model are in the same vector space. In this space, items with similar meaning are close together. Unrelated items are farther apart.

The positions also show how items are related. For example, "Paris" and "France" are placed in the same pattern as "Berlin" and "Germany," because both pairs are a capital city and its country. The model learns these relationships from its training data.

Embeddings from different models are in different vector spaces, even when the models use the same number of dimensions. Each model places meaning in its own way, so you can't compare their embeddings.

To find similar text, the system compares vectors in the same vector space. For more information, see [Similarity metrics](#similarity-metrics).

## Embedding models

An embedding model is a machine learning model that converts data into embeddings. Most embedding models are transformer-based neural networks. A transformer is a type of neural network that reads each word in the context of the full input. For example, it can tell the difference between "bank" in "river bank" and "bank" in "bank account." These models learn from large collections of text, images, or code.

Each model works with one data type or with a set of data types. For example, a text model works with documents. A multimodal model can find images with a text query.

<details>
<summary>Embedding model types and examples</summary>

The following table lists common model types. The examples are current as of 2026.

| Model type | Description and examples |
|---|---|
| **Text** | Converts sentences, paragraphs, or documents into vectors. Examples include OpenAI text-embedding-3, Cohere Embed, and Sentence-BERT. |
| **Image** | Converts images into vectors. Examples include ResNet-based models. |
| **Multimodal** | Converts text and images into vectors in a shared vector space. This makes cross-modal search possible, for example, a search for images with a text query. Examples include CLIP and ImageBind. |
| **Code** | Converts source code into vectors. An example is CodeBERT. |
| **Audio** | Converts speech or music into vectors. Examples include wav2vec 2.0 and CLAP. |

</details>

## Similarity metrics

A similarity metric is a calculation that shows how close two vectors are. Some metrics give a similarity score. A higher score shows a closer match. Other metrics give a distance. A lower distance shows a closer match.

Text search most often uses cosine similarity. Cosine similarity measures the angle between two vectors. It doesn't use the length of the vectors. Scores go from -1 to 1. A score near 1 shows that the meanings are very similar.

For example, the system compares the vector for "a quick brown fox" with other vectors. It can return cosine similarity scores like these:

| Text                | Similarity |
|---------------------|------------|
| "the fast red fox"  | 0.88       |
| "a speedy brown dog"| 0.81       |
| "brown animals run" | 0.76       |
| "stock market crash"| 0.12       |

The first three texts are about animals, so their scores are high. "Stock market crash" has no relation to the query, so its score is much lower.

Use the metric that the documentation of your embedding model recommends.

<details>
<summary>Common similarity metrics</summary>

| Metric | Description |
|---|---|
| **Cosine similarity** | Measures the angle between two vectors and ignores their length. Higher scores show greater similarity. It's the most common metric for text embeddings. |
| **Euclidean distance (L2)** | Measures the straight-line distance between two vectors. Lower values show greater similarity. |
| **Dot product** | Multiplies the matching numbers in two vectors and adds the results. It uses both the direction and the length of the vectors, and it's fast to calculate. If all vectors have a length of 1, it gives the same ranking as cosine similarity. |
| **Hamming distance** | Counts the positions where two binary vectors are different. A binary vector contains only 0s and 1s, so it uses less memory. |

</details>

## Vector databases

A vector database stores embeddings and finds the embeddings that are closest to a query. A relational database, such as PostgreSQL or MySQL, finds exact matches. For example, it finds all rows where the city is "Paris." A vector database finds similar matches. For example, it finds the documents that are closest in meaning to "trips to France."

Most vector databases also store the original data or metadata with each vector. Then a search can return the matching documents, not only their vectors.

<details>
<summary>Common vector databases</summary>

These vector databases and libraries are common:

- **Pinecone**: a managed vector database
- **Weaviate**: an open-source database that can create embeddings for you and combine keyword search with vector search
- **Qdrant**: an open-source database for high performance
- **Milvus**: a distributed database for large workloads
- **pgvector**: a PostgreSQL extension for vector search
- **FAISS**: a library for fast similarity search, not a database
- **Chroma**: a lightweight database that is often used in [retrieval-augmented generation (RAG)](use-cases.md#retrieval-augmented-generation-rag) applications

</details>

## Nearest neighbor search

Nearest neighbor search finds the vectors that are closest to the query vector. These vectors are the nearest neighbors. Their data is the most similar to the query.

To find the exact nearest neighbors, the system must compare the query with every vector. For a few thousand vectors, this comparison is fast. For millions of vectors, it can be too slow.

Approximate nearest neighbor (ANN) search is faster. It compares the query with only some of the vectors. Its results aren't always the closest matches, but they're close enough for most use cases. Most vector databases use ANN search.

<details>
<summary>Common ANN methods and tools</summary>

| Method or tool | Description |
|---|---|
| **HNSW** | Hierarchical Navigable Small World. Connects similar vectors in a graph with layers. It's fast and accurate, but uses more memory. Many vector databases use it by default. |
| **IVF** | Inverted File Index. Puts similar vectors into clusters and searches only the closest clusters. It's fast, but can miss matches in other clusters. |
| **LSH** | Locality-Sensitive Hashing. Puts similar vectors into the same groups, called buckets. It's very fast, but less accurate. |
| **PQ** | Product Quantization. Stores a shorter, approximate version of each vector to use less memory. It's less accurate and is often used with IVF. |
| **ScaNN** | Scalable Nearest Neighbors. A library from Google that combines compression and fast search. It works well on large datasets. |

</details>

## Next steps

- To learn how indexing and querying work, see [How vector search works](how-it-works.md).
- To learn how applications use vector search, see [Common uses of vector search](use-cases.md).
