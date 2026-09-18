# Individual listening content review

Only JSON records in this directory override a lesson. The original lesson identity, audio path, access links and submission form codes remain unchanged.

For each lesson, in order:

1. Read the complete original transcript with all old answers restored.
2. Compare against the complete corresponding MP3. Independent speech recognition and timestamps are supporting evidence, not an authoritative spelling key. Preserve verified proper names; investigate material discrepancies.
3. Remove unspoken image captions, Markdown destinations, editorial credits and article furniture. Keep every spoken sentence, qualification, quantity and sign-off. Do not paraphrase the transcript or replace a spoken source name with invented wording.
4. Choose 25 Level 1 or 40 Level 2 meaningful gaps individually. Never cut through words, numerical values or URLs. Keep numbering in listening order. Record explicit equivalent number/unit spellings where appropriate.
5. Write ten grammatically correct, equivalent paraphrases. Preserve uncertainty, negation, comparisons and quantities. Each replay must use a checked interval from the original audio, never synthetic speech.
6. Write useful Vietnamese vocabulary meanings and accurate explanations.
7. Run `node support/build-reviewed-content.mjs` and `node --test tests/reviewed-content.test.mjs`. The generator checks unique text boundaries, chronological gaps, reconstructability, gap counts and replay intervals.
8. Build with `vite build --config vite.pages.config.ts`. Open each revised page and check its actual rendered inputs and transcript. Do not submit fabricated grades to the live form.
9. Publish only the built student assets to the existing GitHub Pages repository. Verify the deployed asset and workflow status. Keep the per-lesson revision so saved answers from an old gap set cannot be reused with a new key.

`support/review-status.json` records content/build validation, not deployment. Do not describe the entire course as reviewed while lessons remain pending.

Do not regenerate this content using arbitrary word windows, synonym substitution or a blanket cleanup regex.

L1-26 was replaced with the teacher-approved television-invention report, preserving its access token and form code; the old audio remains available for rollback. All 50 Level 1 lessons have individual records. Level 2 remains pending until its own records are reviewed.

The submission endpoint was updated to version 16 on 2026-09-18. It accepts real-source codes R01–R50 for each level, validates Listening /25 for L1 and /40 for L2, and returns totals /35 and /50 respectively. Legacy P01–P04 submissions retain their original /35 handling and fingerprints. Updated frontend scripts validate the corresponding receipt and recover previously rejected R-code submissions without altering their payloads. Backend tests use mocked sheets; never create fake live grades. Existing scorebook header labels still reflect the legacy form denominators and need a separate compatible label review before any sheet-header migration.

Evidence and release logs for this review are in the local workspace folder `fighter-listening-content-audit-20260917`; they are not student-facing assets.
