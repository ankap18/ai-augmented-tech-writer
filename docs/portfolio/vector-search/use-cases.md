# Common uses of vector search

Vector search is commonly used in modern AI systems. It helps applications find relevant content even when keywords do not match.

## Retrieval-augmented generation (RAG)

When building an LLM-powered application that answers questions from a private knowledge base, vector search retrieves the most relevant document chunks and adds them to the model context.

**Example:**   
A company's internal assistant takes a user question, converts it into a vector, retrieves the top five most similar paragraphs from internal wikis and policy documents, and adds them to the prompt before sending it to the LLM.

## Semantic document search

Enterprise search systems use vector search to help employees find documents based on concepts rather than keywords. For example, a query for "employee leave policy" can return documents about vacation, paid time off (PTO), and sabbaticals, even if they do not include the exact phrase "leave policy."

## Recommendation systems

E-commerce and media platforms represent products, articles, songs, and user interactions as vectors. The system compares these vectors to a user’s preference vector to generate personalized recommendations.

- **Spotify:** Uses song vectors based on listening patterns to generate weekly recommendations.  
- **Amazon:** Uses product vectors from purchase and browsing history to suggest related items.  
- **Netflix:** Uses movie vectors aligned with user preferences to personalize the home feed.

## Image and multimodal search scenarios

Visual search applications help users find images similar to an uploaded photo. Multimodal models enable cross-modal queries, such as searching an image database using text or finding text documents related to an image.

**Examples:**

- **Pinterest visual search:** Upload a photo of furniture and find visually similar items for sale.  
- **Google Lens:** Identify objects, translate text, and find similar products using image vectors.  
- **Medical imaging:** Retrieve similar radiology scans from a database to support diagnosis.

## Anomaly detection and cybersecurity

Systems can represent network traffic, user behavior, and logs as vectors and compare them with typical patterns. Events that differ significantly from normal patterns are flagged as potential anomalies or threats.

## Duplicate and near-duplicate detection

News aggregators, content moderation platforms, and data processing pipelines use vector similarity to identify near-duplicate content. Two articles about the same event can have similar vectors even if the wording differs.

## Code search

Developer tools represent code functions and snippets as vectors. A developer can describe a task in plain language, such as "function to parse a JSON file and handle missing keys," and the system returns relevant code examples from a codebase or documentation.