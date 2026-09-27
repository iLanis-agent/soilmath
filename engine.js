// SoilMath engine - honest raised-bed soil ordering math.
// Pure logic, no DOM. Shared by app.html and the node test harness.
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.SoilMath = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var SETTLE = 1.15;          // fresh mix fluffs, then settles ~15%
  var CUFT_PER_YD = 27;
  var FILLS = { full: 1.0, twothirds: 2 / 3 };  // twothirds = deep bed, wood/logs in the bottom third
  var MIXES = {
    premium:    { label: 'Premium blend (60/30/10)', parts: [['Topsoil', 0.6], ['Compost', 0.3], ['Aeration (perlite/vermiculite)', 0.1]] },
    fiftyfifty: { label: 'Simple 50/50',             parts: [['Topsoil', 0.5], ['Compost', 0.5]] },
    topsoil:    { label: 'Straight topsoil',          parts: [['Topsoil', 1.0]] }
  };

  function round2(x) { return Math.round(x * 100) / 100; }

  function plan(opts) {
    var bedCuFt = round2(opts.lengthFt * opts.widthFt * (opts.depthIn / 12));
    var fillFrac = FILLS[opts.fill] || 1.0;
    var netCuFt = round2(bedCuFt * (opts.beds || 1) * fillFrac);
    var orderCuFt = round2(netCuFt * SETTLE);
    var mix = MIXES[opts.mix];
    var comps = mix.parts.map(function (p) {
      var cuft = round2(orderCuFt * p[1]);
      return { name: p[0], cuft: cuft, bags: Math.ceil(cuft / opts.bagCuFt) };
    });
    var totalBags = comps.reduce(function (s, c) { return s + c.bags; }, 0);
    var bagCost = round2(totalBags * (opts.bagPrice || 0));
    var bulkYd = Math.ceil((orderCuFt / CUFT_PER_YD) * 2) / 2;
    var bulkCost = round2(bulkYd * (opts.bulkPricePerYd || 0));
    var cheaper = (opts.bagPrice > 0 && opts.bulkPricePerYd > 0)
      ? (bagCost <= bulkCost ? 'bags' : 'bulk') : null;
    return {
      bedCuFt: bedCuFt,
      netCuFt: netCuFt,
      orderCuFt: orderCuFt,
      mixLabel: mix.label,
      comps: comps,
      totalBags: totalBags,
      bagCuFt: opts.bagCuFt,
      bagCost: bagCost,
      bulkYd: bulkYd,
      bulkCost: bulkCost,
      cheaper: cheaper
    };
  }

  return { plan: plan, MIXES: MIXES, round2: round2 };
});
