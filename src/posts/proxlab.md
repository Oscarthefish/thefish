---
title: "ProxLab: A Friendlier Front End for the Proxmark3"
date: 2026-08-21
categories:
  - "tools"
  - "physical-security"
  - "rfid"
  - "proxmark3"
tags:
  - "tools"
  - "physical-security"
  - "rfid"
  - "proxmark3"
---

If you've ever used a Proxmark3, you'll know the [Iceman fork](https://github.com/RfidResearchGroup/proxmark3) can do almost anything to an RFID or NFC card. You'll also know that "almost anything" comes with a command line that assumes you already remember the difference between `hf mf autopwn` and `hf mf cload`, and that you can recite MIFARE sector layouts from memory.

I can't. So I built [ProxLab](https://github.com/Oscarthefish/ProxLab).

It's a small Windows desktop app that wraps the pm3 client in a guided UI, aimed at exactly the kind of person who doesn't want to memorise pm3 commands but still wants to know what's actually happening to the card in their hand.

### What it does

**Scan** runs an HF search against whatever card you present, decodes the fields and shows them in plain English instead of a wall of hex.

**Library** saves scanned cards with a nickname and notes, so you can build up a searchable collection instead of losing track of which dump file was which building's access card.

**Write** clones a saved card onto a blank, or builds one from scratch for NTAG and EM4100 style tags.

**Sector map** is a visual grid showing which MIFARE sectors were read cleanly, which were only partially read, and which are locked, so you're not squinting at raw output trying to work out what you're actually missing.

There's also a setup wizard, because getting the Iceman client and the Zadig WinUSB driver configured correctly the first time is its own small adventure.

### How it's put together

Nothing exotic. It's an Electron app with a React and TypeScript front end, styled with Tailwind. Under the hood it talks to `pm3.exe` the same way you would from a terminal, by spawning the process and parsing what comes back. Scanned cards get stored locally in SQLite. None of that is particularly interesting on its own, but it means the whole thing runs as a normal Windows app rather than requiring anyone to touch Python dependencies or WSL.

Full transparency: a lot of it was vibe coded. The goal was a quick, usable front end for the pm3 CLI, not a rigorously engineered piece of software, so treat the codebase accordingly.

### Where it's at

Early. There's no packaged installer yet, so right now it's clone-and-build-from-source only:

```
npm install
npm run dev
```

It currently covers MIFARE Classic 1K/4K, MIFARE Ultralight, and the NTAG21x family, with a generic HF fallback for anything else. The rough edges are still rough, and it needs a real Proxmark3 (Easy or RDV4) to do anything useful, so it's really a project for anyone who's hit the same wall with the pm3 CLI, rather than a finished product.

If you're curious, the code is on [GitHub](https://github.com/Oscarthefish/ProxLab). For me it comes from the same place as OSINT does, just with a soldering iron's worth of physical hardware attached to it.
