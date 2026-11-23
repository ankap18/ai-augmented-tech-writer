---
title: Key challenges of running vector search in production
sidebar_label: Challenges
description: Learn about common problems of vector search in production and what you can do about them, from choosing a model to keeping data secure.
sidebar_custom_props:
  card_icon: img/icons/list-checks.svg
  card_icon_invert_dark: true
---

A vector search system can work well in a small prototype and still have problems when real users depend on it. This page describes six common challenges and what you can do about each one.

## Embedding model quality

The embedding model decides which items count as similar, so the model has the largest effect on the quality of your results. A model that works well with general web text can work poorly with your content, for example, legal contracts, medical notes, or a language that the model rarely saw during training.

For example, a general model might not know that "MI" and "heart attack" mean the same thing in medical notes. A search for "heart attack" then misses the notes that only say "MI."

Before you choose a model, test a few models with real questions from your users. If you switch to another model later, convert all your data again with the new model and rebuild the index. Vectors from different models can't be compared, so an index that mixes them returns unreliable results.

## Speed, accuracy, and cost

To answer quickly, vector databases use approximate nearest neighbor (ANN) search, which compares the query with only part of the data. The settings of the ANN index decide the balance between three things:

- **Accuracy**: how many of the best matches the search finds. This measure is called *recall*.
- **Speed**: how long each search takes. This measure is called *latency*.
- **Cost**: how much memory and computing power the system needs.

You can usually improve one or two of these, but not all three. For example, settings that find more of the best matches also make each search slower. Some fast index types, such as HNSW, need a lot of memory.

Decide which of the three matters most for your application. For example, a chat assistant needs fast answers, but a legal research tool needs to find every relevant document, even if the search takes longer.

## Filters and keyword matches

Vector search finds items by meaning, but real applications also need exact rules. For example, an online store shows only the items that are in stock, and a business application shows each customer only their own data. These rules are called filters.

Filters can give unexpected results. If the system runs the vector search first and applies the filter afterward, the filter can remove most of the results. For example, a search returns the 10 closest products, and then the in-stock filter removes 8 of them. The user sees only 2 results, even though the store has many similar products in stock. Many vector databases can apply the filter during the search instead, which avoids this problem.

Vector search can also miss exact terms, such as product codes, error codes, or names. A search for "error 0x80070005" needs that exact code, not text with a similar meaning. Many systems solve this problem with *hybrid search*: they run a keyword search and a vector search, and then combine the results.

## Document chunks for RAG

A retrieval-augmented generation (RAG) application answers questions with a large language model (LLM). It splits long documents into short passages, called chunks, and searches the chunks instead of whole documents. The way that you split the documents affects both the search results and the answers that the LLM writes. Three decisions matter most:

- **Chunk size**: small chunks are precise but can lose context. Large chunks keep context but can mix several topics, so they match questions less precisely.
- **Overlap**: chunks that repeat a few sentences from the chunk before them are less likely to cut an idea in half.
- **Metadata**: information that you store with each chunk, such as the document title, the section name, and the URL, helps the system find the right chunk. It also lets the application link to the source.

## Search quality checks

Search results can get worse without anyone noticing, for example, after you add new content or change a setting. To catch problems, check the quality of your search in two ways:

- **Before each release**: run a fixed set of test questions that have known correct answers, and count how many correct answers appear in the top results. This measure is called *recall@k*, where *k* is the number of top results that you check. Also measure how long each search takes.
- **After each release**: watch how real users react, for example, whether they click the results or rephrase their search. To compare two versions of your system, show each version to a different group of users. This method is called an *A/B test*.

## Data security and privacy

Vectors look like lists of random numbers, but they aren't anonymous. In some cases, an attacker who gets the vectors can rebuild parts of the original text. Protect vectors in the same way as the original data:

- **Keep each customer's data separate**: one customer's search must never return another customer's documents.
- **Check permissions on every search**: when a user loses access to a document, the document must disappear from their results right away, not only after you update the index.
- **Delete vectors with the data**: when you delete a document, also delete its vectors from every index. Otherwise, the search can still return the deleted content.

## Next steps

- To review the terms on this page, see [Key concepts in vector search](key-concepts.md).
- To learn how indexing and querying work, see [How vector search works](how-it-works.md).
