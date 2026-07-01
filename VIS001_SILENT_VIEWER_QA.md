# VIS-001 Silent Viewer QA

## Purpose

VIS-001 should be understandable by a serious cold viewer without narration.

## Frame checks

1. False certainty
- Can the viewer state the missing variable?
- Does the frame avoid claiming safety from score alone?

2. Hidden variable
- Can the viewer identify that overlap is hidden?
- Does the frame explain that two guardrails can miss different prompts or the same prompts?

3. Atom table
- Can the viewer identify Shared Miss as the danger cell in one second?
- Is Both Block clearly not the danger cell?

4. World split
- Can the viewer explain what stayed fixed?
- Can the viewer explain what changed?
- Can the viewer explain why risk changed?

5. Interval
- Can the viewer explain why the claim is a range?
- Are endpoint witnesses visually connected to possible worlds?

6. Receipt
- Can the viewer list what evidence travels with the claim?
- Are non-claims visible?
- Does the frame avoid fake certification language?

7. Private demo bumper
- Is the private-demo framing explicit?
- Does the ending tell reviewers what to judge?

## Pass condition

A cold viewer should be able to summarize the video in one sentence:

"Two guardrails can have the same scores but different shared misses, so the honest composed safety claim is a supported range with evidence and non-claims."

## Fail condition

The video fails if a cold viewer says:

"It says the system is certified safe."
"It says p00/p11 but I do not know what that means."
"It looks like JSON with animations."
"I cannot tell what changed between the two worlds."
