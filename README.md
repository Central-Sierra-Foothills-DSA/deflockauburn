# DeFlock Auburn — ALPR Transparency Project

A public-records investigation into automated license plate reader (ALPR) usage by the
**Auburn Police Department** and **Placer County Sheriff's Office**, built from raw audit
logs obtained under the **California Public Records Act (CPRA)**.

🔗 **Live site:** [deflockauburnca.com]

---

## What this is

Auburn PD and Placer County SO both use Flock Safety ALPR cameras to capture and store
license plate data. This project analyzes the agencies' own **Network Audit** and
**Org Audit** logs — records of every search performed against their camera networks,
by their own officers and by outside agencies — to answer basic questions the public
transparency portals don't:

- How many times has each agency's camera network actually been searched?
- Which outside agencies — in-state, out-of-state, and federal — have accessed this data?
- Is that access consistent with California law?
- Can the public actually verify *why* a search was conducted?

## Key findings

- **20M+** total external searches across both agencies' camera networks.
- **15 federal entities** — including the FBI, ATF, and U.S. Border Patrol — accessed
  Auburn's network, several logged as "inactive" only after the fact.
- **4,400+** distinct out-of-state, federal, or federal-fusion-center agencies had access,
  in apparent conflict with **Civil Code § 1798.90.55(b)** (enacted via **SB 34**,
  effective January 1, 2016), which restricts ALPR sharing to California public agencies only.
- **Placer County SO refused to produce the "Reason" field** documenting why searches
  were conducted, stating it would require a court order — despite the agency's own
  transparency portal stating "all system access requires a valid reason."
- In October 2025, the California Attorney General sued the City of El Cajon over
  similar underlying conduct — this is active, not theoretical, enforcement.

Full methodology and sourcing are documented on the site itself; see `index.html`.

## Data sources

All underlying data was obtained via CPRA requests submitted directly to Auburn PD and
Placer County SO, plus supplementary information from each agency's public
[Flock Safety Transparency Portal](https://transparency.flocksafety.com/). Raw CSV audit
logs are not included in this repository (see `.gitignore` / data-handling note below).

## Repo structure

```
.
├── index.html # Main site markup and content
├── style.css # Site styling
├── script.js # Interactive behavior (copy-to-clipboard, tab toggles, etc.)
├── favicon.svg
├── cameraImage.png # Hero/section imagery
└── icons/ # Icon assets used throughout the site
```

## Running locally

This is a static site with no build step or dependencies. Clone the repo and open
`index.html` directly in a browser, or serve it locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## A note on accuracy

This project involves specific factual claims about named public agencies and
individually named outside agencies (including federal law enforcement). Every effort
has been made to verify these numbers directly against the source CSV audit logs,
and to distinguish between:

- **confirmed facts** (e.g., search counts, dates, agency names as they appear in the
  audit logs), and
- **legal interpretation** (e.g., whether specific conduct violates a specific statute),

which is presented as analysis, not a legal determination. This site is not written
or reviewed by an attorney. If you are a journalist, records custodian, or affected
agency and believe any figure here is inaccurate, please [open an issue](../../issues)
or reach out via the contact method on the site — corrections will be made promptly
and transparently.

## Contributing

- **Corrections / data issues:** open a GitHub issue with the specific claim, page
  section, and what you believe is inaccurate, ideally with a source.
- **Additional records:** if you have CPRA responses from Auburn, Placer County, or
  comparable agencies you'd like analyzed and potentially added, open an issue or
  reach out directly.
- **Design/accessibility fixes:** PRs welcome for `style.css` / `script.js` /
  `index.html`, particularly around accessibility (ARIA labels, contrast, keyboard nav).

## Mailing list / take action

The site includes a sign-up for updates on records requests, meeting alerts, and
actions residents can take. See the "Join the Mailing List" section on the site.

## License

- **Written content, findings, and site text** (`index.html` copy, research, analysis)
  are licensed under [**CC BY 4.0**](https://creativecommons.org/licenses/by/4.0/) —
  you're free to share and adapt this material for any purpose, including
  commercially, as long as you give appropriate credit.
- **Code** (`script.js`, `style.css`, and any other site functionality) is licensed
  under the [**MIT License**](https://opensource.org/licenses/MIT) — free to reuse,
  modify, and redistribute with attribution.

See `LICENSE` (code) and `LICENSE-CONTENT` (written material) for full text.

## Disclaimer

This is an independent public-records research and advocacy project. It is not
affiliated with, endorsed by, or produced on behalf of Auburn PD, Placer County SO,
Flock Safety, or any government entity.
