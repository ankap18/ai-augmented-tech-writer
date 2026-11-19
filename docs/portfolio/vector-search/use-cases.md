---
title: Common uses of vector search
sidebar_label: Common uses
description: Explore how vector search supports retrieval-augmented generation, semantic search, recommendations, and more.
sidebar_custom_props:
  card_icon: img/icons/layout-grid.svg
  card_icon_invert_dark: true
---

Many AI systems use vector search. It helps applications find relevant content, even when the keywords do not match.

## Retrieval-augmented generation (RAG)

Some LLM-powered applications answer questions from a private knowledge base. In these applications, vector search finds the most relevant document chunks. Then the application adds these chunks to the model context.

**Example:**   
A company's internal assistant converts a user question into a vector. It finds the five most similar paragraphs in the company's wikis and policy documents. Then it adds these paragraphs to the prompt. Finally, it sends the prompt to the LLM.

## Semantic document search

Enterprise search systems use vector search to help employees find documents by meaning instead of by keyword. For example, a query for "employee leave policy" can find documents about vacation, paid time off (PTO), and sabbaticals. These documents do not have to include the exact phrase "leave policy."

## Recommendation systems

E-commerce and media platforms convert products, articles, songs, and user interactions into vectors. The platform compares these vectors with a vector of the user's preferences. Then it recommends the most similar items.

- **Spotify:** Uses song vectors from listening history to make weekly recommendations.
- **Amazon:** Uses product vectors from purchase and browsing history to suggest related items.
- **Netflix:** Uses movie vectors that match user preferences to personalize the home page.

## Image and multimodal search

Visual search applications help users find images that are similar to an uploaded photo. Multimodal models make cross-modal queries possible. For example, a user can search an image database with text, or find text documents about an image.

**Examples:**

- **Pinterest visual search:** Lets users upload a photo of furniture and find similar items for sale.
- **Google Lens:** Uses image vectors to identify objects and find similar products.
- **Medical imaging:** Finds similar radiology scans in a database to help doctors make a diagnosis.

## Anomaly detection and cybersecurity

A system can convert network traffic, user behavior, and logs into vectors. Then it compares these vectors with normal patterns. If an event is very different from the normal patterns, the system marks it as a possible anomaly or threat.

## Duplicate and near-duplicate detection

News aggregators, content moderation platforms, and data pipelines use vector similarity to identify near-duplicate content. Two articles about the same event can have similar vectors, even if they use different words.