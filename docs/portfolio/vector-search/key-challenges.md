
# Key considerations and challenges

Vector search systems can feel “plug and play” during prototyping, but production deployments surface recurring challenges.

## Embedding quality and drift

Embedding models determine what “similar” means. Model choice, prompt/style of content, and language/domain coverage all affect retrieval quality. If you change the embedding model (or even upgrade it), you may need to **re-embed and re-index** your data to avoid inconsistent results.

## Index configuration trade-offs

Approximate nearest neighbor (ANN) indexes trade recall for speed and cost. Common tuning decisions include:

- **Recall vs latency**: higher recall typically means more compute per query.
- **Memory footprint**: some index types (for example, HNSW) can be fast but memory-heavy.
- **Build time vs query time**: faster queries can require longer indexing builds.

## Filtering, metadata, and hybrid retrieval

Real applications often need constraints such as “only within this tenant,” “only documents from last 30 days,” or “only items in stock.” These filters can interact with ANN search in non-obvious ways. Many systems combine:

- **Vector similarity** for semantic matching
- **Keyword/BM25** for exact terms (hybrid search)
- **Metadata filters** for business rules

## Chunking and context boundaries (for RAG)

For RAG pipelines, the way you split documents into chunks can dominate performance. Chunk size, overlap, and how you attach metadata (titles, sections, URLs) impact both retrieval relevance and downstream answer quality.

## Evaluation and monitoring

You usually need both offline and online evaluation:

- **Offline**: curated query sets, relevance judgments, recall@k, and latency benchmarks.
- **Online**: user feedback loops, A/B tests, and monitoring for regressions.

## Security, privacy, and multi-tenancy

Embeddings can leak sensitive signals about the underlying text. Production systems commonly require:

- strict **tenant isolation**
- access controls enforced at query time
- data retention and deletion workflows (including removing vectors from indexes)

