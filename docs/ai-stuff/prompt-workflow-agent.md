---
title: Prompt, Workflow, or Agent?
description: Understand when it's time to consider AI agents
sidebar_custom_props:
  card_icon: img/icons/ai-head.svg
  card_icon_invert_dark: true
---

Almost every AI product now claims to be "agentic," and the terms prompt, workflow, and agent are often used as if they mean the same thing. But they are not the same. Each gives the AI a different level of autonomy, with different costs and risks. This article explains the difference and how to choose the right one.

## What an AI agent is

An AI agent is an AI model that works in a loop. It looks at a goal, decides what to do next, takes an action using a tool, sees the result, and decides again. It keeps going until it thinks the job is done.

An agent has four components:

- **Model** - an LLM that can reason about the situation and choose actions.
- **Tools** - a list of tools it can use, such as searching a database, reading a file, sending an email, or issuing a refund.
- **Loop** - feeds the result of each action back to the model.
- **Guardrails** - limits on what it can do, how long it can run, and when a human has to approve something.

The model decides what to do next, but only from the tools that the people who built the agent have given it.

It's also worth saying what an agent is not. A chatbot that answers questions is not an agent. If the AI can't take actions and choose its own path, it's a simpler system.

## The autonomy spectrum

Think of AI systems as sitting on a spectrum of how much control you hand to the model:

- **A single prompt** is one request and one answer. You give the model some text and ask it to summarize, classify, translate, or rewrite it. It's fast, cheap, and predictable, and it solves a surprising number of real problems.

- **A workflow** is a fixed sequence of steps designed in advance. The model may do smart work at each step, but the order is set by the people who built it. For example: classify the incoming email, extract the key details, write a summary, save it to a database. Every email goes through the same four steps. Common workflow patterns include chaining (one step feeds the next), routing (classify first, then send down one of several predefined paths), and parallelization (run several steps at once and combine the results).

- **An agent** hands the steering wheel to the model. You give it a goal and tools, and it figures out the steps itself. Different inputs lead to completely different paths, and the number of steps isn't known in advance.

Here's how they compare:

| | Single prompt | Workflow | Agent |
|---|---|---|---|
| **Who decides the next step** | Nobody (one step) | The builder, in advance | The model |
| **Number of steps** | One | Fixed | Varies every run |
| **Predictability** | Very high | High | Lower |
| **Cost** | Lowest | Low to moderate | Highest |
| **Ease of debugging** | Easy | Easy: you know where it broke | Hard: you have to read its reasoning |
| **Best for** | Self-contained tasks | Repeatable processes | Open-ended problems |

A useful way to remember it is this: a prompt answers, a workflow follows a recipe, and an agent figures it out.

## When to build an agent

It makes sense less often than the hype suggests. Agents earn their place when the path to the answer can't be known ahead of time.

Signs you probably need an agent:

- **The path isn't fixed.** The next step depends on what the last step found. Debugging software, investigating an outage, and researching a topic all work this way.
- **The task needs tools and multiple steps.** The work involves searching, reading, calling systems, and acting on what comes back, not just producing text.
- **The inputs are messy.** Free-form emails, long documents, and vague requests don't fit neatly into rules.
- **Rules would be brittle.** If you'd need hundreds of special cases to hard-code the logic, a model that can reason may cope better.
- **The value justifies the cost.** The task is worth the extra time and money an agent uses.

Signs you probably don't:

- **One good prompt would do it.** Summarizing, classifying, extracting, and rewriting rarely need more.
- **The steps are always the same.** That's a workflow, and it will be cheaper and more reliable.
- **Mistakes are expensive and hard to catch.** The more costly the error, the more you want tight control instead of autonomy.
- **Speed or budget is tight.** Agents loop, and every loop costs time and money.
- **Ordinary software could handle it.** If plain logic solves the problem, use plain logic.

The underlying rule: start with the simplest thing that works, and move up the spectrum only when you hit a real limit.

## Real examples: workflow vs. agent

Let's look at the following examples.

### A workflow: weekly release notes

A software company ships updates every week, and the technical writing team publishes release notes for each one. Every release goes through the same steps: pull the list of completed changes from the ticketing system, sort each into a category (new feature, improvement, bug fix, internal-only), drop the internal-only items, rewrite the rest in plain language following the style guide, fill in the release notes template, and send the draft to a writer for review.

The order never changes, and nobody needs the model to decide "let me skip the categorizing this time." The AI does smart work at each step, but making this an agent would only add cost and unpredictability.

### An agent: keeping documentation up to date

A product team changes how password resets work, and someone asks: "Update the docs." There's no fixed recipe for this. A documentation agent might search the doc set for pages that mention password resets, read them, find that three pages, a FAQ entry, and a tutorial are affected, and check the product change notes for the exact new behavior. It edits the pages, notices another page links to a section that was renamed, fixes the link, runs the style and link checks, spots a screenshot it can't replace, and flags it for a writer.

Each step depends on what the previous one found, and nobody can predict how many pages will turn up. It also comes with built-in checks (the link checker and style rules), and a human reviews the result before anything is published.

## The costs and risks of agents

Agents are powerful, but the downsides are real:

- **Compounding errors.** Each step has some chance of going wrong, and an agent can take many steps. A small mistake early on can quietly steer everything that follows. In a workflow, each fixed step can be tested on its own.

- **Cost.** Agents loop, read lots of material, and call tools repeatedly. A task that costs a fraction of a cent as a single prompt can cost far more as an agent, and the difference adds up at scale.

- **Latency.** Every loop takes time. If someone is waiting for an answer, a multi-step agent may feel slow.

- **Unpredictability.** The same request can take different paths on different days. That makes agents harder to test, audit, and explain.

- **Security.** An agent that reads emails, web pages, or documents can be tricked by instructions hidden in that content, an attack known as prompt injection. The more tools an agent has, the more damage a mistake or a manipulation can do, so give it only the access it needs.

- **Irreversible actions.** Publishing a page, sending an email, or deleting a file can't be undone. For anything like that, keep a human in the loop to approve the action.

None of this means agents are a bad idea. It means they should be used on purpose, with limits in place, instead of by default.

## The takeaway

If you can write down the steps before the task starts, build a workflow. If you can't, and the value justifies the cost, build an agent.

Start simple, add autonomy only where it pays off, and keep a human in charge of anything you can't undo.