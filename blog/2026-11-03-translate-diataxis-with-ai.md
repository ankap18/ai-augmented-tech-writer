---
title: Translating Diátaxis with AI, part 1
description: How I translate Diátaxis into Ukrainian with Claude and Gemini, and why a translation with the right words can still sound wrong.
authors: [annako]
tags: [ai, localization, diataxis]
---

A translation can contain all the right words and still sound robotic, or fail to make sense in Ukrainian. I'm translating the Diátaxis documentation framework into Ukrainian with AI, and that gap between correct and natural is where most of my time goes.

This is part 1. I'm still iterating on the workflow, the prompts, and the translations themselves, so treat it as notes from the middle of the work, not a finished recipe.

<!-- truncate -->

## Why Diátaxis

[Diátaxis](https://diataxis.fr/) is a framework for structuring technical documentation into four kinds: tutorials, how-to guides, reference, and explanation. Translating it is a way to read it more closely than I ever would as a reader.

The project is open to translators. The [translation page](https://diataxis.fr/translation/) explains how it works:

- **Platform** — all translation happens on Transifex. You join the team for your language and can translate only that language.
- **Starting point** — the *Start here* page comes first. It sets the terms and word forms the rest of the translation follows.
- **Meaning over wording** — the author cares more about the meaning and force of the ideas than about literal accuracy. Idiomatic phrasing and native metaphors are welcome.
- **No borrowed terms** — translators should find a native word for key terms such as "how-to" instead of keeping the English one, even if it's common in their language.
- **Context** — string-by-string work causes tunnel vision, so keep the whole page in mind.
- **Collaboration** — several people can translate the same language. Fix clear errors directly, but discuss matters of style and judgment on the Transifex forum or with the author first.

That guidance shaped everything below. "Meaning over wording" is exactly the thing AI struggles with most.

## Getting familiar with Transifex

[Transifex](https://www.transifex.com/) is a localization platform. To get access, I joined the Diátaxis team and chose Ukrainian as my language. Transifex lets you view every language, but you can translate only the ones you joined.

The source is split into resources, one per page, and each resource into strings, usually a sentence or a paragraph. You save a string and it's marked as translated.

Transifex has an [MCP server](https://help.transifex.com/en/articles/15970082-transifex-mcp-server), so I hoped to connect it to Claude directly. It turns out the server manages translation tasks, not the translation itself, so it didn't help here.

## My setup

I'm comparing two assistants:

- **Claude** — a project in Claude Pro, with the glossary and a style guide in the project instructions. I tried Sonnet 5.5, Opus 4.7, and Opus 5.5. I didn't notice a big difference, so I moved to Sonnet, which is cheaper.
- **Gemini** — a regular chat in the free version, with the model set to Auto and my instructions in the prompt.

I keep adjusting the Gemini prompt and the Claude project instructions depending on how each model performs.

## The glossary

Before any translation project, you need a glossary, and you need to use it consistently. You also need to read the whole page or section first, to check that your chosen terms work in context and not just in a list.

My choices for the four kinds of documentation:

- **Tutorial** — навчальна інструкція, a teaching instruction. I'm still considering alternatives, though. I might end up transliterating the term as "туторіал," even though the Diátaxis page asks for a native one. I plan to discuss it with my fellow tech writers first.
- **How-to guide** — практична інструкція, a practical instruction. It pairs with the tutorial: both are instructions, and the adjective shows the difference between learning and getting work done.
- **Reference** — довідник, the word for a reference book or handbook.
- **Explanation** — пояснення, a direct equivalent.

Choosing a term is only half the job. Ukrainian nouns change form by case and number, so a term rarely appears in its dictionary form. In the Diátaxis compass, for example, "a tutorial" becomes "навчальних інструкцій," in the genitive plural, because of the sentence it fits into. A glossary entry can't cover every form, so I check consistency by meaning, not by exact string match.

## How I work with AI

I tried two ways of working.

### Round 1: string by string

At first, I pasted strings from the Transifex editor into the chat one at a time and copied the result back. This works, but each string arrives without its neighbors, which is exactly the tunnel vision the Diátaxis translation page warns about. The model can't see that a term in this sentence was translated differently three strings ago.

### Round 2: whole PO files

For the second round, I downloaded PO files from Transifex and gave the AI the whole file. A PO file is a plain-text file that stores each source string next to its translation (see [Key terms](#key-terms)).

<img
  src={require('@site/static/img/blog/translate-diataxis-with-ai/download-po-files.png').default}
  alt="Transifex resource dialog with the Download file to translate and Upload file links"
  width="80%"
/>

Transifex also offers XLIFF, a format built for translation tools, but it's a paid feature on my plan (the starred links). PO files are free and work well enough.

With Claude, I turned this into a skill. It works through the whole file, generates a few alternatives for each entry, picks the best one, and then shows me the strings one at a time. For each, I answer with a short reply:

- **`ok`** — accept the translation.
- **`alt`** — show me other options.
- **`why`** — explain the choice.
- **`= text`** — use my own translation instead.

I can also accept a range at once, such as `7–15 ok`, and say `done` to get the finished file back for upload.

The whole-file approach has clear benefits:

- **Context** — the model sees the whole page, so it can spot where the same or a similar term appeared earlier and suggest updates for consistency.
- **Review in one place** — I don't switch between the chat and the Transifex editor for every string.

The cost is a much bigger context, which uses more resources and hits Pro limits faster.

## What goes wrong with translations

Here are the issues I found. I asked Claude to suggest what causes each one. Its answers are guesses, not facts: neither of us can see inside the models, and I haven't verified them.

### Word-for-word structure

This is the problem I see most often. The words are right, but the sentence follows English grammar.

![Claude review card for entry 48 with the awkward parts of the Ukrainian translation underlined, and my rewrite below](/img/blog/translate-diataxis-with-ai/bad-translation.png)

The source is: "You will certainly not expect to find, for example, recipes or marketing claims mixed up with this information." Claude's version has three problems:

- **"напевно" for "certainly"** — in Ukrainian, "напевно" means "probably," so the translation weakens the claim. I used "точно."
- **"змішані з цією інформацією"** — a participle phrase that mirrors "mixed up with." It's grammatical, but no one talks like that. I moved it to the front as "поруч із цією інформацією," next to this information.
- **"заяви" for "claims"** — technically correct, but "обіцянки," promises, is what Ukrainians say about marketing.

**Claude's guess at the cause:** the model keeps the source's word order and maps each phrase to its most likely equivalent. English uses participle phrases freely, and Ukrainian prefers a different structure, so a phrase-by-phrase mapping sounds translated. "Certainly" and "напевно" probably sit close together in the model's training data because they often appear in similar positions, even though they mean different things.

### Broken grammar

Sometimes the model blends two constructions into one that doesn't exist.

![Gemini translation with the phrase "який може бути сенс" underlined](/img/blog/translate-diataxis-with-ai/wrong-grammar.png)

The source says explanation is "the only kind of documentation that it might make sense to read in the bath." Gemini wrote "який може бути сенс читати," which mixes two correct phrases, "який має сенс читати" (that makes sense to read) and "може бути" (might be), into one that doesn't parse. A natural version is "який, можливо, має сенс читати у ванні."

**Claude's guess at the cause:** "might make sense" is an idiom, and the model translated "might" and "make sense" separately and then glued them together. Each half is valid on its own, so nothing flags the result as wrong.

### Invented words

This one surprised me most.

![Gemini translation with the non-existent word "іншіспективи" underlined](/img/blog/translate-diataxis-with-ai/invented-words.png)

Gemini wrote "іншіспективи," which isn't a Ukrainian word. When I searched for it, Google's own AI Overview said the word isn't standard Ukrainian and looks like a typo or an autocorrect error.

![Google AI Overview explaining that "іншіспективи" is not a standard Ukrainian word](/img/blog/translate-diataxis-with-ai/gemini-about-invented-word.png)

The intended phrase was "інші перспективи," other perspectives. The model merged the two words into one.

**Claude's guess at the cause:** models don't read whole words. They read tokens, which are often fragments of words, and Ukrainian gets split into more and smaller fragments than English. If the model drops the boundary between "інші" and "перспективи," it produces a plausible-looking chain of fragments that isn't a word. Spell checkers catch this kind of error easily, but people skimming a translation don't.

### Confident wrong choices

Sometimes the model suggests a correct-looking word, and only admits the mistake when I ask.

![Claude saying its suggestion in entry 22 was wrong and explaining the difference between "корені" and "коріння"](/img/blog/translate-diataxis-with-ai/wrong-word-choice.png)

In entry 22, Claude suggested "коріння" for "words share roots." When I asked whether "корені" and "коріння" differ, it agreed that its suggestion was wrong. "Корені" is the plural for roots of words, while "коріння" is collective, as in the root system of a plant or someone's origins.

**Claude's guess at the cause:** both forms are common, and the model doesn't always pick the one the context needs. It also presents every suggestion with the same confidence, so nothing tells me which ones to double-check. This is why the `why` reply matters. Asking the model to justify a choice often surfaces the mistake.

### Hard cases for anyone

Some sentences are hard no matter who translates them, human or AI:

- **Metaphors** — a literal translation keeps the image but loses the meaning. The Diátaxis page asks for native metaphors instead, which the model rarely offers on its own.
- **Ambiguous "it"** — when "it" could refer to more than one noun, English readers guess from context. Ukrainian nouns have grammatical gender, so the translator has to pick a pronoun, and a wrong guess changes the meaning. In "Link the reference from the tutorial so that it stays short," "it" becomes "він" for the reference (довідник) or "вона" for the tutorial (навчальна інструкція).
- **Etymology** — when the text explains where a word comes from, the explanation works only for the English word. The translation needs to mention the English word or add a clarification.

If you're writing for translation, you can prevent most of these:

- **Plain sentences** — one idea per sentence, with no idioms that work only in English.
- **Clear references** — make sure every "it" points to one thing the reader can identify, or repeat the noun.
- **Named languages** — if you explain a word's origin, say which language you mean.

## Claude versus Gemini so far

So far, Gemini often gives me translations that sound more natural, even when I paste separate strings with no context. Claude tends to produce something more literal, closer to a word-for-word translation, even with the glossary and the whole file.

I don't understand why yet. Claude's guess is that it follows the source more faithfully because my instructions emphasize consistency and the glossary, while Gemini's free chat has fewer constraints and paraphrases more freely. That freedom has a cost, though. Two of the four errors in this post, the broken grammar and the invented word, came from Gemini. A more natural-sounding translation isn't always a correct one.

## What's next

In part 2, I plan to:

- **Refine the instructions** — push Claude toward more natural Ukrainian.
- **Compare Claude and Gemini on the same file** — so the comparison doesn't depend on which strings each one got.
- **Settle the tutorial term** — discuss "навчальна інструкція" versus "туторіал" with my fellow tech writers.
- **Check the markup** — make sure the AI didn't change Sphinx references, which the Diátaxis page asks translators to leave as they are.

## Key terms

- **PO file** — a plain-text file format from GNU gettext that stores each source string next to its translation. Sphinx-based docs like Diátaxis use it for translations.
- **XLIFF** — an XML format designed for exchanging translations between tools. Transifex offers it on paid plans.

<!--
- **Fuzzy entry** — a translation in a PO file that a tool marked as needing human review because it's probably right but not certain.

A PO entry usually becomes fuzzy in one of three ways:

- **The source text changed** — say the English was "Open the file," and you translated it. Later, the author changes it to "Open the file in the editor." Tools such as `msgmerge` or `sphinx-intl` match the new string to the old translation by similarity, keep the old translation, and mark it fuzzy.
- **Automatic matching** — a tool fills in a guess from a similar string elsewhere in the file.
- **Manual flag** — a translator marks an entry fuzzy as a reminder to come back to it later.
-->
