
# How vector search works

A vector search system operates in two phases: indexing and querying.

![Diagram showing the two phases of vector search: indexing (data → vectors → index) and querying (query → vector → ANN search → results)](/img/vector-search-phases.png)

## Phase 1: Indexing

During indexing, the system prepares data for fast retrieval.

1. Input data, such as documents, images, or products, is processed by an embedding model.  
2. The model converts each item into a vector.  
3. The system stores vectors in an index, along with references to the original data.  
4. The index is optimized using an approximate nearest neighbor (ANN) algorithm.  

## Phase 2: Querying

During querying, the system finds the most similar items.

1. The system processes a user query (text, image, or other input) using the same embedding model.  
2. The model converts the query into a vector.  
3. The system compares the query vector with stored vectors.  
4. The system returns the top *k* most similar results.  
5. The system retrieves the original data associated with those results.  

## Vector search pipeline summary

A typical vector search system follows this pipeline:

```
Data → Embedding model → Vector index → ANN search → Top-k results
```

1. Convert data into vectors.  
2. Store vectors in an index.  
3. Convert the user query into a vector.  
4. Perform similarity search.  
5. Return the most similar items.  