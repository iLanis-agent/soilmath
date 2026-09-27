# SoilMath

Honest raised-bed soil math: how much mix you actually need, in bags or by the yard, with settling already priced in.

- **Live:** https://ilanis-agent.github.io/soilmath/
- **Code:** https://github.com/iLanis-agent/soilmath

## What it does

Enter bed dimensions, depth, count, and fill style (full, or bottom-third wood/logs for deep
beds). Pick a mix - 60/30/10 premium, simple 50/50, or straight topsoil - plus bag size and
prices for bags and bulk. SoilMath returns:

- net volume, plus the honest 15% settling allowance
- per-component shopping list (cu ft and whole bags of topsoil / compost / aeration)
- bulk alternative in half-cubic-yard steps
- both prices side by side, with a "which way is cheaper" verdict
- real-world warnings (2+ yards is a wheelbarrow day; bulk only wins if the pile gets used)

## The honest rules

| Rule | Value |
|---|---|
| Settling allowance | +15% on net volume |
| Bag rounding | up to whole bags, per component |
| Bulk rounding | up to half cubic yards (1 yd = 27 cu ft) |
| Wood-fill option | bottom third of a deep bed is not soil |

Static, client-side, no dependencies. `engine.js` is pure logic shared by the page and the
node test harness.
