**match.ai MVP Requirements**

**Core Goal:** Help people understand their AI ethics stance (specifically around chatbots/mental health) and manually match them with potential collaborators.

**Scope:** Chatbots & Mental Health domain only for v1

---

**REQUIRED FEATURES:**

1. **Survey/Assessment**
   - 15-20 questions covering: personal experience with AI, concerns about mental health impacts, technical skills, collaboration style, what they want to build/change
   - Mix of multiple choice, scale ratings, and 1-2 short text responses
   - Generates an "archetype" result (4-6 archetypes total)
   - Collects: name, email, consent to be matched

2. **Archetype System**
   - 4-6 distinct archetypes with names, descriptions, strengths
   - Examples: "Guardian" (focused on protection/safety), "Builder" (wants to create solutions), "Researcher" (wants to understand), "Advocate" (wants policy change)
   - Each archetype gets a shareable result page

3. **Debrief Experience**
   - After survey, user gets their archetype + a personalized AI-generated debrief
   - Debrief highlights their responses, reflects patterns, suggests areas for collaboration
   - Uses Ollama (free tier) or Claude API (if user opts into paid tier later)

4. **Data Collection & Storage**
   - Store responses in simple database (SQLite for MVP)
   - Track: archetype, skills, interests, collaboration preferences, contact info
   - GDPR-compliant consent and data handling

5. **Manual Matching Process**
   - Admin view (just you) to review responses
   - Simple interface to identify potential matches based on complementary skills/interests
   - Email template system for intro emails

6. **Landing Page**
   - Explains what match.ai is
   - Shows example archetypes
   - Clear CTA to take the survey
   - Privacy/data policy

---

**INDEPENDENT TASKS:**

**Phase 1: Survey Design**
- [ ] Write 15-20 survey questions for chatbot/mental health domain
- [ ] Define 4-6 archetypes with names, descriptions, criteria
- [ ] Create archetype assignment logic (scoring system)
- [ ] Draft privacy policy and consent language

**Phase 2: Technical Foundation**
- [ ] Set up project repo (GitHub, open source)
- [ ] Choose tech stack (suggest: Next.js + SQLite for simplicity)
- [ ] Set up basic database schema
- [ ] Configure Ollama integration for debrief generation

**Phase 3: User-Facing Build**
- [ ] Build survey form UI
- [ ] Build archetype result page
- [ ] Build AI debrief interface
- [ ] Build landing page

**Phase 4: Admin Tools**
- [ ] Build admin dashboard to view responses
- [ ] Create matching review interface
- [ ] Build email template system for intros
- [ ] Set up email sending (SendGrid or similar)

**Phase 5: Testing & Launch**
- [ ] Test full flow end-to-end
- [ ] Get 5 beta testers to try it
- [ ] Write Reddit launch post
- [ ] Post in Brain-Is-Full-Vault Discord
- [ ] Manually match first 10-20 users

---

**OUT OF SCOPE FOR MVP:**
- Automated matching algorithm
- Multiple domains
- In-app messaging
- User accounts/dashboards
- Payment system
- Mobile app
- Anti-bot beyond basic reCAPTCHA

---

Want me to expand any of these into more detailed specs?