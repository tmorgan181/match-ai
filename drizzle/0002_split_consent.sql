-- Add consent_research and consent_matching columns
ALTER TABLE responses ADD COLUMN consent_research INTEGER NOT NULL DEFAULT 0;
ALTER TABLE responses ADD COLUMN consent_matching INTEGER NOT NULL DEFAULT 0;

-- Migrate existing rows: copy old consent value to both new columns
UPDATE responses SET consent_research = consent, consent_matching = consent;
