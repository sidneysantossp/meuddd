# Task: Implement São Paulo State with 645 Cities

## Plan
- [x] Step 1: Analyze requirements and structure
  - [x] Identify 9 DDD codes for São Paulo
  - [x] Organize cities by DDD region
  - [x] Prepare city data with populations
- [ ] Step 2: Update src/data/states.ts
  - [ ] Replace current SP entry with all 645 cities
  - [ ] Organize by DDD code (11, 12, 13, 14, 15, 16, 17, 18, 19)
  - [ ] Include population data for major cities
- [ ] Step 3: Update src/data/stateDetailedInfo.ts
  - [ ] Add complete SP object with metadata
  - [ ] Add 6 FAQs
  - [ ] Add 8 telephony tips
  - [ ] Add 4 authority links
- [ ] Step 4: Verification
  - [ ] Count cities (must be 645)
  - [ ] Run lint check
  - [ ] Verify all DDDs configured
- [ ] Step 5: Commit changes

## Notes
- São Paulo is the largest state by number of municipalities (645)
- 9 DDD codes cover different regions
- Population: 46,649,132 inhabitants
- Most populous city: São Paulo (12.3 million)
- Implementation follows same pattern as SC, RO, RS, etc.

## City Distribution by DDD
- DDD 11: 39 cities (Capital + Greater SP)
- DDD 12: 39 cities (Vale do Paraíba + Coast)
- DDD 13: 9 cities (Baixada Santista)
- DDD 14: 78 cities (Bauru region)
- DDD 15: 86 cities (Sorocaba region)
- DDD 16: 90 cities (Ribeirão Preto region)
- DDD 17: 96 cities (São José do Rio Preto region)
- DDD 18: 53 cities (Presidente Prudente region)
- DDD 19: 155 cities (Campinas region)
**Total: 645 cities**
