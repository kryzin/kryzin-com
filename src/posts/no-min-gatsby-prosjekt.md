---
slug: "min-gatsby-prosjekt"
title: "Hva jeg implementerte på nettsiden min :)"
date: "2023-07-06"
tags: ["gatsby","react"]
altfeatured: "gatsby logo"
featured: "../images/post-0001.jpg"
locale: "no"
---

Dette er mer eller mindre en fullstendig liste over alle endringene jeg har gjort på gatsby-starteren

## Stiler! CSS + SCSS + Bootstrap + PrismJS

- Tilpasset bootstrap off-canvas-togglebar Navbar
- Tilpasset fargepalett for begge temaer med .scss
- Tilpassede skrifttyper fra Google Fonts (Silkscreen & Courier Prime)
- Tilpasset PrismJS-tema for fremheving av kodeutdrag i .md-filer
- Rulle fremdriftslinjen øverst
- Overganger for side navigasjon
- Overgang ved endring av modus
- Animasjon for å skjule Navbar-knappen når man blar nedover
- Fikset bunntekst med 'tilbake til toppen'-knapp

## Moro ting

- Henter og bruker metadata på alle sider
- Oversettelser: EN, PL, NO (inkluderer ikke faktiske innlegg)
- Mørk/lys modus bryter i Navbar
- Språkbytte i Navbar
- Kontaktskjema tilkoblet Netlify
- Navigasjonslenker
  - neste/forrige innlegg
  - tilbake til innleggsarkiv
  - Navbar til alle sider
- createPages-slugs for hvert innlegg (.md-fil)
- createPages-slugs for innleggsarkiv
- kommentarseksjon under hvert innlegg med utterances (Github)
- Paginering for innleggsarkiv
- createPages-slugs for innleggssamling etter kategorier
- Søkefelt i innleggsarkiv
- Knapper for deling av innlegg på Facebook, Twitter, LinkedIn
- Side med mine offentlige Github-repositorier med beskrivelser
- Distribuert på Netlify
- Automatisk Lighthouse-rapport
- DatoCMS Management

## Mindre ting

- Layout implementert med et tillegg
- Egendefinerte ikoner for innstillinger
- Utvalgte bilder vises på innlegg fra .md
- Forfatterkort under innleggstittelen
